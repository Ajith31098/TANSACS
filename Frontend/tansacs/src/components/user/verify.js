import React, { useEffect , useState } from 'react'
import {Formik , Form , Field , ErrorMessage} from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import {connect} from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {useMutation } from 'react-query'
import { Verified } from '../../redux'


const initialValues = {

    otp:''

}

const validationSchema =Yup.object({
    otp :Yup.number().typeError("Invalid OTP").required('Enter OTP').positive('Invalid OTP', (val) => val && val.toString().length === 4),

})


async function loginUser(values) {
    const response = await  axios.post('http://127.0.0.1:8000/verified', values);
    return response.data;
}


function VerifyOTP(props) {
    const navigate = useNavigate()
    const mutation = useMutation(loginUser)

    const [otp , setOtp ] = useState(0)

    const sendotp = async () =>  {
        
        try {
            const formData = new FormData();
            formData.append('email', props.email);
        
            const response = await axios.post('http://127.0.0.1:8000/send-otp', formData);
            const receivedOTP = response.data.otp; // Extract OTP from response
            setOtp(receivedOTP);
          } catch (error) {
            console.error('Error sending OTP:', error);
            // Handle error, show error message, etc.
          }
    }


    const [timer, setTimer] = useState(150); 
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

        if( ! props.isSuperuser && !props.isLogin && (props.isRegister || props.forgot)){
            startTimer();
            sendotp()
            console.log("hi");
        }

        if(props.isSuperuser){
            navigate('admin/home')
        }

        else if(props.isLogin){
            navigate('tansacs/jobs')
        }

        else if (!(props.isRegister || props.forgot)){
            navigate('/')
        }

       }, [props.isLogin]);

      const redirectLogin = ()=>{

        props.verified()

        navigate('/');
      }


      const handleResendClick = () => {
         // Reset timer to initial value
        if (timer == 0){
            setTimer(150);
            startTimer()
        }
        else{
            setTimer(150);
        }
        setDisableInput(false); 
        sendotp()// Enable input field
      };

        const onSubmit = (values ,{ setFieldError })=> {

            if (otp == values.otp){

                if(props.forgot){

                    navigate('/reset')
                }

                const formData = new FormData()
                formData.append('email' , props.email)
                mutation.mutate(formData, {

          
                    onSuccess:(data)=>{
                        props.verified()
                        navigate('/',{replace:true})
                    },
                    onError: (error) => {
                        
                        console.error(error)
    
                      },
                 })

                
            }
            else{
                setFieldError('otp' , 'worng otp')
            }
        }


    return ( 
        <>
        
        <div className='mt-3'>
            <h4 className='text-4xl text-red-600 font-bold mb-5'>Tamil Nadu State AIDS Control Society</h4>
            <p className='text-2xl mt-10 mb-5 font-semibold underline'>VERIFICATION OTP</p>
        
        </div>
        <p className='text-red-600 text-sm mt-10 mt-10 mb-5 font-semibold underline'>Please enter the otp send to +9187******87</p>

        <div>
            <h1>{props.email}</h1>

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
                                            disabled={disableInput}
                                        />
                                        <div>
                                            <p className='text-red-600 text-sm text-start font-bold'>

                                                <ErrorMessage name='otp'/>

                                            </p>

                                        </div>
                                    </div>
                                    <div className='my-5'>
                                        <p className='text-sm'>Did'nt recieve OTP <small className='text-red-600'>{Math.floor(timer / 60)}:{timer % 60}</small></p>
                                    </div>

                                    <div className="mt-10 flex justify-around items-center">
                                        <div className='w-max'>
                                            <button
                                                type='button'
                                                className='px-3 py-1 block group relative w-full overflow-hidden rounded-lg bg-red-600 text-sm font-semibold text-white'
                                                onClick={redirectLogin} // Handle resend click
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                        <div className='w-max'>
                                            <button
                                                type='button'
                                                className='px-3 py-1 block group relative w-full overflow-hidden rounded-lg bg-red-600 text-sm font-semibold text-white'
                                                onClick={handleResendClick} // Handle resend click
                                            >
                                                Resend
                                            </button>
                                            </div>
                                        <div className='w-max'>
                                            <button type='submit' className="px-4 py-1 block group relative  w-max overflow-hidden rounded-lg bg-red-600 text-sm font-semibold text-white" >Enter
                                                <div className="absolute inset-0 h-full w-full scale-0 rounded-lg transition-all duration-300 group-hover:scale-100 group-hover:bg-white/30"></div>
                                            </button>
                                            {/* <a href="#" className="px-3 py-1 block group relative  w-full overflow-hidden rounded-lg bg-red-600 text-sm font-semibold text-white" >Enter
                                            <div className="absolute inset-0 h-full w-full scale-0 rounded-lg transition-all duration-300 group-hover:scale-100 group-hover:bg-white/30"></div>
                                            </a> */}
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

        isRegister : state.register.isRegister,
        email : state.register.email,
        forgot : state.forgot.approval
        
    }
}


const mapDispatchToProps = dispatch =>{

    return {
        verified : ()=> dispatch(Verified())
    }
}



export default  connect(mapStateToProps,mapDispatchToProps)  (VerifyOTP);