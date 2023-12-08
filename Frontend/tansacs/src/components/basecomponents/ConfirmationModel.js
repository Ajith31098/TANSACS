import React, { useState } from 'react';
import { connect } from 'react-redux';
import { exp_age } from '../../redux';
import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred';
import CloseIcon from '@mui/icons-material/Close';

const ConfrimModal = (props) => {


  const [isValid, setisValid] = useState(false)

  const toggleModal = () => {
    const modal = document.getElementById('default-modal');
    modal.classList.toggle('hidden');
    modal.setAttribute('aria-hidden', modal.classList.contains('hidden'));
  };

  const hideModal = () => {
    const modal = document.getElementById('default-modal');
    modal.classList.add('hidden');
    modal.setAttribute('aria-hidden', modal.classList.contains('hidden'));
    setisValid(false)
  };

  const modelSubmitHandle = () => {
    const formValues = props.formikRef.current.values;

    const isFilled = formValues.prefered_experience.some(obj =>
      obj.year !== '' && obj.certificate !== ''
    );

    console.log(isFilled, formValues.prefered_experience)


    if (!isFilled && props.exp_user_age) {
      setisValid(true)
      return; // Stop submitting the form
    }

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
        style={{ backgroundColor: 'rgba(87, 88, 88, 0.7)' }}
        className="hidden overflow-y-auto overflow-x-hidden fixed top-0 flex items-start  justify-center right-0 left-0 z-50  w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
      >
        <div className="relative p-10  w-[500px] h-[300px] mt-10">
          <div className="relative w-full h-full p-4 bg-white rounded-lg shadow bg-white  relative">
            <ReportGmailerrorredIcon className='absolute start-1/2 top-0 -translate-y-2/4 -translate-x-2/4 bg-white rounded-full text-custom-red customFormSubmit mb-5' />

            <div className=' flex justify-end'>
              <CloseIcon onClick={hideModal} />
            </div>
            <div className='p-10'>
              <div>


                <div>
                  {!isValid ? (
                    <p>
                      Check the Form before submit you can not change after submit.
                    </p>

                  ) :

                    (

                      <p>
                        please fill any one tansac exper
                      </p>
                    )
                  }
                </div>
              </div>
              <div className="flex items-center w-full justify-center p-4 md:p-5  rounded-b border-gray-600">





                <button
                  data-modal-hide="default-modal"
                  type="button"
                  className="text-white w-full     font-medium rounded-lg text-sm px-5 py-1 text-center bg-custom-red "
                  onClick={modelSubmitHandle}
                  disabled={isValid}
                >
                  Submit
                </button>



              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};



const mapStateToProps = state => {


  return {

    exp_user_age: state.login.exp_user_age

  }
}

const mapDispatchToProps = dispatch => {

  return {

    exp_age: () => dispatch(exp_age())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ConfrimModal);
