import React from 'react'
import { Formik, Form, useFormik, FieldArray } from 'formik';
import * as Yup from 'yup'
import FormikControl from '../formcomponents/formcontrol'
import { Link } from 'react-router-dom'
import CommForm from './CommForm';
import { AssistantDirector_IEC_ug, AssistantDirector_IEC_pg, AssistantDirector_IEC_experience } from '../initialValues/AD_IECqualification';


function AssistantDirectorIEC() {

    return (

        <CommForm position="Assistant Director (IEC)" ug={AssistantDirector_IEC_ug} pg={AssistantDirector_IEC_pg} exp={AssistantDirector_IEC_experience} />
    )
}

export default AssistantDirectorIEC;