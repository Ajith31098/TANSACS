import { CHANGEPASSWORD, RESETSTATUS } from "./TypeLogin"


export const ChangePassword = (data) => {

    return {
        type: CHANGEPASSWORD,
        data: data
    }

}

export const ResetStatus = () => {

    return {
        type: RESETSTATUS
    }

}