import actionType from "./tripArchive.actionType";
import {TripArchive} from '../../schema/firestore.schema';
import { Reducer } from "redux";

export interface ITripArchiveState {
  fetchingTripArchives: boolean,
  fetchingTripArchivesError: Error | null,
  tripArchives: Array<TripArchive>,
  moreTripArchives: boolean,
  creatingTripArchive: string | null,
  createTripArchiveError: Error | null,
  createTripArchiveSuccessful: boolean,
  deletingTripArchive: string | null,
  deleteTripArchiveError: Error | null,
  deleteTripArchiveSuccessful: boolean,
  updatingTripArchive: boolean,
  updateTripArchiveError: Error | null,
}

const initState : ITripArchiveState = {
  fetchingTripArchives: false,
  fetchingTripArchivesError: null,
  tripArchives:[],
  moreTripArchives: false,
  creatingTripArchive: null,
  createTripArchiveError: null,
  createTripArchiveSuccessful: false,
  deletingTripArchive: null,
  deleteTripArchiveError: null,
  deleteTripArchiveSuccessful: false,
  updatingTripArchive: false,
  updateTripArchiveError: null,
};

const TripArchiveReducer : Reducer<ITripArchiveState> = (state = initState, action) => {
  switch (action.type) {
    case actionType.FETCH_TRIP_ARCHIVES_START:{
      const {fromStart} = action.payload;
      return {
        ...state,
        fetchingTripArchives: true,
        fetchingTripArchivesError: null,
        tripArchives: fromStart?[]:state.tripArchives,
        moreTripArchives: false,
      }
    }
    case actionType.FETCH_TRIP_ARCHIVES_SUCCESSFUL:{
      const {tripArchiveData, fromStart}  = action.payload;
      const archives = fromStart?tripArchiveData:state.tripArchives.concat(tripArchiveData);
      const moreArchives = tripArchiveData.length?true:false; 
      return{
        ...state,
        fetchingTripArchives: false,
        fetchingTripArchivesError: null,
        tripArchives: archives,
        moreTripArchives: moreArchives,
      }
    }
    case actionType.FETCH_TRIP_ARCHIVES_FAIL:{
      const {error} = action.payload;
      return {
        ...state,
        fetchingTripArchives: false,
        fetchingTripArchivesError: error,
      }
    }
    case actionType.CREATE_TRIP_ARCHIVE_START:{
      const {tripArchiveName} = action.payload;
      return {
        ...state,
        creatingTripArchive: tripArchiveName,
        createTripArchiveError: null,
        createTripArchiveSuccessful: false,
      }
    }
    case actionType.CREATE_TRIP_ARCHIVE_SUCCESSFUL:{
      const {tripArchive} = action.payload;
      return {
        ...state,
        creatingTripArchive: null,
        createTripArchiveError: null,
        createTripArchiveSuccessful: true,
        tripArchives:[tripArchive, ...state.tripArchives],
      }
    }
    case actionType.CREATE_TRIP_ARCHIVE_FAIL:{
      const {error} = action.payload;
      return {
        ...state,
        creatingTripArchive: null,
        createTripArchiveError: error,
        createTripArchiveSuccessful: false,
      }
    }
    case actionType.CREATE_TRIP_ARCHIVE_RESET_SUCCESSFUL:{
      return {
        ...state,
        creatingTripArchive: null,
        createTripArchiveError: null,
        createTripArchiveSuccessful: false,
      }
    }
    case actionType.DELETE_TRIP_ARCHIVE_START:{
      const {tripArchiveName} = action.payload
      return {
        ...state,
        deletingTripArchive: tripArchiveName,
        deleteTripArchiveError: null,
      }
    }
    case actionType.DELETE_TRIP_ARCHIVE_FAIL:{
      const {error} = action.payload;
      return {
        ...state,
        deletingTripArchive: null,
        deleteTripArchiveError: error,
      } 
    }
    case actionType.DELETE_TRIP_ARCHIVE_SUCCESSFUL:{
      const {tripArchiveId} = action.payload;
      const newTripArchives = state.tripArchives.filter(archive=>{
        return archive.id!==tripArchiveId;
      });
      return {
        ...state,
        tripArchives: newTripArchives,
        deletingTripArchive: null,
        deleteTripArchiveError: null,
        deleteTripArchiveSuccessful: true,
      }
    }
    case actionType.DELETE_TRIP_ARCHIVE_RESET_SUCCESSFUL:{
      return {
        ...state,
        deletingTripArchive: null,
        deleteTripArchiveError: null,
        deleteTripArchiveSuccessful: false,
      }
    }
    case actionType.UPDATE_TRIP_ARCHIVE_NAME_FAIL:{
      const {error} = action.payload;
      return {
        ...state,
        updatingTripArchive: false,
        updateTripArchiveError: error,
      }
    }
    case actionType.UPDATE_TRIP_ARCHIVE_NAME_SUCCESSFUL:{
      const {tripArchive} = action.payload;
      const newTripArchives = state.tripArchives.map<TripArchive>(archive=>{
        return archive.id === tripArchive.id ? tripArchive : archive;
      });
      return{
        ...state,
        updatingTripArchive: true,
        updateTripArchiveError: null,
        tripArchives: newTripArchives,
      }
    }
    case actionType.UPDATE_TRIP_ARCHIVE_NAME_STATE_RESET_SUCCESSFUL:{
      return {
        ...state,
        updatingTripArchive: false,
        updateTripArchiveError: null,
      }
    }
    case actionType.CLEAR_TRIP_ARCHIVE_SUCCESSFUL:{
      return {
        ...state,
        tripArchives:[],
      }
    }
    default:
      return state;
  }
};

export default TripArchiveReducer;
