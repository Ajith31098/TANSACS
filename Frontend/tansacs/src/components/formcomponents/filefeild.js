import React, { useState } from 'react'
import { useField, Field, ErrorMessage } from 'formik'
import TextError from './texterror'
// import TextField from '@material-ui/core/TextField';
import TextField from '@mui/material/TextField';


function FileInput(props) {
  const { label, name, id, formik, custom, ...rest } = props
  const [field, meta] = useField(name);

  return (
    <>
      <Field name={name}>
        {({ field, meta }) => (
          <>

            <div className='relative flex flex-col items-center'>
              {custom ? (<label htmlFor={id} className="text-[13px] font-Roboto font-semibold w-max border border-custom-red  px-6 py-[7px] absolute top-1/2 start-1/2 -translate-x-2/4 -translate-y-2/4 text-custom-red underline">{label}</label>) :
                <label htmlFor={id} className="text-[13px] font-Roboto font-semibold w-max bg-custom-gray px-6 py-1 rounded-md absolute top-1/2 start-1/2 -translate-x-2/4 -translate-y-2/4 text-white">{label}</label>}

              <TextField
                {...field}
                {...rest}
                id={id}
                size="small"
                error={meta.touched && meta.error ? true : false}
                className="opacity-0 p-2 w-5"
                onChange={(event) => {
                  formik.setFieldValue(name, event.target.files[0]);
                }}
                value=''
                InputProps={{
                  inputProps: {
                    // className: 'text-sm fond-bold',
                    style: {
                      fontSize: '11px',
                    },
                  },

                }}
              />
            </div>
          </>
        )}
      </Field>
      <ErrorMessage component={TextError} center={true} name={name} />

      {field.value && <p className='mt-2 text-xs'>{field.value.name}</p>}


    </>
  )
}
export default FileInput



