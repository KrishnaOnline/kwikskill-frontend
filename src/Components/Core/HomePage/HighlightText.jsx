import React from 'react'

const HighlightText = ({text}) => {
  return (
    <div>
        <span className='text-blue-800'>
            {text}
        </span>
    </div>
  )
}

export default HighlightText