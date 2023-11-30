import React from 'react'
import { Formik, Form,Field,  FieldArray } from 'formik';
import * as Yup from 'yup'
import FormikControl from '../formcomponents/formcontrol'
import {Link} from 'react-router-dom'
import {useMutation } from 'react-query'
import axios from 'axios'
import LoadingComponent from '../basecomponents/loading'
import {connect} from 'react-redux'

import CommForm from './CommForm';
import { CPM_ug,CPM_experience ,CPM_pg } from '../initialValues/CPMqualification';

function ClusterManagerForm(props) {




   return(
    <CommForm position= "Cluster Program Manager"   ug = {CPM_ug} pg={CPM_pg} exp = {CPM_experience} />
   )

   

}


export default ClusterManagerForm;