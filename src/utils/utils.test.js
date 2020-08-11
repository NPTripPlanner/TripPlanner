import { SearchObjectsInCollection } from "./utils";

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
    expect(
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
});
