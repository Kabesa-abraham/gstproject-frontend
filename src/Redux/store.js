import {configureStore,combineReducers} from '@reduxjs/toolkit';
import userReducer from './user/userSlice.js'
import {persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage';
import persistStore from 'redux-persist/es/persistStore';

const combineReducer = combineReducers({
    user:userReducer
})

const persistConfig= {
    key:'root',
    storage,
    vesion:1
}

const persistReducers = persistReducer(persistConfig, combineReducer)

export const store = configureStore({
    reducer:persistReducers,
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware({serializableCheck: false}),
})

export const persistor = persistStore(store);