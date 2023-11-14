import React from 'react'
import {Formik , Form , Field , ErrorMessage} from 'formik'
import FormikControl from '../formcomponents/formcontrol'

import * as Yup from 'yup'
import DateView from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'



const addressSchema = Yup.object().shape({
    line1: Yup.string().required('Line 1 is required'),
    line2: Yup.string(),
    state: Yup.string().required('State is required'),
    district: Yup.string().required('District is required'),
    city: Yup.string().required('City is required'),
    pincode: Yup.number().typeError("Enter valid Pin Code").required('Required').positive('Enter valid Pin Code').test('len', 'Enter valid Pin Code', (val) => val && val.toString().length === 6),
  });

const validationSchema = Yup.object({
    profile: Yup.mixed().required('Required'),//.test('fileSize', 'File too large', value => {
        //   return value && value.size <= 5000000;
        // }),

    userfirstname : Yup.string().required("Required"),
    userlastname : Yup.string().required("Required"),
    gender : Yup.string().required("Required"),
    dob : Yup.date().required("Required"),
    age :Yup.number().typeError("Invalid Age").required('Required').positive('Invalid Age').test('age limit', 'Enter valid Age', (val) => val && val <= 100),
    aadhaar :Yup.number().typeError("Invalid Aadhaar Number").required('Required').positive('Invalid Aadhaar Number').test('len', 'Enter valid Phone number', (val) => val && val.toString().length === 12),
    email : Yup.string().required("Required").email(),
    confrim_email : Yup.string().oneOf([Yup.ref('email') , ''] , 'email not matched').required('Required'),
    fathername : Yup.string().required("Required"),
    fatherlastname : Yup.string().required("Required"),
    phonenumber :Yup.number().typeError("Enter valid Phone number").required('Required').positive('Enter valid Phone number').test('len', 'Enter valid Phone number', (val) => val && val.toString().length === 10),
    secondaryphonenumber : Yup.number().typeError("Enter valid Phone number").required('Required').positive('Enter valid Phone number').test('len', 'Enter valid Phone number', (val) => val && val.toString().length === 10),
    password : Yup.string().required("Enter Password"),
    confrim_password : Yup.string().oneOf([Yup.ref('password') , ''] , 'password not matched').required('Required'),

    address: addressSchema,
    permanent_address: addressSchema,



})

const initialvalues ={
    profile:'',
    userfirstname:'',
    userlastname:'',
    gender:'',
    dob:null,
    age:'',
    aadhaar:'',
    email:"",
    confrim_email:'',
    fathername:'',
    fatherlastname:'',
    phonenumber:'',
    secondaryphonenumber:'',
    password:'',
    confrim_password:'',
    address:{ 
        line1:'',
        line2:'',
        state:'',
        district:'',
        city:'',
        pincode:''

    },
    permanent_address:{ 
        line1:'',
        line2:'',
        state:'',
        district:'',
        city:'',
        pincode:''

    },
}

const genderOptions =[
    {key : 'Gender' , value:'' },
    { key: 'Male', value: 'male' },
    { key: 'Female', value: 'female' },
]
const stateOptions =[
    {key : 'State' , value:'' },
    { key: 'State1', value: 'State1' },
    { key: 'State2', value: 'State2' },
]
const districtOptions =[
    {key : 'District' , value:'' },
    { key: 'District1', value: 'District1' },
    { key: 'District2', value: 'District2' },
]


const onSubmit = values=> console.log('Form Data' ,  values)

