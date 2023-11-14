import React from 'react'
import {Formik , Form , Field , ErrorMessage} from 'formik'
import * as Yup from 'yup'


const initialValues = {

    otp:''
}

const validationSchema =Yup.object({
    otp :Yup.number().typeError("Invalid OTP").required('Enter OTP').positive('Invalid OTP', (val) => val && val.toString().length === 4),

})

const onSubmit = values=> console.log('Form Data' ,  values)

function VerifyOTP() {
    return ( 
        <>
        <div className='mt-3'>
            <h4 className='text-4xl text-red-600 font-bold mb-5'>Tamil Nadu State AIDS Control Society</h4>
            <p className='text-2xl mt-10 mb-5 font-semibold underline'>VERIFICATION OTP</p>
        
        </div>
        <p className='text-red-600 text-sm mt-10 mt-10 mb-5 font-semibold underline'>Please enter the otp send to +9187******87</p>

        <div>

        </div>
        <div className='mt-10'>

            <Formik
            
                initialValues={ initialValues}
                validationSchema={validationSchema}
                onSubmit = {onSubmit}

            >
                    {
                       ({ values, handleChange, handleBlur,setFieldValue, touched, errors })=>(

                            <Form
                            className='flex justify-center'>
                                <div className='lg:w-1/5 w-full'>
                                    
                                    <div className='mb-5'>
                                        <Field
                                            id="otp"
                                            name="otp"
                                            type="text"
                                            className= {touched.otp && errors.otp ? 'text-center text-xl border border-2 py-1 px-2 border-red-400 w-full rounded text-sm focus:outline-none focus:border-sky-400' : 'text-xl text-center border border-2 py-1 px-2 text-sm border-gray-400 w-full rounded focus:outline-none focus:border-sky-400'}
                                            placeholder =" X X X X"
                                        />
                                        <div>
                                            <p className='text-red-600 text-sm text-start font-bold'>

                                                <ErrorMessage name='otp'/>

                                            </p>

                                        </div>
                                    </div>

                                    <div className='my-5'>
                                        <p className='text-sm'>Did'nt recieve OTP <small className='text-red-600'>2.30</small></p>
                                    </div>

                                    <div className="mt-10 flex justify-around items-center">
                                        <div className='w-max'>
                                            <a href="#" className="px-3 py-1 block group relative  w-full overflow-hidden rounded-lg bg-red-600 text-sm font-semibold text-white" >Cancel
                                            <div className="absolute inset-0 h-full w-full scale-0 rounded-lg transition-all duration-300 group-hover:scale-100 group-hover:bg-white/30"></div>
                                            </a>
                                        </div>
                                        <div className='w-max'>
                                            <a href="#" className="px-3 py-1 block group relative  w-full overflow-hidden rounded-lg bg-red-600 text-sm font-semibold text-white" >Resend
                                            <div className="absolute inset-0 h-full w-full scale-0 rounded-lg transition-all duration-300 group-hover:scale-100 group-hover:bg-white/30"></div>
                                            </a>
                                        </div>
                                        <div className='w-max'>
                                            <a href="#" className="px-3 py-1 block group relative  w-full overflow-hidden rounded-lg bg-red-600 text-sm font-semibold text-white" >Enter
                                            <div className="absolute inset-0 h-full w-full scale-0 rounded-lg transition-all duration-300 group-hover:scale-100 group-hover:bg-white/30"></div>
                                            </a>
                                        </div>

                                    </div>
                                </div>

                                
                            </Form>
                            
                       )
                    }
                
            </Formik>

           


        </div>
        </>
     );
}

export default VerifyOTP;