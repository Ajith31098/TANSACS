import React from 'react';

import { Navigate, useNavigate } from 'react-router-dom';


const SuccessModal = (props) => {

    const navigate  = useNavigate()



  const redirectButton = () =>{
        navigate('/tansacs/jobs')
  }

  return (
      


      <div
        id="default-modal"
        tabIndex="-1"
        aria-hidden="true"
        style={{ backgroundColor: 'rgba(87, 88, 88, 0.5)' }}
        onClick={redirectButton}
        className=" overflow-y-auto overflow-x-hidden fixed top-0 flex items-start  justify-center right-0 left-0 z-50  w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
      >
        <div className="relative p-4 w-full max-w-2xl max-h-full mt-10">
          <div className="relative bg-white rounded-lg shadow bg-white">
            <div className="flex items-center justify-center p-4 md:p-5  rounded-t ">
              <h3 className="text-xl font-semibold text-gray-900 text-white">
                Success
              </h3>
              
            </div>
            <div className="p-4 md:p-5 space-y-4">
                <p>Application is successful</p>
              
              
            </div>
            <div className="flex items-center justify-center p-4 md:p-5  rounded-b border-gray-600">
               
                <button
                    data-modal-hide="default-modal"
                    type="button"
                    onClick={redirectButton}
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800"
                >
                    OK
                </button>
               

              
            </div>
          </div>
        </div>
      </div>
  );
};




export default SuccessModal;
