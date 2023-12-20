import React from 'react'
import { Formik, Form, useFormik, FieldArray } from 'formik';
import * as Yup from 'yup'
import FormikControl from '../formcomponents/formcontrol'
import { Link } from 'react-router-dom'
import CommForm from './CommForm';
import { CSO_experience, CSO_pg, CSO_ug } from '../initialValues/CSOqualification';
import { CLINICAL_OFFICER } from '../initialValues/JobPost'

function ClinicalServiceOfficer() {

    return (

        <CommForm position={CLINICAL_OFFICER} ug={CSO_ug} pg={CSO_pg} exp={CSO_experience} />
    )
}

export default ClinicalServiceOfficer;