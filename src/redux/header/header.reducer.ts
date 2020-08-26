import actionType from "./header.actionType";
import { Reducer } from "redux";

export interface IHeaderState {
    title: string;
    titleError: Error | null;
}

const initState : IHeaderState ={
    title: '',
    titleError: null,
}

const headerReducer: Reducer<IHeaderState> = (state=initState, action)=>{
    switch(action.type){
        case actionType.CHANGE_HEADER_TITLE_SUCCESSFUL:{
            const {title} = action.payload;
            return {
                ...state,
                title: title,
                titleError: null,
            }
        }
        case actionType.CHANGE_HEADER_TITLE_FAIL:{
            const {error} = action.payload;
            return {
                ...state,
                titleError: error,
            }
        }
        default:
            return state;
    }
}

export default headerReducer;