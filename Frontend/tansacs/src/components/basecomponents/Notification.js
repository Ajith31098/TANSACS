import React from 'react';
import { useNavigate } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import { Link } from 'react-router-dom'


const NotificationModal = (props) => {

    const navigate = useNavigate()

    //   const toggleModal = () => {
    //     const modal = document.getElementById('default-modal');
    //     modal.classList.toggle('hidden');
    //     modal.setAttribute('aria-hidden', modal.classList.contains('hidden'));
    //   };

    //   const hideModal = () => {
    //     const modal = document.getElementById('default-modal');
    //     modal.classList.add('hidden');
    //     modal.setAttribute('aria-hidden', modal.classList.contains('hidden'));
    //   };

    const redirectButton = () => {

        navigate('/')
    }

    return (
        <div>

            <div
                id="default-modal"
                tabIndex="-1"
                style={{ backgroundColor: 'rgba(87, 88, 88, 0.5)' }}
                className=" overflow-y-auto overflow-x-hidden fixed top-0 flex items-start  justify-center right-0 left-0 z-50  w-full md:inset-0 h-[calc(100%)] max-h-full"
            >
                <div className="relative p-10  w-[550px] h-[300px] mt-10">
                    <div className="relative w-full h-full p-4 bg-white rounded-lg shadow bg-white  relative">


                        <div className=' flex justify-end'>
                            <CloseIcon onClick={redirectButton} />
                        </div>
                        <div className="p-4 md:p-5 space-y-4">
                            <p className='text-sm'>Currently there is a server issue ,  Your detail has been registered. So you can verify the account during login</p>
                        </div>




                        <div className="flex w-full p-4 md:p-5  rounded-b border-gray-600">

                            <Link to={'/'} className="px-[15px] py-[5px]  block group relative  w-full overflow-hidden rounded-lg bg-custom-red text-sm font-semibold text-white">
                                Back to Login
                                <div className="absolute inset-0 h-full w-full scale-0 rounded-lg transition-all duration-300 group-hover:scale-100 group-hover:bg-white/30"></div>

                            </Link>


                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};




export default NotificationModal;
