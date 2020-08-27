import { combineReducers } from "redux";

import UserReducer,{IUserState} from "./user/user.reducer";
import TripArchiveReducer,{ITripArchiveState} from "./tripArchive/tripArchive.reducer";
import HeaderReducer,{IHeaderState} from './header/header.reducer';
import NotificationReducer,{INotificationState} from './notification/notification.reducer';

export interface IRootReducerState {
  header: IHeaderState,
  notification: INotificationState,
  user: IUserState,
  tripArchive: ITripArchiveState,
}

const reducers = combineReducers<IRootReducerState>({
  header: HeaderReducer,
  notification: NotificationReducer,
  user: UserReducer,
  tripArchive: TripArchiveReducer,
});

export default reducers;