console.log();
function Signup() {
    return ( 
        <>
        <div className='mt-5 mb-14'>
        <h4 className='text-4xl text-red-600 font-bold '>Tamil Nadu State AIDS Control Society</h4>

        
        </div>
        <div className='mt-10 border rounded-lg py-5 px-10'>

            <h4 className='text-2xl font-semibold'>REGISTRATION FORM</h4>
            <Formik
                initialValues={ initialvalues}
                validationSchema={validationSchema}
                onSubmit = {onSubmit}
            >

            {({ values, handleChange, handleBlur,setFieldValue, touched, errors }) => (
                
                
                <Form>
                    <div className='flex justify-end p-2'>
                        <div className='flex flex-col items-center'>
                            <div className='flex flex-col items-center  border-2 border-gray-400 p-2 border-solid '>
                                <img className='w-20 h-20 object-cover' 
                                src={values.profile ? URL.createObjectURL(values.profile) : "https://imgs.search.brave.com/oB6fgT45DC10B0RQfk3kTBtZ0W-2p7udZUxPnfvKT3M/rs:fit:860:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzA0LzYyLzkzLzY2/LzM2MF9GXzQ2Mjkz/NjY4OV9CcEVFY3hm/Z011WVBmVGFJQU9D/MXRDRHVybXNubzdT/cC5qcGc"}
                                 alt="profile"  id ="profile_image" />

                                <Field
                                    id="profile"
                                    name="profile"
                                    type="file"
                                    onChange={(event) => {
                                        setFieldValue("profile", event.target.files[0]);
                                    }}
                                    className= "w-0 h-0"
                                    value=''
                                            
                                />

                                <label htmlFor="profile">
                                    <p className='text-sm font-semibold'>
                                        upload a photo
                                    </p>
                                    {values.profile && <p className='mt-2 text-sm'>{values.profile.name}</p>}
                                    {touched.profile && errors.profile ? <p  className='text-red-600 text-sm text-center font-bold'>{errors.profile}</p> : null}
                                    
                                </label>

                            </div>
                            
                        </div>
                    </div>
                    
                    <div className="grid grid-cols-2 mb-3 gap-10 border border-black border-solid rounded p-2">

                        <div className='grid grid-cols-4 lg:col-span-1 col-span-2 gap-y-4 gap-x-10'>
                            <div className="col-span-3">
                                    <FormikControl
                                        control='input'
                                        type='text'
                                        name='userfirstname'
                                        label ="NAME OF APPPLICANT"
                                        placeholder="NAME OF APPPLICANT"
                                    />
                               
                            </div>
                            <div className="col-span-1">
                                    <FormikControl
                                        control='input'
                                        type='text'
                                        name='userlastname'
                                        label ="INITIALS"
                                        placeholder="INITIALS"
                                    />
                                
                            </div>
                            <div className="col-span-1">
                                <FormikControl
                                        control='select'
                                        type='select'
                                        name='gender'
                                        options={genderOptions}
                                />
                                
                            </div>
                            
                            <div className="col-span-1">
                                <Field
                                        name="dob"
                                        placeholder ="DOB"
                                >
                                {
                                    ({form,field})=>{
                                        const {setFieldValue} = form
                                        const {value} = field
                                        // console.log(form , field , errors.dob);
                                        return <DateView
                                        name= 'dob'
                                        {...field}
                                        placeholderText='DOB'
                                        selected={value}
                                        
                                        showIcon
                                        className= {touched.dob && errors.dob ? ' border border shadow-md py-1 px-2 border-red-400 w-full rounded text-sm focus:outline-none focus:border-sky-400' : ' border border shadow-md py-1 px-2 text-sm border-gray-400 w-full rounded focus:outline-none focus:border-sky-400'}
                                        
                                        onChange={val=> setFieldValue('dob' , val)}
                                        />
                                    }

                                }
                                </Field>
                                <div>
                                    <p className='text-red-600 text-sm text-start font-bold'>

                                        <ErrorMessage name='dob'/>

                                    </p>

                                </div>
                            </div>
                            <div className="col-span-1">
                                    <FormikControl
                                        control='input'
                                        type='text'
                                        name='age'
                                        label ="AGE"
                                        placeholder="AGE"
                                    />
                            </div>

                            <div className="col-span-4">
                                    <FormikControl
                                        control='input'
                                        type='text'
                                        name='aadhaar'
                                        label ="AADHAAR CARD"
                                        placeholder="AADHAAR CARD"
                                    />
                                
                            </div>
                            <div className="col-span-4">
                                    <FormikControl
                                        control='input'
                                        type='text'
                                        name='email'
                                        label ="EMAIL"
                                        placeholder="EMAIL"
                                    />
                                
                            </div>
                            <div className="col-span-4">
                                    <FormikControl
                                        control='input'
                                        type='text'
                                        name='confrim_email'
                                        label ="CONFRIM EMAIL"
                                        placeholder="CONFRIM EMAIL"
                                    />
                                
                            </div>
                            
                        </div>
                        <div className='grid grid-cols-4 lg:col-span-1 col-span-2 gap-y-4 gap-x-10'>
                            <div className="col-span-3">
                                    <FormikControl
                                        control='input'
                                        type='text'
                                        name='fathername'
                                        label ="FATHER NAME"
                                        placeholder="FATHER NAME"
                                    />
                                
                            </div>
                            <div className="col-span-1">
                                    <FormikControl
                                        control='input'
                                        type='text'
                                        name='fatherlastname'
                                        label ="INITIALS"
                                        placeholder="INITIALS"
                                    />
                                
                            </div>
                          

                            <div className="col-span-3">
                                    <FormikControl
                                        control='input'
                                        type='text'
                                        name='phonenumber'
                                        label ="PHONE NUMBER"
                                        placeholder="PHONE NUMBER"
                                    />
                                
                            </div>
                            <div className="col-span-3">
                                    <FormikControl
                                        control='input'
                                        type='text'
                                        name='secondaryphonenumber'
                                        label ="EMERGENCY PHONE NUMBER"
                                        placeholder="EMERGENCY PHONE NUMBER"
                                    />
                                
                            </div>
                            <div className="col-span-3">
                                    <FormikControl
                                        control='password'
                                        type='text'
                                        name='password'
                                        label ="PASSWORD"
                                        placeholder="PASSWORD"
                                    />
                                
                            </div>
                            <div className="col-span-3">
                                    <FormikControl
                                        control='password'
                                        type='text'
                                        name='confrim_password'
                                        label ="CONFRIM PASSWORD"
                                        placeholder="CONFRIM PASSWORD"
                                    />
                                
                            </div>
                            
                        </div>



                    </div>

                    <p className='text-red-600 mb-2 text-start font-bold underline'>Address</p>
                    <div className="grid grid-cols-5 mb-3 gap-y-4 gap-x-10 border border-black border-solid rounded p-2">

                            <div className="lg:col-span-3 col-span-5 lg:order-1">
                                    <FormikControl
                                        control='input'
                                        type='text'
                                        name='address.line1'
                                        label ="LINE 1"
                                        placeholder="LINE 1"
                                    />
                                
                            </div>

                            <div className="lg:col-span-1 col-span-5 lg:order-2 order-last">
                                    <FormikControl
                                        control='select'
                                        type='select'
                                        name='address.state'
                                        options={stateOptions}
                                    />
                                    
                                
                            </div>
                            <div className="lg:col-span-1 col-span-5 lg:order-3 order-last">
                                    <FormikControl
                                        control='select'
                                        type='select'
                                        name='address.district'
                                        options={districtOptions}
                                    />
                                
                            </div>

                            <div className="lg:col-span-3 col-span-5 lg:order-4">
                                    <FormikControl
                                        control='input'
                                        type='text'
                                        name='address.line2'
                                        label ="LINE 2"
                                        placeholder="LINE 2"
                                    />
                                
                            </div>

                            <div className="lg:col-span-1 col-span-5 lg:order-5">
                                    <FormikControl
                                        control='input'
                                        type='text'
                                        name='address.city'
                                        label ="TOWN/VILLAGE/CITY"
                                        placeholder="TOWN/VILLAGE/CITY"
                                    />
                                
                            </div>
                            <div className="lg:col-span-1 col-span-5 lg:order-6">
                                    <FormikControl
                                        control='input'
                                        type='text'
                                        name='address.pincode'
                                        label ="PINCODE"
                                        placeholder="PINCODE"
                                    />
                                
                            </div>
                           
                            
                        



                    </div>

                    <p className='text-red-600 mb-2 text-start font-bold underline'>Permanent Address</p>
                    <div className="grid grid-cols-5 mb-3 gap-y-4 gap-x-10 border border-black border-solid rounded p-2">

                            <div className="lg:col-span-3 col-span-5 lg:order-1">
                                    <FormikControl
                                        control='input'
                                        type='text'
                                        name='permanent_address.line1'
                                        label ="LINE 1"
                                        placeholder="LINE 1"
                                    />
                                
                            </div>

                            <div className="lg:col-span-1 col-span-5 lg:order-2 order-last">
                                    <FormikControl
                                        control='select'
                                        type='select'
                                        name='permanent_address.state'
                                        options={stateOptions}
                                    />
                                
                            </div>
                            <div className="lg:col-span-1 col-span-5 lg:order-3 order-last">
                                    <FormikControl
                                        control='select'
                                        type='select'
                                        name='permanent_address.district'
                                        options={districtOptions}
                                    />
                               
                            </div>

                            <div className="lg:col-span-3 col-span-5 lg:order-4">
                                    <FormikControl
                                        control='input'
                                        type='text'
                                        name='permanent_address.line2'
                                        label ="LINE 2"
                                        placeholder="LINE 2"
                                    />
                                
                            </div>

                            <div className="lg:col-span-1 col-span-5 lg:order-5">
                                    <FormikControl
                                        control='input'
                                        type='text'
                                        name='permanent_address.city'
                                        label ="TOWN/VILLAGE/CITY"
                                        placeholder="TOWN/VILLAGE/CITY"
                                    />
                               
                            </div>
                            <div className="lg:col-span-1 col-span-5 lg:order-6">
                                    <FormikControl
                                        control='input'
                                        type='text'
                                        name='permanent_address.pincode'
                                        label ="PINCODE"
                                        placeholder="PINCODE"
                                    />
                                
                            </div>
                           
                            
                        



                    </div>

                    <div className=" flex justify-around items-center">
                        <div className='w-max'>
                            <a href="#" className="px-3 py-1 block group relative  w-full overflow-hidden rounded-lg bg-red-600 text-sm font-semibold text-white" >Login
                            <div className="absolute inset-0 h-full w-full scale-0 rounded-lg transition-all duration-300 group-hover:scale-100 group-hover:bg-white/30"></div>
                            </a>
                        </div>
                        <div className='w-max'>
                            <button type='submit' className="px-3 py-1 block group relative  w-full overflow-hidden rounded-lg bg-red-600 text-sm font-semibold text-white" >Register
                            <div className="absolute inset-0 h-full w-full scale-0 rounded-lg transition-all duration-300 group-hover:scale-100 group-hover:bg-white/30"></div>
                            </button>
                        </div>

                    </div>
                </Form>


            )}
                     

            </Formik>
            
        

        </div>
        </>
     );
}

export default Signup;