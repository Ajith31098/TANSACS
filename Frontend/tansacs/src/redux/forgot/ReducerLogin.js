import { CHANGEPASSWORD, RESETSTATUS } from "./TypeLogin"


const initialState = {
    approval: 0,
}

export const ReducerForgot = (state = initialState, action) => {
    switch (action.type) {

        case CHANGEPASSWORD: return {
            ...state,
            approval: action.data

        }

        case RESETSTATUS: return {
            ...initialState
        }

        default: return state
    }
}