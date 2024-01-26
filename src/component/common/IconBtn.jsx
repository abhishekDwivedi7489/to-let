import React from 'react'

const IconBtn = ({
    onclick,
    type,
    text,
    children

}) => {
  return (
    <button
     type={type}
     onClick={onclick}
     className='bg-gradient-to-tl from-[#DC0916] to-[#F41FD6] rounded-md px-2 py-[0.20rem] 
     text-lg flex items-center gap-2 text-richblack-5 font-inter font-[600]
      hover:scale-95 transition-all duration-75'
    >
    {
        children 
        ? (
            <>
            <span>{text}</span>
            {children}
          </>
          ) 
        :
        (text)
    }
    </button>
  )
}

export default IconBtn