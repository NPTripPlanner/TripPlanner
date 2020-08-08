import actionType from './trip_manager.actionType';

const initState = {
    fetchingTripItems: false,
    fetchTripItemsError: null,
    tripCollection:[],
};

const TripManagerReducer = (state = initState, action) => {

    switch(action.type){
        case action.FETCH_TRIP_ITEMS_START:
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
            }
        default:
            return state;
    }
}

export default TripManagerReducer;