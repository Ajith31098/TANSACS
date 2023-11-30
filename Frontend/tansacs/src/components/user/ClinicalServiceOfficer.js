import React from 'react'
import { Formik, Form, useFormik, FieldArray } from 'formik';
import * as Yup from 'yup'
import FormikControl from '../formcomponents/formcontrol'
import {Link} from 'react-router-dom'
import CommForm from './CommForm';
import { CSO_experience,CSO_pg,CSO_ug } from '../initialValues/CSOqualification';

function ClinicalServiceOfficer() {

    return(

        <CommForm position= "Clinical Service Officer"   ug = {CSO_ug} pg={CSO_pg} exp = {CSO_experience} />
    )
}

export default ClinicalServiceOfficer;