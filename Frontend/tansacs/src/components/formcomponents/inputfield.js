import React, { useState, useEffect } from 'react'
import { useField, FastField, ErrorMessage, Field } from 'formik'
import TextError from './texterror'
// import TextField from '@material-ui/core/TextField';
import TextField from '@mui/material/TextField';
import { useFormikContext } from 'formik';


function Input(props) {
  const { label, name, ...rest } = props
  const [field, meta] = useField(name);
  const applyUppercase = rest.type !== 'email';
  const { isSubmitting, isValidating, errors } = useFormikContext();
  const scrollToFirstError = (errors) => {
    const errorFieldKey = Object.keys(errors)[0]; // Key of the first error
    let fieldSelector;


    // Check if the key is for a nested object
    if (errorFieldKey.includes('.')) {
      // Create a selector for the nested field
      fieldSelector = `[name="${errorFieldKey}"]`;
    } else {
      // Handle arrays or top-level fields


      if (Array.isArray(errors[errorFieldKey])) {


        const firstNonUndefinedIndex = errors[errorFieldKey].findIndex((element) => element !== undefined);
        if (firstNonUndefinedIndex !== -1) {


          const nestedErrorKey = Object.keys(errors[errorFieldKey][firstNonUndefinedIndex])[0];
          // For arrays, select the first element's error
          fieldSelector = `[name="${errorFieldKey}[${firstNonUndefinedIndex}].${nestedErrorKey}"]`;
        }
      } else {
        const nestedErrorKey = Object.keys(errors[errorFieldKey])[0];
        // For objects, select the nested field
        fieldSelector = `[name="${errorFieldKey}.${nestedErrorKey}"]`;
      }
    }

    // Find and scroll to the error field
    const errorField = document.querySelector(fieldSelector);
    if (errorField) {
      errorField.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  };
  useEffect(() => {
    if (isSubmitting && !isValidating && Object.keys(errors).length) {

      scrollToFirstError(errors);
    }
  }, [isSubmitting, isValidating, errors]);

  return (
    <>
      <Field name={name} {...rest} >
        {({ field, meta }) => (

          <>
            {/* {console.log(meta.error && meta.error)} */}
            <TextField
              {...field}
              {...rest}
              size="small"
              error={meta.touched && meta.error ? true : false}
              className={'font-IstokWeb shadow-md font-bold border border-2 w-full py-1 px-2 rounded focus:outline-none focus:border-sky-400  border-gray-300 '}
              InputProps={{
                inputProps: {
                  // className: 'text-sm fond-bold',
                  style: {
                    fontSize: '11px',
                    textTransform: applyUppercase ? 'uppercase' : 'lowercase',
                  },
                  sx: {
                    '&::placeholder': {
                      color: 'black',
                      opacity: .5,
                      textTransform: 'Uppercase',
                    }
                  }

                },

              }
              }
            />
          </>
        )}
      </Field>
      <ErrorMessage component={TextError} name={name} />


    </>
  )
}

export default Input

{/* <Field id={name} name={name} type={type} {...rest}  className = { `text-sm shadow-md border border-2 w-full py-1 px-2 rounded focus:outline-none focus:border-sky-400 ${meta.touched && meta.error ? ' border-red-400 ' : 'border-gray-300 '}`} /> */ }


{/* <TextField
        id={name}
        name={name}
        label={label}
        type={type === 'password' && !showPassword ? 'password' : 'text'}

        {...field}
        {...rest}
        error={meta.touched && meta.error ? true : false}
        size="small"
        className = { 'text-sm shadow-md font-bold border border-2 w-full py-1 px-2 rounded focus:outline-none focus:border-sky-400  border-gray-300 '}
        InputProps={{
          endAdornment:
            type === 'password' ? (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ) : null,
        }}
      /> */}
