import {combineReducers} from 'redux';

import TestReducer from './test/test.reducer';
import DialogReducer from './dialog/disalog.reducer';

const reducers = combineReducers({
    test:TestReducer,
    dialog:DialogReducer,
});

export default reducers;