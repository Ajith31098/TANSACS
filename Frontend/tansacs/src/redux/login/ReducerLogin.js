import { LOGIN, LOGOUT } from "./TypeLogin"

const initialState = {
    isLogin: true
}

export const ReducerLogin = (state = initialState, action) => {

    switch (action.type) {

        case LOGIN: return {
            ...state,
            isLogin: true
        }

        case LOGOUT: return {
            ...state,
            isLogin: false
        }

        default: return state
    }
}