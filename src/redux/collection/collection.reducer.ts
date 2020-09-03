import actionType from "./collection.actionType";
import { Reducer } from "redux";
import { TripArchive, Itinerary } from "../../schema/firestore.schema";
import StateKeys from './collection.stateKeys';

export interface IGenericState<T>{
    fetchingData: boolean;
    fetchDataError: Error|null;
    dataArray: Array<T>|null;
    moreData: boolean;
    creatingData: string | null;
    createDataError: Error | null;
    createDataSuccessful: boolean;
    deletingData: string | null;
    deleteDataError: Error | null;
    deleteDataSuccessful: boolean;
    updatingData: string | null;
    updateDataError: Error | null;
    updateDataSuccessful: boolean;
    resetCreateState: <T>(state:IGenericState<T>)=>IGenericState<T>;
    resetDeleteState: <T>(state:IGenericState<T>)=>IGenericState<T>;
    resetUpdateState: <T>(state:IGenericState<T>)=>IGenericState<T>;
    getInitSate: <T>()=>IGenericState<T>;
}

export interface ICollectionState{
    [StateKeys.TRIP_ARCHIVE]:IGenericState<TripArchive>;
    [StateKeys.ITINERARY]:IGenericState<Itinerary>;
}

export const getInitialState = <T>():IGenericState<T>=>({
    fetchingData: false,
    fetchDataError: null,
    dataArray: Array<T>(),
    moreData: false,
    creatingData: null,
    createDataError: null,
    createDataSuccessful: false,
    deletingData: null,
    deleteDataError: null,
    deleteDataSuccessful: false,
    updatingData: null,
    updateDataError: null,
    updateDataSuccessful: false,
    resetCreateState: <T>(state:IGenericState<T>)=>{
        state.creatingData = null;
        state.createDataError = null;
        state.createDataSuccessful = false;
        return {...state};
    },
    resetDeleteState: <T>(state:IGenericState<T>)=>{
        state.deletingData = null;
        state.deleteDataError = null;
        state.deleteDataSuccessful = false;
        return {...state};
    },
    resetUpdateState: <T>(state:IGenericState<T>)=>{
        state.updatingData = null;
        state.updateDataError = null;
        state.updateDataSuccessful = false;
        return {...state};
    },
    getInitSate: <T>()=>{
        return getInitialState<T>();
    }
});

const initState = {
    [StateKeys.TRIP_ARCHIVE]:getInitialState<TripArchive>(),
    [StateKeys.ITINERARY]:getInitialState<Itinerary>(),
}

const collectionReducer: Reducer<ICollectionState> = (state=initState, action)=>{
    switch(action.type){
        case actionType.SET_COLLECTION_DATA_SUCCESSFUL:{
            const {key, object} = action.payload;
            return {
                ...state,
                [key]: {...object},
            }
        }
        default:{
            return state;
        }
    }
}

export default collectionReducer;