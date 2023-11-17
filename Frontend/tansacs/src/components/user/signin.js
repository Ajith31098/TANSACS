import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import FormikControl from '../formcomponents/formcontrol'


const initialvalues = {
    username: '',
    password: ''
}

const validationSchema = Yup.object({

    username: Yup.string().required("Enter Username").email("Invalid Username"),
    password: Yup.string().required("Enter Password")
})


const onSubmit = values => console.log('Form Data', values)

function SignIn() {


    return (
        <>
            <div className="grid grid-cols-5 mt-5 gap-20">

                <div className="col-span-5 flex flex-col justify-center items-center">
                    <h4 className='text-5xl text-red-600 font-bold mb-14'>Tamil Nadu State AIDS Control Society</h4>
                    <h4 className='text-2xl font-semibold'>TANSACS RECRUITMENT PROTAL</h4>
                    <div className='w-2/5'>
                        <Formik
                            initialValues={initialvalues}
                            validationSchema={validationSchema}
                            onSubmit={onSubmit} >

                            {(formik) => (
                                <Form className='flex flex-col justify-center items-center mt-5'>

                                    <div className='w-2/3 mb-4'>
                                        <p className='text-red-600 font-bold mb-1 text-start'>User Name</p>
                                        <FormikControl
                                            control='input'
                                            type='text'
                                            name='username'
                                            label="User Name"
                                            placeholder="Email Id"
                                        />

                                    </div>
                                    <div className='w-2/3 mb-4'>
                                        <p className='text-red-600 font-bold mb-1 text-start'>Password</p>
                                        <FormikControl
                                            control='password'
                                            type='password'
                                            name='password'
                                            label="password"
                                            placeholder="Password"

                                        />
                                    </div>


                                    <div className="w-2/3 flex justify-between items-center">
                                        <div className='w-max'>
                                            <a href="#" className="px-3 py-1 block group relative  w-full overflow-hidden rounded-lg bg-red-600 text-sm font-semibold text-white" >Login
                                                <div className="absolute inset-0 h-full w-full scale-0 rounded-lg transition-all duration-300 group-hover:scale-100 group-hover:bg-white/30"></div>
                                            </a>
                                        </div>
                                        <div className='w-max'>
                                            <a href="#" className="px-3 py-1 block group relative  w-full overflow-hidden rounded-lg bg-red-600 text-sm font-semibold text-white" >Register
                                                <div className="absolute inset-0 h-full w-full scale-0 rounded-lg transition-all duration-300 group-hover:scale-100 group-hover:bg-white/30"></div>
                                            </a>
                                        </div>
                                        <a href="#" className="text-red-600 font-semibold block text-sm underline mt-2">forgot password?</a>

                                    </div>

                                </Form>
                            )}


                        </Formik>
                    </div>

                    <a href="#" className='text-red-600 font-semibold text-xl my-5 underline'>TANSACS Recruitment Eligibility Criteria.pdf</a>

                    <p className='text-red-600 font-bold mb-3 text-xs'>Note:In  below TANSACS Job Posting Details are given please read before apply</p>
                    <p className='font-semibold text-lg'>JOB POSTING WILL BE ALLOCATED PURELY BASED ON THE CRITERIA</p>

                </div>
            </div>

        </>
    );
}

export default SignIn;