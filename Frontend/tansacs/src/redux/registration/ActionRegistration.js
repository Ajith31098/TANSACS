import { REGISTER , VERIFIED  } from "./TypeRegistration";



export const Register = (data)=>{

    return {
        type:REGISTER,
        data:data

    }

}
export const Verified = ()=>{

    return {
        type:VERIFIED
    }

}
