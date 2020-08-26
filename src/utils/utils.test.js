import { 
  SearchObjectsInCollection,
  SortArray,
} from "./utils";

describe("Utility test", () => {
  afterAll((done) => {
    done();
  });
  it("Search objects in collection by keyword", async () => {
    expect.assertions(3);

    const collection = [
      {
        tripName: "First trip",
      },
      {
        tripName: "Second trip",
      },
      {
        tripName: "second trip",
      },
      {
        tripName: "Third trip",
      },
    ];

    expect(
      SearchObjectsInCollection(collection, ["tripName"], "Second").length
    ).toEqual(2);
    expect(
      SearchObjectsInCollection(collection, ["tripName"], "Second").length
    ).not.toEqual(4);
    return expect(
      SearchObjectsInCollection(collection, ["tripName"], "Second")
    ).toEqual([
      {
        tripName: "Second trip",
      },
      {
        tripName: "second trip",
      },
    ]);
  });
  
  it('sort array', async ()=>{
    const fakeObjects = [
      {name:'i'},
      {name:'h'},
      {name:'g'},
      {name:'f'},
      {name:'e'},
      {name:'d'},
      {name:'c'},
      {name:'b'},
      {name:'a'},
    ];

    return expect(SortArray(fakeObjects, 'name').length).toEqual(fakeObjects.length);
  });
});
