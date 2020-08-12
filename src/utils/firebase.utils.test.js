import { CreateTripItem, InitFirebase, ClearApp } from "./firebase.utils";

const currentUser = {
  uid: "testUser",
  email: "test@test.com",
  displayName: "test",
};

describe("Firebase utility test", () => {
  beforeAll(() => {
    InitFirebase();
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

  it("Create a new trip", async () => {
    expect.assertions(2);

    expect(
      CreateTripItem(currentUser, {
        tripName: "test trip",
        startDate: "04/Oct/2019",
        createDate: "04/Nov/2018",
      })
    ).resolves.toEqual(currentUser.uid);

    return expect(
      CreateTripItem(currentUser, {
        owner: currentUser.displayName,
      })
    ).resolves.toEqual(currentUser.uid);
  });
});
