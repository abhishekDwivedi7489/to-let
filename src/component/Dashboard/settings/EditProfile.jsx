import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import IconBtn from "../../common/IconBtn";
import { updateProfile } from "../../../services/operation/settingAPI";
import './changeProfilepic.css';

function EditProfile() {
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const genders = ["Male", "Female"];
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const formSubmitHandler = async(data, e) => {
   
   try {
     e.preventDefault();
     dispatch(updateProfile(data, token, navigate));
   } catch (error) {
    console.log(error)
   }
  }

  return (
    <section className="w-[100%] lg:w-[80%] mx-auto">
      <h2 className="text-xl font-inter font-semibold mt-6 mb-6 text-caribbeangreen-900 text-Shadow">Profile Information</h2>
      <form onSubmit={handleSubmit(formSubmitHandler)} className="flex flex-col gap-y-5">
        <section className="bg-richblack-800 flex flex-col text-richblack-5 rounded-md gap-y-6 edit-section-form">
          <div className="edit-profile-form">
            <div className="edit-profile-box ">
              <label htmlFor="gender" className="text-[14px] font-inter">Gender</label>
              <select
                type="text"
                name="gender"
                id="gender"
                className="form-style w-full"
                {...register("gender", { required: true })}
                defaultValue={user?.additionalDetails?.gender}
              >
                {genders.map((ele, i) => (
                  <option key={i} value={ele}>
                    {ele}
                  </option>
                ))}
              </select>
              {errors.gender && (
                <span className="-mt-1 text-[12px] text-pink-900">
                  Enter your gender
                </span>
              )}
            </div>

            <div className="edit-profile-box">
              <label className="text-[14px] font-inter" htmlFor="dateOfBirth">
                Date Of Birth
              </label>
              <input
                type="date"
                name="dateOfBirth"
                id="dateOfBirth"
                className="form-style w-full"
                placeholder="Date Of Birth"
                defaultValue={user?.additionalDetails?.dateOfBirth}
                {...register("dateOfBirth", { required: true })}
              />
              {errors.dateOfBirth && (
                <span className="-mt-1 text-[12px] text-pink-900">
                  Enter your Date of birth
                </span>
              )}
            </div>

          </div>

          <div className="flex flex-col items-start gap-y-[0.2rem] md:w-[48%]">
            <label className="text-[14px] font-inter" htmlFor="mobNumber">Mobile Number</label>
            <input
              type="text"
              name="mobNumber"
              id="mobNumber"
              className="form-style w-full"
              placeholder="Enter Contact Number"
              {...register("mobNumber", {
                required: true,
                maxLength: { value: 12 },
                minLength: { value: 10 },
              })}
              defaultValue={user?.additionalDetails?.mobNumber}
            />

            {errors.mobNumber && (
              <span className="-mt-1 text-[12px] text-pink-900">
                Enter your Mobile Number
              </span>
            )}

          </div>

        </section>

        <div className="flex flex-row gap-x-5 items-center self-end">
          <button
            onClick={() => navigate("/dashboard/my-profile")}
            className="cursor-pointer rounded-md bg-richblack-700 py-1 px-2 font-semibold text-richblack-50"
          >
            Cancel
          </button>
          <IconBtn type={"submit"} text={"Save"} />
        </div>
      </form>
    </section>
  );
}

export default EditProfile;
