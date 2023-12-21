import React, { useState } from 'react';
import { Field, useField, ErrorMessage } from 'formik';
import TextError from './texterror'
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const PasswordField = ({ label, name, ...rest }) => {
  const [field, meta] = useField(name);
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <>
      <Field name={name}>
        {({ field, meta }) => (
          <>
            <TextField
              {...field}
              {...rest}
              type={showPassword ? 'text' : 'password'}
              size="small"
              error={meta.touched && meta.error ? true : false}
              autoComplete="new-password"
              className={`text-sm shadow-md border border-2 w-full py-1 px-2 rounded focus:outline-none focus:border-sky-400 ${meta.touched && meta.error ? ' border-red-400 ' : 'border-gray-300 '}`}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={togglePasswordVisibility}
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
                inputProps: {
                  // className: 'text-sm fond-bold',
                  style: {
                    fontSize: '11px',
                    // color: 'black',
                    // opacity: 2.0,
                  },

                },
              }}
            />
          </>
        )}
      </Field>
      <ErrorMessage component={TextError} name={name} />
    </>

  );
};

export default PasswordField;
