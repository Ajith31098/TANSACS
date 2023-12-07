import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import FormikControl from '../formcomponents/formcontrol'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useMutation } from 'react-query'
import { useNavigate } from 'react-router-dom'
import LoadingComponent from '../basecomponents/loading'
import { connect } from 'react-redux'
import { Register, ChangePassword } from '../../redux'
import { useEffect } from 'react'

const initialValues = {

    username: '',
    // number:''
}

const validationSchema = Yup.object({
    username: Yup.string().required("Required").email("Invalid Email"),
    // number :Yup.number().typeError("Enter valid Phone number").required('Required').positive('Enter valid Phone number').test('len', 'Enter valid Phone number', (val) => val && val.toString().length === 10),

})


async function forgotUser(values) {
    const response = await axios.post('http://127.0.0.1:8000/forgot', values);
    return response.data;
}


function ForgotPassword(props) {


    const navigate = useNavigate()

    const [loading, setLoading] = React.useState(false);


    const mutation = useMutation(forgotUser)


    useEffect(() => {



        if (props.isSuperuser) {
            navigate('admin/home')
        }

        else if (props.isLogin) {
            navigate('tansacs/jobs')
        }

    }, [props.isLogin]);

    const onSubmit = (values, { setFieldError }) => {
        setLoading(true)

        setTimeout(() => {

            mutation.mutate(values, {


                onSuccess: (data) => {

                    setLoading(false)

                    props.Register(data)
                    props.ChangePassword(1)
                    navigate('/verify')
                },
                onError: (error) => {

                    const errorData = error.response;

                    console.log(errorData)
                    if (errorData.status == 400) {
                        if (errorData.data.username) {
                            setFieldError('username', errorData.data.username);
                        }
                        // if (errorData.data.number) {
                        //   setFieldError('number', errorData.data.number);
                        // }
                        setLoading(false)

                    }

                    else {
                        navigate('/server_error_500')
                    }



                },
            })


        }, 2000


        )

    };
    return (
        <>
            {loading ? <LoadingComponent /> : null}
            <div className='mt-5'>
                <h4 className='lg:text-[50px] md:text-[40px] text-[35px] text-custom-red font-bold mb-14 mt-10'>Tamil Nadu State AIDS Control Society</h4>

            </div>
            <div className='mt-0 flex justify-center items-center w-full'>
                <div className='lg:w-1/3 md:w-2/3 w-4/5 shadow-md p-10'>
                    <p className='text-2xl mt-10 mb-10 font-semibold underline '>Enter your Registered Email ID</p>

                    <Formik

                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={onSubmit}

                    >
                        {
                            ({ values, handleChange, handleBlur, setFieldValue, touched, errors }) => (

                                <Form
                                    className='flex justify-center'>
                                    <div className=' w-full'>
                                        <div className='mb-2'>
                                            <FormikControl
                                                control='input'
                                                type='email'
                                                name='username'
                                                label="User Name"
                                                placeholder="Email ID"
                                            />


                                        </div>
                                        {/* <div className='mb-5'>
                                        <FormikControl
                                            control='input'
                                            type='text'
                                            name='number'
                                            label ="Register Number"
                                            placeholder="NUMBER"
                                        />
                                            
                                        </div> */}

                                        <div className=" flex justify-between items-center my-10">
                                            <div className='w-max'>
                                                <Link to={'/'} className="px-[30px] py-[3px]  block group relative  w-full overflow-hidden rounded-lg bg-red-400 text-sm font-semibold text-white">
                                                    Back
                                                    <div className="absolute inset-0 h-full w-full scale-0 rounded-lg transition-all duration-300 group-hover:scale-100 group-hover:bg-white/30"></div>

                                                </Link>
                                            </div>
                                            <div className='w-max'>
                                                <button type='submit' className="px-[30px] py-[3px]  block group relative  w-full overflow-hidden rounded-lg bg-red-600 text-sm font-semibold text-white" >Enter
                                                    <div className="absolute inset-0 h-full w-full scale-0 rounded-lg transition-all duration-300 group-hover:scale-100 group-hover:bg-white/30"></div>
                                                </button>
                                            </div>

                                        </div>
                                    </div>


                                </Form>

                            )
                        }

                    </Formik>

                </div>


            </div>
        </>
    );
}


const mapStateToProps = state => {


    return {

        isLogin: state.login.isLogin,
        isSuperuser: state.login.is_superuser,

    }
}

const mapDispatchToProps = dispatch => {

    return {
        Register: (data) => dispatch(Register(data)),
        ChangePassword: (data) => dispatch(ChangePassword(data)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);