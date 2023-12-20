import React from 'react'
import { Formik, Form, Field, FieldArray } from 'formik';
import * as Yup from 'yup'
import FormikControl from '../formcomponents/formcontrol'
import { Link } from 'react-router-dom'
import { useMutation } from 'react-query'
import axios from 'axios'
import LoadingComponent from '../basecomponents/loading'
import { connect } from 'react-redux'

import CommForm from './CommForm';
import { CPM_ug, CPM_experience, CPM_pg } from '../initialValues/CPMqualification';
import { CLUSTER_MANAGER, ASSISTANT_ICTC_DIRECTOR, ASSISTANT_IEC_DIRECTOR, ASSISTANT_TI_DIRECTOR, CLINICAL_OFFICER, DATA_MONITORING_OFFICER, DEPUTY_LS_DIRECTOR, DEPUTY_SI_DIRECTOR } from '../initialValues/JobPost'

function ClusterManagerForm(props) {




   return (
      <CommForm position={CLUSTER_MANAGER} ug={CPM_ug} pg={CPM_pg} exp={CPM_experience} />
   )



}


export default ClusterManagerForm;