import {
    createStore, 
    applyMiddleware,
} from 'redux';

import reducers from './Root-Reducer';

import logger from 'redux-logger';

const middlewares = [];

if(process.env.NODE_ENV === 'development'){
    middlewares.push(logger);
}

const store  = createStore(reducers, applyMiddleware(...middlewares));

export default store;