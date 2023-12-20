import React from 'react'
import { Formik, Form, useFormik, FieldArray } from 'formik';
import * as Yup from 'yup'
import FormikControl from '../formcomponents/formcontrol'
import { Link } from 'react-router-dom'
import CommForm from './CommForm';
import { DMDO_pg, DMDO_ug, DMDO_experience } from '../initialValues/DMDOqualification';
import { DATA_MONITORING_OFFICER } from '../initialValues/JobPost'

function DataMonitoringDocumentationOfficer() {


   return (
      <CommForm position={DATA_MONITORING_OFFICER} ug={DMDO_ug} pg={DMDO_pg} exp={DMDO_experience} />
   )

}

export default DataMonitoringDocumentationOfficer;