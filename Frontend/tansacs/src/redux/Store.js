import {createStore} from 'redux'
// import { ReducerLogin } from './login/ReducerLogin'
import persistedReducer from './rootReducer'
import { persistStore } from 'redux-persist';

// const store = createStore(persistedReducer)
export const store = createStore(persistedReducer);
export const persistor = persistStore(store);