import React from 'react'

function TextError (props) {
  return (
    <div>
      
      <p className={props.center ? 'text-red-600 text-sm lg:text-center text-start font-semibold': 'text-red-600 text-sm text-start font-semibold'}>

          
        {props.children}
      </p>

    </div>
  )
}

export default TextError