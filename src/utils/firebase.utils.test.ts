import { 
  ClearTestFirestore,
  InitFirebase, 
  // ClearApp,
  initializeUser,
  CreateTripArchive,
  DeleteTripArchive,
  FetchTripArchive,
  // FetchTripArchiveAfter,
  ListenToRepository,
  GetRepository,
  ListenToDocument,
  GetTripArchive,
  UpdateTripArchiveName,
  SearchTripArchive,
} from "./firebase.utils";

import { TripArchive } from "../schema/firestore.schema";
import ImprovedRepository from "../schema/ImprovedRepository";
import {SortArray} from './utils';

describe("Firebase utility test", () => {

  const fakeUser = {
    uid:'testId',
    displayName:'test name',
    email:'fake@gmail.com',
  }

  beforeAll(async () => {
    await ClearTestFirestore();
    InitFirebase();
    
  });

  afterAll(async (done) => {
    try{
        //will cause test throw error Firebase functions instance was deleted
        //and cloud functions are working fine
        // await ClearApp();
        done();
    }
    catch(err){
        throw err;
    }
  });
  
  describe('init user block', ()=>{
    afterAll(async (done) => {
      done();
    });

    it('initialize user', async ()=>{
      const result = await initializeUser(fakeUser);

      return expect(result).toBeTruthy();
    })
  })

  describe('create trip archive', ()=>{
    afterAll(async (done) => {
      done();
    });

    it('create trip archive under user id', async ()=>{
      expect(CreateTripArchive(fakeUser.uid, 'trip archive 1'))
      .resolves
      .not
      .toThrowError();
      
      await CreateTripArchive(fakeUser.uid, 'trip archive 3');

      const result = await CreateTripArchive(fakeUser.uid, 'trip archive 2');
      expect(result).not.toBeNull();
      return expect(result).toMatchObject({ownerId:fakeUser.uid});
    })
  })

  describe('get trip archive', ()=>{
    afterAll(async (done) => {
      done();
    });

    it('get specific trip archive', async ()=>{
      const archiveName = 'special trip archive';
      const result = await CreateTripArchive(fakeUser.uid, archiveName);
      const archive = await GetTripArchive(fakeUser.uid, result.id);

      expect(archive.ownerId).toEqual(result.ownerId);
      return expect(archive.id).toEqual(result.id);
    })

    it('get all trip archive by user id', async ()=>{
      expect(FetchTripArchive(fakeUser.uid))
      .resolves
      .not
      .toThrowError()

      const result = await FetchTripArchive(fakeUser.uid);
      expect(result).not.toBeNull();
      return expect(result[0].ownerId).toEqual(fakeUser.uid);
    })

    it('get trip archive in batch by 1', async ()=>{
      expect(FetchTripArchive(fakeUser.uid))
      .resolves
      .not
      .toThrowError();

      let batch = await SearchTripArchive(fakeUser.uid, '', 1);
      expect(batch.lastDocSnapshotCursor).not.toBeNull();
      batch = await SearchTripArchive(fakeUser.uid, '', 1, batch.lastDocSnapshotCursor);
      return expect(batch.lastDocSnapshotCursor).not.toBeNull();
    })

    it('get trip archive in batch by 2', async ()=>{
      expect(FetchTripArchive(fakeUser.uid))
      .resolves
      .not
      .toThrowError();

      let batch = await SearchTripArchive(fakeUser.uid, '',2);
      expect(batch.results.length).toEqual(2);

      batch = await SearchTripArchive(fakeUser.uid, '',2, batch.lastDocSnapshotCursor);
      return expect(batch.results.length).toEqual(2);
    })

    it('get trip archive without batch', async ()=>{
      expect(FetchTripArchive(fakeUser.uid))
      .resolves
      .not
      .toThrowError();

      let batch = await SearchTripArchive(fakeUser.uid, '',4);

      const sortedResults = SortArray(batch.results, 'createAt');
      // sortedResults.map((val)=>{
      //   console.log(val.metadata.createAt, val);
      //   return val;
      // })

      return expect(sortedResults.length).toEqual(4);
    })

  })

  describe('delete trip archive', ()=>{
    afterAll(async (done) => {
      done();
    });

    it('delete 1 trip archive', async ()=>{
      const result = await CreateTripArchive(fakeUser.uid, 'If you see this, it is a problem');

      const deleteResult = DeleteTripArchive(fakeUser.uid, result.id);
      return expect(deleteResult).toBeTruthy();

    })
  })

  describe('update trip archive', ()=>{
    afterAll(async (done) => {
      done();
    });

    it('update trip archive name', async ()=>{
      const oldName = 'name will be changed';
      const newName = 'new name';

      const result = await CreateTripArchive(fakeUser.uid, oldName);
      expect(result.name).toEqual(oldName);

      const updateResult = await UpdateTripArchiveName(fakeUser.uid, result.id, newName);
      return expect(updateResult.name).toEqual(newName);

    })
  })

  describe('listen to collection', ()=>{
    afterAll(async (done) => {
      done();
    });
    beforeEach((done)=>{
      window.jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000000000;
      done();
    })

    it('listen documents under collection', async()=>{
      //will use jest to spy on it
      const cbObj ={ 
        fn:(_docs)=>{
          // console.log('receive documents changed under collection', docs);
        }
      };
      const spy = jest.spyOn(cbObj, 'fn');

      //listen to collection change
      const unsubscribe = ListenToRepository<TripArchive, ImprovedRepository<TripArchive>>(
        await GetRepository(TripArchive), 
        cbObj.fn,
        (err)=>console.log(err)
      );

      //create 2 trip archives automatically
      const result = await new Promise((res)=>{
        let count = 0;
        const intval = setInterval(async ()=>{
          await CreateTripArchive(fakeUser.uid, `Auto created trip archive ${count}`);
          count++;
          if(count >= 2){
             clearInterval(intval);
            res(true);
          }
        }, 3000);
      });

      unsubscribe();

      expect(spy).toHaveBeenCalled();
      return expect(result).toBeTruthy();
    })


  })
  
  describe('listen to one document change', ()=>{
    afterAll(async (done) => {
      done();
    });
    beforeEach((done)=>{
      window.jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000000000;
      done();
    })

    it('listen to document', async ()=>{
      const oldName = 'change this document\'s name';
      const repo = await GetRepository(TripArchive);
      const result = await CreateTripArchive(fakeUser.uid, oldName);
      const docRef = repo.getDocumentReference(result.id);
      //will use jest to spy on it
      const cbObj={
        fn:(_doc)=>{
          // console.log('receive document changed', doc);
        }
      }
  
      const spy = jest.spyOn(cbObj, 'fn');
  
      //check if document's name is old name
      let doc = await repo.findById(result.id);
      expect(doc.name).toEqual(oldName);
  
      //listen to document change
      const unsubscribe = ListenToDocument<TripArchive, ImprovedRepository<TripArchive>>(
      repo, docRef, cbObj.fn,(err)=>console.log(err));
      
      //update document's name to new name
      const newName = 'The name has been changed';
      doc = await repo.findById(result.id);
      doc.name = newName;
      await repo.update(doc);
  
      //uncomment and manual change in firestore to see the result
      //you have 20 sec to change value
      // await new Promise((res)=>{
      //   const time = setTimeout(()=>{
      //     clearTimeout(time);
      //     res(true);
      //   }, 20000);
      // });
      
      unsubscribe();
  
      expect(spy).toBeCalled();
      doc = await repo.findById(result.id);
      return expect(doc.name).toEqual(newName);
    })
  });

  describe('search trip archive', ()=>{
    afterAll(async (done) => {
      done();
    });

    beforeAll(async ()=>{
      await CreateTripArchive(fakeUser.uid, 'my trip to nowhere');
      await CreateTripArchive(fakeUser.uid, 'Fun in Italy');
      await CreateTripArchive(fakeUser.uid, 'trip to france');
      await CreateTripArchive(fakeUser.uid, '100 100 100');
      await CreateTripArchive(fakeUser.uid, '200 200 200');
    })

    it('search trip archive by name', async ()=>{

      const result = await SearchTripArchive(fakeUser.uid,'france', 10);
      expect(result.results).toHaveLength(1);

      const moreResult = await SearchTripArchive(fakeUser.uid, 'trip to france', 10);
      expect(moreResult.results.length).toBeGreaterThan(1);

      const fetch1 = await SearchTripArchive(fakeUser.uid, 'trip', 2);
      expect(fetch1.results).toHaveLength(2);

      const fetch2 = await SearchTripArchive(fakeUser.uid, 'trip', 2, fetch1.lastDocSnapshot);
      expect(fetch2.results).toHaveLength(2);

      const noKeyWords = await SearchTripArchive(fakeUser.uid, '', 5, fetch1.lastDocSnapshot);
      expect(noKeyWords.results).toHaveLength(5);

      const onlytwo = await SearchTripArchive(fakeUser.uid, '100 200', 0);
      return expect(onlytwo.results).toHaveLength(2);
    })
  })
});