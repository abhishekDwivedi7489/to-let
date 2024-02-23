import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import {AiOutlineEyeInvisible} from 'react-icons/ai'
import { AiOutlineEye } from 'react-icons/ai'
import { useDispatch } from 'react-redux'
import { resetPassword } from '../services/operation/authApi'
import { BiArrowBack } from 'react-icons/bi'

const UpdatePassword = () => {
    const dispatch = useDispatch();
const location = useLocation();
const navigate = useNavigate();

const [showPassword, setShowPassword] = useState(false);
const [showCnfPassword, setShowCnfPassword] = useState(false);
const [formData, setFormData] = useState({password:"",confirmPassword:""});

const changeHandler =(event) =>{
    
     setFormData((prev) => ({
          ...prev,
          [event.target.name]:event.target.value,
     }))
}

const submitHamdler =(event) =>{
    event.preventDefault();
    const {password , confirmPassword} =formData;
    const token = location.pathname.split("/").at(-1);
   
    dispatch(resetPassword(password , confirmPassword, token, navigate))
}
  return (
    <section className='bg-richblack-900 h-[100vh] flex items-center justify-center'>
                     <div className='flex flex-col gap-1 max-w-[500px] max-h-max p-4 lg:p-8'>
                    <h2 className='text-richblack-5 text-[1.875rem] font-semibold leading-[2.375rem] '>Choose  new password</h2>
                    <p className='my-4 text-[1.125rem] leading-[1.625rem] text-richblack-100'>Almost done. Enter your new password and youre all set.</p>
                    <form onSubmit={submitHamdler} className='flex flex-col gap-3' >
                        <label className='relative'>
                            <p className='mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5'>New password <sup className='text-pink-200'>*</sup></p>
                            <input
                                type={`${showPassword ? "text" : "password"}`}
                                required
                                name='password'
                                value={formData.password}
                                onChange={changeHandler}
                                placeholder='Password'
                                style={{
                                 boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                                }}
                                className=' bg-richblack-800 rounded-[0.5rem] px-[12px] py-[8px] w-full text-richblack-5 focus:outline-none'
                            
                            />
                            <span onClick={()=>setShowPassword( (prev)=>!prev)} className='absolute text-richblack-5 bottom-3 right-2'>
                              {
                                showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />
                              }
                            </span>
                        </label>
                        <label className='relative'>
                            <p className='mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5'>Confirm password<sup className='text-pink-200'>*</sup></p>
                            <input
                                type={`${showCnfPassword ? "text" : "password"}`}
                                required
                                name='confirmPassword'
                                value={formData.confirmPassword}
                                onChange={changeHandler}
                                placeholder='Confirm Password'
                                style={{
                                 boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                                }}
                                className='bg-richblack-800 rounded-[0.5rem] px-[12px] py-[8px] w-full text-richblack-5 focus:outline-none'
                            
                            />
                            <span onClick={()=>setShowCnfPassword( (prev)=>!prev)} className='absolute text-richblack-5 bottom-3 right-2 cursor-pointer'>
                              {
                                showCnfPassword ?<AiOutlineEye/> :<AiOutlineEyeInvisible/>
                              }
                            </span>
                        </label>
                        <button type='submit'
                        className="mt-6 w-full rounded-[8px] bg-yellow-50 py-[12px] px-[12px] font-medium text-richblack-900">
                            Reset Password
                        </button>
                    </form>
                    <div className="mt-6 flex items-center justify-between">
                      <Link to="/login">
                       
                       <p className="flex items-center gap-x-2 text-richblack-5">
                       <BiArrowBack/>
                       Go to login
                       </p>
                      </Link>
                    </div>
                </div>
    </section>
  )
}

export default UpdatePassword
