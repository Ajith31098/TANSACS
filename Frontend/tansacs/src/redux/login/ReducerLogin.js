import { LOGIN, LOGOUT ,EXP_AGE , UPDATEJOBS ,REMOVEEXP_AGE , ISPERMISSION , CACELPERMISSION} from "./TypeLogin"

const initialState = {
    isLogin: false,
    token:'',
    is_active:false,
    user_age:0,
    exp_user_age:false,
    is_superuser:false,
    job:0,
    is_permission:false
}


export const ReducerLogin = (state = initialState, action) => {
    switch (action.type) {

        case LOGIN: return {
            ...state,
            isLogin: true,
            token:action.data.token,
            is_active:action.data.is_active,
            user_age:action.data.user_age,
            is_superuser:action.data.is_superuser,
            job:action.data.jobs,
        }

        case LOGOUT: return {
            ...initialState
        }

        case EXP_AGE:return {
            ...state,
            exp_user_age : true
        }

        case UPDATEJOBS:return{
            ...state,
            job:state.job+1
        }

        case REMOVEEXP_AGE:return {

            ...state ,
            exp_user_age :false
        }

        case ISPERMISSION:return{

            ...state , 
            is_permission:true
        }

        case CACELPERMISSION:return{

            ...state , 
            is_permission:false
        }

        default: return state
    }
}