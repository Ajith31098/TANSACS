import { LOGIN, LOGOUT } from "./TypeLogin"

const initialState = {
    isLogin: false,
    token:'',
    is_active:false,
    user_age:0
}

export const ReducerLogin = (state = initialState, action) => {
console.log(action);
    switch (action.type) {

        case LOGIN: return {
            ...state,
            isLogin: true,
            token:action.data.token,
            is_active:action.data.is_active,
            user_age:action.data.user_age

        }

        case LOGOUT: return {
            ...initialState
        }

        default: return state
    }
}