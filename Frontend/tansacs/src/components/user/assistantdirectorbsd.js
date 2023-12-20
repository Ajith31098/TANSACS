import React from 'react'
import { Formik, Form, useFormik, FieldArray } from 'formik';
import * as Yup from 'yup'
import FormikControl from '../formcomponents/formcontrol'
import { Link } from 'react-router-dom'
import CommForm from './CommForm';
import { AssistantDirector_BSD_ug, AssistantDirector_BSD_pg, AssistantDirector_BSD_experience } from '../initialValues/AD_ICTCqualification';
import { ASSISTANT_ICTC_DIRECTOR } from '../initialValues/JobPost'

function AssistantDirectorBSD(props) {


    return (

        <CommForm position={ASSISTANT_ICTC_DIRECTOR} ug={AssistantDirector_BSD_ug} pg={AssistantDirector_BSD_pg} exp={AssistantDirector_BSD_experience} />
    )

}

export default AssistantDirectorBSD;