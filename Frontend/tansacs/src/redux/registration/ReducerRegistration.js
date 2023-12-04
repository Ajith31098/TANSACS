import { REGISTER , VERIFIED } from "./TypeRegistration"

const initialState = {
    isRegister: false,
    email:'',
}

export const ReducerRegister = (state = initialState, action) => {
    switch (action.type) {

        case REGISTER: return {
            ...state,
            isRegister : true,
            email:action.data.email,

        }

        case VERIFIED: return {
            ...initialState
        }

       

        default: return state
    }
}