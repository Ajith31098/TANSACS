import { OTPACCESS ,OTPSEND ,OTPFAIL} from "./TypeOtp";



export const otpaccess = ()=>{

    return {
        type:OTPACCESS

    }

}

export const otpsend = ()=>{

    return {
        type:OTPSEND
    }

}
export const otpfail = ()=>{

    return {
        type:OTPFAIL
    }

}