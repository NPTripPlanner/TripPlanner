import { createSelector } from "reselect";
import {IRootReducerState} from '../Root-Reducer';

const selectHeader = (state:IRootReducerState) => state.header;

export const selectHeaderTitle = createSelector(
    [selectHeader],

    (header)=>(header.title)
);

export const selectHeaderError = createSelector(
    [selectHeader],

    (header)=>(header.titleError?header.titleError.message:null)
);