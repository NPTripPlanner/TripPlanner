import actionType from './trip_manager.actionType';

const initState = {
    fetchingTripItems: false,
    fetchTripItemsError: null,
    tripCollection:[],
    searchingTripItems: false,
    filterCollection:[]
};

const TripManagerReducer = (state = initState, action) => {

    switch(action.type){
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
            }
        default:
            return state;
    }
}

export default TripManagerReducer;