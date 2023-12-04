import { OTPSEND , OTPFAIL , OTPACCESS } from "./TypeOtp"

const initialState = {
    otp:false,
    otp_access:false
}

export const Reducerotp = (state = initialState, action) => {
    switch (action.type) {

        case OTPSEND: return {
            ...state,
            otp:true,
            otp_access:false,

        }
        case OTPACCESS: return {
            ...state,
            otp_access:true,
            
        }

        case OTPFAIL: return {
            ...state,
            otp:false,
            otp_access:false,
        }

       

        default: return state
    }
}