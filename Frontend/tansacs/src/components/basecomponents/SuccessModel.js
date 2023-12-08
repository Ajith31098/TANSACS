import React from 'react';
import DoneIcon from '@mui/icons-material/Done';
import { Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios'


const SuccessModal = (props) => {

  const navigate = useNavigate()



  const redirectButton = () => {
    navigate('/tansacs/jobs')
  }

  const handleDownload = async (productId) => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/jobs/download/${productId}`, {
        responseType: 'blob',  // Important for handling PDF download
      });
      console.log("success");
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', "application summary.pdf");
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error('Error downloading the file:', error);
    }
  };

  return (



    <div
      id="default-modal"
      tabIndex="-1"
      aria-hidden="true"
      onClick={redirectButton}
      className=" overflow-y-auto overflow-x-hidden fixed top-0 flex items-start  justify-center right-0 left-0 z-50  w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
    >
      <div className="relative p-10  w-[500px] h-[350px] mt-10">
        <div className="relative w-full h-full p-4 rounded-sm shadow bg-custom-choco  relative">
          <DoneIcon className='p-2 absolute start-1/2 top-0 -translate-y-2/4 -translate-x-2/4 bg-custom-red rounded-full text-white customFormSubmitsuccess mb-5' />
          <div className="flex items-center justify-center p-4 md:p-5  rounded-t ">
            <h3 className="text-3xl font-semibold mt-3">
              Success
            </h3>

          </div>
          <div className="p-4 md:p-2 space-y-2">
            <p>Your application is successfully submited - Application ID </p>
            <p className='text-xl font-bold'>{props.applicant_id}</p>

          </div>
          <div className="flex items-center justify-between p-4 md:p-5  rounded-b border-gray-600">
            <button
              onClick={redirectButton}

              data-modal-hide="default-modal"
              type="button"
              className="w-[100px] py-1 px-4 block group relative w-max overflow-hidden rounded-lg bg-red-600 text-sm font-semibold text-white"
            >
              Done
              <div className="absolute inset-0 h-full w-full scale-0 rounded-lg transition-all duration-300 group-hover:scale-100 group-hover:bg-white/30"></div>

            </button>
            <button
              onClick={() => handleDownload(props.id)}
              data-modal-hide="default-modal"
              type="button"
              className="w-[100px] py-1 px-4 block group relative  w-max overflow-hidden rounded-lg bg-red-600 text-sm font-semibold text-white"
            >
              Download
              <div className="absolute inset-0 h-full w-full scale-0 rounded-lg transition-all duration-300 group-hover:scale-100 group-hover:bg-white/30"></div>

            </button>




          </div>
        </div>
      </div>
    </div>
  );
};




export default SuccessModal;
