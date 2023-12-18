import React from 'react';
import { useField, ErrorMessage, Field } from 'formik';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import TextError from './texterror';

function FormikCheckbox(props) {
    const { label, name, ...rest } = props;
    const [field, meta] = useField(name);

    return (
        <>
            <div className='flex gap-1 items-center'>

                <Field name={name}>
                    {({ field, meta }) => (
                        <FormControlLabel
                            control={
                                <Checkbox
                                    {...field}
                                    {...rest}
                                    checked={field.value}
                                    color="primary"
                                    className={'rounded text-start  focus:outline-none focus:border-sky-400  border-gray-300 '}
                                    size="small"
                                />
                            }

                            label={label}
                        />
                    )}
                </Field>
            </div>
            <ErrorMessage component={TextError} center={false} name={name} />

        </>
    );
}

export default FormikCheckbox;
