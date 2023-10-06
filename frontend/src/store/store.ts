import { compose, createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import { persistStore, persistReducer } from 'redux-persist';
import sessionStorage from 'redux-persist/lib/storage/session';

import { rootReducer } from './rootReducer';

const middlewares = [logger];

const persistConfig = {
    key: 'root',
    storage: sessionStorage,
    blacklist: ['user'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const composeEnhanceers = compose(applyMiddleware(...middlewares));

export const store = createStore(
    persistedReducer,
    undefined,
    composeEnhanceers
);

export const persistor = persistStore(store);
