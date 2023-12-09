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
import { Verified, ResetStatus } from '../../redux'
import { useEffect } from 'react'

const initialValues = {

    password: '',
    confrim_password: ''
}

const validationSchema = Yup.object({
    password: Yup.string()
        .required("Enter Password")
        .min(8, 'Password is too short - should be 8 chars minimum.')
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).*$/,
            "Password must contain at least one capital,small and number."
        ),
    confrim_password: Yup.string().oneOf([Yup.ref('password'), ''], 'password does not match').required('Required'),

})






function ResetPassword(props) {






    const navigate = useNavigate()

    const [loading, setLoading] = React.useState(false);


    const mutation = useMutation(resetUser)


    async function resetUser(values) {
        try {
            const response = await axios.post(`http://127.0.0.1:8000/setpassword_user/${props.email}`, values);
            return response.data;

        } catch (error) {
            navigate('/server_error_500')
            throw error


        }
    }

    useEffect(() => {



        if (props.isSuperuser) {
            navigate('admin/home')
        }

        else if (props.isLogin) {
            navigate('tansacs/jobs')
        }



    }, [props.isLogin]);

    useEffect(() => {


        if (!(props.forgot === 2)) {
            navigate('/')

        }

    }, [])

    const onSubmit = (values, { setFieldError }) => {
        setLoading(true)

        setTimeout(() => {

            mutation.mutate(values, {


                onSuccess: (data) => {

                    setLoading(false)

                    props.Verified()
                    props.ResetStatus()
                    navigate('/')
                },
                onError: (error) => {

                    const errorData = error.response;
                    setLoading(false)
                    if (errorData.status == 404) {

                        setFieldError('password', "user not found");



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

            <div className='mt-5 flex flex-col justify-center items-center'>
                <h4 className='lg:text-[50px] md:text-[40px] text-[30px] text-custom-red font-bold mb-14'>Tamil Nadu State AIDS Control Society</h4>


                <div className='p-5 py-[30px] lg:w-2/5 md:w-3/5 w-4/5' style={{
                    boxShadow: "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px"
                }}>

                    <p className='g:text-[33px] md:text-[25px] text-[20px] mt-10 mb-5 font-semibold underline'>Set Up Your New Password</p>

                    <div className='mt-10'>

                        <Formik

                            initialValues={initialValues}
                            validationSchema={validationSchema}
                            onSubmit={onSubmit}

                        >
                            {
                                ({ values, handleChange, handleBlur, setFieldValue, touched, errors }) => (

                                    <Form
                                        className='flex justify-center'>
                                        <div className='lg:w-2/4 w-full'>
                                            <div className='mb-2'>
                                                <FormikControl
                                                    control='password'
                                                    type='text'
                                                    name='password'
                                                    label="NEW PASSWORD"
                                                    placeholder="NEW PASSWORD"
                                                />


                                            </div>
                                            <div className='mb-5'>
                                                <FormikControl
                                                    control='password'
                                                    type='text'
                                                    name='confrim_password'
                                                    label="CONFIRM PASSWORD"
                                                    placeholder="CONFIRM PASSWORD"
                                                />

                                            </div>

                                            <div className=" flex justify-around items-center my-10">
                                                <div className='w-max'>
                                                    <Link to={'/'} className="px-[30px] py-[3px]  block group relative  w-full overflow-hidden rounded-lg bg-custom-red text-sm font-semibold text-white">
                                                        Back
                                                        <div className="absolute inset-0 h-full w-full scale-0 rounded-lg transition-all duration-300 group-hover:scale-100 group-hover:bg-white/30"></div>

                                                    </Link>
                                                </div>
                                                <div className='w-max'>
                                                    <button type='submit' className="px-[25px] py-[3px] block group relative  w-full overflow-hidden rounded-lg bg-custom-red text-sm font-semibold text-white" >Enter
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
            </div>

        </>
    );
}


const mapStateToProps = state => {


    return {

        isLogin: state.login.isLogin,
        isSuperuser: state.login.is_superuser,

        isRegister: state.register.isRegister,
        forgot: state.forgot.approval,
        email: state.register.email,
    }
}

const mapDispatchToProps = dispatch => {

    return {
        Verified: (data) => dispatch(Verified(data)),
        ResetStatus: (data) => dispatch(ResetStatus(data)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword);