import React from 'react'
import { Field, ErrorMessage , useFormikContext} from 'formik'
import TextError from './texterror'

function FileInput (props) {
  const { label, name, ...rest } = props
  const { setFieldValue } = useFormikContext()
  return (
    <div className='flex flex-col items-start justify-start h-full'>
      <div> <label htmlFor={name} className='text-sm font-semibold' >{label}</label>  </div>
      {/* <Field id={name} name={name} {...rest} className='border border-sky-500 w-full rounded p-2 focus:border-sky-500 focus:outline-none'/>
      <ErrorMessage component={TextError} name={name} /> */}
    </div>
  )
}

export default FileInput



