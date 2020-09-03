import { combineReducers } from "redux";

import UserReducer,{IUserState} from "./user/user.reducer";
import HeaderReducer,{IHeaderState} from './header/header.reducer';
import NotificationReducer,{INotificationState} from './notification/notification.reducer';
import ItineraryReducer,{IItinerayState} from './itinerary/itinerary.reducer';
import CollectionReducer,{ICollectionState} from './collection/collection.reducer';

export interface IRootReducerState {
  header: IHeaderState,
  notification: INotificationState,
  user: IUserState,
  itinerary: IItinerayState,
  collection: ICollectionState,
}

const reducers = combineReducers<IRootReducerState>({
  header: HeaderReducer,
  notification: NotificationReducer,
  user: UserReducer,
  itinerary: ItineraryReducer,
  collection: CollectionReducer,
});

export default reducers;
