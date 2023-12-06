import { LOGIN , LOGOUT ,EXP_AGE , UPDATEJOBS ,REMOVEEXP_AGE , ISPERMISSION ,CACELPERMISSION} from "./TypeLogin"


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
export const removeexp_age = ()=>{

    return {
        type:REMOVEEXP_AGE
    }

}
export const set_permission = ()=>{

    return {
        type:ISPERMISSION
    }

}
export const cacel_permission = ()=>{

    return {
        type:CACELPERMISSION
    }

}