import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';
import { addHomeDetail, editHomeDetails, fetchCategory } from '../../../../services/operation/roomsApi';
import Instructions from './Instructions';
import IconBtn from '../../../common/IconBtn'
import {setStep, setHome, setEditHome} from '../../../../slices/roomSlice'
import toast from 'react-hot-toast';
import Loader from '../../../common/Loader'
import Upload from './Upload';

const RoomInfo = () => {
    const {register,
           handleSubmit,
           setValue,
           getValues,
           formState:{errors}
        } = useForm();

        const dispatch = useDispatch();
        
        const {token} = useSelector((state) => state.auth)
        const {home, editHome} = useSelector((state) => state.home)
        const[categories, setCategories] = useState([]);
        useEffect(()=>{
          const getCategory = async() =>{
           
            const result = await fetchCategory();
            if(result.length > 0){
              setCategories(result);
            }
            
          }
           
          getCategory();
          //  console.log("category",categories._id)
          if(editHome){
             setValue("description", home?.description);
             setValue("state", home?.state);
             setValue("city",home?.city);
             setValue("area", home?.area);
             setValue("address", home?.address);
             setValue("category", home?.category);
             setValue("instructions", home?.instructions)
             setValue("thumbnail",home?.thumbnail)
          }
             
        },[])

        function isFormUpdate(){
          const currentValue = getValues();
          if(currentValue.description !== home.description ||
            currentValue.state !== home.state ||
            currentValue.city !== home.city ||
            currentValue.area !== home.area ||
            currentValue.address !== home.address ||
            currentValue.category._id !== home.category._id ||
            currentValue.instructions.toString() !== home.instructions.toString() ||
            currentValue.thumbnail !== home.thumbnail){
              return true;
            }
            else{
              return false;
            }
        }

        const formSubmit = async(data) => {

          if(editHome){
            if(isFormUpdate()){
               const currentValue = getValues();
               const formData = new FormData();

               formData.append("homeId", home._id);
               if(currentValue.description !== home.description){
                formData.append("description",data.description);
               }
               if(currentValue.state !== home.state){
                formData.append("state",data.state);
               }
               if(currentValue.city !== home.city){
                formData.append("city",data.city);
               }
               if(currentValue.area !== home.area){
                formData.append("area",data.area);
               }
               if(currentValue.address !== home.address){
                formData.append("address",data.address);
               }
               if(currentValue.category._id !== home.category._id){
                formData.append("category",data.category);
               }
               if(currentValue.instructions !== home.instructions){
                formData.append("instructions",data.instructions);
               }
               if(currentValue.thumbnail !== home.thumbnail){
                formData.append("thumbnail",data.thumbnail);
               }
              
               const result = await editHomeDetails(formData, token)
               
              dispatch(setStep(2));
              dispatch(setHome(result));
            }
            else{
              toast.error("No changes made to the form")
            }
            return;
          }
          const formData = new FormData();
          formData.append("description",data.description);
          formData.append("state",data.state);
          formData.append("city",data.city);
          formData.append("area",data.area);
          formData.append("address",data.address);
          formData.append("category",data.category);
          formData.append("instructions",JSON.stringify(data.instructions));
          formData.append("thumbnail",data.thumbnail);

         
          const result = await addHomeDetail(formData, token)
          if(result){
            dispatch(setStep(2));
            dispatch(setHome(result));
          }
          
        }
        const withOutSavingHandler = () => {
              dispatch(setEditHome(false));
              dispatch(setStep(2))
        }
  return (
         <>
          
        <form onSubmit={handleSubmit(formSubmit)}
        className='rounded-md border-richblack-700 bg-richblack-800 p-6 space-y-8 w-[100%] lg:w-[80%] mx-auto '
        >
        <h2 className="mb-5 text-xl font-bold bg-gradient-to-br from-[#1fa2ff] via-[#12d8fa] to-[#a6ffcb] bg-clip-text text-transparent max-w-max textShadow_Bright">
             {editHome ? "Edit Home" : "Add Home"}
                     <div className='stay_Div'>
                        <div className='move_Div'></div>
                      </div>
        </h2>
        <div className="flex flex-col items-start space-y-2">
           <label htmlFor ="description" className="text-sm text-richblack-5">Description<sup className='text-pink-200'>*</sup></label>
           <input
             id='description'
             placeholder='Enter home description'
             className='form-style w-full'
             {...register("description",{required:true})}
           />
           {
                 errors.description && 
                 (<span className="ml-2 text-xs tracking-wide text-pink-200">Description is Required</span>)
             }  
        </div>
 
        <div className="flex flex-col items-start space-y-2">
         <label htmlFor="state" className="text-sm text-richblack-5">State<sup className='text-pink-200'>*</sup></label>
         <input
           id='state'
           placeholder='Enter State Name'
           className='form-style w-full'
           {...register("state", {required:true})}
         />
         {
           errors.state &&
           (<span className="ml-2 text-xs tracking-wide text-pink-200">State is required</span>)
         }
        </div>
 
        <div className="flex flex-col items-start space-y-2">
         <label htmlFor='city' className="text-sm text-richblack-5">City<span className='text-pink-200'>*</span></label>
         <input
           id='city'
           placeholder='Enter City Name'
           className='form-style w-full'
           {...register("city",{required:true})}
         />
         {
           errors.city && 
           (<span className="ml-2 text-xs tracking-wide text-pink-200">City is required</span>)
         }
        </div>
 
        <div className="flex flex-col items-start space-y-2">
         <label htmlFor='area' className="text-sm text-richblack-5">Area Name<span className='text-pink-200'>*</span></label>
         <input
           id='area'
           placeholder='ex - Area Anand Nagar in Bhopal City'
           className='form-style w-full'
           {...register("area",{require:true})}
         />
         {
           errors.area &&
           (<span className="ml-2 text-xs tracking-wide text-pink-200">Area is Required</span>)
         }
        </div>
 
        <div className="flex flex-col items-start space-y-2">
         <label className="text-sm text-richblack-5" htmlFor='address'>Full Room Address<span className='text-pink-200'>*</span></label>
         <textarea
           id='address'
           placeholder='Enter Full Address'
           className='min-h-[50px] w-full form-style'
           {...register("address",{required:true})}
         />
         {
           errors.address &&
           (<span className="ml-2 text-xs tracking-wide text-pink-200">Address is Required</span>)
         }
        </div>
 
        <div className="flex flex-col items-start space-y-2">
         <label htmlFor='category' className="text-sm text-richblack-5">Choose Category<span className='text-pink-200'>*</span></label>
         <select
         id='category'
         defaultValue={"Choose category"}
         className='form-style w-full'
         {...register("category",{required:true})}
         >
           <option disabled>Choose Category</option>
           {
             categories.map((category, i) =>(
               <option key={i} value={category?._id}>
                 {category.name}
               </option>
             ))
           }
         </select>
        </div>
 
        <Instructions
          lable="Insructions"
          name="instructions"
          errors={errors}
          register={register}
          setValue={setValue}
          getValues={getValues}
          placeholder="Please Enter Your Instruction"
        />

        <Upload
          name = "thumbnail"
          lable ="Thumbnail"
          register ={register}
          setValue ={setValue}
          errors ={errors}
          editData={editHome ? home?.thumbnail : null}
        />
 
        {/* description, state, city, area, address,
            category, instructions, status */}
 
         <div className='flex flex-row items-center justify-end space-x-4'>
         {
           editHome &&(
             <button
             className='flex items-center gap-x-2 bg-richblack-300 font-semibold rounded-md px-2 py-2'
             onClick={withOutSavingHandler}
             >
               Continue Without Saving
             </button>
           )
         }
           <IconBtn
             type="Submit"
             text={!editHome ? "Next" :"Save Changes"}
           /> 
         </div>
     </form>
     </>
      )
    
   
  
}

export default RoomInfo
