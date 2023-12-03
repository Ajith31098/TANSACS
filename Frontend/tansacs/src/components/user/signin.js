import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import FormikControl from '../formcomponents/formcontrol'
import { Login, Register } from '../../redux'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { useMutation } from 'react-query'
import axios from 'axios'
import LoadingComponent from '../basecomponents/loading'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import DownloadButton from '../basecomponents/downloadButton'
import Ribbon from '../../logo/ribbon.png'
import '../../css/ribbon.css'

const initialvalues = {
    username: '',
    password: ''
}

const validationSchema = Yup.object({

    username: Yup.string().required("Enter Username").email("Invalid Username"),
    password: Yup.string().required("Enter Password")
})

async function loginUser(values) {
    const response = await axios.post('http://127.0.0.1:8000/login', values);
    return response.data;
}



function SignIn(props) {

    const navigate = useNavigate()

    const [loading, setLoading] = React.useState(false);


    const mutation = useMutation(loginUser)

    const onSubmit = (values, { setFieldError }) => {
        setLoading(true)

        setTimeout(() => {

            mutation.mutate(values, {


                onSuccess: (data) => {

                    setLoading(false)

                    console.log(data);
                    props.login(data)
                },
                onError: (error) => {

                    const errorData = error.response.data;
                    console.log(errorData);


                    if (errorData.username) {
                        setFieldError('username', errorData.username);
                    }
                    else if (errorData.password) {
                        setFieldError('password', errorData.password);
                    }

                    else if (!errorData.active) {
                        setLoading(false)
                        props.register(errorData)

                        navigate('/verify')

                    }

                    setLoading(false)


                },
            })


        }, 1000


        )

    };

    useEffect(() => {



        if (props.isSuperuser) {
            navigate('admin/home')
        }

        else if (props.isLogin) {
            navigate('tansacs/jobs')
        }

    }, [props.isLogin]);






    return (
        <>

            <img src={Ribbon} alt="Ribbon" className="ribbon lg:block hidden" style={{
                marginTop: "230px"
            }} />

            <div className="grid grid-cols-5 mt-5 gap-20 relative">

                {loading ? (<LoadingComponent />) : null}
                <div className="col-span-5 flex flex-col justify-center items-center">
                    <h4 className=' text-custom-red font-bold mb-7  lg:text-[50px] md:text-[40px] text-[35px]'>Tamil Nadu State AIDS Control Society</h4>
                    <h4 className=' font-normal lg:text-[33px] md:text-[25px] text-[20px]' style={{
                        textShadow: "#5a32325c 3px 3px 4px"
                    }}>TANSACS RECRUITMENT PORTAL</h4>
                    <p>{props.isLogin}</p>
                    <div className='lg:w-2/5 md:w-3/5 w-4/5 image_ribbon'>
                        <Formik
                            initialValues={initialvalues}
                            validationSchema={validationSchema}
                            onSubmit={onSubmit} >

                            {(formik) => (
                                <Form className='flex flex-col justify-center items-center mt-5'>

                                    <div className='w-2/3 mb-4'>
                                        <p className='text-custom-red font-bold mb-1 text-start'>Username</p>
                                        <FormikControl
                                            control='input'
                                            type='email'
                                            name='username'
                                            label="User Name"
                                            placeholder="Email Id"
                                        />

                                    </div>
                                    <div className='w-2/3 mb-4'>
                                        <p className='text-custom-red font-bold mb-1 text-start'>Password</p>
                                        <FormikControl
                                            control='password'
                                            type='password'
                                            name='password'
                                            label="password"
                                            placeholder="ENTER YOUR PASSWORD"

                                        />
                                    </div>


                                    <div className="w-2/3 flex justify-between gap-2 mt-5 items-center flex-wrap">
                                        <div className='w-max'>
                                            <button type='submit' className="px-[30px] py-[3px] block group relative  w-max overflow-hidden rounded-lg bg-custom-red text-sm font-semibold text-white" >Login
                                                <div className="absolute inset-0 h-full w-full scale-0 rounded-lg transition-all duration-300 group-hover:scale-100 group-hover:bg-white/30"></div>
                                            </button>
                                            {/* <a href="#" className="px-3 py-1 block group relative  w-full overflow-hidden rounded-lg bg-red-600 text-sm font-semibold text-white" >Login
                                                    <div className="absolute inset-0 h-full w-full scale-0 rounded-lg transition-all duration-300 group-hover:scale-100 group-hover:bg-white/30"></div>
                                                </a> */}
                                        </div>
                                        <div className='w-max'>
                                            <Link to={'/signup'} className="px-[30px] py-[3px] block group relative  w-full overflow-hidden rounded-lg bg-red-600 text-sm font-semibold text-white">
                                                Register
                                                <div className="absolute inset-0 h-full w-full scale-0 rounded-lg transition-all duration-300 group-hover:scale-100 group-hover:bg-white/30"></div>

                                            </Link>

                                        </div>
                                        <Link to={'/forgot'} className="text-custom-red font-semibold block text-sm underline mt-2">Forgot Password?</Link>

                                    </div>

                                </Form>
                            )}


                        </Formik>
                    </div>

                    <DownloadButton />
                    <p className='text-custom-red font-bold mb-3 font6'>Note:In  below TANSACS Job Posting Details are given please read before applying.</p>
                    <p className='font-semibold text-lg font6'>JOB POSTING WILL BE ALLOCATED PURELY BASED ON THE CRITERIA.</p>

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
        login: (data) => dispatch(Login(data)),
        register: (data) => dispatch(Register(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);