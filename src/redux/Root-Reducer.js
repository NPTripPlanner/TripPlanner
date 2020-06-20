import {combineReducers} from 'redux';

import TestReducer from './test/test.reducer';

const reducers = combineReducers({
    test:TestReducer
});

export default reducers;