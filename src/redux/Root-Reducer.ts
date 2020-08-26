import { combineReducers } from "redux";

import UserReducer,{IUserState} from "./user/user.reducer";
import TripArchiveReducer,{ITripArchiveState} from "./tripArchive/tripArchive.reducer";
import HeaderReducer,{IHeaderState} from './header/header.reducer';

export interface IRootReducerState {
  header: IHeaderState,
  user: IUserState,
  tripArchive: ITripArchiveState,
}

const reducers = combineReducers<IRootReducerState>({
  header: HeaderReducer,
  user: UserReducer,
  tripArchive: TripArchiveReducer,
});

export default reducers;
