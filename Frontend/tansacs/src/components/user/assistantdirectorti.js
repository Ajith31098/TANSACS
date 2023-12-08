import React from 'react'
import { Formik, Form, useFormik, FieldArray } from 'formik';
import * as Yup from 'yup'
import FormikControl from '../formcomponents/formcontrol'
import { Link } from 'react-router-dom'
import CommForm from './CommForm';
import { AssistantDirector_Prevention_pg, AssistantDirector_Prevention_ug, AssistantDirector_Prevention_experience } from '../initialValues/AD_TIqualification';

function AssistantDirectorTI() {

    return (

        <CommForm position='Assistent Director (PREVENTION) /(TI)' ug={AssistantDirector_Prevention_ug} pg={AssistantDirector_Prevention_pg} exp={AssistantDirector_Prevention_experience} />
    )

}

export default AssistantDirectorTI;