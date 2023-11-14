
import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';


const addressSchema = Yup.object().shape({
    line1: Yup.string().required('Line 1 is required'),
    line2: Yup.string(),
    state: Yup.string().required('State is required'),
    district: Yup.string().required('District is required'),
    city: Yup.string().required('City is required'),
    pincode: Yup.number().typeError("Enter valid Pin Code").required('Required').positive('Enter valid Pin Code').test('len', 'Enter valid Pin Code', (val) => val && val.toString().length === 6),
  });

const validationSchema = Yup.object({

    userfirstname : Yup.string().required("Required"),
    userlastname : Yup.string().required("Required"),
    gender : Yup.string().required("Required"),
    dob : Yup.date().required("Required"),
    age :Yup.number().typeError("Invalid Age").required('Required').positive('Invalid Age'),
    aadhaar :Yup.number().typeError("Invalid Aadhaar Number").required('Required').positive('Invalid Aadhaar Number'),
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

const initialvalues ={...validationSchema.default()}



export function useSignupHook() {
    const customFormik = useFormik({
      initialvalues,
      validationSchema,
      // Your onSubmit function here
      onSubmit: (values) => {
        // Handle form submission
        console.log('Form Data' ,  values)
      },
    });
  
    return { customFormik };
  }