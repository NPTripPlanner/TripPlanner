import { combineReducers } from "redux";

import TestReducer from "./test/test.reducer";
import UserReducer from "./user/user.reducer";
import TripManagerReducer from "./tripArchive/tripArchive.reducer";

const reducers = combineReducers({
  test: TestReducer,
  user: UserReducer,
  tripManager: TripManagerReducer,
});

export default reducers;
