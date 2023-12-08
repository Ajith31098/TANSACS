import React from 'react';
import { connect } from 'react-redux';
import { exp_age, set_permission } from '../../redux';
import { useNavigate } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import { Link } from 'react-router-dom'


const Modal = (props) => {

  const navigate = useNavigate()

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

  const redirectButton = () => {
    props.exp_age()
    props.set_permission()
    navigate(props.link)
  }

  return (
    <div>
      <button
        data-modal-target="default-modal"
        data-modal-toggle="default-modal"
        className="px-3 py-1 block group relative  w-max overflow-hidden rounded-lg bg-custom-red text-sm font-semibold text-white"
        type="button"
        onClick={toggleModal}
      >
        Apply
        <div className="absolute inset-0 h-full w-full scale-0 rounded-lg transition-all duration-300 group-hover:scale-100 group-hover:bg-white/30"></div>

      </button>


      <div
        id="default-modal"
        tabIndex="-1"
        aria-hidden="true"
        style={{ backgroundColor: 'rgba(87, 88, 88, 0.5)' }}
        className="hidden overflow-y-auto overflow-x-hidden fixed top-0 flex items-start  justify-center right-0 left-0 z-50  w-full md:inset-0 h-[calc(100%)] max-h-full"
      >
        <div className="relative p-10  w-[550px] h-[300px] mt-10">
          <div className="relative w-full h-full p-4 bg-white rounded-lg shadow bg-white  relative">


            <div className=' flex justify-end'>
              <CloseIcon onClick={hideModal} />
            </div>
            <div className="p-4 md:p-5 space-y-4">
              {props.job_count ? (
                <p className="leading-relaxed">
                  You have already applied for two jobs.
                </p>
              ) : (
                props.applied ? (
                  <p className="leading-relaxed">
                    You have already applied for this Job.
                  </p>

                ) : (
                  props.apply ? (
                    <>
                      <p className=" text-sm">

                        The existing employees of <small className='font-bold text-sm'>NACO/TANSACS/TSU</small>, the upper age limit is 55 years as on 30.06.2023.
                        If you have experience in above mentioned then you can apply
                      </p>
                    </>
                  )
                    :
                    (<>
                      {props.main ? (

                        <p className=" text-sm">The existing employees of  <small className='font-bold text-sm'>NACO/TANSACS/TSU</small>, the upper age limit is 55 years as on 30.06.2023.
                          For other candidates, age limit is 50 years as on 30.06.2023.</p>
                      ) :

                        (
                          <p className=" text-sm"> <small className='font-bold text-sm'>Age limit :</small> {props.min_age} years as on 30.06.2023</p>
                        )}
                    </>
                    )
                )
              )}
            </div>




            <div className="flex w-full p-4 md:p-5  rounded-b border-gray-600">
              {(props.apply) ?

                <button
                  data-modal-hide="default-modal"
                  type="button"
                  onClick={redirectButton}
                  className="text-white w-full font-medium rounded-lg text-sm px-[15px] py-[5px] text-center bg-custom-red "
                >
                  APPLY
                </button>
                :
                <Link to={'/tansacs/jobs'} className="px-[15px] py-[5px]  block group relative  w-full overflow-hidden rounded-lg bg-custom-red text-sm font-semibold text-white">
                  Back to Job Selection
                  <div className="absolute inset-0 h-full w-full scale-0 rounded-lg transition-all duration-300 group-hover:scale-100 group-hover:bg-white/30"></div>

                </Link>

              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


const mapDispatchToProps = dispatch => {

  return {

    exp_age: () => dispatch(exp_age()),
    set_permission: () => dispatch(set_permission())
  }
}

export default connect(null, mapDispatchToProps)(Modal);
