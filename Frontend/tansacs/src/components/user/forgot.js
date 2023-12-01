import React from 'react'
import {Formik , Form , Field , ErrorMessage} from 'formik'
import * as Yup from 'yup'
import FormikControl from '../formcomponents/formcontrol'
import {Link} from 'react-router-dom'
import axios from 'axios'
import {useMutation } from 'react-query'
import { useNavigate } from 'react-router-dom'
import LoadingComponent from '../basecomponents/loading'
import {connect} from 'react-redux'
import { Register , ChangePassword } from '../../redux'
import { useEffect } from 'react'

const initialValues = {

    username : '',
    // number:''
}

const validationSchema =Yup.object({
    username : Yup.string().required("Required").email("Invalid Email"),
    // number :Yup.number().typeError("Enter valid Phone number").required('Required').positive('Enter valid Phone number').test('len', 'Enter valid Phone number', (val) => val && val.toString().length === 10),

})


async function forgotUser(values) {
    const response = await  axios.post('http://127.0.0.1:8000/forgot', values);
    return response.data;
}


function ForgotPassword(props) {


    const navigate = useNavigate()

    const [loading, setLoading] = React.useState(false);


    const mutation = useMutation(forgotUser)


    useEffect(() => {

        

        if(props.isSuperuser){
            navigate('admin/home')
        }

        else if(props.isLogin){
            navigate('tansacs/jobs')
        }

       }, [props.isLogin]);

    const onSubmit = (values, { setFieldError }) => {
        setLoading(true)

        setTimeout(()=>{

            mutation.mutate(values, {

          
                onSuccess:(data)=>{

                        setLoading(false)

                        props.Register(data)
                        props.ChangePassword()
                        navigate('/verify')
                },
                onError: (error) => {
                    
                    const errorData = error.response;
                    
                    console.log(errorData)
                    if (errorData.status == 400 ){
                    if (errorData.data.username) {
                      setFieldError('username', errorData.data.username);
                    }
                    // if (errorData.data.number) {
                    //   setFieldError('number', errorData.data.number);
                    // }
                        setLoading(false)

                    }

                    else{
                        navigate('/server_error_500')
                    } 

                    

                  },
             })


        } , 2000

            
        )
            
       };
    return ( 
        <>
        {loading ? <LoadingComponent/> : null}
        <div className='mt-5'>
            <h4 className='text-4xl text-red-600 font-bold mb-14'>Tamil Nadu State AIDS Control Society</h4>
            <p className='text-2xl mt-10 mb-5 font-semibold underline'>ENTER YOUR EMAIL</p>
        
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
                                        control='input'
                                        type='text'
                                        name='username'
                                        label ="User Name"
                                        placeholder="G-MAIL"
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

                                    <div className=" flex justify-around items-center my-10">
                                        <div className='w-max'>
                                            <a href="#" className="px-3 py-1 block group relative  w-full overflow-hidden rounded-lg bg-red-600 text-sm font-semibold text-white" >Login
                                            <div className="absolute inset-0 h-full w-full scale-0 rounded-lg transition-all duration-300 group-hover:scale-100 group-hover:bg-white/30"></div>
                                            </a>
                                        </div>
                                        <div className='w-max'>
                                            <button type='submit' className="px-3 py-1 block group relative  w-full overflow-hidden rounded-lg bg-red-600 text-sm font-semibold text-white" >Enter
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
        </>
     );
}


const mapStateToProps =  state =>{


    return {

        isLogin : state.login.isLogin,
        isSuperuser:state.login.is_superuser,

    }
}

const mapDispatchToProps = dispatch =>{

    return {
        Register : (data)=> dispatch(Register(data)),
        ChangePassword : ()=> dispatch(ChangePassword()),
    }
}

export default connect(mapStateToProps,mapDispatchToProps)  (ForgotPassword);