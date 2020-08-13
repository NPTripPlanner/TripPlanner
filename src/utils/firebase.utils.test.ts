import { 
  CreateTripItem,
  FetchTripItemCollection,
  UserArchive,
  CreateUser,
  GetUser, 
  InitFirebase, 
  ClearApp,
  ClearDatabase, 
} from "./firebase.utils";

describe("Firebase utility test", () => {
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
  
  const user : UserArchive = new UserArchive();
  user.id = '';
  user.name = 'test user';
  user.age = 45;

  it('create new user', async ()=>{
    expect.assertions(1);

    return expect(CreateUser(user))
    .resolves
    .toEqual(expect.objectContaining({name:'test user'}));
  });

  it('get user', async ()=>{
    expect.assertions(1);

    user.name = 'cool dude';
    const newUser = await CreateUser(user);

    return expect(GetUser(newUser.id))
    .resolves
    .toEqual(expect.objectContaining({name:'cool dude'}));
  })

  // it("Create a new trip", async () => {
  //   expect.assertions(1);

  //   return expect(
  //     CreateTripItem(currentUser, {
  //       tripName: "test trip",
  //       startDate: "04/Oct/2019",
  //       createDate: "04/Nov/2018",
  //     })
  //   ).resolves.toEqual(currentUser.uid);
  // });

  // it("Fetch trip items", async () => {
  //   expect.assertions(1);

  //   return expect(
  //     FetchTripItemCollection(currentUser)
  //   ).resolves.toEqual(expect.arrayContaining([{
  //     tripName: "test trip",
  //     startDate: "04/Oct/2019",
  //     createDate: "04/Nov/2018",
  //   }]));
  // })
});
