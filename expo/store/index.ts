import { createStore, applyMiddleware, Store } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { rootReducer } from './rootReducer';
import { jwt } from './middleware';

export default function capaStore(): Store {
    return createStore(rootReducer, applyMiddleware(jwt, thunk, logger));
}
