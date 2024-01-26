import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import countrycode from "../data/countrycode.json";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSignupData } from "../slices/authSlices";
import { sendOtp } from "../services/operation/authApi";
import toast from "react-hot-toast";


const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false);
  const [cnfPassword, setCnfPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    contactNum: "",
    countryCode: "",
  });



  function changeHandler(event) {
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
   
   
  }

  const { email } = formData;
  function submitHandler(event) {
    event.preventDefault();
    setLoading(true);
     
     if(formData.password !== formData.confirmPassword)
     {
        toast.error("Password is not same");
     }
     else{
      dispatch(setSignupData(formData));
      dispatch(sendOtp(email, navigate));
     }
     setLoading(false)
  }

  return (
    <section className="max-w-[1035px] w-[11/12] mx-auto mt-10 overflow-y-auto">
      <h2 className="text-center font-edu text-4xl font-bold bg-gradient-to-br from-[#1fa2ff] via-[#12d8fa] to-[#a6ffcb] 
       bg-clip-text text-transparent">SIGN UP</h2>
       
      <form onSubmit={submitHandler} className="font-mono w-[80%] md:w-[50%] mx-auto mt-5
       flex flex-col gap-y-3 h-[100vh]">
        <div className="input-group">
          
          <input
            required
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={changeHandler}
            className="input-box"
          />
          <label htmlFor="firstName" className="input-lable">
            First Name <sup className="text-pink-200">*</sup>
          </label>
        </div>


        <div className="input-group">
          <input
            required
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={changeHandler}
            className="input-box"
          />
          <label className="input-lable">
            Last Name <sup className="text-pink-200">*</sup>
          </label>
        </div>

        <div className="input-group">
          <input
            required
            type="email"
            name="email"
            value={formData.email}
            onChange={changeHandler}
            className="input-box"
          />
          <label className="input-lable">
            Email <sup className="text-pink-200">*</sup>
          </label>
        </div>

        <div className="input-group">
          <select className="input-box"
          onChange={changeHandler}
          name="countryCode"
          value={formData.countryCode}
          >
           {/* <option disabled>Select Country Code</option> */}
            {countrycode.map((country, index) => (
              <option key={index}>
                {country?.code}-{country?.country}
              </option>
             
            ))}
          </select>
          <label className="input-lable">
            Country Code<sup className="text-pink-200">*</sup>
          </label>
        </div>

        <div className="input-group">
          <input
            required
            type="text"
            name="contactNum"
            value={formData.contactNum}
            onChange={changeHandler}
            maxLength={10}
            minLength={8}
            className="input-box"
          />
          <label className="input-lable">
            Mobile Number<sup className="text-pink-200">*</sup>
          </label>
        </div>

        <div className="input-group">          
          <input
            required
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={changeHandler}
            className="input-box"
          />
          <span onClick={() => setShowPassword((prev) => !prev)} className="password-eye">
            {showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
          </span>
          <label className="input-lable">
            Password <sup className="text-pink-200">*</sup>
          </label>
        </div>

        <div className="input-group">          
          <input
            required
            type={cnfPassword ? "text" : "password"}
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={changeHandler}
            className="input-box"
          />
          <span onClick={() => setCnfPassword((prev) => !prev)} className="password-eye">
            {cnfPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
          </span>
          <label className="input-lable">
            Confirm Password <sup className="text-pink-200">*</sup>
          </label>
        </div>

        <button
        className="pulse-button py-1"
        >{
          loading ? (<div className="flex items-center gap-x-3 justify-center"><p>Sign Up</p>
           <div className="loader1"></div></div>)
          :(<p>Sign Up</p>)
        }</button>
      </form>
    </section>
  );
};

export default SignUp;
