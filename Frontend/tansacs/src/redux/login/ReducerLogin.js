import { LOGIN, LOGOUT ,EXP_AGE} from "./TypeLogin"

const initialState = {
    isLogin: false,
    token:'',
    is_active:false,
    user_age:0,
    exp_user_age:false,
}

export const ReducerLogin = (state = initialState, action) => {
    switch (action.type) {

        case LOGIN: return {
            ...state,
            isLogin: true,
            token:action.data.token,
            is_active:action.data.is_active,
            user_age:action.data.user_age,
            is_superuser:action.data.is_superuser

        }

        case LOGOUT: return {
            ...initialState
        }

        case EXP_AGE:return {
            ...state,
            exp_user_age : true
        }

        default: return state
    }
}