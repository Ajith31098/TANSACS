import React from 'react'
import { useFormik } from 'formik';
import * as Yup from 'yup'


function DeputyDirectorForm() {


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
        ugfile: '',
        ugmonth: '',
        ugyear: '',
        ugboard: '',
        pgdegree: '',
        pgfirstname: '',
        pglastname: '',
        pgregisternumber: '',
        pgpercentage: '',
        pgfile: '',
        pgmonth: '',
        pgyear: '',
        pgboard: '',

        experience1: {
            field: '',
            companyname: '',
            experience: '',
            document: ''
        },
        experience2: {
            field: '',
            companyname: '',
            experience: '',
            document: ''
        },
        experience3: {
            field: '',
            companyname: '',
            experience: '',
            document: ''
        }
        ,
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
        sslcfirstname: Yup.string().required('Required'),
        sslclastname: Yup.string().required('Required'),
        sslcregisternumber: Yup.number().required('Required').positive('Must be positive'),
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
        ugregisternumber: Yup.number().required('Required').positive('Must be positive'),
        ugpercentage: Yup.number().required('Required').positive('Must be positive'),
        ugfile: Yup.mixed().required('Required'),//.test('fileSize', 'File too large', value => {
        //   return value && value.size <= 5000000;
        // }),
        ugmonth: Yup.string().required('Required'),
        ugyear: Yup.string().required('Required'),
        ugboard: Yup.string().required('Required'),
        pgdegree: Yup.string().required('Required'),
        pgfirstname: Yup.string().required('Required'),
        pglastname: Yup.string().required('Required'),
        pgregisternumber: Yup.number().required('Required').positive('Must be positive'),
        pgpercentage: Yup.number().required('Required').positive('Must be positive'),
        pgfile: Yup.mixed().required('Required'),//.test('fileSize', 'File too large', value => {
        //   return value && value.size <= 5000000;
        // }),
        pgmonth: Yup.string().required('Required'),
        pgyear: Yup.string().required('Required'),
        pgboard: Yup.string().required('Required'),

        // ...

        experience1: Yup.object().test('fill-all-or-none', 'Fill all fields or none', function (value) {
            const { field, companyname, experience, document } = value;

            // Check if at least one field is filled
            if (field || companyname || experience || document) {
                // Check if all fields are filled, if not, show an error
                if (!(field && companyname && experience && document)) {
                    return this.createError({
                        message: 'Fill all fields or none',
                        path: 'experience1',
                    });
                }
            }

            return true;
        }),

        experience2: Yup.object().test('fill-all-or-none', 'Fill all fields or none', function (value) {
            const { field, companyname, experience, document } = value;

            // Check if at least one field is filled
            if (field || companyname || experience || document) {
                // Check if all fields are filled, if not, show an error
                if (!(field && companyname && experience && document)) {
                    return this.createError({
                        message: 'Fill all fields or none',
                        path: 'experience2',
                    });
                }
            }

            return true;
        }),

        experience3: Yup.object().test('fill-all-or-none', 'Fill all fields or none', function (value) {
            const { field, companyname, experience, document } = value;

            // Check if at least one field is filled
            if (field || companyname || experience || document) {
                // Check if all fields are filled, if not, show an error
                if (!(field && companyname && experience && document)) {
                    return this.createError({
                        message: 'Fill all fields or none',
                        path: 'experience3',
                    });
                }
            }

            return true;
        }),

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
        { key: 'Option 1', value: 'option1' },
        { key: 'Option 2', value: 'option2' },
        { key: 'Option 3', value: 'option3' }
    ]

    const ugDegreeOptions = [
        { key: 'Select', value: '' },
        { key: 'Option 1', value: 'option1' },
        { key: 'Option 2', value: 'option2' },
        { key: 'Option 3', value: 'option3' }
    ]

    const pgDegreeOptions = [
        { key: 'Select', value: '' },
        { key: 'Option 1', value: 'option1' },
        { key: 'Option 2', value: 'option2' },
        { key: 'Option 3', value: 'option3' }
    ]

    const experienceOptions = [
        { key: 'Select', value: '' },
        { key: 'Option 1', value: 'option1' },
        { key: 'Option 2', value: 'option2' },
        { key: 'Option 3', value: 'option3' }
    ]


    return (
        <>
            <form
                onSubmit={formik.handleSubmit}
                className='flex flex-col justify-center items-center'
            >

                <div className="container font-sans">

                    <div className='w-full mb-5 '>
                        <p className='text-red-600 mb-2 text-start font-bold'>S.S.L.C</p>
                        <div className='w-full gap-1 grid grid-cols-12 p-4 border-solid border-2 border-gray-400 rounded-md'>
                            <div className='lg:col-span-4 col-span-12'>
                                <p className='text-start text-sm font-bold mb-2'>As per S.S.L.C Certificate</p>
                                <div className="grid grid-cols-4 gap-1">
                                    <div className='col-span-3'>
                                        <input
                                            id="sslcfirstname"
                                            name="sslcfirstname"
                                            type="text"
                                            className={formik.touched.sslcfirstname && formik.errors.sslcfirstname ? 'border p-2 border-2 border-red-400 w-full rounded focus:border-sky-500 focus:outline-none' : 'border border-2 border-gray-400 w-full rounded p-2 focus:border-sky-500 focus:outline-none'}
                                            placeholder=''
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.sslcfirstname}
                                        />


                                        {formik.touched.sslcfirstname && formik.errors.sslcfirstname ? <div className='bg-red-600 text-white p-2 w-max mt-2 rounded-lg text-start'><p>{formik.errors.sslcfirstname}</p></div> : null}
                                    </div>

                                    <div className='col-span-1'>
                                        <input
                                            id="sslclastname"
                                            name="sslclastname"
                                            type="text"
                                            className={formik.touched.sslclastname && formik.errors.sslclastname ? 'border border-2 border-red-400 w-full rounded p-2 focus:border-sky-500 focus:outline-none' : 'border border-2 border-gray-400 w-full rounded p-2 focus:border-sky-500 focus:outline-none'}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.sslclastname}
                                        />

                                        {formik.touched.sslclastname && formik.errors.sslclastname ? <div className='bg-red-600 text-white p-2 w-max mt-2 rounded-lg text-start'><p>{formik.errors.sslclastname}</p></div> : null}

                                    </div>
                                </div>
                            </div>


                            <div className="lg:col-span-2 col-span-8">
                                <p className='text-start text-sm font-bold mb-2'>S.S.L.C Register Number</p>

                                <input
                                    id="sslcregisternumber"
                                    name="sslcregisternumber"
                                    type="number"
                                    className={formik.touched.sslcregisternumber && formik.errors.sslcregisternumber ? 'border border-2 border-red-400 w-full rounded p-2 focus:border-sky-500 focus:outline-none' : 'border border-2 border-gray-400 w-full rounded p-2 focus:border-sky-500 focus:outline-none'}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.sslcregisternumber}
                                />
                                {formik.touched.sslcregisternumber && formik.errors.sslcregisternumber ? <div className='bg-red-600 text-white p-2 w-max mt-2 rounded-lg text-start'><p>{formik.errors.sslcregisternumber}</p></div> : null}

                            </div>

                            <div className="lg:col-span-2 col-span-12">
                                <p className='text-start text-sm font-bold mb-2'>S.S.L.C Month / Year of Passing</p>
                                <div className="grid grid-cols-4 gap-1">

                                    <div className='col-span-2'>

                                        <select
                                            id="sslcmonth"
                                            name="sslcmonth"
                                            className={formik.touched.sslcmonth && formik.errors.sslcmonth ? 'border border-2 border-red-400 w-full rounded p-2 focus:border-sky-500 focus:outline-none' : 'border border-2 border-gray-400 w-full rounded p-2 focus:border-sky-500 focus:outline-none'}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.sslcmonth}
                                        >
                                            {
                                                monthOptions.map((month, index) => (
                                                    <option key={index} className='font-semibold' value={month.value}>
                                                        {month.key}
                                                    </option>
                                                ))
                                            }
                                        </select>
                                        {formik.touched.sslcmonth && formik.errors.sslcmonth ? <div className='bg-red-600 text-white p-2 w-max mt-2 rounded-lg text-start'><p>{formik.errors.sslcmonth}</p></div> : null}

                                    </div>

                                    <div className='col-span-2'>
                                        <select
                                            id="sslcyear"
                                            name="sslcyear"
                                            className={formik.touched.sslcyear && formik.errors.sslcyear ? 'border border-2 border-red-400 w-full rounded p-2 focus:border-sky-500 focus:outline-none' : 'border border-2 border-gray-400 w-full rounded p-2 focus:border-sky-500 focus:outline-none'}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.sslcyear}
                                        >
                                            {
                                                yearOptions.map((year, index) => (
                                                    <option key={index} className='font-semibold' value={year.value}>
                                                        {year.key}
                                                    </option>
                                                ))
                                            }
                                        </select>
                                        {formik.touched.sslcyear && formik.errors.sslcyear ? <div className='bg-red-600 text-white p-2 w-max mt-2 rounded-lg text-start'><p>{formik.errors.sslcyear}</p></div> : null}

                                    </div>
                                </div>
                            </div>
                            <div className="lg:col-span-1 col-span-6">
                                <p className='text-start text-sm font-bold mb-2'>Type of Board</p>
                                <select
                                    id="sslcboard"
                                    name="sslcboard"
                                    className={formik.touched.sslcboard && formik.errors.sslcboard ? 'border border-2 border-red-400 w-full rounded p-2 focus:border-sky-500 focus:outline-none' : 'border border-2 border-gray-400 w-full rounded p-2 focus:border-sky-500 focus:outline-none'}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.sslcboard}
                                >
                                    {
                                        boardOptions.map((board, index) => (
                                            <option key={index} className='font-semibold' value={board.value}>
                                                {board.key}
                                            </option>
                                        ))
                                    }
                                </select>
                                {formik.touched.sslcboard && formik.errors.sslcboard ? <div className='bg-red-600 text-white p-2 w-max mt-2 rounded-lg text-start'><p>{formik.errors.sslcboard}</p></div> : null}

                            </div>
                            <div className="lg:col-span-2 col-span-6">
                                <p className='text-start text-sm font-bold mb-2'>Enter percentage</p>

                                <input
                                    id="sslcpercentage"
                                    name="sslcpercentage"
                                    type="number"
                                    className={formik.touched.sslcpercentage && formik.errors.sslcpercentage ? 'border border-2 border-red-400 w-full rounded p-2 focus:border-sky-500 focus:outline-none' : 'border border-2 border-gray-400 w-full rounded p-2 focus:border-sky-500 focus:outline-none'}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.sslcpercentage}
                                />
                                {formik.touched.sslcpercentage && formik.errors.sslcpercentage ? <div className='bg-red-600 text-white p-2 w-max mt-2 rounded-lg text-start'><p>{formik.errors.sslcpercentage}</p></div> : null}

                            </div>

                            <div className="lg:col-span-1 col-span-6">
                                <p className='text-start text-sm font-bold mb-2'>Marksheet</p>
                                <div className='relative'>
                                    <label htmlFor="sslcfile" className="bg-gray-600 p-2 rounded-md absolute top-0 start-0 text-white">Upload</label>
                                    <input
                                        id="sslcfile"
                                        name="sslcfile"
                                        className='opacity-0 p-2 w-5'
                                        type="file"
                                        onChange={(event) => {
                                            formik.setFieldValue("sslcfile", event.target.files[0]);
                                        }}
                                        onBlur={formik.handleBlur}
                                    />
                                </div>
                                {formik.values.sslcfile && <p className='mt-2 text-sm'>{formik.values.sslcfile.name}</p>}
                                {formik.touched.sslcfile && formik.errors.sslcfile ? <div className='bg-red-600 text-white p-2 w-max mt-2 rounded-lg text-end'><p>{formik.errors.sslcfile}</p></div> : null}

                            </div>


                        </div>
                    </div>

                    <div className='w-full mb-5 '>
                        <p className='text-red-600 mb-2 text-start font-bold'>H.S.C</p>

                        <div className='w-full  border-solid border-2 border-gray-400 rounded-md gap-1 grid grid-cols-12 p-4'>

                            <div className='lg:col-span-4 col-span-12'>
                                <p className='text-start text-sm font-bold mb-2'>As per H.S.C Certificate</p>
                                <div className="grid grid-cols-4 gap-1">
                                    <div className='col-span-3'>
                                        <input
                                            id="hscfirstname"
                                            name="hscfirstname"
                                            type="text"
                                            className={formik.touched.hscfirstname && formik.errors.hscfirstname ? 'border border-2 border-red-400 w-full rounded p-2 focus:border-sky-500 focus:outline-none' : 'border border-2 border-gray-400 w-full rounded p-2 focus:border-sky-500 focus:outline-none'}
                                            placeholder=''
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.hscfirstname}
                                        />


                                        {formik.touched.hscfirstname && formik.errors.hscfirstname ? <div className='bg-red-600 text-white p-2 w-max mt-2 rounded-lg text-start'><p>{formik.errors.hscfirstname}</p></div> : null}
                                    </div>

                                    <div className='col-span-1'>
                                        <input
                                            id="hsclastname"
                                            name="hsclastname"
                                            type="text"
                                            className={formik.touched.hsclastname && formik.errors.hsclastname ? 'border border-2 border-red-400 w-full rounded p-2 focus:border-sky-500 focus:outline-none' : 'border border-2 border-gray-400 w-full rounded p-2 focus:border-sky-500 focus:outline-none'}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.hsclastname}
                                        />

                                        {formik.touched.hsclastname && formik.errors.hsclastname ? <div className='bg-red-600 text-white p-2 w-max mt-2 rounded-lg text-start'><p>{formik.errors.hsclastname}</p></div> : null}

                                    </div>
                                </div>
                            </div>


                            <div className="lg:col-span-2 col-span-8">
                                <p className='text-start text-sm font-bold mb-2'>H.S.C Register Number</p>

                                <input
                                    id="hscregisternumber"
                                    name="hscregisternumber"
                                    type="number"
                                    className={formik.touched.hscregisternumber && formik.errors.hscregisternumber ? 'border border-2 border-red-400 w-full rounded p-2 focus:border-sky-500 focus:outline-none' : 'border border-2 border-gray-400 w-full rounded p-2 focus:border-sky-500 focus:outline-none'}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.hscregisternumber}
                                />
                                {formik.touched.hscregisternumber && formik.errors.hscregisternumber ? <div className='bg-red-600 text-white p-2 w-max mt-2 rounded-lg text-start'><p>{formik.errors.hscregisternumber}</p></div> : null}

                            </div>

                            <div className="lg:col-span-2 col-span-12">
                                <p className='text-start text-sm font-bold mb-2'>H.S.C Month / Year of Passing</p>
                                <div className="grid grid-cols-4 gap-1">

                                    <div className='col-span-2'>

                                        <select
                                            id="hscmonth"
                                            name="hscmonth"
                                            className={formik.touched.hscmonth && formik.errors.hscmonth ? 'border border-2 border-red-400 w-full rounded p-2 focus:border-sky-500 focus:outline-none' : 'border border-2 border-gray-400 w-full rounded p-2 focus:border-sky-500 focus:outline-none'}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.hscmonth}
                                        >
                                            {
                                                monthOptions.map((month, index) => (
                                                    <option key={index} className='font-semibold' value={month.value}>
                                                        {month.key}
                                                    </option>
                                                ))
                                            }
                                        </select>
                                        {formik.touched.hscmonth && formik.errors.hscmonth ? <div className='bg-red-600 text-white p-2 w-max mt-2 rounded-lg text-start'><p>{formik.errors.hscmonth}</p></div> : null}

                                    </div>

                                    <div className='col-span-2'>
                                        <select
                                            id="hscyear"
                                            name="hscyear"
                                            className={formik.touched.hscyear && formik.errors.hscyear ? 'border border-2 border-red-400 w-full rounded p-2 focus:border-sky-500 focus:outline-none' : 'border border-2 border-gray-400 w-full rounded p-2 focus:border-sky-500 focus:outline-none'}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.hscyear}
                                        >
                                            {
                                                yearOptions.map((year, index) => (
                                                    <option key={index} className='font-semibold' value={year.value}>
                                                        {year.key}
                                                    </option>
                                                ))
                                            }
                                        </select>
                                        {formik.touched.hscyear && formik.errors.hscyear ? <div className='bg-red-600 text-white p-2 w-max mt-2 rounded-lg text-start'><p>{formik.errors.hscyear}</p></div> : null}

                                    </div>
                                </div>
                            </div>
                            <div className="lg:col-span-1 col-span-6">
                                <p className='text-start text-sm font-bold mb-2'>Type of Board</p>
                                <select
                                    id="hscboard"
                                    name="hscboard"
                                    className={formik.touched.hscboard && formik.errors.hscboard ? 'border border-2 border-red-400 w-full rounded p-2 focus:border-sky-500 focus:outline-none' : 'border border-2 border-gray-400 w-full rounded p-2 focus:border-sky-500 focus:outline-none'}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.hscboard}
                                >
                                    {
                                        boardOptions.map((board, index) => (
                                            <option key={index} className='font-semibold' value={board.value}>
                                                {board.key}
                                            </option>
                                        ))
                                    }
                                </select>
                                {formik.touched.hscboard && formik.errors.hscboard ? <div className='bg-red-600 text-white p-2 w-max mt-2 rounded-lg text-start'><p>{formik.errors.hscboard}</p></div> : null}

                            </div>
                            <div className="lg:col-span-2 col-span-6">
                                <p className='text-start text-sm font-bold mb-2'>Enter percentage</p>

                                <input
                                    id="hscpercentage"
                                    name="hscpercentage"
                                    type="number"
                                    className={formik.touched.hscpercentage && formik.errors.hscpercentage ? 'border border-2 border-red-400 w-full rounded p-2 focus:border-sky-500 focus:outline-none' : 'border border-2 border-gray-400 w-full rounded p-2 focus:border-sky-500 focus:outline-none'}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.hscpercentage}
                                />
                                {formik.touched.hscpercentage && formik.errors.hscpercentage ? <div className='bg-red-600 text-white p-2 w-max mt-2 rounded-lg text-start'><p>{formik.errors.hscpercentage}</p></div> : null}

                            </div>

                            <div className="lg:col-span-1 col-span-6">
                                <p className='text-start text-sm font-bold mb-2'>Marksheet</p>
                                <div className='relative'>
                                    <label htmlFor="hscfile" className="bg-gray-600 p-2 rounded-md absolute top-0 start-0 text-white">Upload</label>
                                    <input
                                        id="hscfile"
                                        name="hscfile"
                                        className='opacity-0 p-2 w-5'
                                        type="file"
                                        onChange={(event) => {
                                            formik.setFieldValue("hscfile", event.target.files[0]);
                                        }}
                                        onBlur={formik.handleBlur}
                                    />
                                </div>
                                {formik.values.hscfile && <p className='mt-2 text-sm'>{formik.values.hscfile.name}</p>}
                                {formik.touched.hscfile && formik.errors.hscfile ? <div className='bg-red-600 text-white p-2 w-max mt-2 rounded-lg text-end'><p>{formik.errors.hscfile}</p></div> : null}

                            </div>


                        </div>
                    </div>

                    <div className='w-full mb-5 '>
                        <p className='text-red-600 mb-2 text-start font-bold'>U.G</p>

                        <div className='w-full  border-solid border-2 border-gray-400 rounded-md gap-1 grid grid-cols-12 p-4'>

                            <div className='lg:col-span-4 col-span-12'>
                                <p className='text-start text-sm font-bold mb-2'>As per U.G Certificate</p>
                                <div className="grid grid-cols-4 gap-1">
                                    <div className="col-span-4">
                                        <select
                                            id="ugdegree"
                                            name="ugdegree"
                                            className={formik.touched.ugdegree && formik.errors.ugdegree ? 'border border-2 border-red-400 w-full rounded p-2 focus:border-sky-500 focus:outline-none' : 'border border-2 border-gray-400 w-full rounded p-2 focus:border-sky-500 focus:outline-none'}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.ugdegree}
                                        >
                                            {
                                                ugDegreeOptions.map((degree, index) => (
                                                    <option key={index} className='font-semibold' value={degree.value}>
                                                        {degree.key}
                                                    </option>
                                                ))
                                            }
                                        </select>
                                        {formik.touched.ugdegree && formik.errors.ugdegree ? <div className='bg-red-600 text-white p-2 w-max mt-2 rounded-lg text-start'><p>{formik.errors.ugdegree}</p></div> : null}

                                    </div>
                                    <div className='col-span-3'>
                                        <input
                                            id="ugfirstname"
                                            name="ugfirstname"
                                            type="text"
                                            className={formik.touched.ugfirstname && formik.errors.ugfirstname ? 'border border-2 border-red-400 w-full rounded p-2 focus:border-sky-500 focus:outline-none' : 'border border-2 border-gray-400 w-full rounded p-2 focus:border-sky-500 focus:outline-none'}
                                            placeholder=''
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.ugfirstname}
                                        />


                                        {formik.touched.ugfirstname && formik.errors.ugfirstname ? <div className='bg-red-600 text-white p-2 w-max mt-2 rounded-lg text-start'><p>{formik.errors.ugfirstname}</p></div> : null}
                                    </div>

                                    <div className='col-span-1'>
                                        <input
                                            id="uglastname"
                                            name="uglastname"
                                            type="text"
                                            className={formik.touched.uglastname && formik.errors.uglastname ? 'border border-2 border-red-400 w-full rounded p-2 focus:border-sky-500 focus:outline-none' : 'border border-2 border-gray-400 w-full rounded p-2 focus:border-sky-500 focus:outline-none'}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.uglastname}
                                        />

                                        {formik.touched.uglastname && formik.errors.uglastname ? <div className='bg-red-600 text-white p-2 w-max mt-2 rounded-lg text-start'><p>{formik.errors.uglastname}</p></div> : null}

                                    </div>
                                </div>
                            </div>


                            <div className="lg:col-span-2 col-span-8">
                                <p className='text-start text-sm font-bold mb-2'>U.G Register Number</p>

                                <input
                                    id="ugregisternumber"
                                    name="ugregisternumber"
                                    type="number"
                                    className={formik.touched.ugregisternumber && formik.errors.ugregisternumber ? 'border border-2 border-red-400 w-full rounded p-2 focus:border-sky-500 focus:outline-none' : 'border border-2 border-gray-400 w-full rounded p-2 focus:border-sky-500 focus:outline-none'}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.ugregisternumber}
                                />
                                {formik.touched.ugregisternumber && formik.errors.ugregisternumber ? <div className='bg-red-600 text-white p-2 w-max mt-2 rounded-lg text-start'><p>{formik.errors.ugregisternumber}</p></div> : null}

                            </div>

                            <div className="lg:col-span-2 col-span-12">
                                <p className='text-start text-sm font-bold mb-2'>U.G Month / Year of Passing</p>
                                <div className="grid grid-cols-4 gap-1">

                                    <div className='col-span-2'>

                                        <select
                                            id="ugmonth"
                                            name="ugmonth"
                                            className={formik.touched.ugmonth && formik.errors.ugmonth ? 'border border-2 border-red-400 w-full rounded p-2 focus:border-sky-500 focus:outline-none' : 'border border-2 border-gray-400 w-full rounded p-2 focus:border-sky-500 focus:outline-none'}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.ugmonth}
                                        >
                                            {
                                                monthOptions.map((month, index) => (
                                                    <option key={index} className='font-semibold' value={month.value}>
                                                        {month.key}
                                                    </option>
                                                ))
                                            }
                                        </select>
                                        {formik.touched.ugmonth && formik.errors.ugmonth ? <div className='bg-red-600 text-white p-2 w-max mt-2 rounded-lg text-start'><p>{formik.errors.ugmonth}</p></div> : null}

                                    </div>

                                    <div className='col-span-2'>
                                        <select
                                            id="ugyear"
                                            name="ugyear"
                                            className={formik.touched.ugyear && formik.errors.ugyear ? 'border border-2 border-red-400 w-full rounded p-2 focus:border-sky-500 focus:outline-none' : 'border border-2 border-gray-400 w-full rounded p-2 focus:border-sky-500 focus:outline-none'}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.ugyear}
                                        >
                                            {
                                                yearOptions.map((year, index) => (
                                                    <option key={index} className='font-semibold' value={year.value}>
                                                        {year.key}
                                                    </option>
                                                ))
                                            }
                                        </select>
                                        {formik.touched.ugyear && formik.errors.ugyear ? <div className='bg-red-600 text-white p-2 w-max mt-2 rounded-lg text-start'><p>{formik.errors.ugyear}</p></div> : null}

                                    </div>
                                </div>
                            </div>
                            <div className="lg:col-span-1 col-span-6">
                                <p className='text-start text-sm font-bold mb-2'>Type of Board</p>
                                <select
                                    id="ugboard"
                                    name="ugboard"
                                    className={formik.touched.ugboard && formik.errors.ugboard ? 'border border-2 border-red-400 w-full rounded p-2 focus:border-sky-500 focus:outline-none' : 'border border-2 border-gray-400 w-full rounded p-2 focus:border-sky-500 focus:outline-none'}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.ugboard}
                                >
                                    {
                                        boardOptions.map((board, index) => (
                                            <option key={index} className='font-semibold' value={board.value}>
                                                {board.key}
                                            </option>
                                        ))
                                    }
                                </select>
                                {formik.touched.ugboard && formik.errors.ugboard ? <div className='bg-red-600 text-white p-2 w-max mt-2 rounded-lg text-start'><p>{formik.errors.ugboard}</p></div> : null}

                            </div>
                            <div className="lg:col-span-2 col-span-6">
                                <p className='text-start text-sm font-bold mb-2'>Enter percentage</p>

                                <input
                                    id="ugpercentage"
                                    name="ugpercentage"
                                    type="number"
                                    className={formik.touched.ugpercentage && formik.errors.ugpercentage ? 'border border-2 border-red-400 w-full rounded p-2 focus:border-sky-500 focus:outline-none' : 'border border-2 border-gray-400 w-full rounded p-2 focus:border-sky-500 focus:outline-none'}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.ugpercentage}
                                />
                                {formik.touched.ugpercentage && formik.errors.ugpercentage ? <div className='bg-red-600 text-white p-2 w-max mt-2 rounded-lg text-start'><p>{formik.errors.ugpercentage}</p></div> : null}

                            </div>

                            <div className="lg:col-span-1 col-span-6">
                                <p className='text-start text-sm font-bold mb-2'>Marksheet</p>
                                <div className='relative'>
                                    <label htmlFor="ugfile" className="bg-gray-600 p-2 rounded-md absolute top-0 start-0 text-white">Upload</label>
                                    <input
                                        id="ugfile"
                                        name="ugfile"
                                        className='opacity-0 p-2 w-5'
                                        type="file"
                                        onChange={(event) => {
                                            formik.setFieldValue("ugfile", event.target.files[0]);
                                        }}
                                        onBlur={formik.handleBlur}
                                    />
                                </div>
                                {formik.values.ugfile && <p className='mt-2 text-sm'>{formik.values.ugfile.name}</p>}
                                {formik.touched.ugfile && formik.errors.ugfile ? <div className='bg-red-600 text-white p-2 w-max mt-2 rounded-lg text-end'><p>{formik.errors.ugfile}</p></div> : null}

                            </div>


                        </div>
                    </div>

                    <div className='w-full mb-5 '>
                        <p className='text-red-600 mb-2 text-start font-bold'>P.G</p>

                        <div className='w-full  border-solid border-2 border-gray-400 rounded-md gap-1 grid grid-cols-12 p-4'>

                            <div className='lg:col-span-4 col-span-12'>
                                <p className='text-start text-sm font-bold mb-2'>As per P.G Certificate</p>
                                <div className="grid grid-cols-4 gap-1">
                                    <div className="col-span-4">
                                        <select
                                            id="pgdegree"
                                            name="pgdegree"
                                            className={formik.touched.pgdegree && formik.errors.pgdegree ? 'border border-2 border-red-400 w-full rounded p-2 focus:border-sky-500 focus:outline-none' : 'border border-2 border-gray-400 w-full rounded p-2 focus:border-sky-500 focus:outline-none'}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.pgdegree}
                                        >
                                            {
                                                pgDegreeOptions.map((degree, index) => (
                                                    <option key={index} className='font-semibold' value={degree.value}>
                                                        {degree.key}
                                                    </option>
                                                ))
                                            }
                                        </select>
                                        {formik.touched.pgdegree && formik.errors.pgdegree ? <div className='bg-red-600 text-white p-2 w-max mt-2 rounded-lg text-start'><p>{formik.errors.pgdegree}</p></div> : null}

                                    </div>
                                    <div className='col-span-3'>
                                        <input
                                            id="pgfirstname"
                                            name="pgfirstname"
                                            type="text"
                                            className={formik.touched.pgfirstname && formik.errors.pgfirstname ? 'border border-2 border-red-400 w-full rounded p-2 focus:border-sky-500 focus:outline-none' : 'border border-2 border-gray-400 w-full rounded p-2 focus:border-sky-500 focus:outline-none'}
                                            placeholder=''
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.pgfirstname}
                                        />


                                        {formik.touched.pgfirstname && formik.errors.pgfirstname ? <div className='bg-red-600 text-white p-2 w-max mt-2 rounded-lg text-start'><p>{formik.errors.pgfirstname}</p></div> : null}
                                    </div>

                                    <div className='col-span-1'>
                                        <input
                                            id="pglastname"
                                            name="pglastname"
                                            type="text"
                                            className={formik.touched.pglastname && formik.errors.pglastname ? 'border border-2 border-red-400 w-full rounded p-2 focus:border-sky-500 focus:outline-none' : 'border border-2 border-gray-400 w-full rounded p-2 focus:border-sky-500 focus:outline-none'}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.pglastname}
                                        />

                                        {formik.touched.pglastname && formik.errors.pglastname ? <div className='bg-red-600 text-white p-2 w-max mt-2 rounded-lg text-start'><p>{formik.errors.pglastname}</p></div> : null}

                                    </div>
                                </div>
                            </div>


                            <div className="lg:col-span-2 col-span-8">
                                <p className='text-start text-sm font-bold mb-2'>P.G Register Number</p>

                                <input
                                    id="pgregisternumber"
                                    name="pgregisternumber"
                                    type="number"
                                    className={formik.touched.pgregisternumber && formik.errors.pgregisternumber ? 'border border-2 border-red-400 w-full rounded p-2 focus:border-sky-500 focus:outline-none' : 'border border-2 border-gray-400 w-full rounded p-2 focus:border-sky-500 focus:outline-none'}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.pgregisternumber}
                                />
                                {formik.touched.pgregisternumber && formik.errors.pgregisternumber ? <div className='bg-red-600 text-white p-2 w-max mt-2 rounded-lg text-start'><p>{formik.errors.pgregisternumber}</p></div> : null}

                            </div>

                            <div className="lg:col-span-2 col-span-12">
                                <p className='text-start text-sm font-bold mb-2'>P.G Month / Year of Passing</p>
                                <div className="grid grid-cols-4 gap-1">

                                    <div className='col-span-2'>

                                        <select
                                            id="pgmonth"
                                            name="pgmonth"
                                            className={formik.touched.pgmonth && formik.errors.pgmonth ? 'border border-2 border-red-400 w-full rounded p-2 focus:border-sky-500 focus:outline-none' : 'border border-2 border-gray-400 w-full rounded p-2 focus:border-sky-500 focus:outline-none'}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.pgmonth}
                                        >
                                            {
                                                monthOptions.map((month, index) => (
                                                    <option key={index} className='font-semibold' value={month.value}>
                                                        {month.key}
                                                    </option>
                                                ))
                                            }
                                        </select>
                                        {formik.touched.pgmonth && formik.errors.pgmonth ? <div className='bg-red-600 text-white p-2 w-max mt-2 rounded-lg text-start'><p>{formik.errors.pgmonth}</p></div> : null}

                                    </div>

                                    <div className='col-span-2'>
                                        <select
                                            id="pgyear"
                                            name="pgyear"
                                            className={formik.touched.pgyear && formik.errors.pgyear ? 'border border-2 border-red-400 w-full rounded p-2 focus:border-sky-500 focus:outline-none' : 'border border-2 border-gray-400 w-full rounded p-2 focus:border-sky-500 focus:outline-none'}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.pgyear}
                                        >
                                            {
                                                yearOptions.map((year, index) => (
                                                    <option key={index} className='font-semibold' value={year.value}>
                                                        {year.key}
                                                    </option>
                                                ))
                                            }
                                        </select>
                                        {formik.touched.pgyear && formik.errors.pgyear ? <div className='bg-red-600 text-white p-2 w-max mt-2 rounded-lg text-start'><p>{formik.errors.pgyear}</p></div> : null}

                                    </div>
                                </div>
                            </div>
                            <div className="lg:col-span-1 col-span-6">
                                <p className='text-start text-sm font-bold mb-2'>Type of Board</p>
                                <select
                                    id="pgboard"
                                    name="pgboard"
                                    className={formik.touched.pgboard && formik.errors.pgboard ? 'border border-2 border-red-400 w-full rounded p-2 focus:border-sky-500 focus:outline-none' : 'border border-2 border-gray-400 w-full rounded p-2 focus:border-sky-500 focus:outline-none'}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.pgboard}
                                >
                                    {
                                        boardOptions.map((board, index) => (
                                            <option key={index} className='font-semibold' value={board.value}>
                                                {board.key}
                                            </option>
                                        ))
                                    }
                                </select>
                                {formik.touched.pgboard && formik.errors.pgboard ? <div className='bg-red-600 text-white p-2 w-max mt-2 rounded-lg text-start'><p>{formik.errors.pgboard}</p></div> : null}

                            </div>
                            <div className="lg:col-span-2 col-span-6">
                                <p className='text-start text-sm font-bold mb-2'>Enter percentage</p>

                                <input
                                    id="pgpercentage"
                                    name="pgpercentage"
                                    type="number"
                                    className={formik.touched.pgpercentage && formik.errors.pgpercentage ? 'border border-2 border-red-400 w-full rounded p-2 focus:border-sky-500 focus:outline-none' : 'border border-2 border-gray-400 w-full rounded p-2 focus:border-sky-500 focus:outline-none'}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.pgpercentage}
                                />
                                {formik.touched.pgpercentage && formik.errors.pgpercentage ? <div className='bg-red-600 text-white p-2 w-max mt-2 rounded-lg text-start'><p>{formik.errors.pgpercentage}</p></div> : null}

                            </div>

                            <div className="lg:col-span-1 col-span-6">
                                <p className='text-start text-sm font-bold mb-2'>Marksheet</p>
                                <div className='relative'>
                                    <label htmlFor="pgfile" className="bg-gray-600 p-2 rounded-md absolute top-0 start-0 text-white">Upload</label>
                                    <input
                                        id="pgfile"
                                        name="pgfile"
                                        className='opacity-0 p-2 w-5'
                                        type="file"
                                        onChange={(event) => {
                                            formik.setFieldValue("pgfile", event.target.files[0]);
                                        }}
                                        onBlur={formik.handleBlur}
                                    />
                                </div>
                                {formik.values.pgfile && <p className='mt-2 text-sm'>{formik.values.pgfile.name}</p>}
                                {formik.touched.pgfile && formik.errors.pgfile ? <div className='bg-red-600 text-white p-2 w-max mt-2 rounded-lg text-end'><p>{formik.errors.pgfile}</p></div> : null}

                            </div>


                        </div>
                    </div>


                    <div className='w-full mb-5 '>
                        <p className='text-red-600 mb-2 text-start font-bold'>EXPERIENCE CERTIFICATE</p>

                        <div className='w-full mb-5  border-solid border-2 border-gray-400 rounded-md'>
                            {formik.errors.experience1 ? <div className='bg-red-600 text-white ms-2 p-2 w-max mt-2 rounded-lg text-start'><p>{formik.errors.experience1}</p></div> : null}

                            <div className='w-full  gap-1 grid grid-cols-12 p-4'>


                                <div className="lg:col-span-4 col-span-12">
                                    <p className='text-start text-sm font-bold mb-2'>Feild</p>

                                    <select
                                        id="experience1.field"
                                        name="experience1.field"
                                        className='border border-2 border-gray-400 w-full rounded p-2 focus:border-sky-500 focus:outline-none'
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.experience1?.field}
                                    >
                                        {
                                            experienceOptions.map((month, index) => (
                                                <option key={index} className='font-semibold' value={month.value}>
                                                    {month.key}
                                                </option>
                                            ))
                                        }
                                    </select>
                                </div>


                                <div className="lg:col-span-4 col-span-12">
                                    <p className='text-start text-sm font-bold mb-2'>Company Name</p>

                                    <input
                                        id="experience1.companyname"
                                        name="experience1.companyname"
                                        type='text'
                                        className='border border-2 border-gray-400 w-full rounded p-2 focus:border-sky-500 focus:outline-none'
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.experience1?.companyname}


                                    />

                                </div>
                                <div className="lg:col-span-2 col-span-6">
                                    <p className='text-start text-sm font-bold mb-2'>Experience</p>

                                    <input
                                        id="experience1.experience"
                                        name="experience1.experience"
                                        type="number"
                                        className='border border-2 border-gray-400 w-full rounded p-2 focus:border-sky-500 focus:outline-none'
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.experience1?.experience}
                                    />

                                </div>

                                <div className="lg:col-span-1 col-span-6">
                                    <p className='text-start text-sm font-bold mb-2'>Marksheet</p>
                                    <div className='relative'>
                                        <label htmlFor="experience1.document" className="bg-gray-600 p-2 rounded-md absolute top-0 start-0 text-white">Upload</label>
                                        <input
                                            id="experience1.document"
                                            name="experience1.document"
                                            className='opacity-0 p-2 w-5'
                                            type="file"
                                            onChange={(event) => {
                                                formik.setFieldValue("experience1.document", event.target.files[0]);
                                            }}
                                            onBlur={formik.handleBlur}
                                        />
                                    </div>
                                    {formik.values.experience1?.document && <p className='mt-2 text-sm'>{formik.values.experience1.document.name}</p>}

                                </div>


                            </div>
                        </div>

                        <div className='w-full mb-5  border-solid border-2 border-gray-400 rounded-md'>
                            {formik.errors.experience2 ? <div className='bg-red-600 text-white ms-2 p-2 w-max mt-2 rounded-lg text-start'><p>{formik.errors.experience2}</p></div> : null}

                            <div className='w-full  gap-1 grid grid-cols-12 p-4'>


                                <div className="lg:col-span-4 col-span-12">
                                    <p className='text-start text-sm font-bold mb-2'>Feild</p>

                                    <select
                                        id="experience2.field"
                                        name="experience2.field"
                                        className='border border-2 border-gray-400 w-full rounded p-2 focus:border-sky-500 focus:outline-none'
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.experience2?.field}
                                    >
                                        {
                                            experienceOptions.map((month, index) => (
                                                <option key={index} className='font-semibold' value={month.value}>
                                                    {month.key}
                                                </option>
                                            ))
                                        }
                                    </select>
                                </div>


                                <div className="lg:col-span-4 col-span-12">
                                    <p className='text-start text-sm font-bold mb-2'>Company Name</p>

                                    <input
                                        id="experience2.companyname"
                                        name="experience2.companyname"
                                        type='text'
                                        className='border border-2 border-gray-400 w-full rounded p-2 focus:border-sky-500 focus:outline-none'
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.experience2?.companyname}


                                    />

                                </div>
                                <div className="lg:col-span-2 col-span-6">
                                    <p className='text-start text-sm font-bold mb-2'>Experience</p>

                                    <input
                                        id="experience2.experience"
                                        name="experience2.experience"
                                        type="number"
                                        className='border border-2 border-gray-400 w-full rounded p-2 focus:border-sky-500 focus:outline-none'
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.experience2?.experience}
                                    />

                                </div>

                                <div className="lg:col-span-1 col-span-6">
                                    <p className='text-start text-sm font-bold mb-2'>Marksheet</p>
                                    <div className='relative'>
                                        <label htmlFor="experience2.document" className="bg-gray-600 p-2 rounded-md absolute top-0 start-0 text-white">Upload</label>
                                        <input
                                            id="experience2.document"
                                            name="experience2.document"
                                            className='opacity-0 p-2 w-5'
                                            type="file"
                                            onChange={(event) => {
                                                formik.setFieldValue("experience2.document", event.target.files[0]);
                                            }}
                                            onBlur={formik.handleBlur}
                                        />
                                    </div>
                                    {formik.values.experience2?.document && <p className='mt-2 text-sm'>{formik.values.experience2.document.name}</p>}

                                </div>


                            </div>
                        </div>

                        <div className='w-full mb-5  border-solid border-2 border-gray-400 rounded-md'>
                            {formik.errors.experience3 ? <div className='bg-red-600 text-white ms-2 p-2 w-max mt-2 rounded-lg text-start'><p>{formik.errors.experience3}</p></div> : null}

                            <div className='w-full  gap-1 grid grid-cols-12 p-4'>


                                <div className="lg:col-span-4 col-span-12">
                                    <p className='text-start text-sm font-bold mb-2'>Feild</p>

                                    <select
                                        id="experience3.field"
                                        name="experience3.field"
                                        className='border border-2 border-gray-400 w-full rounded p-2 focus:border-sky-500 focus:outline-none'
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.experience3?.field}
                                    >
                                        {
                                            experienceOptions.map((month, index) => (
                                                <option key={index} className='font-semibold' value={month.value}>
                                                    {month.key}
                                                </option>
                                            ))
                                        }
                                    </select>
                                </div>


                                <div className="lg:col-span-4 col-span-12">
                                    <p className='text-start text-sm font-bold mb-2'>Company Name</p>

                                    <input
                                        id="experience3.companyname"
                                        name="experience3.companyname"
                                        type='text'
                                        className='border border-2 border-gray-400 w-full rounded p-2 focus:border-sky-500 focus:outline-none'
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.experience3?.companyname}


                                    />

                                </div>
                                <div className="lg:col-span-2 col-span-6">
                                    <p className='text-start text-sm font-bold mb-2'>Experience</p>

                                    <input
                                        id="experience3.experience"
                                        name="experience3.experience"
                                        type="number"
                                        className='border border-2 border-gray-400 w-full rounded p-2 focus:border-sky-500 focus:outline-none'
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.experience3?.experience}
                                    />

                                </div>

                                <div className="lg:col-span-1 col-span-6">
                                    <p className='text-start text-sm font-bold mb-2'>Marksheet</p>
                                    <div className='relative'>
                                        <label htmlFor="experience3.document" className="bg-gray-600 p-2 rounded-md absolute top-0 start-0 text-white">Upload</label>
                                        <input
                                            id="experience3.document"
                                            name="experience3.document"
                                            className='opacity-0 p-2 w-5'
                                            type="file"
                                            onChange={(event) => {
                                                formik.setFieldValue("experience3.document", event.target.files[0]);
                                            }}
                                            onBlur={formik.handleBlur}
                                        />
                                    </div>
                                    {formik.values.experience3?.document && <p className='mt-2 text-sm'>{formik.values.experience3.document.name}</p>}

                                </div>


                            </div>
                        </div>

                    </div>

                    <div className='w-full mb-5 '>

                        <div className='w-full  border-solid border-2 border-gray-400 rounded-md gap-1 grid grid-cols-9 p-4'>

                            <div className='lg:col-span-3 col-span-12'>
                                <div className="grid grid-cols-6 gap-1">

                                    <div className="col-span-1">
                                        <p className='text-start text-sm font-bold mb-2'>NACO</p>
                                    </div>
                                    <div className="col-span-2">

                                        <p className='text-start text-sm font-bold mb-2'>Enter Years</p>

                                        <input
                                            id="naco.year"
                                            name="naco.year"
                                            type="text"
                                            className={formik.touched.naco?.year && formik.errors.naco?.year ? 'border border-2 border-red-400 w-full rounded p-2 focus:border-sky-500 focus:outline-none' : 'border border-2 border-gray-400 w-full rounded p-2 focus:border-sky-500 focus:outline-none'}
                                            placeholder=''
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.naco?.year}
                                        />


                                        {formik.touched.naco?.year && formik.errors.naco?.year ? <div className='bg-red-600 text-white p-2 w-max mt-2 rounded-lg text-start'><p>{formik.errors.naco?.year}</p></div> : null}
                                    </div>

                                    <div className='col-span-2'>
                                        <p className='text-start text-sm font-bold mb-2'>Supporting document</p>
                                        <div className='relative'>
                                            <label htmlFor="naco.file" className="bg-gray-600 p-2 rounded-md absolute top-0 start-0 text-white">Upload</label>
                                            <input
                                                id="naco.file"
                                                name="naco.file"
                                                className='opacity-0 p-2 w-5'
                                                type="file"
                                                onChange={(event) => {
                                                    formik.setFieldValue("naco?.file", event.target.files[0]);
                                                }}
                                                onBlur={formik.handleBlur}
                                            />
                                        </div>
                                        {formik.values.naco?.file && <p className='mt-2 text-sm'>{formik.values.naco?.file.name}</p>}
                                        {formik.touched.naco?.file && formik.errors.naco?.file ? <div className='bg-red-600 text-white p-2 w-max mt-2 rounded-lg text-end'><p>{formik.errors.naco?.file}</p></div> : null}
                                    </div>
                                </div>
                            </div>
                            <div className='lg:col-span-3 col-span-12'>
                                <div className="grid grid-cols-6 gap-1">

                                    <div className="col-span-1">
                                        <p className='text-start text-sm font-bold mb-2'>TANSACS</p>
                                    </div>
                                    <div className="col-span-2">

                                        <p className='text-start text-sm font-bold mb-2'>Enter Years</p>

                                        <input
                                            id="tansacs.year"
                                            name="tansacs.year"
                                            type="text"
                                            className={formik.touched.tansacs?.year && formik.errors.tansacs?.year ? 'border border-2 border-red-400 w-full rounded p-2 focus:border-sky-500 focus:outline-none' : 'border border-2 border-gray-400 w-full rounded p-2 focus:border-sky-500 focus:outline-none'}
                                            placeholder=''
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.tansacs?.year}
                                        />


                                        {formik.touched.tansacs?.year && formik.errors.tansacs?.year ? <div className='bg-red-600 text-white p-2 w-max mt-2 rounded-lg text-start'><p>{formik.errors.tansacs?.year}</p></div> : null}
                                    </div>

                                    <div className='col-span-2'>
                                        <p className='text-start text-sm font-bold mb-2'>Supporting document</p>
                                        <div className='relative'>
                                            <label htmlFor="tansacs.file" className="bg-gray-600 p-2 rounded-md absolute top-0 start-0 text-white">Upload</label>
                                            <input
                                                id="tansacs.file"
                                                name="tansacs.file"
                                                className='opacity-0 p-2 w-5'
                                                type="file"
                                                onChange={(event) => {
                                                    formik.setFieldValue("tansacs?.file", event.target.files[0]);
                                                }}
                                                onBlur={formik.handleBlur}
                                            />
                                        </div>
                                        {formik.values.tansacs?.file && <p className='mt-2 text-sm'>{formik.values.tansacs?.file.name}</p>}
                                        {formik.touched.tansacs?.file && formik.errors.tansacs?.file ? <div className='bg-red-600 text-white p-2 w-max mt-2 rounded-lg text-end'><p>{formik.errors.tansacs?.file}</p></div> : null}
                                    </div>
                                </div>
                            </div>
                            <div className='lg:col-span-3 col-span-12'>
                                <div className="grid grid-cols-6 gap-1">

                                    <div className="col-span-1">
                                        <p className='text-start text-sm font-bold mb-2'>TSU</p>
                                    </div>
                                    <div className="col-span-2">

                                        <p className='text-start text-sm font-bold mb-2'>Enter Years</p>

                                        <input
                                            id="tsu.year"
                                            name="tsu.year"
                                            type="text"
                                            className={formik.touched.tsu?.year && formik.errors.tsu?.year ? 'border border-2 border-red-400 w-full rounded p-2 focus:border-sky-500 focus:outline-none' : 'border border-2 border-gray-400 w-full rounded p-2 focus:border-sky-500 focus:outline-none'}
                                            placeholder=''
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.tsu?.year}
                                        />


                                        {formik.touched.tsu?.year && formik.errors.tsu?.year ? <div className='bg-red-600 text-white p-2 w-max mt-2 rounded-lg text-start'><p>{formik.errors.tsu?.year}</p></div> : null}
                                    </div>

                                    <div className='col-span-2'>
                                        <p className='text-start text-sm font-bold mb-2'>Supporting document</p>
                                        <div className='relative'>
                                            <label htmlFor="tsu.file" className="bg-gray-600 p-2 rounded-md absolute top-0 start-0 text-white">Upload</label>
                                            <input
                                                id="tsu.file"
                                                name="tsu.file"
                                                className='opacity-0 p-2 w-5'
                                                type="file"
                                                onChange={(event) => {
                                                    formik.setFieldValue("tsu?.file", event.target.files[0]);
                                                }}
                                                onBlur={formik.handleBlur}
                                            />
                                        </div>
                                        {formik.values.tsu?.file && <p className='mt-2 text-sm'>{formik.values.tsu?.file.name}</p>}
                                        {formik.touched.tsu?.file && formik.errors.tsu?.file ? <div className='bg-red-600 text-white p-2 w-max mt-2 rounded-lg text-end'><p>{formik.errors.tsu?.file}</p></div> : null}
                                    </div>
                                </div>
                            </div>




                        </div>
                    </div>
                </div>

                <div className='w-full flex justify-around'>
                    <button type='submit' className="px-4 block group relative  w-max overflow-hidden rounded-lg bg-red-600 text-lg font-semibold text-white" >Canel
                        <div className="absolute inset-0 h-full w-full scale-0 rounded-lg transition-all duration-300 group-hover:scale-100 group-hover:bg-white/30"></div>
                    </button>

                    <button type='submit' className="px-4 block group relative  w-max overflow-hidden rounded-lg bg-red-600 text-lg font-semibold text-white" >Sumit
                        <div className="absolute inset-0 h-full w-full scale-0 rounded-lg transition-all duration-300 group-hover:scale-100 group-hover:bg-white/30"></div>
                    </button>
                </div>

            </form>
        </>
    );
}

export default DeputyDirectorForm;