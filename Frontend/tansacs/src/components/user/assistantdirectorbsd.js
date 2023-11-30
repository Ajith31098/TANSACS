import React from 'react'
import { Formik, Form, useFormik, FieldArray } from 'formik';
import * as Yup from 'yup'
import FormikControl from '../formcomponents/formcontrol'
import {Link} from 'react-router-dom'
import CommForm from './CommForm';
import { AssistantDirector_BSD_ug , AssistantDirector_BSD_pg,AssistantDirector_BSD_experience } from '../initialValues/AD_ICTCqualification';

function AssistantDirectorBSD(props) {

   
    return(

        <CommForm position= "Assistent Director (ICTC)"   ug = {AssistantDirector_BSD_ug} pg={AssistantDirector_BSD_pg} exp = {AssistantDirector_BSD_experience} />
    )

}

export default AssistantDirectorBSD;