import React from 'react'

function TextError(props) {
  return (
    <div>

      <p className={props.center ? 'font-IstokWeb text-red-600 text-[12px] lg:text-center text-start font-semibold' : 'text-red-600 text-[12px] text-start font-semibold'}>


        {props.children}
      </p>

    </div>
  )
}

export default TextError