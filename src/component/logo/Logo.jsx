import React from 'react'
import logo from "../../assets/logo12.png"

const Logo = () => {
  return (
    <div className='flex items-center gap-x-1'>
      
       <img src={logo} alt='logo' width={45} loading='lazy' />
       <span
       className='font-inter bg-gradient-to-tr from-[#833ab4] via-[#fd1d1d] to-[#fcb045] bg-clip-text text-transparent
                      text-xl md:text-2xl font-extrabold tracking-tighter'
       >To-Let</span>
    </div>
  )
}

export default Logo