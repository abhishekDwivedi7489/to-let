import React, { useEffect } from 'react'
import { RxCrossCircled } from 'react-icons/rx'
import Upload from '../roomInfo/Upload';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { uploadImages } from '../../../../services/operation/roomsApi';
import IconBtn from '../../../common/IconBtn';
import { setHome } from '../../../../slices/roomSlice';

const ImageUploaderForm = ({ 
    modalData ,
    setModalData ,                        
    view, add
    }) => {
     const {register,handleSubmit, setValue, getValues,formState:{errors},} = useForm();
     const dispatch = useDispatch();
     const {home} = useSelector((state) => state.home);
     const {token} = useSelector((state) => state.auth);
     useEffect(() =>{
        setValue("image",modalData.image)
     },[])

    
     async function onSubmit(data, e){
       if(view){
        return;
       }
       const formData = new FormData();
       formData.append("roomId",modalData)
       formData.append("image",data.image);
       const result = await uploadImages(formData, token);
       if(result){
         const updateRoomData = home.houseRooms.map((room) => room._id === modalData ? result : room);
         const updaterooms = {...home, houseRooms:updateRoomData}
         dispatch(setHome(updaterooms));
         setModalData(null);
       }
     }
  return (
    <section className='absolute bg-richblack-500 opacity-[95%] w-full h-full top-0 bottom-0 left-0 right-0 z-10'>
        <div className='flex gap-2 items-center justify-center w-full h-full'>
            <div className='rounded-md border-richblack-700 bg-richblack-900 space-y-8 w-[90%] md:w-[500px] flex flex-col'>
                <div className='flex items-center justify-between  bg-richblack-800 rounded-md py-3 px-2'>
                    <p className='text-richblack-5 text-lg font-semibold'>{view && "View"}{add && "Adding"} Image</p>
                    <button
                    onClick={()=>setModalData(null)}
                    className='text-xl font-semibold'
                    >
                     <RxCrossCircled className='text-2xl font-bold text-richblack-300'/>
                    </button>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-y-5 p-8 items-center'>
                    <Upload
                        lable={"Image"}
                        name={"image"}
                        register={register}
                        setValue={setValue}
                        errors={errors}
                        viewData={view ? modalData.image : null}
                    />
                    {
                        !view && <IconBtn 
                            text={"Upload"}
                        />
                    }
                </form>
            </div>
        </div>
    </section>
  )
}

export default ImageUploaderForm