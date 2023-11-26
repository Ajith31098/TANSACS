import { LOGIN , LOGOUT } from "./TypeLogin"


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