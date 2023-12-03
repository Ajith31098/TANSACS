// import React, { useEffect , useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { connect } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useMutation } from 'react-query'
import { Verified } from '../../redux'
import React, { useState, useRef, useEffect } from 'react';


// const initialValues = {

//     otp:''

// }

// const validationSchema =Yup.object({
//     otp :Yup.number().typeError("Invalid OTP").required('Enter OTP').positive('Invalid OTP', (val) => val && val.toString().length === 4),

// })


async function loginUser(values) {
    const response = await axios.post('http://127.0.0.1:8000/verified', values);
    return response.data;
}


function VerifyOTP(props) {


    const navigate = useNavigate()
    const mutation = useMutation(loginUser)

    const [otps, setOtps] = useState(0)
    const [otp, setOtp] = useState(['', '', '', '']);
    const [error, seterror] = useState(false)

    useEffect(() => {
        inputRefs[0]?.current?.focus();
    }, []);

    const handleChange = (e, index) => {
        const value = e.target.value;
        if (isNaN(value)) return; //
        const updatedOtp = [...otp];
        updatedOtp[index] = value;
        setOtp(updatedOtp);

        if (value !== '' && index < otp.length - 1) {
            inputRefs[index + 1]?.current?.focus();
        }
    };


    const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];
    const sendotp = async () => {

        try {
            const formData = new FormData();
            formData.append('email', props.email);

            const response = await axios.post('http://127.0.0.1:8000/send-otp', formData);
            const receivedOTP = response.data.otp; // Extract OTP from response
            setOtps(receivedOTP);
        } catch (error) {
            console.error('Error sending OTP:', error);
            // Handle error, show error message, etc.
        }
    }


    const [timer, setTimer] = useState(300);
    const [disableInput, setDisableInput] = useState(false);
    let interval
    const startTimer = () => {
        interval = setInterval(() => {
            setTimer(prevTime => {
                if (prevTime > 0) {
                    return prevTime - 1;
                } else {
                    clearInterval(interval);
                    setDisableInput(true); // Disable input when timer reaches 0
                    return 0;
                }
            });
        }, 1000);
    };



    useEffect(() => {

        if (!props.isSuperuser && !props.isLogin && (props.isRegister || props.forgot)) {
            startTimer();
            sendotp()
            console.log("hi");
        }

        if (props.isSuperuser) {
            navigate('admin/home')
        }

        else if (props.isLogin) {
            navigate('tansacs/jobs')
        }

        else if (!(props.isRegister || props.forgot)) {
            navigate('/')
        }

    }, [props.isLogin]);

    const redirectLogin = () => {

        props.verified()

        navigate('/');
    }


    const handleResendClick = () => {
        // Reset timer to initial value
        if (timer == 0) {
            setTimer(300);
            startTimer()
        }
        else {
            setTimer(300);
        }
        setDisableInput(false);
        sendotp()// Enable input field
    };

    const onSubmit = (event) => {
        console.log('enter');
        event.preventDefault();
        const otpValue = otp.join('');
        console.log(otpValue, otps);
        if (otps == parseInt(otpValue)) {

            if (props.forgot) {

                navigate('/reset')
            }

            const formData = new FormData()
            formData.append('email', props.email)
            mutation.mutate(formData, {


                onSuccess: (data) => {
                    props.verified()
                    navigate('/', { replace: true })
                },
                onError: (error) => {

                    console.error(error)

                },
            })


        }
        else {
            seterror(true)
            console.log('enter');
        }
    }


    return (
        <>

            <div className="flex flex-col justify-center items-center">
                <div className='mt-3'>
                    <h4 className='lg:text-[50px] md:text-[40px] text-[30px] text-custom-red font-bold mb-7'>Tamil Nadu State AIDS Control Society</h4>

                </div>

                <div className='p-5 py-[30px] lg:w-2/5 md:w-3/5 w-4/5' style={{
                    boxShadow: "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px"
                }}>
                    <p className='lg:text-[33px] md:text-[25px] text-[20px] mt-10 mb-5 font-semibold underline'>OTP VERIFICATION</p>

                    <p className='text-custom-red text-sm mt-10 mt-5 mb-5 font-semibold underline'>Please enter the OTP sent to your registered Email-ID</p>


                    <div className='mt-10'>


                        <form onSubmit={onSubmit}>

                            <div>
                                {error && <p className='text-custom-red font-bold mb-3'>Worng OTP</p>}
                            </div>

                            <div className="flex gap-2 justify-center items-center">
                                {otp.map((digit, index) => (
                                    <input
                                        key={index}
                                        ref={inputRefs[index]}
                                        type="text"
                                        className="bg-rose-200 border text-dark border-rose-600 text-center  text-sm rounded-lg focus:ring-0  focus:border-red-500 h-12 w-12 px-2.5 py-2 "
                                        maxLength="1"
                                        value={digit}
                                        onChange={(e) => handleChange(e, index)}
                                        disabled={disableInput}
                                    />
                                ))}
                            </div>

                            <div className='my-5'>
                                <p className='text-sm'>Didn't receive OTP? <small className='text-custom-red text-sm'>{Math.floor(timer / 60)}:{timer % 60}</small></p>
                            </div>

                            <div className="flex justify-center items-center gap-5 mb-[30px]">
                                <div className='w-max'>
                                    <button
                                        type='button'
                                        className='px-[15px] py-[3px] block group relative w-full overflow-hidden rounded-lg bg-custom-red text-sm font-semibold text-white'
                                        onClick={redirectLogin} // Handle resend click
                                    >
                                        Cancel
                                    </button>
                                </div>
                                <div className='w-max'>
                                    <button
                                        type='button'
                                        className='px-[25px] py-[3px] block group relative w-full overflow-hidden rounded-lg bg-custom-red text-sm font-semibold text-white'
                                        onClick={handleResendClick} // Handle resend click
                                    >
                                        Resend
                                    </button>
                                </div>
                                <div className='w-max'>
                                    <button type='submit' className="px-[25px] py-[3px] block group relative  w-max overflow-hidden rounded-lg bg-custom-red text-sm font-semibold text-white" >Enter
                                        <div className="absolute inset-0 h-full w-full scale-0 rounded-lg transition-all duration-300 group-hover:scale-100 group-hover:bg-white/30"></div>
                                    </button>

                                </div>
                            </div>
                        </form>

                    </div>


                </div>
            </div>
        </>
    );
}

const mapStateToProps = state => {


    return {

        isRegister: state.register.isRegister,
        email: state.register.email,
        forgot: state.forgot.approval

    }
}


const mapDispatchToProps = dispatch => {

    return {
        verified: () => dispatch(Verified())
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(VerifyOTP);