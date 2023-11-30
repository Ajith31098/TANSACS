import React from 'react'
import { Formik, Form, useFormik, FieldArray } from 'formik';
import * as Yup from 'yup'
import FormikControl from '../formcomponents/formcontrol'
import {Link} from 'react-router-dom'
import CommForm from './CommForm';
import { DDSI_pg,DDSI_experience,DDSI_ug } from '../initialValues/DD_SIqualification';

function DeputyDirectorSI() {

    
    return(
        <CommForm position= "Deputy Director (SI)"   ug = {DDSI_ug} pg={DDSI_pg} exp = {DDSI_experience} />
       )
}

export default DeputyDirectorSI;