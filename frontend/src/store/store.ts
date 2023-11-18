import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import { persistStore, persistReducer } from 'redux-persist';
import sessionStorage from 'redux-persist/es/storage/session';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { AnyAction } from '@reduxjs/toolkit';
import { rootReducer } from './rootReducer';

import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

const persistConfig = {
    key: 'root',
    storage: sessionStorage,
    whitelist: ['user'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    devTools: process.env.NODE_ENV !== 'production',
    middleware: [logger],
});

export interface AppThunkAction<TAction> {
    (dispatch: (action: TAction) => void, getState: () => RootState): void;
}

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
type DispatchFunc = () => AppDispatch;
export const useAppDispatch: DispatchFunc = () => useDispatch<ThunkDispatch<RootState, unknown, AnyAction>>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);
