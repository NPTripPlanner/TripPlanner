import { 
  InitFirebase, 
  ClearApp,
  initializeUser,
} from "./firebase.utils";

import {
  UserArchive,
} from '../schema/firestore.schema'

describe("Firebase utility test", () => {

  //fake user data
  const user : UserArchive = new UserArchive();
  user.email = 'abc@abc.gmail.com';
  user.emailVerified = true;
  user.displayName = 'test user';

  beforeAll(async () => {
    InitFirebase();
    
    await initializeUser({
      uid:'testId',
      displayName:'test name',
      email:'fake@gmail.com',
    });
  });

  afterAll(async (done) => {
    try{
        await ClearApp();
        done();
    }
    catch(err){
        throw err;
    }
  });

  it('test', async ()=>{
    return expect(true).toBeTruthy();
  })

  // it('create new user', async ()=>{
  //   expect.assertions(1);

  //   user.displayName = 'test user2';
  //   const user2 = await CreateUser(user);
  //   return expect(user2).toEqual(expect.objectContaining({displayName:'test user2'}));
  // });

  // it('get user', async ()=>{
  //   expect.assertions(1);

  //   user.displayName = 'cool dude';
  //   user.id = 'testUser2';
  //   const newUser = await CreateUser(user);

  //   return expect(GetUser(newUser.id))
  //   .resolves
  //   .toMatchObject<UserArchive>(newUser);
  // })


});
