import { combineReducers } from "redux";

import { ReducerLogin } from "./login/ReducerLogin";

import { ReducerRegister } from "./registration/ReducerRegistration";


export const rootReducer = combineReducers({

    login : ReducerLogin ,
    register : ReducerRegister
})

// export default rootReducer;