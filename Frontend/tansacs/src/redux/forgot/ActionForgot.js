import { CHANGEPASSWORD,RESETSTATUS } from "./TypeLogin" 


export const ChangePassword = ()=>{

    return {
        type:CHANGEPASSWORD,
    }

}

export const ResetStatus = ()=>{

    return {
        type:RESETSTATUS
    }

}