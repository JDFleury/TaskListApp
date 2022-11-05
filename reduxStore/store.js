import { combineReducers, configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import user from './userSlice';

const combinedReducer = combineReducers({
    user
});

const middlewares = [];
if (process.env.NODE_ENV === 'development') {
    middlewares.push(logger);
}

export const store = configureStore({
    reducer: combinedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    }).concat(middlewares)
});