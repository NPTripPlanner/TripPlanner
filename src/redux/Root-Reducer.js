import { combineReducers } from "redux";

import TestReducer from "./test/test.reducer";
import UserReducer from "./user/user.reducer";
import TripManagerReducer from "./trip_manager/trip_manager.reducer";

const reducers = combineReducers({
  test: TestReducer,
  user: UserReducer,
  tripManager: TripManagerReducer,
});

export default reducers;
