import { combineReducers } from "redux";

import UserReducer,{IUserState} from "./user/user.reducer";
import TripArchiveReducer,{ITripArchiveState} from "./tripArchive/tripArchive.reducer";

export interface IRootReducerState {
  user: IUserState,
  tripArchive: ITripArchiveState,
}

const reducers = combineReducers<IRootReducerState>({
  user: UserReducer,
  tripArchive: TripArchiveReducer,
});

export default reducers;
