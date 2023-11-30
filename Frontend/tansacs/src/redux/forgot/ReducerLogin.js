import { CHANGEPASSWORD,RESETSTATUS } from "./TypeLogin" 


const initialState = {
    approval : false,
}

export const ReducerForgot = (state = initialState, action) => {
    switch (action.type) {

        case CHANGEPASSWORD: return {
            ...state,
            approval : true

        }

        case RESETSTATUS: return {
            ...initialState
        }

        default: return state
    }
}