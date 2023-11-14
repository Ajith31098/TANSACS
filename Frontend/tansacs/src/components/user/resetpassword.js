import React from 'react'
import {Formik , Form , Field , ErrorMessage} from 'formik'
import * as Yup from 'yup'
import FormikControl from '../formcomponents/formcontrol'


const initialValues = {

    password : '',
    confrim_password:''
}

const validationSchema =Yup.object({
    password : Yup.string().required("Enter Password"),
    confrim_password : Yup.string().oneOf([Yup.ref('password') , ''] , 'password not matched').required('Required'),

})

const onSubmit = values=> console.log('Form Data' ,  values)

function ResetPassword() {
    return ( 
        <>
        <div className='mt-5'>
            <h4 className='text-4xl text-red-600 font-bold mb-14'>Tamil Nadu State AIDS Control Society</h4>
            <p className='text-2xl mt-10 mb-5 font-semibold underline'>CREATE NEW PASSWORD</p>
        
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
                                <div className='lg:w-1/4 w-full'>
                                    <div className='mb-2'>
                                    <FormikControl
                                        control='password'
                                        type='text'
                                        name='password'
                                        label ="NEW PASSWORD"
                                        placeholder="NEW PASSWORD"
                                    />
                                        
                                        
                                    </div>
                                    <div className='mb-5'>
                                    <FormikControl
                                        control='password'
                                        type='text'
                                        name='confrim_password'
                                        label ="CONFRIM PASSWORD"
                                        placeholder="CONFRIM PASSWORD"
                                    />
                                        
                                    </div>

                                    <div className=" flex justify-around items-center my-10">
                                        <div className='w-max'>
                                            <a href="#" className="px-3 py-1 block group relative  w-full overflow-hidden rounded-lg bg-red-600 text-sm font-semibold text-white" >Login
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

export default ResetPassword;