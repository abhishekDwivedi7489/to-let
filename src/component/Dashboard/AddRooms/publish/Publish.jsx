import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { HOUSE_STATUS } from '../../../../utils/constant'
import IconBtn from '../../../common/IconBtn'
import { resetHomeState, setStep } from '../../../../slices/roomSlice'
import { editHomeDetails } from '../../../../services/operation/roomsApi'

const Publish = () => {

  const {home} = useSelector((state) => state.home)
  const {token} = useSelector((state) => state.auth)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {register, handleSubmit, setValue, getValues} = useForm();
  useEffect(() => {
    if(home?.status === HOUSE_STATUS.PUBLISHED)
    {
      setValue("publish",true)
    }
  },[]);

  function goBack(){
    dispatch(setStep(2));
  }
  function goToHome(){
    dispatch(resetHomeState());
    navigate("/dashboard/my-rooms");
  }
  const handleRoomPublish = async() => {
    if((home?.status === HOUSE_STATUS.PUBLISHED && getValues("publish") === true)
     || (home?.status === HOUSE_STATUS.DRAFT && getValues("publish") === false)){
       goToHome();
       return ;
    }

    const formData = new FormData();
    formData.append("homeId", home?._id);
    const homeStatus = getValues("publish") ? HOUSE_STATUS.PUBLISHED : HOUSE_STATUS.DRAFT
    formData.append("status",homeStatus);
    const result = await editHomeDetails(formData, token);

    if(result){
      goToHome();
    }

  }
  function onSubmit(){
    handleRoomPublish();
  }

  return (
    <section className='rounded-md border-[2px] border-richblack-700 bg-richblack-800 p-6 flex flex-col gap-5 w-[100%] lg:w-[80%] mx-auto'>
         <p className='text-xl font-semibold text-richblack-5'>Publish Room</p>
         <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-y-5'>
            <div className='flex gap-3'>
              
              <input
                id='publish'
                type='checkbox'
                {...register("publish")}
                className='rounded w-4 h-4 mt-1'
              />
              <label htmlFor='publish' className="text-richblack-300">Make this room is public</label>
            </div>
            <div className='flex justify-end gap-3'>
              <button onClick={goBack}
               className='flex items-center px-2 py-1 rounded-md bg-richblack-300 text-black font-semibold'
              >
                Back
              </button>
              <IconBtn
                text={"Save"}
              />
            </div>
         </form>
    </section>
  )
}

export default Publish