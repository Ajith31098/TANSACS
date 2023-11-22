import React from 'react'
import { useField, Field, ErrorMessage } from 'formik'
import TextError from './texterror'
import { FormControl, Select as MuiSelect, FormHelperText, MenuItem, OutlinedInput, FormLabel } from '@mui/material';

function Select(props) {
  const { label, name, options, ...rest } = props
  const [field, meta] = useField(name);
  return (
    <>


      <Field
        name={name}

        {...rest}

      >
        {({ field, meta }) => {
          return (

            <FormControl fullWidth size="small" error={meta.touched && meta.error ? true : false}>
              <FormLabel hidden>

              </FormLabel>
              <MuiSelect
                {...field}
                {...rest}
                className={'shadow-md font-bold border border-2 w-full py-0 px-2 rounded focus:outline-none focus:border-sky-400  border-gray-300 '}
                displayEmpty
                input={<OutlinedInput sx={{ fontSize: '12px', padding: '0px' }} />}


              >
                {
                  options.map((option) => (
                    <MenuItem key={option.value} value={option.value}  >
                      {option.key}
                    </MenuItem>
                  ))
                }
              </MuiSelect>
            </FormControl>
          )
        }}
      </Field>
      <ErrorMessage component={TextError} name={name} />
    </>
  )
}

export default Select


{/* <Field
        as={MuiSelect}
        name={name}
        className={ 'shadow-md font-bold border border-2 w-full py-1 px-2 rounded focus:outline-none focus:border-sky-400  border-gray-300 '}
        
        {...rest}
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.key}
          </MenuItem>
        ))}
    </Field>
    <ErrorMessage component={TextError} name={name} /> */}


