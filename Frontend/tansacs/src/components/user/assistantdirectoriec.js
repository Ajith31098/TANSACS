import React from 'react'
import { Formik, Form, useFormik, FieldArray } from 'formik';
import * as Yup from 'yup'
import FormikControl from '../formcomponents/formcontrol'
import {Link} from 'react-router-dom'


function AssistantDirectorIEC() {

    const initialValues = {
        sslcfirstname: '',
        sslclastname: '',
        sslcregisternumber: '',
        sslcpercentage: '',
        sslcfile: '',
        sslcmonth: '',
        sslcyear: '',
        sslcboard: '',
        hscfirstname: '',
        hsclastname: '',
        hscregisternumber: '',
        hscpercentage: '',
        hscfile: '',
        hscmonth: '',
        hscyear: '',
        hscboard: '',
        ugdegree: '',
        ugfirstname: '',
        uglastname: '',
        ugregisternumber: '',
        ugpercentage: '',
        ugdeparment: '',
        ugfile: '',
        ugmonth: '',
        ugyear: '',
        pg: [
            {
                degree: '',
                firstname: '',
                lastname: '',
                registernumber: '',
                deparment: '',
                percentage: '',
                file: '',
                month: '',
                year: '',
            },
        ],
        experience: [
            {
                field: '', companyname: '', experience: '', document: ''
            }
        ],
        naco: {
            year: '',
            file: ''
        },
        tansacs: {
            year: '',
            file: ''
        },
        tsu: {
            year: '',
            file: ''
        }

    }

    const validationSchema = Yup.object({
        sslcfirstname: Yup.string().required('Must be Required'),
        sslclastname: Yup.string().required('Required'),
        sslcregisternumber: Yup.number().typeError('invalid').required('Required').positive('invalid'),
        sslcpercentage: Yup.number().required('Required').positive('Must be positive'),
        sslcfile: Yup.mixed().required('Required'),//.test('fileSize', 'File too large', value => {
        //   return value && value.size <= 5000000;
        // }),
        sslcmonth: Yup.string().required('Required'),
        sslcyear: Yup.string().required('Required'),

        sslcboard: Yup.string().required('Required'),
        hscfirstname: Yup.string().required('Required'),
        hsclastname: Yup.string().required('Required'),
        hscregisternumber: Yup.number().required('Required').positive('Must be positive'),
        hscpercentage: Yup.number().required('Required').positive('Must be positive'),
        hscfile: Yup.mixed().required('Required'),//.test('fileSize', 'File too large', value => {
        //   return value && value.size <= 5000000;
        // }),
        hscmonth: Yup.string().required('Required'),
        hscyear: Yup.string().required('Required'),
        hscboard: Yup.string().required('Required'),
        ugdegree: Yup.string().required('Required'),
        ugfirstname: Yup.string().required('Required'),
        uglastname: Yup.string().required('Required'),
        ugdepartment: Yup.string().required('Required'),
        ugregisternumber: Yup.number().required('Required').positive('Must be positive'),
        ugpercentage: Yup.number().required('Required').positive('Must be positive'),
        ugfile: Yup.mixed().required('Required'),//.test('fileSize', 'File too large', value => {
        //   return value && value.size <= 5000000;
        // }),
        ugmonth: Yup.string().required('Required'),
        ugyear: Yup.string().required('Required'),
        pg: Yup.array().of(
            Yup.object().shape({
                degree: Yup.string().required('Required'),
                deparment: Yup.string().required('Required'),
                firstname: Yup.string().required('Required'),
                lastname: Yup.string().required('Required'),
                registernumber: Yup.number().required('Required').positive('Must be positive'),
                percentage: Yup.number().required('Required').positive('Must be positive'),
                file: Yup.mixed().required('Required'),//.test('fileSize', 'File too large', value => {
                //   return value && value.size <= 5000000;
                // }),
                month: Yup.string().required('Required'),
                year: Yup.string().required('Required'),

            })

        ),
        experience: Yup.array().of(
            Yup.object().shape({
                field: Yup.string().when(['companyname', 'experience', 'document'], {
                    is: (companyname, experience, document) =>
                        !!companyname || !!experience || !!document,
                    then: () => Yup.string().required('Field is required'),
                    otherwise: () => Yup.string(),
                }),
                companyname: Yup.string().when(['field', 'experience', 'document'], {
                    is: (field, experience, document) =>
                        !!field || !!experience || !!document,
                    then: () => Yup.string().required('Company Name is required'),
                    otherwise: () => Yup.string(),
                }),
                experience: Yup.number().when(['field', 'companyname', 'document'], {
                    is: (field, companyname, document) =>
                        !!field || !!companyname || !!document,
                    then: () => Yup.number().typeError('Enter Years')
                        .required('Experience is required')
                        .positive('Enter a valid number of years')
                        .test('length', 'Enter a valid number of years', (val) => val && val.toString().length < 3),
                    otherwise: () => Yup.string(),
                }),
                document: Yup.mixed().when(['field', 'companyname', 'experience'], {
                    is: (field, companyname, experience) =>
                        !!field || !!companyname || !!experience,
                    then: () => Yup.mixed().required('Document is required'),
                    otherwise: () => Yup.string(),
                }),
            }, [
                ['field', 'companyname'],
                ['field', 'experience'],
                ['field', 'document'],
                ['companyname', 'experience'],
                ['companyname', 'document'],
                ['experience', 'document'],
            ])
        ),

        naco: Yup.object().shape({
            year: Yup.number().typeError('Year must be a number')
        }).test('fill-all-or-none', 'Fill all fields or none', function (value) {
            const { year, file } = value;

            // Check if at least one field is filled
            if (year || file) {
                // Check if all fields are filled, if not, show an error
                if (year && year < 1) {
                    return this.createError({
                        message: 'Year must be a positive number',
                        path: 'naco.year',
                    });
                }

                if (!(file)) {
                    return this.createError({
                        message: 'Add the required document for naco',
                        path: 'naco.file',
                    });
                }
                if (!(year)) {
                    return this.createError({
                        message: 'Enter the year of experience for naco',
                        path: 'naco.year',
                    });
                }



            }

            return true;
        }),
        tansacs: Yup.object().shape({
            year: Yup.number().typeError('Year must be a number')
        }).test('fill-all-or-none', 'Fill all fields or none', function (value) {
            const { year, file } = value;

            // Check if at least one field is filled
            if (year || file) {
                // Check if all fields are filled, if not, show an error
                if (year && year < 1) {
                    return this.createError({
                        message: 'Year must be a positive number',
                        path: 'naco.year',
                    });
                }

                if (!(file)) {
                    return this.createError({
                        message: 'Add the required document for naco',
                        path: 'naco.file',
                    });
                }
                if (!(year)) {
                    return this.createError({
                        message: 'Enter the year of experience for naco',
                        path: 'naco.year',
                    });
                }



            }

            return true;
        }),

        tsu: Yup.object().shape({
            year: Yup.number().typeError('Year must be a number')
        }).test('fill-all-or-none', 'Fill all fields or none', function (value) {
            const { year, file } = value;

            // Check if at least one field is filled
            if (year || file) {
                // Check if all fields are filled, if not, show an error
                if (year && year < 1) {
                    return this.createError({
                        message: 'Year must be a positive number',
                        path: 'naco.year',
                    });
                }

                if (!(file)) {
                    return this.createError({
                        message: 'Add the required document for naco',
                        path: 'naco.file',
                    });
                }
                if (!(year)) {
                    return this.createError({
                        message: 'Enter the year of experience for naco',
                        path: 'naco.year',
                    });
                }



            }

            return true;
        }),



    })

    const onSubmit = values => console.log('Form Data', values)


    const formik = useFormik({
        initialValues,
        onSubmit,
        validationSchema,
        validateOnChange: false,
        validateOnBlur: false
    });

    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const monthOptions = [
        { key: 'Month', value: '' },
        ...months.map(month => ({ key: month, value: month }))
    ];

    const currentYear = new Date().getFullYear()

    const yearOptions = [
        { key: 'Year', value: '' },
        ...Array.from({ length: 100 }, (_, i) => ({
            key: currentYear - i,
            value: currentYear - i
        }))
    ];

    const boardOptions = [
        { key: 'Select', value: '' },
        { key: 'STATE', value: 'state' },
        { key: 'CBSE', value: 'cbse' },
        { key: 'ICIC', value: 'icic' },
        { key: 'MATRICS', value: 'matrics' }
    ]

    const ugDegreeOptions = [
        { key: 'SELECT DEGREE', value: '' },
        { key: 'Medical ', value: 'option1' },
        { key: 'Allied Health Sciences', value: 'option2' },
        // { key: 'Option 3', value: 'option3' }
    ]

    const pgDegreeOptions = [
        { key: 'Select', value: '' },
        { key: 'Public Health ', value: 'option1' },
        { key: 'Healthcare Management ', value: 'option2' },
        { key: 'Healthcare Administration ', value: 'option3' },
        { key: 'Social Science ', value: 'option4' },
        { key: 'Psychology ', value: 'option5' },
        { key: 'Applied Epidemiology ', value: 'option6' },
        { key: 'Demography  ', value: 'option7' },
        { key: 'Statistics ', value: 'option8' },
        { key: 'Population Sciences ', value: 'option9' },
    ]

    const experienceOptions = [
        { key: 'Select', value: '' },
        { key: 'Public Health ', value: 'option1' },
        { key: 'Healthcare Management ', value: 'option2' },
        { key: 'Healthcare Administration', value: 'option3' },
        { key: 'Applied Epidemiology', value: 'option4' },
    ]

    return (
        <>      
        

            <div className='mt-5'>
                <h4 className='text-4xl text-red-600 font-bold mb-14'>Tamil Nadu State AIDS Control Society</h4>


                <p className='text-lg my-5 text-start text-red-600 font-bold'>Assistant Director (IEC)   </p>
                <p className='text-lg my-5  text-red-600 underline font-bold'>EDUCATION QUALIFICATION & EXPERIENCE</p>


            </div>

            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}

            >
                {(formik) => (
                    <Form

                        className='flex flex-col justify-center items-center'

                    >
                        <div className="container font-sans">

                            <div className='w-full mb-5 '>
                                <p className='text-red-600 mb-2 underline text-start font-bold'>S.S.L.C</p>
                                <div className='w-full gap-1 grid grid-cols-11 p-4 border-solid border border-gray-400 rounded-md'>
                                    <div className='lg:col-span-4 col-span-12'>
                                        <p className='text-start text-xs font-bold mb-2'>As per S.S.L.C Certificate</p>
                                        <div className="grid grid-cols-4 gap-1">
                                            <div className='col-span-3'>

                                                <FormikControl
                                                    control='input'
                                                    type='text'
                                                    name='sslcfirstname'
                                                    label="NAME OF THE APPLICANT"
                                                    placeholder="NAME OF THE APPLICANT"
                                                />

                                            </div>

                                            <div className='col-span-1'>

                                                <FormikControl
                                                    control='input'
                                                    type='text'
                                                    name='sslclastname'
                                                    label="INITAL"
                                                    placeholder="INITAL"
                                                />

                                            </div>
                                        </div>
                                    </div>


                                    <div className="lg:col-span-2 col-span-8">
                                        <p className='text-start text-xs font-bold mb-2'>S.S.L.C Register Number</p>
                                        <FormikControl
                                            control='input'
                                            type='text'
                                            name='sslcregisternumber'
                                            label="ENTER YOUR REGISTER NUMBER"
                                            placeholder="ENTER YOUR REGISTER NUMBER"
                                        />

                                    </div>

                                    <div className="lg:col-span-2 col-span-12">
                                        <p className='text-start text-xs truncate  font-bold mb-2'>S.S.L.C Month / Year of Passing</p>
                                        <div className="grid grid-cols-4 gap-1">

                                            <div className='col-span-2'>
                                                <FormikControl
                                                    control='select'
                                                    type='select'
                                                    name='sslcmonth'
                                                    options={monthOptions}
                                                />


                                            </div>

                                            <div className='col-span-2'>
                                                <FormikControl
                                                    control='select'
                                                    type='select'
                                                    name='sslcyear'
                                                    options={yearOptions}
                                                />

                                            </div>
                                        </div>
                                    </div>
                                    <div className="lg:col-span-1 col-span-6">
                                        <p className='text-start text-xs truncate font-bold mb-2'>Type of Board</p>
                                        <FormikControl
                                            control='select'
                                            type='select'
                                            name='sslcboard'
                                            options={boardOptions}
                                        />

                                    </div>
                                    <div className="lg:col-span-1 col-span-6">
                                        <p className='text-start text-xs truncate font-bold mb-2'>Enter percentage</p>
                                        <FormikControl
                                            control='input'
                                            type='text'
                                            name='sslcpercentage'
                                            label="PERCENTAGE"
                                            placeholder="%"
                                        />

                                    </div>

                                    <div className="lg:col-span-1 col-span-2">
                                        <p className='lg:text-center text-start text-xs font-bold mb-2'>Marksheet</p>
                                        <FormikControl
                                            control='file'
                                            type='file'
                                            id='sslcfile'
                                            name='sslcfile'
                                            formik={formik}
                                            label="upload"
                                        />

                                    </div>


                                </div>
                            </div>

                            <div className='w-full mb-5 '>
                                <p className='text-red-600 underline mb-2 text-start font-bold'>H.S.C</p>

                                <div className='w-full  border-solid border border-gray-400 rounded-md gap-1 grid grid-cols-11 p-4'>

                                    <div className='lg:col-span-4 col-span-12'>
                                        <p className='text-start  text-xs font-bold mb-2'>As per H.S.C Certificate</p>
                                        <div className="grid grid-cols-4 gap-1">
                                            <div className='col-span-3'>
                                                <FormikControl
                                                    control='input'
                                                    type='text'
                                                    name='hscfirstname'
                                                    label="NAME OF THE APPLICANT"
                                                    placeholder="NAME OF THE APPLICANT"
                                                />
                                            </div>

                                            <div className='col-span-1'>
                                                <FormikControl
                                                    control='input'
                                                    type='text'
                                                    name='hsclastname'
                                                    label="INITAL"
                                                    placeholder="INITAL"
                                                />

                                            </div>
                                        </div>
                                    </div>


                                    <div className="lg:col-span-2 col-span-8">
                                        <p className='text-start text-xs font-bold mb-2'>H.S.C Register Number</p>
                                        <FormikControl
                                            control='input'
                                            type='text'
                                            name='hscregisternumber'
                                            label="ENTER YOUR REGISTER NUMBER"
                                            placeholder="ENTER YOUR REGISTER NUMBER"
                                        />

                                    </div>

                                    <div className="lg:col-span-2 col-span-12">
                                        <p className='text-start text-xs font-bold mb-2'>H.S.C Month / Year of Passing</p>
                                        <div className="grid grid-cols-4 gap-1">

                                            <div className='col-span-2'>
                                                <FormikControl
                                                    control='select'
                                                    type='text'
                                                    name='hscmonth'
                                                    options={monthOptions}
                                                />


                                            </div>

                                            <div className='col-span-2'>
                                                <FormikControl
                                                    control='select'
                                                    type='text'
                                                    name='hscyear'
                                                    options={yearOptions}
                                                />

                                            </div>
                                        </div>
                                    </div>
                                    <div className="lg:col-span-1 col-span-6">
                                        <p className='text-start text-xs font-bold mb-2'>Type of Board</p>
                                        <FormikControl
                                            control='select'
                                            type='text'
                                            name='hscboard'
                                            options={boardOptions}
                                        />

                                    </div>
                                    <div className="lg:col-span-1 col-span-6">
                                        <p className='text-start text-xs font-bold mb-2'>Enter percentage</p>
                                        <FormikControl
                                            control='input'
                                            type='text'
                                            name='hscpercentage'
                                            label="ENTER PERCENTAGE"
                                            placeholder="%"
                                        />

                                    </div>

                                    <div className="lg:col-span-1 col-span-2">
                                        <p className='lg:text-center text-start text-xs font-bold mb-2'>Marksheet</p>
                                        <FormikControl
                                            control='file'
                                            type='file'
                                            id='hscfile'
                                            name='hscfile'
                                            formik={formik}
                                            label="upload"
                                        />

                                    </div>


                                </div>
                            </div>

                            <div className='w-full mb-5 '>
                                <p className='text-red-600 mb-2 underline text-start font-bold'>U.G</p>

                                <div className='w-full  border-solid border border-gray-400 rounded-md gap-1 grid grid-cols-11 p-4'>

                                    <div className='lg:col-span-4 col-span-11'>
                                            <div className="grid grid-cols-4 gap-1">
                                                <div className="col-span-4">
                                                    <p className='text-start text-xs font-bold mb-2'>Degree</p>
                                                    <FormikControl
                                                        control='select'
                                                        type='text'
                                                        name='ugdegree'
                                                        options={ugDegreeOptions}
                                                    />

                                                </div>
                                                <div className="col-span-4 ">
                                                    <p className='text-start text-xs font-bold mb-2'>As per U.G Certificate</p>

                                                    <div className="grid grid-cols-4 gap-1">
                                                        <div className='col-span-3'>
                                                            <FormikControl
                                                                control='input'
                                                                type='text'
                                                                name='ugfirstname'
                                                                label="NAME OF APPLICANT"
                                                                placeholder="NAME OF APPLICANT"
                                                            />
                                                        </div>

                                                        <div className='col-span-1'>
                                                            <FormikControl
                                                                control='input'
                                                                type='text'
                                                                name='uglastname'
                                                                label="INITAL"
                                                                placeholder="INITAL"
                                                        />

                                                        </div>
                                                    </div>

                                                </div>

                                                
                                                
                                            </div>
                                    </div>


                                    <div className=' lg:col-span-6 col-span-11'>
                                        <div className='grid grid-cols-5 gap-1'>
                                            <div className="col-span-5">
                                                <p className='text-start text-xs font-bold mb-2'>Department</p>

                                                <FormikControl
                                                    control='input'
                                                    type='text'
                                                    name='ugdepartment'
                                                    label="ENTER YOUR DEPARTMENT NAME"
                                                    placeholder="ENTER YOUR DEPARTMENT NAME"
                                                />
                                            </div>
                                            <div className="lg:col-span-2 col-span-5">
                                                <p className='text-start text-xs font-bold mb-2'>U.G Register Number</p>
                                                <FormikControl
                                                    control='input'
                                                    type='text'
                                                    name='ugregisternumber'
                                                    label="ENTER YOUR REGISTER NUMBER"
                                                    placeholder="ENTER YOUR REGISTER NUMBER"
                                                />
                                            </div>
                                            <div className="lg:col-span-2 col-span-5">

                                                <p className='text-start text-xs font-bold mb-2'>U.G Month / Year of Passing</p>
                                                <div className="grid grid-cols-4 gap-1">

                                                    <div className='col-span-2'>

                                                        <FormikControl
                                                            control='select'
                                                            type='text'
                                                            name='ugmonth'
                                                            options={monthOptions}
                                                        />


                                                    </div>

                                                    <div className='col-span-2'>
                                                        <FormikControl
                                                            control='select'
                                                            type='text'
                                                            name='ugyear'
                                                            options={yearOptions}
                                                        />

                                                    </div>
                                                </div>

                                            </div>

                                            <div className="lg:col-span-1 col-span-5">
                                                <p className='text-start text-xs font-bold mb-2'>Enter Percentage</p>

                                                <FormikControl
                                                    control='input'
                                                    type='text'
                                                    name='ugpercentage'
                                                    label="PERCENTAGE"
                                                    placeholder="%"
                                                />

                                            </div>
                                        </div>

                                    </div>

                                    <div className="lg:col-span-1 col-span-2">
                                        <p className='lg:text-center text-start text-xs font-bold mb-2'>Marksheet</p>
                                        <FormikControl
                                            control='file'
                                            type='file'
                                            id='ugfile'
                                            name='ugfile'
                                            formik={formik}
                                            label="upload"
                                        />
                                    </div>


                                </div>
                            </div>

                            <div className='w-full mb-5 '>
                                <p className='text-red-600 mb-2 underline text-start font-bold'>P.G</p>



                                <FieldArray name='pg'>

                                    {
                                        fieldarrayprops => {
                                            const { push, remove, form } = fieldarrayprops
                                            const { values } = form
                                            const { pg } = values
                                            return (
                                                <div className='border-solid border border-gray-400 rounded-md p-4'>
                                                    {
                                                        pg.map((pgdegree, index) => (
                                                            <div key={index} className='w-full   gap-1 grid grid-cols-12'>
                                                                <div className='lg:col-span-4 col-span-12'>

                                                                    <div className="grid grid-cols-4 gap-1">
                                                                        <div className="col-span-4">
                                                                            <p className='text-start text-xs font-bold mb-2'>Degree</p>
                                                                            <FormikControl
                                                                                control='select'
                                                                                type='text'
                                                                                name={`pg[${index}].degree`}
                                                                                options={pgDegreeOptions}
                                                                            />

                                                                        </div>
                                                                        <div className="col-span-4">
                                                                            <p className='text-start text-xs font-bold mb-2'>As per P.G Certificate</p>

                                                                            <div className="grid grid-cols-4 gap-1">
                                                                            <div className='col-span-3'>

                                                                                <FormikControl
                                                                                    control='input'
                                                                                    type='text'
                                                                                    name={`pg[${index}].firstname`}
                                                                                    label="NAME OF APPLICANT"
                                                                                    placeholder="NAME OF APPLICANT"
                                                                                />

                                                                                </div>

                                                                                <div className='col-span-1'>
                                                                                <FormikControl
                                                                                    control='input'
                                                                                    type='text'
                                                                                    name={`pg[${index}].lastname`}
                                                                                    label="INITAL"
                                                                                    placeholder="INITAL"
                                                                                />

                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        

                                                                        
                                                                    </div>
                                                                </div>

                                                                <div className="lg:col-span-7 col-span-12 grid gap-1 grid-cols-6">


                                                                    <div className="lg:col-span-6 col-span-8">
                                                                        <p className='text-start text-xs font-bold mb-2'>Department</p>
                                                                        <FormikControl
                                                                            control='input'
                                                                            type='text'
                                                                            name={`pg[${index}].deparment`}
                                                                            label="ENTER YOUR DEPARTMENT NAME"
                                                                            placeholder="ENTER YOUR DEPARTMENT NAME"
                                                                        />

                                                                    </div>


                                                                    <div className="lg:col-span-2 col-span-8">
                                                                        <p className='text-start text-xs font-bold mb-2'>P.G Register Number</p>
                                                                        <FormikControl
                                                                            control='input'
                                                                            type='text'
                                                                            name={`pg[${index}].registernumber`}
                                                                            label="ENTER YOUR REGISTER NUMBER"
                                                                            placeholder="ENTER YOUR REGISTER NUMBER"
                                                                        />

                                                                    </div>

                                                                    <div className="lg:col-span-2 col-span-12">
                                                                        <p className='text-start text-xs font-bold mb-2'>P.G Month / Year of Passing</p>
                                                                        <div className="grid grid-cols-4 gap-1">

                                                                            <div className='col-span-2'>
                                                                                <FormikControl
                                                                                    control='select'
                                                                                    type='text'
                                                                                    name={`pg[${index}].month`}
                                                                                    options={monthOptions}
                                                                                />



                                                                            </div>
                                                                            <div className='col-span-2'>
                                                                                <FormikControl
                                                                                    control='select'
                                                                                    type='text'
                                                                                    name={`pg[${index}].year`}
                                                                                    options={yearOptions}
                                                                                />



                                                                            </div>
                                                                        </div>
                                                                    </div>

                                                                    <div className="lg:col-span-2 col-span-6">
                                                                        <p className='text-start text-xs font-bold mb-2'>Enter percentage</p>
                                                                        <FormikControl
                                                                            control='input'
                                                                            type='text'
                                                                            name={`pg[${index}].percentage`}
                                                                            label="PERCENTAGE"
                                                                            placeholder="%"
                                                                        />

                                                                    </div>
                                                                </div>

                                                                <div className="lg:col-span-1 col-span-2">
                                                                    <div className="grid col-1 justify-center gap-1">
                                                                        <div>
                                                                            <p className='lg:text-center text-start text-xs font-bold mb-2'>Marksheet</p>

                                                                            <FormikControl
                                                                                control='file'
                                                                                type='file'
                                                                                id={`pg[${index}].file`}
                                                                                name={`pg[${index}].file`}
                                                                                formik={formik}
                                                                                label="upload"
                                                                            />

                                                                        </div>

                                                                        {
                                                                            index > 0 && (

                                                                                <div >
                                                                                    <button type='button' onClick={() => remove(index)} className="px-4 py-1 block group relative  w-max overflow-hidden rounded-lg bg-red-600 text-xs font-semibold text-white" >cancel
                                                                                        <div className="absolute inset-0 h-full w-full scale-0 rounded-lg transition-all duration-300 group-hover:scale-100 group-hover:bg-white/30"></div>
                                                                                    </button>

                                                                                </div>

                                                                            )
                                                                        }
                                                                    </div>
                                                                </div>
                                                            </div>

                                                        ))
                                                    }

                                                    <div className='w-15 mt-2'>
                                                        <button type='button' onClick={() => push({ degree: '', firstname: '', lastname: '', registernumber: '', deparment: '', percentage: '', file: '', month: '', year: '', })} className="px-4 py-1 block group relative  w-max overflow-hidden rounded-lg bg-red-600 text-xs font-semibold text-white" >ADD
                                                            <div className="absolute inset-0 h-full w-full scale-0 rounded-lg transition-all duration-300 group-hover:scale-100 group-hover:bg-white/30"></div>
                                                        </button>
                                                    </div>

                                                </div>

                                            )
                                        }
                                    }

                                </FieldArray>



                            </div>

                            <div className='w-full mb-5 '>
                                <p className='text-red-600 mb-2 text-start underline font-bold'>EXPERIENCE CERTIFICATE</p>
                                <FieldArray name='experience'>

                                    {
                                        fieldarrayprops => {
                                            const { push, remove, form } = fieldarrayprops
                                            const { values } = form
                                            const { experience } = values
                                            return (
                                                <div className='border-solid border border-gray-400 rounded-md p-4 mb-5'>
                                                    {
                                                        experience.map((experience_cantidate, index) => (
                                                            <div key={index} className='w-full'>

                                                                {/* {formik.errors.experience1 ? <div className='bg-red-600 text-white ms-2 p-2 w-max mt-2 rounded-lg text-start'><p>{formik.errors.experience1}</p></div> : null} */}

                                                                <div className='w-full  gap-1 grid grid-cols-12 p-4'>


                                                                    <div className="lg:col-span-4 col-span-12">
                                                                        <p className='text-start text-xs font-bold mb-2'>Feild</p>
                                                                        <FormikControl
                                                                            control='select'
                                                                            type='text'
                                                                            name={`experience[${index}].field`}
                                                                            options={experienceOptions}
                                                                        />

                                                                    </div>


                                                                    <div className="lg:col-span-4 col-span-12">
                                                                        <p className='text-start text-xs font-bold mb-2'>Company Name</p>

                                                                        <FormikControl
                                                                            control='input'
                                                                            type='text'
                                                                            name={`experience[${index}].companyname`}
                                                                            label="COMPANY NAME"
                                                                            placeholder="COMPANY NAME"
                                                                        />

                                                                    </div>
                                                                    <div className="lg:col-span-2 col-span-6">
                                                                        <p className='text-start text-xs font-bold mb-2'>Experience</p>

                                                                        <FormikControl
                                                                            control='input'
                                                                            type='text'
                                                                            name={`experience[${index}].experience`}
                                                                            label="YEARS"
                                                                            placeholder="YEARS"
                                                                        />

                                                                    </div>

                                                                    <div className="lg:col-span-2 col-span-6">
                                                                        <div className="grid grid-cols-1 justify-center">
                                                                            <div className='col-span-1 flex flex-col justify-center items-center'>
                                                                                <p className='text-start text-xs font-bold mb-2'>Supporting Document</p>
                                                                                <FormikControl
                                                                                    control='file'
                                                                                    type='file'
                                                                                    id={`experience[${index}].document`}
                                                                                    name={`experience[${index}].document`}
                                                                                    formik={formik}
                                                                                    label="upload"
                                                                                />
                                                                            </div>

                                                                            {
                                                                                index > 0 && (

                                                                                    <div className='mt-2 col-span-1 flex flex-col justify-center items-center'>
                                                                                        <button type='button' onClick={() => remove(index)} className="px-4 py-1 block group relative  w-max overflow-hidden rounded-lg bg-red-600 text-xs font-semibold text-white" >cancel
                                                                                            <div className="absolute inset-0 h-full w-full scale-0 rounded-lg transition-all duration-300 group-hover:scale-100 group-hover:bg-white/30"></div>
                                                                                        </button>

                                                                                    </div>

                                                                                )
                                                                            }

                                                                        </div>


                                                                    </div>




                                                                </div>

                                                            </div>
                                                        ))
                                                    }

                                                    <div className='w-15'>
                                                        <button type='button' onClick={() => push({ field: '', companyname: '', experience: '', document: '' })} className="px-4 py-1 block group relative  w-max overflow-hidden rounded-lg bg-red-600 text-xs font-semibold text-white" >ADD
                                                            <div className="absolute inset-0 h-full w-full scale-0 rounded-lg transition-all duration-300 group-hover:scale-100 group-hover:bg-white/30"></div>
                                                        </button>
                                                    </div>

                                                </div>
                                            )
                                        }
                                    }

                                </FieldArray>
                            </div>

                            <div className='w-full mb-5 '>
                                <p className='text-red-600 mb-2 text-start underline font-bold'>WORK EXPERIENCE ( WITHIN NACO / TANSACS / TSU )</p>

                                <div className='w-full  border-solid border border-gray-400 rounded-md gap-1 grid grid-cols-9 p-4'>

                                    <div className='lg:col-span-3 col-span-12'>
                                        <div className="grid grid-cols-7 gap-1">

                                            <div className="col-span-2 ">
                                                <p className='text-center text-sm font-bold mb-2'>NACO</p>
                                            </div>
                                            <div className="col-span-2">

                                                <p className='text-start text-xs font-bold mb-2'>Enter Years</p>
                                                <FormikControl
                                                    control='input'
                                                    type='text'
                                                    name='naco.year'
                                                    label="NO OF YEARS"
                                                    placeholder="NO OF YEARS"
                                                />

                                            </div>

                                            <div className='col-span-3'>
                                                <p className='text-center text-xs font-bold mb-2'>Supporting document</p>
                                                <FormikControl
                                                    control='file'
                                                    type='file'
                                                    id="naco.file"
                                                    name="naco.file"
                                                    formik={formik}
                                                    label="upload"
                                                />

                                            </div>
                                        </div>
                                    </div>
                                    <div className='lg:col-span-3 col-span-12'>
                                        <div className="grid grid-cols-7 gap-1">

                                            <div className="col-span-2">
                                                <p className='text-center text-sm font-bold mb-2'>TANSACS</p>
                                            </div>
                                            <div className="col-span-2">

                                                <p className='text-start text-xs font-bold mb-2'>Enter Years</p>
                                                <FormikControl
                                                    control='input'
                                                    type='text'
                                                    name='tansacs.year'
                                                    label="NO OF YEARS"
                                                    placeholder="NO OF YEARS"
                                                />

                                            </div>

                                            <div className='col-span-3'>
                                                <p className='text-center text-xs font-bold mb-2'>Supporting document</p>
                                                <FormikControl
                                                    control='file'
                                                    type='file'
                                                    id="tansacs.file"
                                                    name="tansacs.file"
                                                    formik={formik}
                                                    label="upload"
                                                />

                                            </div>
                                        </div>
                                    </div>
                                    <div className='lg:col-span-3 col-span-12'>
                                        <div className="grid grid-cols-7 gap-1">

                                            <div className="col-span-2">
                                                <p className='text-center text-sm font-bold mb-2'>TSU</p>
                                            </div>
                                            <div className="col-span-2">

                                                <p className='text-start text-xs font-bold mb-2'>Enter Years</p>

                                                <FormikControl
                                                    control='input'
                                                    type='text'
                                                    name='tsu.year'
                                                    label="NO OF YEARS"
                                                    placeholder="NO OF YEARS"
                                                />
                                            </div>

                                            <div className='col-span-3'>
                                                <p className='text-center text-xs font-bold mb-2'>Supporting document</p>
                                                <FormikControl
                                                    control='file'
                                                    type='file'
                                                    id="tsu.file"
                                                    name="tsu.file"
                                                    formik={formik}
                                                    label="upload"
                                                />

                                            </div>
                                        </div>
                                    </div>




                                </div>
                                <p className='text-xs text-start text-black mt-2 font-bold'><small className='font-bold text-red-600'>note : </small>  Only for the existing employees of NACO/TANSACS/TSU</p>
                            </div>
                        </div>

                        <div className='w-full flex justify-around'>
                            <Link to={'/jobs'} className="px-4 py-1 block group relative  w-max overflow-hidden rounded-lg bg-red-600 text-sm font-semibold text-white">
                                Cancel
                                <div className="absolute inset-0 h-full w-full scale-0 rounded-lg transition-all duration-300 group-hover:scale-100 group-hover:bg-white/30"></div>
                            </Link>

                            <button type='submit' className="px-4 py-1 block group relative  w-max overflow-hidden rounded-lg bg-red-600 text-sm font-semibold text-white" >Submit
                                <div className="absolute inset-0 h-full w-full scale-0 rounded-lg transition-all duration-300 group-hover:scale-100 group-hover:bg-white/30"></div>
                            </button>
                        </div>


                    </Form>
                )}


            </Formik>
        </>
    );

}

export default AssistantDirectorIEC;