import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import { persistStore, persistReducer } from 'redux-persist';
import sessionStorage from 'redux-persist/lib/storage/session';
import createSagaMiddleware from '@redux-saga/core';

import { rootReducer } from './rootReducer';

const sagaMiddleware = createSagaMiddleware();
const middlewares = [logger, sagaMiddleware];

const persistConfig = {
    key: 'root',
    storage: sessionStorage,
    blacklist: ['user'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    devTools: process.env.NODE_ENV !== 'production',
    middleware: middlewares,
});

export const persistor = persistStore(store);
