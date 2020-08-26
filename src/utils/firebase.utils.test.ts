import { 
  ClearTestFirestore,
  InitFirebase, 
  // ClearApp,
  initializeUser,
  CreateTripArchive,
  FetchTripArchive,
  FetchTripArchiveAfter,
  ListenToRepository,
  GetRepository,
  ListenToDocument,
  GetTripArchive,
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

      let batch = await FetchTripArchiveAfter(fakeUser.uid, 1);
      expect(batch.lastDocSnap).not.toBeNull();
      batch = await FetchTripArchiveAfter(fakeUser.uid, 1, batch.lastDocSnap);
      return expect(batch.lastDocSnap).not.toBeNull();
    })

    it('get trip archive in batch by 2', async ()=>{
      expect(FetchTripArchive(fakeUser.uid))
      .resolves
      .not
      .toThrowError();

      let batch = await FetchTripArchiveAfter(fakeUser.uid, 2);
      expect(batch.results.length).toEqual(2);

      batch = await FetchTripArchiveAfter(fakeUser.uid, 2, batch.lastDocSnap);
      return expect(batch.results.length).toEqual(2);
    })

    it('get trip archive without batch', async ()=>{
      expect(FetchTripArchive(fakeUser.uid))
      .resolves
      .not
      .toThrowError();

      let batch = await FetchTripArchiveAfter(fakeUser.uid, 4);

      const sortedResults = SortArray(batch.results, 'createAt');
      // sortedResults.map((val)=>{
      //   console.log(val.metadata.createAt, val);
      //   return val;
      // })

      return expect(sortedResults.length).toEqual(4);
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
      expect(spy).toHaveBeenCalledTimes(3);
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
});