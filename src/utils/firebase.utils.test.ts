import { 
  ClearTestFirestore,
  InitFirebase, 
  // ClearApp,
  initializeUser,
  CreateTripArchive,
  FetchTripArchive,
  PullNextTripArchive,
} from "./firebase.utils";

import sort from 'fast-sort';

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

    it('initialize user', async ()=>{
      const result = await initializeUser(fakeUser);

      return expect(result).toBeTruthy();
    })
  })

  describe('create trip archive', ()=>{
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

      let batch = await PullNextTripArchive(fakeUser.uid, 1);
      expect(batch.lastDocSnap).not.toBeNull();
      batch = await PullNextTripArchive(fakeUser.uid, 1, batch.lastDocSnap);
      return expect(batch.lastDocSnap).not.toBeNull();
    })

    it('get trip archive in batch by 2', async ()=>{
      expect(FetchTripArchive(fakeUser.uid))
      .resolves
      .not
      .toThrowError();

      let batch = await PullNextTripArchive(fakeUser.uid, 2);
      expect(batch.results.length).toEqual(2);

      batch = await PullNextTripArchive(fakeUser.uid, 2, batch.lastDocSnap);
      return expect(batch.results.length).toEqual(2);
    })

    it('get trip archive without batch', async ()=>{
      expect(FetchTripArchive(fakeUser.uid))
      .resolves
      .not
      .toThrowError();

      let batch = await PullNextTripArchive(fakeUser.uid, 4);

      const sortedResults = sort(batch.results).asc(t=>t.metadata.createAt);
      sortedResults.map((val)=>{
        console.log(val.metadata.createAt, val);
        return val;
      })

      return expect(batch.results.length).toEqual(4);

      
    })

  })

});