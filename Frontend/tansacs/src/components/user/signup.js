import React from 'react'
import { Formik, Form, Field, ErrorMessage, replace } from 'formik'
import FormikControl from '../formcomponents/formcontrol'


import * as Yup from 'yup'
import DateView from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import axios from 'axios'
import { useMutation } from 'react-query'


import { format, parseISO } from 'date-fns';
import { Register } from '../../redux'
import { connect } from 'react-redux'

import LoadingComponent from '../basecomponents/loading'
import { Link } from 'react-router-dom'
import { district } from '../initialValues/InitialDropdown'
import calender from '../../logo/icon-8.png'
import '../../css/login.css'

const addressSchema = Yup.object().shape({
    address_line1: Yup.string().required('Line 1 is required'),
    address_line2: Yup.string(),
    state: Yup.string().required('State is required'),
    district: Yup.string().required('District is required'),
    city: Yup.string().required('City is required'),
    pincode: Yup.number().typeError("Enter valid Pin Code")
        .required('Required')
        .positive('Enter valid Pin Code')
        .test('len', 'Enter valid Pin Code', (val) => val && val.toString().length === 6),
});

const validationSchema = Yup.object({
    profile_image: Yup.mixed()
        .required('Required')
        .test(
            'fileType',
            'Only JPEG , JPG files are allowed',
            value => {
                if (!value) return false; // If no file is provided, return false
                const fileType = value.type;
                return fileType === 'image/jpeg' || fileType === 'image/jpg';
            }
        )
        .test(
            'fileSize',
            'File too large, should be less than 100KB',
            value => value && value.size <= 100000 // 100KB in bytes
        ),
    first_name: Yup.string().required("Required").matches(/^[A-Za-z ]+$/, "Invalid Data"),
    last_name: Yup.string().matches(/^[A-Za-z ]+$/, "Invalid Data"),
    gender: Yup.string().required("Required"),
    age: Yup.number().typeError("Invalid Age")
        .required('Required')
        .positive('Invalid Age')
        .test('age limit', 'Enter valid Age', (val) => val && val <= 100),
    aadhar: Yup.string()
        .required('Required')
        .matches(/^\d{12}$/, 'Invalid Aadhaar Number format') // Ensure exactly 12 digits, no spaces
        .test(
            'len',
            'Aadhaar number must be exactly 12 digits',
            val => val && val.length === 12 // Check if the length is exactly 12
        ),
    email: Yup.string().required("Required").email(),
    confrim_email: Yup.string().oneOf([Yup.ref('email'), ''], 'email not matched').required('Required'),
    guardian_name: Yup.string().required("Required").matches(/^[A-Za-z ]+$/, "Invalid Data"),
    guardian_name_initial: Yup.string().matches(/^[A-Za-z ]+$/, "Invalid Data"),
    DOB: Yup.string().required('required'),
    phone_number: Yup.number().typeError("Enter valid Phone number")
        .required('Required')
        .positive('Enter valid Phone number')
        .test('len', 'Enter valid Phone number', (val) => val && val.toString().length === 10),
    alternate_phone_number: Yup.number().typeError("Enter valid Phone number")
        .required('Required')
        .positive('Enter valid Phone number')
        .test('len', 'Enter valid Phone number', (val) => val && val.toString().length === 10),
    password: Yup.string()
        .required("Enter Password")
        .min(8, 'Password is too short - should be 8 chars minimum.')
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).*$/,
            "Password must contain at least one capital,small and number."
        ),

    confrim_password: Yup.string()
        .oneOf([Yup.ref('password'), ''], 'Password not matched')
        .required('Required'),
    address: Yup.array().of(addressSchema).required('Address is required'),
    permanent_address: Yup.array().of(addressSchema).required('Permanent address is required'),
});

const initialvalues = {
    profile_image: '',
    first_name: '',
    last_name: '',
    gender: '',
    DOB: null,
    age: '',
    aadhar: '',
    email: "",
    confrim_email: '',
    guardian_name: '',
    guardian_name_initial: '',
    phone_number: '',
    alternate_phone_number: '',
    password: '',
    confrim_password: '',

    address: [{

        address_line1: '',
        address_line2: '',
        state: '',
        district: '',
        city: '',
        pincode: '',
        address_type: 'communication'

    }],
    permanent_address: [{
        address_line1: '',
        address_line2: '',
        state: '',
        district: '',
        city: '',
        pincode: '',
        address_type: 'permanent'


    }],
}

