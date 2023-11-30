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
import { Verified , ResetStatus } from '../../redux'
import { useEffect } from 'react'

const initialValues = {

    password : '',
    confrim_password:''
}

const validationSchema =Yup.object({
   password: Yup.string()
    .required("Enter Password")
    .min(8, 'Password is too short - should be 8 chars minimum.')
    .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).*$/,
        "Password must contain at least one capital,small and number."
    ),
    confrim_password : Yup.string().oneOf([Yup.ref('password') , ''] , 'password not matched').required('Required'),

})






function ResetPassword(props) {

    async function resetUser(values) {
        const response = await  axios.post(`http://127.0.0.1:8000/setpassword/${props.email}`, values);
        return response.data;
    }


    const navigate = useNavigate()

    const [loading, setLoading] = React.useState(false);


    const mutation = useMutation(resetUser)


    useEffect(() => {

        

        if(props.isSuperuser){
            navigate('admin/home')
        }

        else if(props.isLogin){
            navigate('tansacs/jobs')
        }

        else if(! props.forgot){
            navigate('/')

        }

       }, [props.isLogin]);

    const onSubmit = (values, { setFieldError }) => {
        setLoading(true)

        setTimeout(()=>{

            mutation.mutate(values, {

          
                onSuccess:(data)=>{

                        setLoading(false)

                        props.Verified()
                        props.ResetStatus()
                        navigate('/')
                },
                onError: (error) => {
                    
                    const errorData = error.response;
                    
                    console.log(errorData)
                    if (errorData.status == 404 ){
                    
                      setFieldError('password',"user not found");
                    
                        setLoading(false)

                    }

                  
                    

                  },
             })


        } , 2000

            
        )
            
       };

    return ( 
        <>
        <div className='mt-5'>
            <h4 className='text-4xl text-red-600 font-bold mb-14'>Tamil Nadu State AIDS Control Society</h4>
            <p className='text-2xl mt-10 mb-5 font-semibold underline'>CREATE NEW PASSWORD</p>
            <p>{props.email}</p>
        
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

        isRegister : state.register.isRegister,
        forgot : state.forgot.approval,
        email : state.register.email,
    }
}

const mapDispatchToProps = dispatch =>{

    return {
        Verified : (data)=> dispatch(Verified(data)),
        ResetStatus : (data)=> dispatch(ResetStatus(data)),
    }
}

export default connect(mapStateToProps,mapDispatchToProps) (ResetPassword);