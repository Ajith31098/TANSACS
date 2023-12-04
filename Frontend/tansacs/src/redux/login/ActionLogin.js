import { LOGIN , LOGOUT ,EXP_AGE , UPDATEJOBS} from "./TypeLogin"


export const Login = (data)=>{

    return {
        type:LOGIN,
        data:data
    }

}

export const Logout = ()=>{

    return {
        type:LOGOUT
    }

}


export const exp_age = ()=>{

    return {
        type:EXP_AGE
    }

}


export const update_jobs = ()=>{

    return {
        type:UPDATEJOBS
    }

}