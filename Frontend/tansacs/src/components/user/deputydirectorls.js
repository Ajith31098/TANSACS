import React from 'react'
import { Formik, Form, useFormik, FieldArray } from 'formik';
import * as Yup from 'yup'
import FormikControl from '../formcomponents/formcontrol'
import { Link } from 'react-router-dom'; 
import CommForm from './CommForm';
import { DDLS_pg,DDLS_experience,DDLS_ug } from '../initialValues/DD_LSqualification';

function DeputyDirectorLS() {

    return(
        <CommForm position= "Deputy Director (LS)"   ug = {DDLS_ug} pg={DDLS_pg} exp = {DDLS_experience} />
       )

}

export default DeputyDirectorLS;