import React from 'react';
import {connect} from 'react-redux';
import { exp_age} from '../../redux';
import {  useNavigate } from 'react-router-dom';
import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred';

const ConfrimModal = (props) => {

    const navigate  = useNavigate()

  const toggleModal = () => {
    const modal = document.getElementById('default-modal');
    modal.classList.toggle('hidden');
    modal.setAttribute('aria-hidden', modal.classList.contains('hidden'));
  };

  const hideModal = () => {
    const modal = document.getElementById('default-modal');
    modal.classList.add('hidden');
    modal.setAttribute('aria-hidden', modal.classList.contains('hidden'));
  };

  const  modelSubmitHandle  = ()=>{

    props.formikRef && props.formikRef.current && props.formikRef.current.submitForm()

    hideModal()
  }

 

  return (
    <div>
      <button
        data-modal-target="default-modal"
        data-modal-toggle="default-modal"
        className="px-3 py-1 block group relative  w-max overflow-hidden rounded-lg bg-red-600 text-sm font-semibold text-white"
        type="button"
        onClick={toggleModal}
      >
        Submit
        <div className="absolute inset-0 h-full w-full scale-0 rounded-lg transition-all duration-300 group-hover:scale-100 group-hover:bg-white/30"></div>

      </button>


      <div
        id="default-modal"
        tabIndex="-1"
        aria-hidden="true"
        style={{ backgroundColor: 'rgba(87, 88, 88, 0.5)' }}
        className="hidden overflow-y-auto overflow-x-hidden fixed top-0 flex items-start  justify-center right-0 left-0 z-50  w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
      >
        <div className="relative p-4 w-full max-w-2xl max-h-full mt-10">
          <div className="relative bg-white rounded-lg shadow bg-white py-10">

            <div>
                <ReportGmailerrorredIcon className=' text-custom-red customFormSubmit mb-5' />

                <div>
                    <p>
                        Check the Form before submit you can not change after submit.
                    </p>
                </div>
            </div>
            <div className="flex items-center justify-center p-4 md:p-5  rounded-b border-gray-600">

               

               
               
                <button
                    data-modal-hide="default-modal"
                    type="button"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-1 text-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800"
                    onClick={modelSubmitHandle}
                >
                    Submit
                </button>
               

                <button
                onClick={hideModal}
                    data-modal-hide="default-modal"
                    type="button"
                    className="px-5 py-1 block group relative ms-5 w-max overflow-hidden rounded-lg bg-red-600 text-sm font-semibold text-white"
                >
                    Cancel
                    <div className="absolute inset-0 h-full w-full scale-0 rounded-lg transition-all duration-300 group-hover:scale-100 group-hover:bg-white/30"></div>

                </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


const mapDispatchToProps = dispatch =>{

    return {
       
        exp_age : ()=> dispatch(exp_age())
    }
}

export default connect(null , mapDispatchToProps)(ConfrimModal);
