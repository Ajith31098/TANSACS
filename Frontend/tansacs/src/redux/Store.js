import {createStore} from 'redux'
import { ReducerLogin } from './login/ReducerLogin'

const store = createStore(ReducerLogin)

export default store