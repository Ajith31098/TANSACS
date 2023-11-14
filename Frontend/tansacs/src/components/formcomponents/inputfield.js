import React ,{ useState } from 'react'
import {useField, Field, ErrorMessage } from 'formik'
import TextError from './texterror'
// import TextField from '@material-ui/core/TextField';
import TextField from '@mui/material/TextField';


function Input (props) {
  const { label, name, ...rest } = props
  const [field, meta] = useField(name);
  
  return (
      <>
    <Field name={name}>
      {({ field, meta }) => (
        <>
          <TextField
            {...field}
            {...rest}
            size="small"
            error={meta.touched && meta.error ? true : false}
            className = { 'shadow-md font-bold border border-2 w-full py-1 px-2 rounded focus:outline-none focus:border-sky-400  border-gray-300 '}
            InputProps={{
              inputProps: {
                // className: 'text-sm fond-bold',
                style: {
                  fontSize: '11px',
                },
              },
              
            }}
          />
        </>
      )}
    </Field>
    <ErrorMessage component={TextError} name={name} />
   


    </>
  )
}

export default Input

      {/* <Field id={name} name={name} type={type} {...rest}  className = { `text-sm shadow-md border border-2 w-full py-1 px-2 rounded focus:outline-none focus:border-sky-400 ${meta.touched && meta.error ? ' border-red-400 ' : 'border-gray-300 '}`} /> */}


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