const genderOptions = [
    { key: 'GENDER', value: '' },
    { key: 'MALE', value: 'male' },
    { key: 'FEMALE', value: 'female' },
    { key: 'OTHERS', value: 'others' },

]
const stateOptions = [
    { key: 'STATE', value: '' },
    { key: 'Tamil Nadu', value: 'Tamil Nadu' },
]

const districtOptions = district

async function signUpUser(values) {
    try {
        const response = await axios.post('http://127.0.0.1:8000/signup', values, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
        });
        return response.data;
    } catch (error) {
        // Handle errors here if needed
        console.error('Error:', error);
        throw error; // Re-throw the error to be caught by the caller
    }
}




// const onSubmit = values => console.log('Form Data', values)

// console.log();
function Signup(props) {

    const navigate = useNavigate()

    const [loading, setLoading] = React.useState(false);

    const mutation = useMutation(signUpUser)


    const onSubmit = (values, { setFieldError }) => {

        setLoading(true)

        const formData = new FormData();

        // Append all single-value fields
        Object.keys(values).forEach(key => {
            if (key !== 'address' && key !== 'permanent_address' && key !== 'profile_image') {
                formData.append(key, values[key]);
                // console.log(values[key], formData)
            }
        });

        // Append address fields
        values.address.forEach((address, index) => {
            Object.entries(address).forEach(([key, value]) => {
                formData.append(`address-${index}-${key}`, value);
            });
        });

        // Append permanent address fields - assuming values.permanent_address is an array of address objects
        values.permanent_address.forEach((address, index) => {
            Object.entries(address).forEach(([key, value]) => {
                console.log(value)
                formData.append(`permanent_address-${index}-${key}`, value);
            });
        });
        // Append profile image
        if (values.profile_image) {
            formData.append('profile_image', values.profile_image);
        }

        console.log("the form data is ", formData)


        mutation.mutate(formData, {


            onSuccess: (data) => {

                // console.log('success', values.profile_image, data.profile_id);
                const id = data.profile_id

                const formData = new FormData();
                formData.append('profile_image', values.profile_image);
                axios.patch(`http://127.0.0.1:8000/profile/${id}`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    },
                })
                    .then(function (response) {
                        setLoading(false)

                        props.register(response.data)
                        navigate('/verify', { replace: true })
                    })
                // .catch(function (error) {
                //     navigate('/server_error_500')
                // })

            },
            onError: (error) => {
                setLoading(false)

                const errorData = error.response;

                if (errorData.status == 400) {
                    if (errorData.data.email) {
                        setFieldError('email', errorData.data.email[0]);
                    }
                }
                // if (errorData.status == 500) {
                //     navigate('/server_error_500')
                // }


            },
        })





        console.log(values);
    };

    useEffect(() => {



        if (props.isSuperuser) {
            navigate('admin/home')
        }

        else if (props.isLogin) {
            navigate('tansacs/jobs')
        }



    }, [props.isLogin]);

    function calculateAge(dob, endDate) {
        const birthDate = new Date(dob);
        const end = new Date(endDate);
        let age = end.getFullYear() - birthDate.getFullYear();
        const m = end.getMonth() - birthDate.getMonth();

        if (m < 0 || (m === 0 && end.getDate() < birthDate.getDate())) {
            age--;
        }

        return age;
    }

    return (
        <>
            {loading ? <LoadingComponent /> : null}
            <div className='mt-5 mb-14 '>
                <h4 className='text-4xl text-custom-red font-bold font-roboto lg:text-[50px] md:text-[40px] text-[35px]'>Tamil Nadu State AIDS Control Society</h4>


            </div>
            <div className='mt-10 border rounded-lg py-5 px-10 font-roboto'>

                <h4 className='text-2xl font-semibold lg:text-[33px] md:text-[25px] text-[20px]'>REGISTRATION FORM</h4>
                <Formik
                    initialValues={initialvalues}
                    validationSchema={validationSchema}
                    onSubmit={onSubmit}
                >

                    {({ values, handleChange, handleBlur, setFieldValue, touched, errors }) => (


                        <Form >
                            <div className='flex justify-end p-2'>
                                <div className='flex flex-col items-center' style={{
                                    width: "210px"
                                }}>
                                    <p className='text-[15px] text-custom-red font-semibold mt-2'>Upload Passport Size Photo </p>

                                    <div className='flex flex-col items-center  border-2 border-gray-400 p-2 border-solid w-[120px] '>
                                        <img className='w-full h-[100px] object-cover'
                                            src={values.profile_image ? URL.createObjectURL(values.profile_image) : "https://imgs.search.brave.com/oB6fgT45DC10B0RQfk3kTBtZ0W-2p7udZUxPnfvKT3M/rs:fit:860:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzA0LzYyLzkzLzY2/LzM2MF9GXzQ2Mjkz/NjY4OV9CcEVFY3hm/Z011WVBmVGFJQU9D/MXRDRHVybXNubzdT/cC5qcGc"}
                                            alt="profile" id="upload_profile_image" />

                                        <Field
                                            id="profile_image"
                                            name="profile_image"
                                            type="file"
                                            onChange={(event) => {
                                                setFieldValue("profile_image", event.target.files[0]);
                                            }}
                                            className="w-0 h-0"
                                            value=''

                                        />

                                        <label htmlFor="profile_image" className='w-full'>

                                            {!values.profile_image && <p className='text-[8px] uppercase font-semibold'>upload a photo here</p>}
                                            {values.profile_image && <p className='mt-2 text-sm truncate'>{values.profile_image.name}</p>}
                                            {touched.profile_image && errors.profile_image ? <p className='text-custom-red text-center font-bold text-[10px]'>{errors.profile_image}</p> : null}
                                        </label>

                                    </div>
                                    <p className='text-[9.6px] px-2 text-custom-red textb mt-2'>Note: The uploaded file must be less than 100KB and only in .jpeg or .jpg formats.</p>


                                </div>
                            </div>

                            <p className='text-custom-red mb-2 text-start font-bold underline'>Personal Details</p>

                            <div className="grid grid-cols-2 mb-3 gap-10 border border-black border-solid rounded p-2">

                                <div className='grid grid-cols-4 lg:col-span-1 col-span-2 gap-y-4 gap-x-10'>
                                    <div className="col-span-3">
                                        <FormikControl
                                            control='input'
                                            type='text'
                                            name='first_name'
                                            label="NAME OF APPLICANT"
                                            placeholder="NAME OF APPLICANT"
                                        />

                                    </div>
                                    <div className="col-span-1">
                                        <FormikControl
                                            control='input'
                                            type='text'
                                            name='last_name'
                                            label="INITIALS"
                                            placeholder="INITIAL"
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

                                    <div className="lg:col-span-2 col-span-2">
                                        <Field
                                            name="DOB"
                                            placeholder="DOB"
                                        >
                                            {
                                                ({ form, field }) => {
                                                    const { setFieldValue } = form
                                                    const { value } = field

                                                    // console.log(form , field , errors.dob);
                                                    return <div className="flex items-center relative"> {/* Container to hold icon and input */}
                                                        {/* <span className="mr-2"> 
                                                            <img src={calender} alt="calender" />
                                                        </span> */}
                                                        <DateView
                                                            name="DOB"
                                                            {...field}
                                                            placeholderText="DATE OF BIRTH"
                                                            selected={value ? parseISO(value) : null}
                                                            showYearDropdown
                                                            scrollableYearDropdown
                                                            yearDropdownItemNumber={100}
                                                            dateFormat="yyyy-MM-dd"
                                                            calendarIcon={<img src={calender} alt="calender" />}
                                                            className={
                                                                touched.DOB && errors.DOB
                                                                    ? ' custom-datepicker-placeholder w-full placeholder-shown:borrelative border border shadow-md py-1 px-2 border-red-400 w-full rounded text-sm focus:outline-none focus:border-sky-400'
                                                                    : ' custom-datepicker-placeholder w-full relative border border shadow-md py-1 px-2 text-sm border-gray-400 w-full rounded focus:outline-none focus:border-sky-400'
                                                            }
                                                            onChange={(val) => {
                                                                const formattedDate = format(val, 'yyyy-MM-dd');
                                                                setFieldValue('DOB', formattedDate);
                                                                const age = calculateAge(formattedDate, '2023-06-30');
                                                                setFieldValue('age', age);

                                                            }}
                                                        />
                                                        <span className="absolute inset-y-0 right-0 flex items-center pr-2"> {/* Absolute positioned icon */}
                                                            <img src={calender} alt="calender" className='w-[20px]' />
                                                        </span>
                                                    </div>
                                                }

                                            }
                                        </Field>
                                        <div>
                                            <p className='text-custom-red text-sm text-start font-bold'>

                                                <ErrorMessage name='DOB' />

                                            </p>

                                        </div>
                                    </div>
                                    <div className="lg:col-span-1 col-span-2">
                                        <FormikControl
                                            control='input'
                                            type='text'
                                            name='age'
                                            label="AGE"
                                            placeholder="AGE"
                                            readOnly
                                        />
                                    </div>

                                    <div className="col-span-4">
                                        <FormikControl
                                            control='input'
                                            type='text'
                                            name='aadhar'
                                            label="AADHAAR CARD"
                                            placeholder="ENTER YOUR AADHAAR CARD NUMBER"
                                        />

                                    </div>
                                    <div className="col-span-4">
                                        <FormikControl
                                            control='input'
                                            type='email'
                                            name='email'
                                            label="EMAIL"
                                            placeholder="EMAIL"
                                        />

                                    </div>
                                    <div className="col-span-4">
                                        <FormikControl
                                            control='input'
                                            type='email'
                                            name='confrim_email'
                                            label="CONFIRM EMAIL"
                                            placeholder="CONFIRM EMAIL"
                                        />

                                    </div>

                                </div>
                                <div className='grid grid-cols-4 lg:col-span-1 col-span-2 gap-y-4 gap-x-10'>
                                    <div className="col-span-3">
                                        <FormikControl
                                            control='input'
                                            type='text'
                                            name='guardian_name'
                                            label="FATHER NAME"
                                            placeholder="FATHER NAME OR MOTHER NAME"
                                        />

                                    </div>
                                    <div className="col-span-1">
                                        <FormikControl
                                            control='input'
                                            type='text'
                                            name='guardian_name_initial'
                                            label="INITIALS"
                                            placeholder="INITIAL"
                                        />

                                    </div>


                                    <div className="col-span-3">
                                        <FormikControl
                                            control='input'
                                            type='text'
                                            name='phone_number'
                                            label="PHONE NUMBER"
                                            placeholder="PHONE NUMBER"
                                        />

                                    </div>
                                    <div className="col-span-3">
                                        <FormikControl
                                            control='input'
                                            type='text'
                                            name='alternate_phone_number'
                                            label="EMERGENCY PHONE NUMBER"
                                            placeholder="EMERGENCY PHONE NUMBER"
                                        />

                                    </div>
                                    <div className="col-span-3">
                                        <FormikControl
                                            control='password'
                                            type='text'
                                            name='password'
                                            label="PASSWORD"
                                            placeholder="PASSWORD"
                                        />

                                    </div>
                                    <div className="col-span-3">
                                        <FormikControl
                                            control='password'
                                            type='text'
                                            name='confrim_password'
                                            label="CONFIRM PASSWORD"
                                            placeholder="CONFIRM PASSWORD"
                                        />

                                    </div>

                                </div>



                            </div>

                            <p className='text-custom-red mb-2 text-start font-bold underline'>Communication Address</p>
                            <div className="grid grid-cols-5 mb-3 gap-y-4 gap-x-10 border border-black border-solid rounded p-2">

                                <div className="lg:col-span-3 col-span-5 lg:order-1">
                                    <FormikControl
                                        control='input'
                                        type='text'
                                        name='address[0].address_line1'
                                        label="ADDRESS LINE 1:"
                                        placeholder="ADDRESS LINE 1:"
                                    />

                                </div>

                                <div className="lg:col-span-1 col-span-5 lg:order-2 order-last">
                                    <FormikControl
                                        control='select'
                                        type='select'
                                        name='address[0].state'
                                        options={stateOptions}


                                    />


                                </div>
                                <div className="lg:col-span-1 col-span-5 lg:order-3 order-last">
                                    <FormikControl
                                        control='select'
                                        type='select'
                                        name='address[0].district'
                                        options={districtOptions}
                                    />

                                </div>

                                <div className="lg:col-span-3 col-span-5 lg:order-4">
                                    <FormikControl
                                        control='input'
                                        type='text'
                                        name='address[0].address_line2'
                                        label="ADDRESS LINE 2:"
                                        placeholder="ADDRESS LINE 2:"
                                    />

                                </div>

                                <div className="lg:col-span-1 col-span-5 lg:order-5">
                                    <FormikControl
                                        control='input'
                                        type='text'
                                        name='address[0].city'
                                        label="TOWN / VILLAGE / CITY"
                                        placeholder="TOWN / VILLAGE / CITY"
                                    />

                                </div>
                                <div className="lg:col-span-1 col-span-5 lg:order-6">
                                    <FormikControl
                                        control='input'
                                        type='text'
                                        name='address[0].pincode'
                                        label="PINCODE"
                                        placeholder="PINCODE"
                                    />

                                </div>






                            </div>

                            <p className='text-custom-red mb-2 text-start font-bold underline'>Permanent Address</p>
                            <div className="grid grid-cols-5 mb-3 gap-y-4 gap-x-10 border border-black border-solid rounded p-2">

                                <div className="lg:col-span-3 col-span-5 lg:order-1">
                                    <FormikControl
                                        control='input'
                                        type='text'
                                        name='permanent_address[0].address_line1'
                                        label="ADDRESS LINE 1:"
                                        placeholder="ADDRESS LINE 1:"
                                    />

                                </div>

                                <div className="lg:col-span-1 col-span-5 lg:order-2 order-last">
                                    <FormikControl
                                        control='select'
                                        type='select'
                                        name='permanent_address[0].state'
                                        options={stateOptions}
                                    />

                                </div>
                                <div className="lg:col-span-1 col-span-5 lg:order-3 order-last">
                                    <FormikControl
                                        control='select'
                                        type='select'
                                        name='permanent_address[0].district'
                                        options={districtOptions}
                                    />

                                </div>

                                <div className="lg:col-span-3 col-span-5 lg:order-4">
                                    <FormikControl
                                        control='input'
                                        type='text'
                                        name='permanent_address[0].address_line2'
                                        label="ADDRESS LINE 2:"
                                        placeholder="ADDRESS LINE 2:"
                                    />

                                </div>

                                <div className="lg:col-span-1 col-span-5 lg:order-5">
                                    <FormikControl
                                        control='input'
                                        type='text'
                                        name='permanent_address[0].city'
                                        label="TOWN / VILLAGE / CITY"
                                        placeholder="TOWN / VILLAGE / CITY"
                                    />

                                </div>
                                <div className="lg:col-span-1 col-span-5 lg:order-6">
                                    <FormikControl
                                        control='input'
                                        type='text'
                                        name='permanent_address[0].pincode'
                                        label="PINCODE"
                                        placeholder="PINCODE"
                                    />

                                </div>






                            </div>

                            <div className=" flex justify-center gap-10 items-center mt-16">
                                <div className='w-max'>
                                    <Link to={'/'} className="px-[15px] py-[3px]  block group relative  w-full overflow-hidden rounded-lg bg-red-400 text-sm font-semibold text-white">
                                        Back to Login
                                        <div className="absolute inset-0 h-full w-full scale-0 rounded-lg transition-all duration-300 group-hover:scale-100 group-hover:bg-white/30"></div>

                                    </Link>

                                </div>
                                <div className='w-max'>
                                    <button type='submit' className="px-[25px] py-[3px]  block group relative  w-full overflow-hidden rounded-lg bg-custom-red text-sm font-semibold text-white" >Register
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


const mapStateToProps = state => {


    return {

        isLogin: state.login.isLogin,
        isSuperuser: state.login.is_superuser,

        isRegister: state.register.isRegister,
    }
}

const mapDispatchToProps = dispatch => {

    return {
        register: (data) => dispatch(Register(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup);