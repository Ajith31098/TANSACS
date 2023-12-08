import "../../css/preview.css"
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import axios from 'axios';
import { connect } from 'react-redux'
import { APPLICANT_DETAIL } from "../endpoints/admin/AdminEndPoints";

import LoadingComponent from "../basecomponents/loading";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { useEffect } from "react";
import { useNavigate } from 'react-router-dom'


function Preview(props) {

  const { userId } = useParams()
  const navigate = useNavigate()


  const { isLoading, data, isError, error } = useQuery("applicant-detail", () => {
    return axios.get(APPLICANT_DETAIL(userId), {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `token ${props.token}`
      }
    })
  })

  useEffect(() => {



    if (props.isLogin && !props.isSuperuser) {
      navigate('tansacs/jobs')
    }

    if (!props.isLogin) {
      navigate('/')
    }

  }, [props.isLogin]);



  if (isLoading) {

    return (
      <LoadingComponent />
    )
  }

  if (isError) {
    if (error.response.status === 404) {
      navigate('/page_not_found')
    }
    else {
      navigate(navigate("/server_error_500"))
    }
  }

  const handleDownloadPDF = async (event, imageUrl) => {
    // event.preventDefault();
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = url;
      link.download = 'download.png'; // Set the default name for downloaded images as "download.png"
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      // console.error('Error downloading the file:', error);
      // Handle error, if any
    }
  };



  if (data) {




    return (
      <>

        {console.log(data.data)}

        <div className="form-container w-full  flex flex-col justify-center items-center">
          <h1 className="lg:text-[40px] md:text-[35px] text-[25px] text-custom-red font-bold mb-14">TAMILNADU STATE AIDS CONTROL SOCIETY (TANSACS)</h1>


          <div className="w-4/5 ">

            <div className="w-full flex flex-wrap justify-between my-4">
              <div className="md:w-1/2 w-full">
                <div className="flex w-full justify-start items-center text-sm font-bold gap-3">
                  <p className=" text-start text-sm font-bold">APPLICATION NUMBER</p>
                  <p className=" text-start box-shadow rounded-md text-sm font-bold p-2">{data.data.application_id}</p>
                </div>
              </div>
              <div className="md:w-1/2 w-full md:mt-0 mt-5">
                <div className="flex w-full lg:justify-end justify-start items-center text-sm font-bold gap-3">
                  <p className=" text-start text-sm font-bold">OVERALL SCORE</p>
                  <p className=" text-start box-shadow rounded-md text-sm font-bold p-2">{data.data?.mark} / 100</p>
                </div>
              </div>
            </div>

            <div className="my-3">
              <p className="text-white text-start px-4 bg-custom-red py-2 font-bold">Personal Details</p>

              <div className="flex flex-wrap w-full my-5">
                <div className="lg:w-3/5 lg:order-1 order-2 w-full flex flex-col gap-5">
                  <div className="flex w-full justify-center items-center text-sm font-bold gap-3">
                    <p className="w-1/2 text-start text-sm font-bold">UNIQUE ID</p>
                    <p className="w-1/2 text-start box-shadow rounded-md text-sm font-bold p-2">{data.data.application_id}</p>
                  </div>
                  <div className="flex w-full justify-center items-center gap-3">
                    <p className="w-1/2 text-start text-sm font-bold">SELECTED JOB POSTING</p>
                    <p className="w-1/2 text-start box-shadow rounded-md text-sm font-bold p-2">{data.data?.position}</p>
                  </div>
                  <div className="flex w-full justify-center items-center gap-3">
                    <p className="w-1/2 text-start text-sm font-bold">NAME OF APPLICANT</p>
                    <p className="w-1/2 text-start box-shadow rounded-md text-sm font-bold p-2">{data.data?.user_profile.first_name + data.data?.user_profile.last_name}</p>
                  </div>
                  <div className="flex w-full justify-center items-center gap-3">
                    <p className="w-1/2 text-start text-sm font-bold">DATE OF BIRTH</p>
                    <p className="w-1/2 text-start box-shadow rounded-md text-sm font-bold p-2">{data.data?.user_profile.DOB}</p>
                  </div>
                  <div className="flex w-full justify-center items-center gap-3">
                    <p className="w-1/2 text-start text-sm font-bold">AGE</p>
                    <p className="w-1/2 text-start box-shadow rounded-md text-sm font-bold p-2">{data.data?.user_profile.age}</p>
                  </div>
                  <div className="flex w-full justify-center items-center gap-3">
                    <p className="w-1/2 text-start text-sm font-bold">GENDER</p>
                    <p className="w-1/2 text-start box-shadow rounded-md text-sm font-bold p-2">{data.data?.user_profile.gender}</p>
                  </div>
                  <div className="flex w-full justify-center items-center gap-3">
                    <p className="w-1/2 text-start text-sm font-bold">MAIL ID</p>
                    <p className="w-1/2 text-start box-shadow rounded-md text-sm font-bold p-2">{data.data?.user_profile.email}</p>
                  </div>
                  <div className="flex w-full justify-center items-center gap-3">
                    <p className="w-1/2 text-start text-sm font-bold">FATHER NAME</p>
                    <p className="w-1/2 text-start box-shadow rounded-md text-sm font-bold p-2">{data.data?.user_profile.guardian_name}</p>
                  </div>
                  <div className="flex w-full justify-center items-center gap-3">
                    <p className="w-1/2 text-start text-sm font-bold">AADHAR CARD</p>
                    <p className="w-1/2 text-start box-shadow rounded-md text-sm font-bold p-2">{data.data?.user_profile.aadhar}</p>
                  </div>
                  <div className="flex w-full justify-center items-center gap-3">
                    <p className="w-1/2 text-start text-sm font-bold">EMERGENCY CONTACT NUMBER</p>
                    <p className="w-1/2 text-start box-shadow rounded-md text-sm font-bold p-2">TAN 76765</p>
                  </div>

                </div>

                <div className="lg:w-2/5  w-full lg:order-2 order-1 mb-5  flex flex-col  items-center">
                  <img src={data.data.user_profile.profile_image} alt="profile image" className="ms-5 w-28 h-28" />
                </div>
              </div>
            </div>



            <div className="my-3">
              <p className="text-white text-start px-4 bg-custom-red py-2 font-bold">Permenent Address</p>

              <div className="flex w-full flex-wrap my-5">
                <div className="lg:w-3/5 w-full flex flex-col gap-5">
                  <div className="flex w-full justify-center items-center text-sm font-bold gap-3">
                    <p className="w-1/2 text-start text-sm font-bold">ADDRESS LINE 1</p>
                    <p className="w-1/2 text-start box-shadow rounded-md text-sm font-bold p-2">{data.data.address[0].address_line1}</p>
                  </div>
                  <div className="flex w-full justify-center items-center gap-3">
                    <p className="w-1/2 text-start text-sm font-bold">STATE</p>
                    <p className="w-1/2 text-start box-shadow rounded-md text-sm font-bold p-2">{data.data.address[0].state}</p>
                  </div>
                  <div className="flex w-full justify-center items-center gap-3">
                    <p className="w-1/2 text-start text-sm font-bold">DISTRICT</p>
                    <p className="w-1/2 text-start box-shadow rounded-md text-sm font-bold p-2">{data.data.address[0].district}</p>
                  </div>
                  <div className="flex w-full justify-center items-center gap-3">
                    <p className="w-1/2 text-start text-sm font-bold">TOWN/TALUK/CITY</p>
                    <p className="w-1/2 text-start box-shadow rounded-md text-sm font-bold p-2">{data.data.address[0].city}</p>
                  </div>
                  <div className="flex w-full justify-center items-center gap-3">
                    <p className="w-1/2 text-start text-sm font-bold">PINCODE</p>
                    <p className="w-1/2 text-start box-shadow rounded-md text-sm font-bold p-2">{data.data.address[0].pincode}</p>
                  </div>


                </div>


              </div>
            </div>


            <div className="my-3">
              <p className="text-white text-start px-4 bg-custom-red py-2 font-bold">Education Details</p>

              <div className="flex  flex-wrap w-full my-5" >
                <div className="lg:w-1/2 w-full p-3" >
                  <div className="p-3 flex flex-col  gap-5" style={{
                    boxShadow:
                      "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px",
                  }}>

                    <div className="flex w-full justify-center items-center text-sm font-bold gap-3" >
                      <p className="w-1/2 text-start text-sm font-bold">S.S.L.C REGISTER NUMBER</p>
                      <p className="w-1/2 text-start box-shadow rounded-md text-sm font-bold p-2">{data.data.sslc.register_number}</p>
                    </div>
                    <div className="flex w-full justify-center items-center gap-3">
                      <p className="w-1/2 text-start text-sm font-bold">MONTH /YEAR OF PASSING</p>
                      <p className="w-1/2 text-start box-shadow rounded-md text-sm font-bold p-2">{data.data.sslc.year}</p>
                    </div>
                    <div className="flex w-full justify-center items-center gap-3">
                      <p className="w-1/2 text-start text-sm font-bold">TYPE OF BOARD</p>
                      <p className="w-1/2 text-start box-shadow rounded-md text-sm font-bold p-2">{data.data.sslc.board}</p>
                    </div>
                    <div className="flex w-full justify-center items-center gap-3">
                      <p className="w-1/2 text-start text-sm font-bold">PERCENTAGE</p>
                      <p className="w-1/2 text-start box-shadow rounded-md text-sm font-bold p-2">{data.data.sslc.percentage}</p>
                    </div>

                    {/* <a  target='_blank' href={data.data.sslc.marksheet} target="_blank" download onClick={(e) => handleDownloadPDF(e, data.data.sslc.marksheet)}>
                      <button className="text-custom-red underline font-bold text-base">Marksheet</button>
                    </a> */}
                    <a target='_blank' href={data.data.sslc.marksheet} download >
                      <button className="text-custom-red underline font-bold text-base">Marksheet</button>
                    </a>

                  </div>
                </div>
                <div className="lg:w-1/2 w-full  p-3" >
                  <div className="p-3 flex flex-col  gap-5" style={{
                    boxShadow:
                      "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px",
                  }} >

                    <div className="flex w-full justify-center items-center text-sm font-bold gap-3">
                      <p className="w-1/2 text-start text-sm font-bold">H.S.C. REGISTER NUMBER</p>
                      <p className="w-1/2 text-start box-shadow rounded-md text-sm font-bold p-2">{data.data.hsc.register_number}</p>
                    </div>
                    <div className="flex w-full justify-center items-center gap-3">
                      <p className="w-1/2 text-start text-sm font-bold">MONTH /YEAR OF PASSING</p>
                      <p className="w-1/2 text-start box-shadow rounded-md text-sm font-bold p-2">{data.data.hsc.year}</p>
                    </div>
                    <div className="flex w-full justify-center items-center gap-3">
                      <p className="w-1/2 text-start text-sm font-bold">TYPE OF BOARD</p>
                      <p className="w-1/2 text-start box-shadow rounded-md text-sm font-bold p-2">{data.data.hsc.board}</p>
                    </div>
                    <div className="flex w-full justify-center items-center gap-3">
                      <p className="w-1/2 text-start text-sm font-bold">PERCENTAGE</p>
                      <p className="w-1/2 text-start box-shadow rounded-md text-sm font-bold p-2">{data.data.hsc.percentage}</p>
                    </div>
                    <a target='_blank' href={data.data.hsc.marksheet} download="resume.pdf">
                      <button className="text-custom-red underline font-bold text-base">Marksheet</button>
                    </a>
                  </div>





                </div>
                <div className="lg:w-1/2 w-full  p-3">
                  <div className="flex flex-col gap-5 p-3" style={{
                    boxShadow:
                      "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px",
                  }}>

                    <div className="flex w-full justify-center items-center text-sm font-bold gap-3">
                      <p className="w-1/2 text-start text-sm font-bold">UG DEGREE</p>
                      <p className="w-1/2 text-start box-shadow rounded-md text-sm font-bold p-2">{data.data.ug.degree} </p>
                    </div>
                    <div className="flex w-full justify-center items-center gap-3">
                      <p className="w-1/2 text-start text-sm font-bold">UG REGISTER NUMBER</p>
                      <p className="w-1/2 text-start box-shadow rounded-md text-sm font-bold p-2">{data.data.ug.register_number}</p>
                    </div>
                    <div className="flex w-full justify-center items-center gap-3">
                      <p className="w-1/2 text-start text-sm font-bold">MONTH /YEAR OF PASSING</p>
                      <p className="w-1/2 text-start box-shadow rounded-md text-sm font-bold p-2">{data.data.ug.year}</p>
                    </div>
                    <div className="flex w-full justify-center items-center gap-3">
                      <p className="w-1/2 text-start text-sm font-bold">PERCENTAGE</p>
                      <p className="w-1/2 text-start box-shadow rounded-md text-sm font-bold p-2">{data.data.ug.percentage}</p>
                    </div>

                    <a target='_blank' href={data.data.ug.marksheet} download="marksheet.pdf">
                      <button className="text-custom-red underline font-bold text-base">Marksheet</button>
                    </a>
                  </div>

                </div>
                {data.data.pg.map((pg, index) => (

                  <div key={index} className="lg:w-1/2 w-full p-3" >
                    <div className="flex flex-col gap-5 p-3" style={{
                      boxShadow:
                        "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px",
                    }}>

                      <div className="flex w-full justify-center items-center text-sm font-bold gap-3">
                        <p className="w-1/2 text-start text-sm font-bold"> PG DEGREE</p>
                        <p className="w-1/2 text-start box-shadow rounded-md text-sm font-bold p-2">{pg.degree}</p>
                      </div>
                      <div className="flex w-full justify-center items-center gap-3">
                        <p className="w-1/2 text-start text-sm font-bold"> PG REGISTER NUMBER</p>
                        <p className="w-1/2 text-start box-shadow rounded-md text-sm font-bold p-2">{pg.register_number}</p>
                      </div>
                      <div className="flex w-full justify-center items-center gap-3">
                        <p className="w-1/2 text-start text-sm font-bold"> MONTH / YEAR OF PASSING </p>
                        <p className="w-1/2 text-start box-shadow rounded-md text-sm font-bold p-2">{pg.year}</p>
                      </div>
                      <div className="flex w-full justify-center items-center gap-3">
                        <p className="w-1/2 text-start text-sm font-bold"> PERCENTAGE </p>
                        <p className="w-1/2 text-start box-shadow rounded-md text-sm font-bold p-2">{pg.percentage}</p>
                      </div>

                      <a target='_blank' href={pg.marksheet} download="marksheet.pdf">
                        <button className="text-custom-red underline font-bold text-base">Marksheet</button>
                      </a>
                    </div>

                  </div>
                )
                )}
              </div>


            </div>


            <div className="my-3">
              <p className="text-white text-start px-4 bg-custom-red py-2 font-bold">Experience Details</p>
              {data.data.exp.length !== 0 ? (
                <div className="flex w-full my-5">

                  {data.data.exp.map((exp, index) => (


                    <div className="lg:w-1/2 w-full flex flex-col gap-5" key={index}>
                      <div className="flex w-full justify-center items-center text-sm font-bold gap-3">
                        <p className="w-1/2 text-start text-sm font-bold">SELECTED DEGREE</p>
                        <p className="w-1/2 text-start box-shadow rounded-md text-sm font-bold p-2">{exp.degree}</p>
                      </div>
                      <div className="flex w-full justify-center items-center gap-3">
                        <p className="w-1/2 text-start text-sm font-bold">COMPANY NAME</p>
                        <p className="w-1/2 text-start box-shadow rounded-md text-sm font-bold p-2">{exp.company}</p>
                      </div>
                      <div className="flex w-full justify-center items-center gap-3">
                        <p className="w-1/2 text-start text-sm font-bold">EXPERIENCE</p>
                        <p className="w-1/2 text-start box-shadow rounded-md text-sm font-bold p-2">{exp.year}</p>
                      </div>


                    </div>

                  ))}

                </div>
              ) : (
                <p className="m-4 text-start">No Experience</p>
              )}


            </div>

            <div className="w-full my-3 ">
              <p className="text-white text-start px-4 bg-custom-red py-2 font-bold">WorkExperience With in (NACO / TANSACS / TSU )</p>

              <div className=" w-full my-5 flex flex-col gap-5">
                <div className="flex w-full justify-start items-center text-sm font-bold gap-3">
                  <p className="w-1/4 text-start text-sm font-bold">NACO EXPERIENCE : </p>
                  <p className="w-1/4 text-start box-shadow rounded-md text-sm font-bold p-2">{data.data.pexp[0]?.year ? data.data.pexp[0].year : 0} </p>
                  <div className="w-1/4">
                    {data.data.pexp[0]?.certificate ? (

                      <a target='_blank' href={data.data.pexp[0].certificate} download="Certificate.pdf">
                        <button className="text-custom-red underline font-bold text-base">Certificate</button>
                      </a>
                    ) : <p className="font-semibold text-sm">No Certificate</p>}
                  </div>
                  <div className="w-1/4">
                    {data.data.pexp[0]?.NOC ? (

                      <a target='_blank' href={data.data.pexp[0].NOC} download="NOC.pdf">
                        <button className="text-custom-red underline font-bold text-base">NOC</button>
                      </a>
                    ) : <p className="font-semibold text-sm">No NOC</p>}
                  </div>
                </div>
                <div className="flex w-full justify-start items-center gap-3">
                  <p className="w-1/4 text-start text-sm font-bold">TANSAC EXPERENCE :</p>
                  <p className="w-1/4 text-start box-shadow rounded-md text-sm font-bold p-2">{data.data.pexp[1]?.year ? data.data.pexp[1].year : 0}</p>
                  <div className="w-1/4">
                    {data.data.pexp[1]?.certificate ? (

                      <a target='_blank' href={data.data.pexp[1].certificate} download="marksheet.pdf">
                        <button className="text-custom-red underline font-bold text-base">Certificate</button>
                      </a>
                    ) : <p className="font-semibold text-sm">No Certificate</p>}
                  </div>
                  <div className="w-1/4">
                    {data.data.pexp[1]?.NOC ? (

                      <a target='_blank' href={data.data.pexp[1].NOC} download="NOC.pdf">
                        <button className="text-custom-red underline font-bold text-base">NOC</button>
                      </a>
                    ) : <p className="font-semibold text-sm">No NOC</p>}
                  </div>
                </div>
                <div className="flex w-full justify-start items-center gap-3">
                  <p className="w-1/4 text-start text-sm font-bold">TSU EXPERENCE</p>
                  <p className="w-1/4 text-start box-shadow rounded-md text-sm font-bold p-2">{data.data.pexp[2]?.year ? data.data.pexp[2].year : 0}</p>
                  <div className="w-1/4">
                    {data.data.pexp[2]?.certificate ? (

                      <a target='_blank' href={data.data.pexp[2].certificate} download="marksheet.pdf">
                        <button className="text-custom-red underline font-bold text-base">Certificate</button>
                      </a>
                    ) : <p className="font-semibold text-sm">No Certificate</p>}
                  </div>
                  <div className="w-1/4">
                    {data.data.pexp[2]?.NOC ? (

                      <a target='_blank' href={data.data.pexp[2].NOC} download="NOC.pdf">
                        <button className="text-custom-red underline font-bold text-base">NOC</button>
                      </a>
                    ) : <p className="font-semibold text-sm">No NOC</p>}
                  </div>
                </div>




              </div>
            </div>






          </div>


        </div>



      </>
    );
  }
}

const mapStateToProps = state => {


  return {

    isLogin: state.login.isLogin,
    isSuperuser: state.login.is_superuser,
    token: state.login.token
  }
}

export default connect(mapStateToProps)(Preview);