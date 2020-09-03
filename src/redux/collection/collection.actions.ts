import actionType from './collection.actionType';
import {action} from 'typesafe-actions';
import StateKeys from './collection.stateKeys';
import { IGenericState } from './collection.reducer';

export const SetCollectionData = <T>(key:StateKeys, object:IGenericState<T>)=>action(
    actionType.SET_COLLECTION_DATA,
    {key, object}
);

export const SetCollectionDataSuccessful = <T>(key:StateKeys, object:IGenericState<T>)=>action(
    actionType.SET_COLLECTION_DATA_SUCCESSFUL,
    {key, object}
);