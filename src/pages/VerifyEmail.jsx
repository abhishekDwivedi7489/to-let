import React, { useState } from 'react'
import OTPInput from 'react-otp-input'
import { sendOtp, signUp } from '../services/operation/authApi'
import { BiArrowBack } from "react-icons/bi";
import { RxCountdownTimer } from "react-icons/rx";
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Loader from '../component/common/Loader';

const VerifyEmail = () => {
   
  const dispatch = useDispatch();
  const {loading, signupData} = useSelector((state) => state.auth);
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  const {
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
   contactNum,
   countryCode
  } = signupData

 const submitHandler = (e) =>{
  e.preventDefault();
  dispatch(signUp(firstName,
    lastName,
    email,
    password,
    confirmPassword,
   contactNum,
   countryCode,
   otp,
   navigate))
 }

  return (
    <section className='w-full min-h-[calc(100vh-3.5rem)] flex items-center justify-center'>
        {
          loading ? (<Loader/>) 
          :(<div className='w-11/12 mx-auto max-w-[600px]'>
             <h3 className='text-richblack-900 text-[1.875rem] font-semibold leading-[2.375rem] '>Verify Email</h3>
             <p className='my-4 text-[1.125rem] leading-[1.625rem] text-richblack-100'>A verification code has been sent to you. Enter the code below</p>
             <form onSubmit={submitHandler}>
               <OTPInput
                value={otp}
                onChange={setOtp}
                numInputs={6}
                renderSeparator={<span>-</span>}
                renderInput={(props) => (
                  <input
                    {...props}
                    placeholder='-'
                    style={{
                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                  }}
                  className="w-[40px] md:w-[60px] border-[1px] border-richblack-900 rounded-[0.5rem] text-richblack-900 aspect-square text-center focus:border-0 focus:outline-2 focus:outline-yellow-50"
                  />
                )}
                containerStyle={{
                justifyContent: "space-between",
                gap: "0 5px",
              }}
               />
               <button type='submit'
                    className="mt-6 w-full rounded-[8px] bg-yellow-50 py-[12px] px-[12px] font-medium text-richblack-900">
                   Verify Email
               </button>
             </form>

             <div className='flex justify-between mt-4'>
              <Link to={"/login"}>
                 <p className="text-richblack-900 flex items-center gap-x-2">
                 <BiArrowBack/>
                  Back to login
                 </p>
              </Link>
              <button onClick={() => dispatch(sendOtp(signupData.email,navigate))}
              className='flex items-center text-blue-100 gap-x-2'
              >
                 <RxCountdownTimer/>
                  Resend It
              </button>
             </div>
          </div>)
        }
    </section>
  )
}

export default VerifyEmail