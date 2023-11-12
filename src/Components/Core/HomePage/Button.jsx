import React from 'react'

const Button = ({text, cssThings}) => {
  return (
    <div>
      <button className={`border border-black rounded-md p-2 px-4 bg-white hover:bg-blue-800 ${cssThings} hover:text-white hover:scale-95 transition-all duration-500 shadow-sm shadow-black`}>
        {text}
      </button>
    </div>
  )
}

export default Button