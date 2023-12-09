import React, { useRef, useEffect } from 'react'
import { Formik, Form, Field, FieldArray } from 'formik';
import * as Yup from 'yup'
import FormikControl from '../formcomponents/formcontrol'
import { Link } from 'react-router-dom'
import { useMutation } from 'react-query'
import axios from 'axios'
import LoadingComponent from '../basecomponents/loading'
import { connect } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import SuccessModel from '../basecomponents/SuccessModel';
import ConfrimModal from '../basecomponents/ConfirmationModel';
import { update_jobs, cacel_permission } from '../../redux'


function CommonForm
    (props) {

    const [success, setSuccess] = React.useState(false)
    const navigate = useNavigate()

    const [dataDownload, setdataDownload] = React.useState({ id: 0, applicant_id: 0 })

    const formikRef = useRef()


    useEffect(() => {
        if (!props.permission) {
            navigate('/tansacs/jobs')
        }
        else {
            props.cancel_permission()
        }

    }, [])

    async function ApplicationForm(values) {
        try {
            const response = await axios.post('http://127.0.0.1:8000/jobs/job', values, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `token ${props.token}`
                },
            });

            return response.data;
        } catch (error) {
            // Handle errors here if needed
            // Re-throw the error to be caught by the caller
            setLoading(false)
            navigate('/server_error_500')
            throw error
        }
    }

    const [loading, setLoading] = React.useState(false);


    const mutation = useMutation(ApplicationForm)


    const initialValues = {
        sslc: {
            first_name: '',
            last_name: '',
            register_number: '',
            month: '',
            year: '',
            percentage: '',
            board: '',
            marksheet: ''
        }
        ,
        hsc: {
            first_name: '',
            last_name: '',
            register_number: '',
            month: '',
            year: '',
            percentage: '',
            board: '',
            marksheet: ''
        },
        ug: {
            first_name: '',
            last_name: '',
            register_number: '',
            degree: '',
            department: '',
            month: '',
            year: '',
            percentage: '',
            marksheet: ''
        },

        pg: [
            {
                first_name: '',
                last_name: '',
                register_number: '',
                degree: '',
                department: '',
                month: '',
                year: '',
                percentage: '',
                marksheet: ''
            },
        ],
        experience: [
            {
                degree: '', company: '', year: '', certificate: '', course: ''
            }
        ],
        prefered_experience: [
            {
                company: 'NACO',
                year: '',
                certificate: '',
                NOC: ''

            },
            {
                company: 'TANSACS',
                year: '',
                certificate: '',
                NOC: ''

            },
            {
                company: 'TSU',
                year: '',
                certificate: '',
                NOC: null

            }
        ],
        position: props.position,

    }

    const sslc_hsc_Scheme = Yup.object().shape({
        first_name: Yup.string().required('Required'),
        // last_name: Yup.string().required('Required'),
        register_number: Yup.number().typeError('invalid').required('Required').positive('invalid'),
        percentage: Yup.number()
            .required('Required')
            .typeError("Enter Valid Percentage")
            .positive('positive')

            .max(100, 'Decimal after 2 digits')
            .test(
                'is-decimal',
                'Enter Value with Max 2 Decimals',
                number => /^\d+(\.\d{1,2})?$/.test(String(number))
            ),
        marksheet: Yup.mixed()
            .required('Required')
            .test(
                'fileType',
                'Only PDF files are allowed',
                value => value && (value.type === 'application/pdf')
            )
            .test(
                'fileSize',
                'File too large, should be less than 200KB',
                value => value && value.size <= 200 * 1024 // 200KB in bytes
            ),
        month: Yup.string().required('Required'),
        year: Yup.string().required('Required'),

        board: Yup.string().required('Required'),
    })

    const ug_pg_Schema = Yup.object().shape({
        first_name: Yup.string().required('Required'),
        // last_name: Yup.string().required('Required'),
        degree: Yup.string().required('Required'),
        department: Yup.string().required('Required'),
        register_number: Yup.number().required('Required').positive('Enter valid Register Number'),
        percentage: Yup.number()
            .required('Required')
            .typeError("Enter Valid Percentage")
            .positive('Must be positive')

            .max(100, 'Decimal after 2 digits')
            .test(
                'is-decimal',
                'Enter Value with Max 2 Decimals',
                number => /^\d+(\.\d{1,2})?$/.test(String(number))
            ),
        marksheet: Yup.mixed()
            .required('Required')
            .test(
                'fileType',
                'Only PDF files are allowed',
                value => value && (value.type === 'application/pdf')
            )
            .test(
                'fileSize',
                'File too large, should be less than 200KB',
                value => value && value.size <= 200 * 1024 // 200KB in bytes
            ),
        month: Yup.string().required('Required'),
        year: Yup.string().required('Required'),
    })

    const experienceSchema = Yup.object().shape({
        degree: Yup.string().when(['company', 'year', 'certificate', 'course'], {
            is: (company, year, certificate, course) =>
                !!company || !!year || !!certificate || !!course,
            then: () => Yup.string().required('degree is required'),
            otherwise: () => Yup.string(),
        }),
        company: Yup.string().when(['degree', 'year', 'certificate', 'course'], {
            is: (degree, year, certificate, course) =>
                !!degree || !!year || !!certificate || !!course,
            then: () => Yup.string().required('Company Name is required'),
            otherwise: () => Yup.string(),
        }),
        year: Yup.number().when(['degree', 'company', 'certificate', 'course'], {
            is: (degree, company, certificate, course) =>
                !!degree || !!company || !!certificate || !!course,
            then: () => Yup.number().typeError('Enter Years')
                .required('year is required')
                .positive('Enter a valid number of years')
                .test('length', 'Enter a valid number of years', (val) => val && val.toString().length < 3),
            otherwise: () => Yup.string(),
        }),
        course: Yup.string().when(['degree', 'company', 'certificate', 'year'], {
            is: (degree, company, certificate, year) =>
                !!degree || !!company || !!certificate || !!year,
            then: () => Yup.string().required('Required'),

            otherwise: () => Yup.string(),
        }),
        certificate: Yup.mixed().when(['degree', 'company', 'year', 'course'], {
            is: (degree, company, year, course) =>
                !!degree || !!company || !!year || !!course,
            then: () => Yup.mixed().required('certificate is required').test(
                'fileType',
                'Only  PDF files are allowed',
                value => value && (value.type === 'application/pdf')
            )
                .test(
                    'fileSize',
                    'File too large, should be less than 200KB',
                    value => value && value.size <= 200 * 1024 // 200KB in bytes
                ),
            otherwise: () => Yup.string(),
        }),
    }, [
        ['degree', 'company'],
        ['degree', 'year'],
        ['degree', 'certificate'],
        ['company', 'year'],
        ['company', 'certificate'],
        ['year', 'certificate'],
        ['course', 'certificate'],
        ['year', 'course'],
        ['company', 'course'],
        ['degree', 'course'],
    ])


    const prefered_expereinceSchema = Yup.object().shape({
        year: Yup.number()
            .typeError('Enter a number')
            .positive('Year must be a positive number')
            .when(['certificate'], {
                is: (certificate) => !!certificate,
                then: () => Yup.number()
                    .typeError('Enter a number')
                    .positive('Year must be a positive number')
                    .required('Year is required'),
                otherwise: () => Yup.number(),
            }),
        certificate: Yup.mixed()
            .when(['year'], {
                is: (year) => !!year,
                then: () => Yup.mixed()
                    .required('Certificate is required')
                    .test(
                        'fileType',
                        'Only PDF files are allowed',
                        value => value && (value.type === 'application/pdf')
                    )
                    .test(
                        'fileSize',
                        'File too large, should be less than 200KB',
                        value => value && value.size <= 200 * 1024 // 200KB in bytes
                    ),
                otherwise: () => Yup.string(),
            }),
    }, [
        ['year', 'certificate']
    ])






    const validationSchema = Yup.object({

        sslc: sslc_hsc_Scheme,
        hsc: sslc_hsc_Scheme,
        ug: ug_pg_Schema,
        pg: Yup.array().of(
            ug_pg_Schema
        ),
        experience: Yup.array().of(
            experienceSchema
        ),

        prefered_experience: Yup.array().of(
            prefered_expereinceSchema

        )
    })

    const onSubmit = values => {


        setLoading(true)
        // setLoading(true)


        mutation.mutate(values, {


            onSuccess: (data) => {

                // console.log("success")
                setLoading(false)
                // console.log("success", data)
                setdataDownload(data)
                setSuccess(true)

                props.update_jobs()

            },
            onError: (error) => {


                setLoading(false)
                navigate('/server_error_500')

            },
        })
    }




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
        { key: 'STATE', value: 'State Board' },
        { key: 'CBSE', value: 'CBSE' },
        { key: 'ICSE', value: 'ICSE' },
        { key: 'MATRIC', value: 'Matric' }
    ]

    const ugDegreeOptions = props.ug

    const pgDegreeOptions = props.pg

    const experienceOptions = props.exp

    const ExperienceCoursse = [
        { key: 'Select', value: '' },
        { key: 'UG', value: 'UG' },
        { key: 'PG', value: 'PG' }
    ]





    return (

        <div>
            {loading ? (<LoadingComponent />) : null}
            {success ? (<SuccessModel id={dataDownload.id} applicant_id={dataDownload.applicant_id} />) : null}
            <div className='mt-5'>
                <h4 className='text-custom-red font-bold mb-7  lg:text-[50px] md:text-[40px] text-[35px]'>Tamil Nadu State AIDS Control Society</h4>

                <p className='text-lg my-5 text-start text-custom-red font-bold uppercase'>{props.position}</p>
                <p className='text-lg my-5  text-custom-red underline font-bold'>EDUCATION QUALIFICATION & EXPERIENCE</p>


            </div>


            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
                innerRef={formikRef}

            >
                {(formik) => (
                    <Form

                        className='flex flex-col justify-center items-center'

                    >


                        <Field

                            type="hidden"
                            name="position"

                        />

                        <div className="container font-sans">

                            <div className='w-full mb-5 '>
                                <p className='text-custom-red mb-2 underline text-start font-bold'>S.S.L.C. (10th)</p>
                                <div className='w-full gap-2 grid grid-cols-11 p-4 border-solid border border-gray-400 rounded-md'>
                                    <div className='lg:col-span-3 col-span-12'>
                                        <p className='text-start text-xs font-bold mb-2'>As per S.S.L.C. Certificate: <small className='text-custom-red text-sm'>*</small></p>
                                        <div className="grid grid-cols-4 gap-1">
                                            <div className='col-span-3'>

                                                <FormikControl
                                                    control='input'
                                                    type='text'
                                                    name='sslc.first_name'
                                                    label="NAME OF THE APPLICANT"
                                                    placeholder="NAME OF THE APPLICANT"
                                                />

                                            </div>

                                            <div className='col-span-1'>

                                                <FormikControl
                                                    control='input'
                                                    type='text'
                                                    name='sslc.last_name'
                                                    label="INITIAL"
                                                    placeholder="INITIAL"
                                                />

                                            </div>
                                        </div>
                                    </div>


                                    <div className="lg:col-span-2 col-span-8">
                                        <p className='text-start text-xs font-bold mb-2'>S.S.L.C. Register Number: <small className='text-custom-red text-sm'>*</small></p>
                                        <FormikControl
                                            control='input'
                                            type='text'
                                            name='sslc.register_number'
                                            label="ENTER YOUR REGISTER NUMBER"
                                            placeholder="ENTER YOUR REGISTER NUMBER"
                                        />

                                    </div>

                                    <div className="lg:col-span-2 col-span-12">
                                        <p className='text-start text-xs truncate  font-bold mb-2'>S.S.L.C. Month / Year of Passing: <small className='text-custom-red text-sm'>*</small></p>
                                        <div className="grid grid-cols-4 gap-1">

                                            <div className='col-span-2'>
                                                <FormikControl
                                                    control='select'
                                                    type='select'
                                                    name='sslc.month'
                                                    options={monthOptions}
                                                />


                                            </div>

                                            <div className='col-span-2'>
                                                <FormikControl
                                                    control='select'
                                                    type='select'
                                                    name='sslc.year'
                                                    options={yearOptions}
                                                />

                                            </div>
                                        </div>
                                    </div>
                                    <div className="lg:col-span-1 col-span-6">
                                        <p className='text-start text-xs truncate font-bold mb-2'>Type of Board: <small className='text-custom-red text-sm'>*</small></p>
                                        <FormikControl
                                            control='select'
                                            type='select'
                                            name='sslc.board'
                                            options={boardOptions}
                                        />

                                    </div>
                                    <div className="lg:col-span-1 col-span-6">
                                        <p className='text-start text-xs truncate font-bold mb-2'>Enter Percentage: <small className='text-custom-red text-sm'>*</small></p>
                                        <FormikControl
                                            control='input'
                                            type='text'
                                            name='sslc.percentage'
                                            label="PERCENTAGE"
                                            placeholder="%"
                                        />

                                    </div>

                                    <div className="lg:col-span-2 col-span-4">
                                        <p className='lg:text-center text-start text-xs font-bold mb-2'>Upload Marksheet: <small className='text-custom-red text-sm'>*</small></p>
                                        <FormikControl
                                            control='file'
                                            type='file'
                                            id='sslc.marksheet'
                                            name='sslc.marksheet'
                                            formik={formik}
                                            label="Browse File"
                                        />
                                        <p className='text-[9.6px] px-2 text-custom-red textb mt-2'>Note: The uploaded file must be less than 200KB and only in .pdf formats.</p>


                                    </div>


                                </div>
                            </div>

                            <div className='w-full mb-5 '>
                                <p className='text-custom-red underline mb-2 text-start font-bold'>H.S.C. (12th)</p>

                                <div className='w-full  border-solid border border-gray-400 rounded-md gap-1 grid grid-cols-11 p-4'>

                                    <div className='lg:col-span-3 col-span-12'>
                                        <p className='text-start  text-xs font-bold mb-2'>As per H.S.C. Certificate: <small className='text-custom-red text-sm'>*</small></p>
                                        <div className="grid grid-cols-4 gap-1">
                                            <div className='col-span-3'>
                                                <FormikControl
                                                    control='input'
                                                    type='text'
                                                    name='hsc.first_name'
                                                    label="NAME OF THE APPLICANT"
                                                    placeholder="NAME OF THE APPLICANT"
                                                />
                                            </div>

                                            <div className='col-span-1'>
                                                <FormikControl
                                                    control='input'
                                                    type='text'
                                                    name='hsc.last_name'
                                                    label="INITIAL"
                                                    placeholder="INITIAL"
                                                />

                                            </div>
                                        </div>
                                    </div>


                                    <div className="lg:col-span-2 col-span-8">
                                        <p className='text-start text-xs font-bold mb-2'>H.S.C. Register Number: <small className='text-custom-red text-sm'>*</small></p>
                                        <FormikControl
                                            control='input'
                                            type='text'
                                            name='hsc.register_number'
                                            label="ENTER YOUR REGISTER NUMBER"
                                            placeholder="ENTER YOUR REGISTER NUMBER"
                                        />

                                    </div>

                                    <div className="lg:col-span-2 col-span-12">
                                        <p className='text-start text-xs font-bold mb-2'>H.S.C. Month / Year of Passing: <small className='text-custom-red text-sm'>*</small></p>
                                        <div className="grid grid-cols-4 gap-1">

                                            <div className='col-span-2'>
                                                <FormikControl
                                                    control='select'
                                                    type='text'
                                                    name='hsc.month'
                                                    options={monthOptions}
                                                />


                                            </div>

                                            <div className='col-span-2'>
                                                <FormikControl
                                                    control='select'
                                                    type='text'
                                                    name='hsc.year'
                                                    options={yearOptions}
                                                />

                                            </div>
                                        </div>
                                    </div>
                                    <div className="lg:col-span-1 col-span-6">
                                        <p className='text-start text-xs font-bold mb-2'>Type of Board: <small className='text-custom-red text-sm'>*</small></p>
                                        <FormikControl
                                            control='select'
                                            type='text'
                                            name='hsc.board'
                                            options={boardOptions}
                                        />

                                    </div>
                                    <div className="lg:col-span-1 col-span-6">
                                        <p className='text-start text-xs font-bold mb-2'>Enter Percentage: <small className='text-custom-red text-sm'>*</small></p>
                                        <FormikControl
                                            control='input'
                                            type='text'
                                            name='hsc.percentage'
                                            label="ENTER PERCENTAGE"
                                            placeholder="%"
                                        />

                                    </div>

                                    <div className="lg:col-span-2 col-span-4">
                                        <p className='lg:text-center text-start text-xs font-bold mb-2'>Upload Marksheet: <small className='text-custom-red text-sm'>*</small></p>
                                        <FormikControl
                                            control='file'
                                            type='file'
                                            id='hsc.marksheet'
                                            name='hsc.marksheet'
                                            formik={formik}
                                            label="Browse File"
                                        />
                                        <p className='text-[9.6px] px-2 text-custom-red textb mt-2'>Note: The uploaded file must be less than 200KB and only in .pdf formats.</p>

                                    </div>


                                </div>
                            </div>

                            <div className='w-full mb-5 '>
                                <p className='text-custom-red mb-2 underline uppercase text-start font-bold'>UnderGraduate</p>

                                <div className='w-full  border-solid border border-gray-400 rounded-md gap-1 grid grid-cols-11 p-4'>


                                    <div className='lg:col-span-3 col-span-11'>
                                        <div className="grid grid-cols-4 gap-1">
                                            <div className="col-span-4">
                                                <p className='text-start text-xs font-bold mb-2'>Degree: <small className='text-custom-red text-sm'>*</small></p>
                                                <FormikControl
                                                    control='select'
                                                    type='text'
                                                    name='ug.degree'
                                                    options={ugDegreeOptions}
                                                />

                                            </div>
                                            <div className="col-span-4 ">
                                                <p className='text-start text-xs font-bold mb-2'>As per U.G. Certificate: <small className='text-custom-red text-sm'>*</small></p>

                                                <div className="grid grid-cols-4 gap-1">
                                                    <div className='col-span-3'>
                                                        <FormikControl
                                                            control='input'
                                                            type='text'
                                                            name='ug.first_name'
                                                            label="NAME OF APPLICANT"
                                                            placeholder="NAME OF APPLICANT"
                                                        />
                                                    </div>

                                                    <div className='col-span-1'>
                                                        <FormikControl
                                                            control='input'
                                                            type='text'
                                                            name='ug.last_name'
                                                            label="INITIAL"
                                                            placeholder="INITIAL"
                                                        />

                                                    </div>
                                                </div>

                                            </div>



                                        </div>
                                    </div>


                                    <div className=' lg:col-span-6 col-span-11'>
                                        <div className='grid grid-cols-5 gap-1'>
                                            <div className="col-span-5">
                                                <p className='text-start text-xs font-bold mb-2'>Courses / discipline: <small className='text-custom-red text-sm'>*</small></p>

                                                <FormikControl
                                                    control='input'
                                                    type='text'
                                                    name='ug.department'
                                                    label="ENTER YOUR COURSE NAME"
                                                    placeholder="ENTER YOUR COURSE NAME"
                                                />
                                            </div>
                                            <div className="lg:col-span-2 col-span-5">
                                                <p className='text-start text-xs font-bold mb-2'>U.G. Register Number: <small className='text-custom-red text-sm'>*</small></p>
                                                <FormikControl
                                                    control='input'
                                                    type='text'
                                                    name='ug.register_number'
                                                    label="ENTER YOUR REGISTER NUMBER"
                                                    placeholder="ENTER YOUR REGISTER NUMBER"
                                                />
                                            </div>
                                            <div className="lg:col-span-2 col-span-5">

                                                <p className='text-start text-xs font-bold mb-2'>U.G. Month / Year of Passing: <small className='text-custom-red text-sm'>*</small></p>
                                                <div className="grid grid-cols-4 gap-1">

                                                    <div className='col-span-2'>

                                                        <FormikControl
                                                            control='select'
                                                            type='text'
                                                            name='ug.month'
                                                            options={monthOptions}
                                                        />


                                                    </div>

                                                    <div className='col-span-2'>
                                                        <FormikControl
                                                            control='select'
                                                            type='text'
                                                            name='ug.year'
                                                            options={yearOptions}
                                                        />

                                                    </div>
                                                </div>

                                            </div>

                                            <div className="lg:col-span-1 col-span-5">
                                                <p className='text-start text-xs font-bold mb-2'>Enter Percentage: <small className='text-custom-red text-sm'>*</small></p>

                                                <FormikControl
                                                    control='input'
                                                    type='text'
                                                    name='ug.percentage'
                                                    label="PERCENTAGE"
                                                    placeholder="%"
                                                />

                                            </div>
                                        </div>

                                    </div>

                                    <div className="lg:col-span-2 col-span-4">
                                        <p className='lg:text-center text-start text-xs font-bold mb-2'>Upload Marksheet: <small className='text-custom-red text-sm'>*</small></p>
                                        <FormikControl
                                            control='file'
                                            type='file'
                                            id='ug.marksheet'
                                            name='ug.marksheet'
                                            formik={formik}
                                            label="Browse File"
                                        />
                                        <p className='text-[9.6px] px-2 text-custom-red textb mt-2'>Note: The uploaded file must be less than 200KB and only in .pdf formats.</p>

                                    </div>


                                </div>
                            </div>

                            <div className='w-full mb-5 '>
                                <p className='text-custom-red mb-2 underline text-start uppercase font-bold'>postgraduate</p>



                                <FieldArray name='pg'>

                                    {
                                        fieldarrayprops => {
                                            const { push, remove, form } = fieldarrayprops
                                            const { values, validateForm } = form
                                            const { pg } = values
                                            return (
                                                <div className='border-solid border border-gray-400 rounded-md p-4'>
                                                    {
                                                        pg.map((pgdegree, index) => (
                                                            <div key={index} className='w-full   gap-1 grid grid-cols-12'>
                                                                <div className='lg:col-span-3 col-span-12'>

                                                                    <div className="grid grid-cols-4 gap-1">
                                                                        <div className="col-span-4">
                                                                            <p className='text-start text-xs font-bold mb-2'>Degree: <small className='text-custom-red text-sm'>*</small></p>
                                                                            <FormikControl
                                                                                control='select'
                                                                                type='text'
                                                                                name={`pg[${index}].degree`}
                                                                                options={pgDegreeOptions}
                                                                            />

                                                                        </div>
                                                                        <div className="col-span-4">
                                                                            <p className='text-start text-xs font-bold mb-2'>As per P.G. Certificate: <small className='text-custom-red text-sm'>*</small></p>

                                                                            <div className="grid grid-cols-4 gap-1">
                                                                                <div className='col-span-3'>

                                                                                    <FormikControl
                                                                                        control='input'
                                                                                        type='text'
                                                                                        name={`pg[${index}].first_name`}
                                                                                        label="NAME OF APPLICANT"
                                                                                        placeholder="NAME OF APPLICANT"
                                                                                    />

                                                                                </div>

                                                                                <div className='col-span-1'>
                                                                                    <FormikControl
                                                                                        control='input'
                                                                                        type='text'
                                                                                        name={`pg[${index}].last_name`}
                                                                                        label="INITIAL"
                                                                                        placeholder="INITIAL"
                                                                                    />

                                                                                </div>
                                                                            </div>
                                                                        </div>



                                                                    </div>
                                                                </div>
                                                                <div className="lg:col-span-7 col-span-12 grid gap-1 grid-cols-6">


                                                                    <div className="lg:col-span-6 col-span-8">
                                                                        <p className='text-start text-xs font-bold mb-2'>Courses / discipline: <small className='text-custom-red text-sm'>*</small></p>
                                                                        <FormikControl
                                                                            control='input'
                                                                            type='text'
                                                                            name={`pg[${index}].department`}
                                                                            label="ENTER YOUR COURSE NAME"
                                                                            placeholder="ENTER YOUR COURSE NAME"
                                                                        />

                                                                    </div>


                                                                    <div className="lg:col-span-2 col-span-8">
                                                                        <p className='text-start text-xs font-bold mb-2'>P.G. Register Number: <small className='text-custom-red text-sm'>*</small></p>
                                                                        <FormikControl
                                                                            control='input'
                                                                            type='text'
                                                                            name={`pg[${index}].register_number`}
                                                                            label="ENTER YOUR REGISTER NUMBER"
                                                                            placeholder="ENTER YOUR REGISTER NUMBER"
                                                                        />

                                                                    </div>

                                                                    <div className="lg:col-span-2 col-span-12">
                                                                        <p className='text-start text-xs font-bold mb-2'>P.G. Month / Year of Passing: <small className='text-custom-red text-sm'>*</small></p>
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
                                                                        <p className='text-start text-xs font-bold mb-2'>Enter Percentage: <small className='text-custom-red text-sm'>*</small></p>
                                                                        <FormikControl
                                                                            control='input'
                                                                            type='text'
                                                                            name={`pg[${index}].percentage`}
                                                                            label="PERCENTAGE"
                                                                            placeholder="%"
                                                                        />

                                                                    </div>
                                                                </div>

                                                                <div className="lg:col-span-2 col-span-6">
                                                                    <div className="grid col-1 justify-center gap-1">
                                                                        <div>
                                                                            <p className='lg:text-center text-start text-xs font-bold mb-2'>Upload Marksheet: <small className='text-custom-red text-sm'>*</small></p>

                                                                            <FormikControl
                                                                                control='file'
                                                                                type='file'
                                                                                id={`pg[${index}].marksheet`}
                                                                                name={`pg[${index}].marksheet`}
                                                                                formik={formik}
                                                                                label="Browse File"
                                                                            />
                                                                            <p className='text-[9.6px] px-2 text-custom-red textb mt-2'>Note: The uploaded file must be less than 200KB and only in .pdf formats.</p>

                                                                        </div>

                                                                        {
                                                                            index > 0 && (

                                                                                <div className='flex flex-col justify-center items-center'>
                                                                                    <button type='button' onClick={() => remove(index)} className="px-4 py-1 block group relative  w-max overflow-hidden rounded-lg bg-custom-red text-xs font-semibold text-white" >cancel
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
                                                        <button type='button' onClick={() => {
                                                            push({ degree: '', first_name: '', last_name: '', register_number: '', department: '', percentage: '', marksheet: '', month: '', year: '', })

                                                            validateForm()
                                                        }} className="px-4 py-1 block group relative  w-max overflow-hidden rounded-lg bg-custom-red text-xs font-semibold text-white" >ADD
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
                                <p className='text-custom-red mb-2 text-start underline font-bold'>EXPERIENCE CERTIFICATES</p>
                                <FieldArray name='experience'>

                                    {
                                        fieldarrayprops => {
                                            const { push, remove, form } = fieldarrayprops
                                            const { values, validateForm } = form
                                            const { experience } = values
                                            return (
                                                <div className='border-solid border border-gray-400 rounded-md p-4 mb-5'>
                                                    {
                                                        experience.map((experience_cantidate, index) => (
                                                            <div key={index} className='w-full'>

                                                                {/* {formik.errors.experience1 ? <div className='bg-custom-red text-white ms-2 p-2 w-max mt-2 rounded-lg text-start'><p>{formik.errors.experience1}</p></div> : null} */}

                                                                <div className='w-full  gap-1 grid grid-cols-12 p-4'>


                                                                    <div className="lg:col-span-3 col-span-12">
                                                                        <p className='text-start text-xs font-bold mb-2'>Experience Based Work</p>
                                                                        <FormikControl
                                                                            control='select'
                                                                            type='text'
                                                                            name={`experience[${index}].degree`}
                                                                            options={experienceOptions}
                                                                        />

                                                                    </div>


                                                                    <div className="lg:col-span-3 col-span-12">
                                                                        <p className='text-start text-xs font-bold mb-2'>Company Name</p>

                                                                        <FormikControl
                                                                            control='input'
                                                                            type='text'
                                                                            name={`experience[${index}].company`}
                                                                            label="COMPANY NAME"
                                                                            placeholder="COMPANY NAME"
                                                                        />

                                                                    </div>



                                                                    <div className="lg:col-span-2 col-span-6">
                                                                        <p className='text-start text-xs font-bold mb-2'>No. of Year's Experience</p>

                                                                        <FormikControl
                                                                            control='input'
                                                                            type='text'
                                                                            name={`experience[${index}].year`}
                                                                            label="YEARS"
                                                                            placeholder="YEARS"
                                                                        />

                                                                    </div>

                                                                    <div className="lg:col-span-2 col-span-12">
                                                                        <p className='text-start text-xs font-bold mb-2'>Course</p>
                                                                        <FormikControl
                                                                            control='select'
                                                                            type='text'
                                                                            name={`experience[${index}].course`}
                                                                            options={ExperienceCoursse}
                                                                        />

                                                                    </div>


                                                                    <div className="lg:col-span-2 col-span-6">
                                                                        <div className="grid grid-cols-1 justify-center">
                                                                            <div className='col-span-1 flex flex-col justify-center items-center'>
                                                                                <p className='text-start text-xs font-bold mb-2'>Upload Certificate</p>
                                                                                <FormikControl
                                                                                    control='file'
                                                                                    type='file'
                                                                                    id={`experience[${index}].certificate`}
                                                                                    name={`experience[${index}].certificate`}
                                                                                    formik={formik}
                                                                                    label="Browse File"
                                                                                />
                                                                                <p className='text-[9.6px] px-2 text-custom-red textb mt-2'>Note: The uploaded file must be less than 200KB and only in .pdf formats.</p>

                                                                            </div>

                                                                            {
                                                                                index > 0 && (

                                                                                    <div className='mt-2 col-span-1 flex flex-col justify-center items-center'>
                                                                                        <button type='button' onClick={() => remove(index)} className="px-4 py-1 block group relative  w-max overflow-hidden rounded-lg bg-custom-red text-xs font-semibold text-white" >cancel
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
                                                        <button type='button' onClick={() => {
                                                            push({ degree: '', company: '', year: '', certificate: '', course: '' })
                                                            validateForm()
                                                        }} className="px-4 py-1 block group relative  w-max overflow-hidden rounded-lg bg-custom-red text-xs font-semibold text-white" >ADD
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
                                <p className='text-custom-red mb-2 text-start underline font-bold'>WORK EXPERIENCE ( WITHIN NACO / TANSACS / TSU )</p>

                                <div className='w-full  border-solid border border-gray-400 rounded-md gap-1 grid grid-cols-9 p-4'>

                                    <div className='lg:col-span-3 col-span-12'>
                                        <div className="grid grid-cols-7 gap-1">

                                            <div className="col-span-2 ">
                                                <p className='text-center text-sm font-bold mb-2 mt-5'>NACO</p>
                                            </div>
                                            <div className="col-span-2">

                                                <p className='text-start text-xs font-bold mb-2'>Enter Years</p>
                                                <FormikControl
                                                    control='input'
                                                    type='text'
                                                    name='prefered_experience[0].year'
                                                    label="NO OF YEARS"
                                                    placeholder="NO OF YEARS"
                                                />

                                            </div>

                                            <div className='col-span-3'>
                                                <p className='text-center text-xs font-bold mb-2'>Supporting document</p>
                                                <FormikControl
                                                    control='file'
                                                    type='file'
                                                    id="prefered_experience[0].certificate"
                                                    name="prefered_experience[0].certificate"
                                                    formik={formik}
                                                    label="Browse file"
                                                />
                                                <p className='text-[9.6px] px-2 text-custom-red textb mt-2'>Note: The uploaded file must be less than 200KB and only in .pdf formats.</p>

                                            </div>

                                            <div className="col-span-7 mt-3 grid grid-cols-7 justify-center items-center">
                                                <div className="col-span-2"></div>
                                                <div className="col-span-2 ">
                                                    <p className='text-center text-sm font-bold'>NOC Certificate</p>
                                                </div>
                                                <div className="col-span-3 ">
                                                    <FormikControl
                                                        control='file'
                                                        type='file'
                                                        id="prefered_experience[0].NOC"
                                                        name="prefered_experience[0].NOC"
                                                        formik={formik}
                                                        label="Browse file"
                                                    />

                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                    <div className='lg:col-span-3 col-span-12'>
                                        <div className="grid grid-cols-7 gap-1">

                                            <div className="col-span-2">
                                                <p className='text-center text-sm font-bold mb-2  mt-5'>TANSACS</p>
                                            </div>
                                            <div className="col-span-2">

                                                <p className='text-start text-xs font-bold mb-2'>Enter Years</p>
                                                <FormikControl
                                                    control='input'
                                                    type='text'
                                                    name='prefered_experience[1].year'
                                                    label="NO OF YEARS"
                                                    placeholder="NO OF YEARS"
                                                />

                                            </div>

                                            <div className='col-span-3'>
                                                <p className='text-center text-xs font-bold mb-2'>Supporting document</p>
                                                <FormikControl
                                                    control='file'
                                                    type='file'
                                                    id="prefered_experience[1].certificate"
                                                    name="prefered_experience[1].certificate"
                                                    formik={formik}
                                                    label="Browse File"
                                                />
                                                <p className='text-[9.6px] px-2 text-custom-red textb mt-2'>Note: The uploaded file must be less than 200KB and only in .pdf formats.</p>

                                            </div>

                                            <div className="col-span-7 mt-3 grid grid-cols-7 justify-center items-center">
                                                <div className="col-span-2"></div>
                                                <div className="col-span-2 ">
                                                    <p className='text-center text-sm font-bold'>NOC Certificate</p>
                                                </div>
                                                <div className="col-span-3 ">
                                                    <FormikControl
                                                        control='file'
                                                        type='file'
                                                        id="prefered_experience[1].NOC"
                                                        name="prefered_experience[1].NOC"
                                                        formik={formik}
                                                        label="Browse file"
                                                    />

                                                </div>
                                            </div>



                                        </div>
                                    </div>
                                    <div className='lg:col-span-3 col-span-12'>
                                        <div className="grid grid-cols-7 gap-1">

                                            <div className="col-span-2">
                                                <p className='text-center text-sm font-bold mb-2  mt-5'>TSU</p>
                                            </div>
                                            <div className="col-span-2">

                                                <p className='text-start text-xs font-bold mb-2'>Enter Years</p>

                                                <FormikControl
                                                    control='input'
                                                    type='text'
                                                    name='prefered_experience[2].year'
                                                    label="NO OF YEARS"
                                                    placeholder="NO OF YEARS"
                                                />
                                            </div>

                                            <div className='col-span-3'>
                                                <p className='text-center text-xs font-bold mb-2'>Supporting document</p>
                                                <FormikControl
                                                    control='file'
                                                    type='file'
                                                    id="prefered_experience[2].certificate"
                                                    name="prefered_experience[2].certificate"
                                                    formik={formik}
                                                    label="Browse File"
                                                />
                                                <p className='text-[9.6px] px-2 text-custom-red textb mt-2'>Note: The uploaded file must be less than 200KB and only in .pdf formats.</p>

                                            </div>

                                            <div className="col-span-7 mt-3 grid grid-cols-7 justify-center items-center">
                                                <div className="col-span-2"></div>
                                                <div className="col-span-2 ">
                                                    <p className='text-center text-sm font-bold'>NOC Certificate</p>
                                                </div>
                                                <div className="col-span-3 ">
                                                    <FormikControl
                                                        control='file'
                                                        type='file'
                                                        id="prefered_experience[2].NOC"
                                                        name="prefered_experience[2].NOC"
                                                        formik={formik}
                                                        label="Browse file"
                                                    />

                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                    {/* <div className='lg:col-span-3 col-span-12 flex'>
                                            <p className='text-center text-xs font-bold mb-2'>NOC</p>
                                                <FormikControl
                                                    control='file'
                                                    type='file'
                                                    id="NOC"
                                                    name="NOC"
                                                    formik={formik}
                                                    label="upload"
                                                />
                                    </div> */}



                                </div>
                                <p className='text-xs text-start text-black mt-2 font-bold'><small className='font-bold text-custom-red'>note : </small>  Only for the existing employees of NACO/TANSACS/TSU</p>
                            </div>
                        </div>

                        <div className='w-full flex justify-around'>
                            <Link to={'/tansacs/jobs'} className="px-4 py-1 block group relative  w-max overflow-hidden rounded-lg bg-custom-red text-sm font-semibold text-white">
                                Cancel
                                <div className="absolute inset-0 h-full w-full scale-0 rounded-lg transition-all duration-300 group-hover:scale-100 group-hover:bg-white/30"></div>
                            </Link>
                            <ConfrimModal formikRef={formikRef} />

                        </div>


                    </Form>
                )}


            </Formik>
        </div>
    );

}

const mapStateToProps = state => {


    return {

        token: state.login.token,
        permission: state.login.is_permission
    }

}

const mapDispatchToProps = dispatch => {

    return {
        update_jobs: () => dispatch(update_jobs()),
        cancel_permission: () => dispatch(cacel_permission())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(CommonForm
);