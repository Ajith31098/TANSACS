import {createStore} from 'redux'
// import { ReducerLogin } from './login/ReducerLogin'
import {rootReducer} from './rootReducer'

const store = createStore(rootReducer)

export default store