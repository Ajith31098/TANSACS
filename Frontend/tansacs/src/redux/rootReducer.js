import { combineReducers } from "redux";

import { persistReducer } from 'redux-persist';

import storage from 'redux-persist/lib/storage';

import { ReducerLogin } from "./login/ReducerLogin";

import { ReducerRegister } from "./registration/ReducerRegistration";

import { ReducerForgot } from "./forgot/ReducerLogin";


const persistConfig = {
    key: 'root', // key for the storage
    storage, // storage type (defaults to localStorage for web)
    // whitelist: ['ReducerLogin', 'ReducerRegister'], // Array of reducers to persist
    // blacklist: ['reducerToExclude'], // Array of reducers to exclude from persisting
  };


const persistedReducer = persistReducer(persistConfig, combineReducers({

    login : ReducerLogin ,
    register : ReducerRegister,
    forgot : ReducerForgot
}));

export default persistedReducer;

// export default rootReducer;