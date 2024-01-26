import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import IconBtn from "../../common/IconBtn";
import { changePassword } from "../../../services/operation/settingAPI";

const ChangePassword = () => {
  const { token } = useSelector((state) => state.auth);
  const [password, setPassword] = useState(false);
  const [newPassword, setnewPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

 const submitHandler = async(data, e) => {
    try {
       e.preventDefault();
       dispatch(changePassword(data, token, navigate)) 
    } catch (error) {
      console.log(error)  
    }
 }

  return (
    <section className="w-[100%] lg:w-[80%] mx-auto">
      <h3 className="text-xl font-inter font-semibold mt-6 mb-6 text-caribbeangreen-900 text-Shadow">
        Change Password
      </h3>
      {/* forn Start */}
      <form className="flex flex-col gap-y-5" onSubmit={handleSubmit(submitHandler)}>
        <section className="bg-richblack-800 flex flex-col text-richblack-5 rounded-md gap-y-6 edit-section-form">
          <section className="edit-profile-form">
            <div className="edit-profile-box relative">
              <label htmlFor="oldPassword">Old Password</label>
              <input
                type={password ? "text" : "password"}
                name="oldPassword"
                className="form-style"
                placeholder="Enter Old Password"
                {...register("oldPassword", { required: true })}
              />

              <span
                onClick={() => setPassword((prev) => !prev)}
                className="absolute right-2 top-[60%]"
              >
                {password ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
              </span>
              {errors.oldPassword && (
                <span className="-mt-1 text-[12px] text-pink-200">
                  Enter Old Password
                </span>
              )}
            </div>

            <div className="edit-profile-box relative">
              <label htmlFor="confirmNewPassowrd">New Password</label>
              <input
                type={newPassword ? "text" : "password"}
                name="confirmNewPassowrd"
                className="form-style"
                placeholder="Enter Old Password"
                {...register("confirmNewPassowrd", { required: true })}
              />

              <span
                onClick={() => setnewPassword((prev) => !prev)}
                className="absolute right-2 top-[60%]"
              >
                {newPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
              </span>
              {errors.confirmNewPassowrd && (
                <span className="-mt-1 text-[12px] text-pink-200">
                  Enter Old Password
                </span>
              )}
            </div>
          </section>
        </section>
        <section className="flex flex-row gap-x-5 items-center self-end">
          <button
            onClick={() => navigate("/dashboard/my-profile")}
            className="cursor-pointer rounded-md bg-richblack-700 py-1 px-2 font-semibold text-richblack-50"
          >
            Cancel
          </button>

          <IconBtn type={"submit"} text={"Save"} />
        </section>
      </form>
    </section>
  );
};

export default ChangePassword;
