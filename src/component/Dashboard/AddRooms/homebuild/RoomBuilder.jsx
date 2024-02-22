import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux'
import FacilityForm from './FacilityForm';
import IconBtn from '../../../common/IconBtn';
import{AiOutlinePlusCircle} from 'react-icons/ai'
import{RiArrowRightCircleFill} from 'react-icons/ri'
import NestedView from './NestedView';
import {setStep, setHome, setEditHome} from "../../../../slices/roomSlice"
import toast from 'react-hot-toast';
import { addRoomDetail, updateRoomDetail } from '../../../../services/operation/roomsApi';
import {HiOutlineCurrencyRupee} from 'react-icons/hi'


const RoomBuilder = () => {

  const {home} = useSelector((state) => state.home);
  const {token} = useSelector((state) => state.auth);
  const [editSection, setEditSection] = useState(null)
  const [tags, setTags] = useState([])
  const dispatch = useDispatch();


  const {
    register,
    setValue,
    getValues,
    handleSubmit,
    formState:{errors}
  } = useForm();

  const cancleEdit =() =>{
       setEditSection(null);
       setValue("roomNum","");
       setValue("price","");
       setValue("facility","");
       setValue("aboutRoom","");
       setValue("size","")
       setTags([]);
  }

async function onSubmit(data, e){
  console.log(data)
       e.preventDefault();
       let result;
       if(editSection){
          const currentValue = getValues();
          console.log(currentValue);
          const formData = new FormData();
          formData.append("roomId",editSection);
          formData.append("homeId",home._id);
          if(currentValue.roomNum !== home.houseRooms.roomNum){
            formData.append("roomNum",data.roomNum);
          }
          if(currentValue.price !== home.houseRooms.price){
            formData.append("price",data.price);
          }
          if(currentValue.facility !== home.houseRooms.facility){
            formData.append("facility",JSON.stringify(data.facility));
          }
          if(currentValue.aboutRoom !== home.houseRooms.aboutRoom){
            formData.append("aboutRoom",data.aboutRoom);
          }
          if(currentValue.size !== home.houseRooms.size){
            formData.append("size",data.size);
          }
          result = await updateRoomDetail(formData, token);
       }
       
       else{
      
        
           const formData = new FormData();
           formData.append("homeId",home._id);
           formData.append("roomNum",data.roomNum);
           formData.append("price",data.price);
           formData.append("facility",data.facility);
           formData.append("aboutRoom",data.aboutRoom);
           formData.append("size",data.size)
            console.log("formdata",formData)
           result = await addRoomDetail(formData,token);
       }
       if(result){
        
         dispatch(setHome(result));
         setEditSection(null);
        setValue("roomNum","");
        setValue("price","");
        setValue("facility","");
        setValue("aboutRoom","");
        setValue("size","")
        setTags([]);
       }
  }
function handleEdit (roomId,roomNum ,price, facility, aboutRoom, size){
     
        setEditSection(roomId)
        setValue("roomNum",roomNum);
        setValue("price",price);
        setValue("facility",facility.toString());
        setTags([facility.toString()]);
        setValue("aboutRoom",aboutRoom);
        setValue("size",size)
        
}
const goToBack = () =>{
  dispatch(setStep(1));
  dispatch(setEditHome(true))

}
const goToNext = () =>{
   if(home?.houseRooms.length === 0){
    toast.error("please Add atleast one Room");
    return ;
   }

   if(home?.houseRooms.some((room) => room?.images === 0)){
    toast.error("Please add atleast one images")
    return;
   }

   dispatch(setStep(3));

}

  return (
    <section className='rounded-md border-richblack-700 bg-richblack-800 p-6 space-y-8 w-[100%] lg:w-[80%] mx-auto '>
      <p className="mb-5 text-xl font-medium bg-gradient-to-br from-[#1fa2ff] via-[#12d8fa] to-[#a6ffcb] bg-clip-text text-transparent max-w-max">
         Room Builder
         <div className='stay_Div'>
             <div className='move_Div'></div>
          </div>
      </p>
       <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-y-3'>
          <div className="flex flex-col items-start space-y-2">
            <label htmlFor='roomNum' className="text-sm text-richblack-5">Room Number<span className='text-pink-200'>*</span></label>
            <input
              id='roomNum'
              placeholder='Enter Room Number'
              className='form-style w-full'
              {...register("roomNum", {required:true})}
            />
            {
              errors.roomNum && (<span className="ml-2 text-xs tracking-wide text-pink-200">Room number is Required</span>)
            }
          </div>

          <div className="flex flex-col items-start space-y-2 relative">
            <label htmlFor='price' className="text-sm text-richblack-5">Price<span className='text-pink-200'>*</span></label>
            <input
              id='price'
              placeholder='Price'
              className=' w-full bg-richblack-700 pl-9 rounded-lg py-3 text-[16px] leading-[24px] text-richblack-5 shadow-[0_1px_0_0] shadow-white/50 placeholder:text-richblack-400 focus:outline-none'
              {...register("price",{required:true})}
            />
              

              <HiOutlineCurrencyRupee className='absolute top-[48%] left-2 text-xl text-richblack-300'/>
            { errors.price &&<span className="ml-2 text-xs tracking-wide text-pink-200">Price is Required</span>
            }
            </div>
            
            <FacilityForm
              labelName ="Facilities"
              name = "facility"
              setValue ={setValue}
              getValues = {getValues}
              register ={register}
              tags={tags}
              setTags={setTags}
              errors = {errors}
              placeholder = "Enter Facility and press Space"
            />

            <div className="flex flex-col items-start space-y-2">
              <label htmlFor='aboutRoom' className="text-sm text-richblack-5">About Room<span className='text-pink-200'>*</span></label>
              <input
                id='aboutRoom'
                placeholder='About Room'
                className='form-style w-full'
                {...register("aboutRoom",{required:true})}
              />
              {
                errors.aboutRoom && <span className="ml-2 text-xs tracking-wide text-pink-200">Abuot room is required</span>
              }
            </div>

            <div className="flex flex-col items-start space-y-2">
              <label htmlFor='size' className="text-sm text-richblack-5">Size of Room<span className='text-pink-200'>*</span></label>
              <input
                id='size'
                placeholder='Size Of Room'
                className='form-style w-full'
                {...register("size",{required:true})}
              />
              {
                errors.size && <span className="ml-2 text-xs tracking-wide text-pink-200">Room size is required</span>
              }
            </div>

            <div className='flex gap-x-4'>
              <button className='border-[1px] border-yellow-800 text-yellow-50 bg-yellow-900 rounded-md py-1 px-2'>
                {editSection ? "Edit Save" : <p className='flex gap-x-1 items-center'
                type = {"submit"}>Create Room <AiOutlinePlusCircle/></p>}
              </button>
              {
                editSection &&
                <button
                 onClick={cancleEdit}
                 className='text-sm text-richblack-300 underline'
                >
                 Cancle Edit 
                </button>
              }
            </div>
       </form>

       {
        home?.houseRooms?.length > 0 &&
        <NestedView
          handleEdit = {handleEdit}
       />}
       
       <section  className='flex gap-x-4 justify-end'>
        <button
        onClick={goToBack}
         className='flex items-center rounded-md cursor-pointer bg-richblack-500 py-2 px-4 font-semibold'
        >
         Back
        </button>
        <IconBtn
         onclick={goToNext}
         text={"Next"}
        >
         <RiArrowRightCircleFill/>
        </IconBtn>
       </section>
    </section>
  )
}

export default RoomBuilder
