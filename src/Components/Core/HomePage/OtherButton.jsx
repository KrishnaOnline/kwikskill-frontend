import React from 'react'

const OtherButton = ({text}) => {
  return (
    <div className='border border-black bg-white font-medium p-2 px-4 rounded-lg hover:bg-blue-950 hover:text-white transition-all duration-300 focus:bg-blue-950'>
        {text}
    </div>
  )
}

export default OtherButton