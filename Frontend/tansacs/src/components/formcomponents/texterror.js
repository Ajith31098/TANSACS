import React from 'react'

function TextError (props) {
  return (
    <div>
      <p className='text-red-600 text-sm text-start font-semibold'>

          
        {props.children}
      </p>

    </div>
  )
}

export default TextError