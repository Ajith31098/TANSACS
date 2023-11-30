import "../../css/preview.css"
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import axios from 'axios';
import { connect } from 'react-redux'
import { APPLICANT_DETAIL } from "../endpoints/admin/AdminEndPoints";

import LoadingComponent from "../basecomponents/loading";

function Preview(props) {

  const { userId } = useParams()

  const { isLoading, data } = useQuery("applicant-detail", () => {
    return axios.get(APPLICANT_DETAIL(userId), {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `token ${props.token}`
      }
    })
  })

  if (isLoading) {

    <LoadingComponent />
  }


  return (
    <>

      {console.log(data?.data)}

      <div className="form-container w-full  flex flex-col justify-center items-center">
        <h1>TAMILNADU STATE AIDS CONTROL SOCIETY (TANSACS)</h1>


        <div className="w-4/5 ">

          <p className="text-white bg-red-600 py-2 font-bold">Personal Details</p>

          <div className="flex w-full my-5">
            <div className="w-1/2 flex flex-col gap-5">
              <div className="flex w-full justify-center items-center gap-3">
                <p className="w-1/2 text-start ">UNIQUE ID</p>
                <p className="w-1/2 text-start shadow-lg rounded-md p-2">TAN 76765</p>
              </div>
              <div className="flex w-full justify-center items-center gap-3">
                <p className="w-1/2 text-start">SELECTED JOB POSTING</p>
                <p className="w-1/2 text-start shadow-lg rounded-md p-2">TAN 76765</p>
              </div>
              <div className="flex w-full justify-center items-center gap-3">
                <p className="w-1/2 text-start">NAME OF APPLICANT</p>
                <p className="w-1/2 text-start shadow-lg rounded-md p-2">TAN 76765</p>
              </div>
              <div className="flex w-full justify-center items-center gap-3">
                <p className="w-1/2 text-start">DATE OF BIRTH</p>
                <p className="w-1/2 text-start shadow-lg rounded-md p-2">TAN 76765</p>
              </div>
              <div className="flex w-full justify-center items-center gap-3">
                <p className="w-1/2 text-start">AGE</p>
                <p className="w-1/2 text-start shadow-lg rounded-md p-2">TAN 76765</p>
              </div>
              <div className="flex w-full justify-center items-center gap-3">
                <p className="w-1/2 text-start">GENDER</p>
                <p className="w-1/2 text-start shadow-lg rounded-md p-2">TAN 76765</p>
              </div>
              <div className="flex w-full justify-center items-center gap-3">
                <p className="w-1/2 text-start">MAIL ID</p>
                <p className="w-1/2 text-start shadow-lg rounded-md p-2">TAN 76765</p>
              </div>
              <div className="flex w-full justify-center items-center gap-3">
                <p className="w-1/2 text-start">FATHER NAME</p>
                <p className="w-1/2 text-start shadow-lg rounded-md p-2">TAN 76765</p>
              </div>
              <div className="flex w-full justify-center items-center gap-3">
                <p className="w-1/2 text-start">AADHAR CARD</p>
                <p className="w-1/2 text-start shadow-lg rounded-md p-2">TAN 76765</p>
              </div>
              <div className="flex w-full justify-center items-center gap-3">
                <p className="w-1/2 text-start">EMERGENCY CONTACT NUMBER</p>
                <p className="w-1/2 text-start shadow-lg rounded-md p-2">TAN 76765</p>
              </div>
              <div className="flex w-full justify-center items-center gap-3">
                <p className="w-1/2 text-start">UNIQUE ID</p>
                <p className="w-1/2 text-start shadow-lg rounded-md p-2">TAN 76765</p>
              </div>
            </div>
            <div className="w-1/2">
              profile
            </div>
          </div>


        </div>

        
      </div>



    </>
  );
}

const mapStateToProps = state => {


  return {

    // isLogin : state.login.isLogin,
    // isSuperuser:state.login.is_superuser,
    token: state.login.token
  }
}

export default connect(mapStateToProps)(Preview);