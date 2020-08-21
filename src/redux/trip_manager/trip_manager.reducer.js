import actionType from "./trip_manager.actionType";

const initState = {
  fetchingTripArchives: false,
  fetchingTripArchivesError: null,
  tripArchives:[],
  moreTripArchives: false,

  ///////////////////To be removed////////////////////////
  fetchingTripItems: false,
  fetchTripItemsError: null,
  tripCollection: [],
  searchingTripItems: false,
  filterCollection: [],
};

const TripManagerReducer = (state = initState, action) => {
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

    ////////////////////////////////To be removed///////////////////////////
    case actionType.FETCH_TRIP_ITEMS_START:
      return {
        ...state,
        fetchingTripItems: true,
        fetchTripItemsError: null,
        tripCollection: [],
      };
    case actionType.FETCH_TRIP_ITEMS_SUCCESSFUL:
      return {
        ...state,
        fetchingTripItems: false,
        fetchTripItemsError: null,
        tripCollection: action.payload,
      };
    case actionType.FETCH_TRIP_ITEMS_FAIL:
      return {
        ...state,
        fetchingTripItems: false,
        fetchTripItemsError: action.payload,
      };
    case actionType.SEARCH_TRIP_ITEMS_START:
      return {
        ...state,
        searchingTripItems: true,
        filterCollection: [],
      };
    case actionType.SEARCH_TRIP_ITEMS_SUCCESSFUL:
      return {
        ...state,
        searchingTripItems: false,
        filterCollection: action.payload,
      };
    ////////////////////////////////To be removed///////////////////////////
    default:
      return state;
  }
};

export default TripManagerReducer;
