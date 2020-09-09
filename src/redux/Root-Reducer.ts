import { combineReducers } from "redux";

import UserReducer,{IUserState} from "./user/user.reducer";
import HeaderReducer,{IHeaderState} from './header/header.reducer';
import NotificationReducer,{INotificationState} from './notification/notification.reducer';
import ItineraryReducer,{IItinerayState} from './itinerary/itinerary.reducer';
import CollectionReducer,{ICollectionState} from './collection/collection.reducer';
import ScheduleReducer,{IScheduleState} from './schedule/schedule.reducer';

export interface IRootReducerState {
  header: IHeaderState,
  notification: INotificationState,
  user: IUserState,
  itinerary: IItinerayState,
  collection: ICollectionState,
  schedule: IScheduleState
}

const reducers = combineReducers<IRootReducerState>({
  header: HeaderReducer,
  notification: NotificationReducer,
  user: UserReducer,
  itinerary: ItineraryReducer,
  collection: CollectionReducer,
  schedule: ScheduleReducer,
});

export default reducers;
