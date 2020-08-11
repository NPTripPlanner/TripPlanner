import store from "../Store";
import { setMessageSaga } from "./test.saga";
import { expectSaga } from "redux-saga-test-plan";

describe("Redux saga test", () => {
  afterAll((done)=>{
    done();
  });
  it("set message saga", async () => {
    return expectSaga(setMessageSaga)
      .put({ type: "SET_MESSAGE", payload: "This is from saga" })
      .dispatch({ type: "SET_MESSAGE", payload: "This is from saga" })
      .run();
  });
});
