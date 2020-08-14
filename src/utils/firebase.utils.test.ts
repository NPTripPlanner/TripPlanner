import { 
  InitFirebase, 
  ClearApp,
  CreateUser,
  GetUser, 
  ClearDatabase,
} from "./firebase.utils";

import {
  UserArchive,
} from '../schema/firestore.schema'

describe("Firebase utility test", () => {

  const user : UserArchive = new UserArchive();
  user.email = 'abc@abc.gmail.com';
  user.emailVerified = true;
  user.displayName = 'test user';

  beforeAll(async () => {
    InitFirebase();
    
    await ClearDatabase();
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

  it('create new user', async ()=>{
    expect.assertions(1);

    user.displayName = 'test user2';
    const user2 = await CreateUser(user);
    return expect(user2).toEqual(expect.objectContaining({displayName:'test user2'}));
  });

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
