import React from 'react';
import Kalainar from '../../logo/kalainar.png'
import Aids from '../../logo/Aids.png'
import Emblem from '../../logo/Emblem.png'
import Naco from '../../logo/Naco.png'

function Header() {
  return (
    <>
      <div className='flex justify-between'>
        <div className='lg:h-28 lg:w-28 md:h-24 md:w-24 h-20 w-20'>
          <img className="h-full w-full object-contain " src={Aids} alt='Aids' />

        </div>
        <div className='lg:h-28 lg:w-28 md:h-24 md:w-24 h-20 w-20'>
          <img className="h-full w-full object-contain" src={Kalainar} alt='Kalainar' />
        </div>
        <div className='lg:h-28 lg:w-28 md:h-24 md:w-24 h-20 w-20'>
          <img className="h-full w-full object-contain" src={Emblem} alt='Emblem' />
        </div>

        <div className='lg:h-28 lg:w-28 md:h-24 md:w-24 h-20 w-20'>
          <img className="h-full w-full object-contain" src={Naco} alt='NAco' />
        </div>

      </div>



    </>
  );
}

export default Header;
