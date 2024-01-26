import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

import { login } from '../services/operation/authApi';
import { useDispatch } from 'react-redux';
import logo from '../assets/logo12.png'

const Login = () => {

     const navigate = useNavigate();
     const dispatch = useDispatch();
     const [showPassword, setShowPassword] = useState(false)
     const [formData, setFormData] = useState({email : "", password : ""});

     const changeHandler = (e) =>{
      setFormData((prev) =>({
        ...prev,
        [e.target.name]:e.target.value
      }))
     }

    const submitHandler = (e) =>{
      e.preventDefault();
      dispatch(login(formData,navigate));
    }

  return (
    <section className='w-[100vw] h-[100vh] flex items-center justify-center overflow-hidden'>
      <form onSubmit={submitHandler} className='w-11/12 max-w-[500px]
       border-[2px] border-richblack-900
       py-7 px-3 rounded-md flex flex-col gap-y-3 login-Shadow'>

       <img src={logo} alt='logo' width={45} loading='lazy' className='mx-auto'/>
        
      <h2 className="text-center font-edu text-4xl font-bold bg-gradient-to-br from-[#1fa2ff] via-[#12d8fa] to-[#a6ffcb] 
       bg-clip-text text-transparent">OWNER LOGIN</h2>
        <div className="input-group">
           <input
            type='email'
            placeholder='Email...'
            name='email'
            value={formData.email}
            onChange={changeHandler}
            className="input-box mt-2"
           />
           <label htmlFor='email' className="input-lable">Email</label>
        </div> 

        <div className="input-group">
           <input
            type= {showPassword ? "text" : "password"}
            name='password'
            placeholder='Password...'
            value={formData.password}
            onChange={changeHandler}
            className="input-box mt-2"
           />
           <span onClick={() => setShowPassword((prev) => !prev)} className="password-eye">
            {showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
          </span>
           <label htmlFor='password' className="input-lable">Password</label>
        </div>  
          <Link to={"/forgot-password"}><p className='text-xs mt-1 text-blue-400 underline max-w-max ml-auto'>Forget Password</p></Link>
        <button
        className="pulse-button py-1">Login</button>
      </form>
    </section>
  )
}

export default Login