import actionType from "./collection.actionType";
import {all, call, put, take, actionChannel} from 'redux-saga/effects';
import { SetCollectionDataSuccessful } from "./collection.actions";

function* setCollectionData(){
    const colChan = yield actionChannel(actionType.SET_COLLECTION_DATA);

    while(true){
        const action = yield take(colChan);
        const {key, object} = action.payload;
        yield put(SetCollectionDataSuccessful(key, object));
    }
}

export default function* collectionSaga(){
    yield all([
        call(setCollectionData),
    ]);
}