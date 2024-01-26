import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import {BiArrowBack} from 'react-icons/bi'
import { resetPasswordToken } from '../services/operation/authApi';


const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [sentEmail, setSentEmail] = useState(false);
    
    const dispatch = useDispatch();

   function submitHandler(e){
          e.preventDefault()
        
          dispatch(resetPasswordToken(email, setSentEmail))
         
   }
  
  return (
    <section className='w-full min-h-[calc(100vh-3.5rem)] flex flex-col items-center justify-center  bg-richblack-900'>
    
       <section className='flex flex-col items-center justify-center gap-1 p-4 max-w-[550px] max-h-max'>
       <h1 className='text-richblack-5 text-[1.875rem] font-semibold leading-[2.375rem] '>
        {
            !sentEmail ? "Reset Your Password" : "Check Your Email"
        }
        </h1>
        <p className='my-4 text-[1.125rem] leading-[1.625rem] text-richblack-100 text-center'>{
            !sentEmail ? "Have no fear. We'll email you instruction to reset your password. If you don't have access your email we can try account recovery" 
                        : `We have sent the reset email to ${email}` 
        }</p>
        <form onSubmit={submitHandler}>
            {
                !sentEmail &&
                <label>
                    <p className='mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5'>Email Address <sup className='text-pink-200'>*</sup></p>
                    <input
                        type='email'
                        name='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder='Email Address'
                        style={{
                                 boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                                }}
                                className='bg-richblack-800 rounded-[0.5rem] px-[12px] py-[8px] w-full text-richblack-5 focus:outline-none'
                    />
                </label>
                
            }
            <button  className="mt-6 w-full rounded-[8px] bg-yellow-50 py-[12px] px-[12px] font-medium text-richblack-900">
                {
                    !sentEmail ? "Reset Password" : "Resend Email"
                }
            </button>
        </form>
        <div className="mt-6 flex items-center justify-between">
            <Link to={"/login"}>
            <p className="flex items-center gap-x-2 text-blue-200">
                         <BiArrowBack/>
                         Back to login
                         </p>
            </Link>
        </div>
       </section>
    
    </section>
  )
}


export default ForgotPassword