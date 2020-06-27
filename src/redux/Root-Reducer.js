import {combineReducers} from 'redux';

import TestReducer from './test/test.reducer';
import DialogReducer from './dialog/disalog.reducer';
import UserReducer from './user/user.reducer';

const reducers = combineReducers({
    test:TestReducer,
    dialog:DialogReducer,
    user:UserReducer,
});

export default reducers;