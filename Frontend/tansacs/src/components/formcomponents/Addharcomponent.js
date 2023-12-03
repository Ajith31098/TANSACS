import React, { useState, useEffect } from 'react';
import { useField, FastField, ErrorMessage } from 'formik';
import TextField from '@mui/material/TextField';
import TextError from './texterror';

function AddharInput(props) {
    const { label, name, type, ...rest } = props;
    const [field, meta, helpers] = useField(name);
    const [formattedValue, setFormattedValue] = useState(field.value);

    // Function to format Aadhaar number
    const formatAadhaarNumber = (value) => {
        let formattedValue = value.split(' ').join(''); // Remove existing spaces
        if (formattedValue.length > 0) {
            formattedValue = formattedValue.match(new RegExp('.{1,4}', 'g')).join(' '); // Add space after every 4 digits
        }
        return formattedValue;
    };

    // Handle change event
    const handleChange = (e) => {
        let value = e.target.value;
        if (name === 'aadhar') {
            value = formatAadhaarNumber(value);
        }
        setFormattedValue(value);
        helpers.setValue(value);
    };

    // Effect to keep local state in sync with external changes
    useEffect(() => {
        if (name === 'aadhar') {
            setFormattedValue(formatAadhaarNumber(field.value));
        } else {
            setFormattedValue(field.value);
        }
    }, [field.value, name]);

    return (
        <>
            <TextField
                {...field}
                {...rest}
                value={formattedValue}
                onChange={handleChange}
                size="small"
                error={meta.touched && meta.error ? true : false}
                type="number"
                className='font-IstokWeb shadow-md font-IstokWeb font-bold border border-2 w-full py-1 px-2 rounded focus:outline-none focus:border-sky-400  border-gray-300'
                InputProps={{
                    inputProps: {
                        style: {
                            fontSize: '11px',
                        },
                    },
                }}
            />
            <ErrorMessage component={TextError} name={name} />
        </>
    );
}

export default AddharInput;
