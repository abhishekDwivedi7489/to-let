import React, { useState } from 'react'
import { RxDropdownMenu } from 'react-icons/rx'
import { useDispatch, useSelector } from 'react-redux'
import {MdEdit} from "react-icons/md"
import { RiDeleteBin6Line } from 'react-icons/ri'
import Confirmationmodal from "../../../common/Confirmationmodal"
import { AiOutlineCaretDown, AiOutlinePlus } from 'react-icons/ai'
import { deleteImages, deleteRoomDetail } from '../../../../services/operation/roomsApi'
import { setHome } from '../../../../slices/roomSlice'
import ImageUploaderForm from './ImageUploaderForm'

const NestedView = ({handleEdit}) => {

 const {token} = useSelector((state) => state.auth)
 const {home} = useSelector((state) => state.home)
 const dispatch = useDispatch();
 const [addSection, setAddSection] = useState(null);
 const [viewSection, setViewSection] = useState(null);
 const [confirmationModal, setConfirmationModal] = useState(null);
 
 const handleDeleteRoom = async(roomId) =>{
     const result = await deleteRoomDetail(home._id, roomId, token);
     if(result){
      dispatch(setHome(result));
     }
     setConfirmationModal(null);
 }

 const hanleDeleteImages = async (roomId, sectionId) =>{
        const result = await deleteImages(roomId, sectionId, token);
        if(result){
           const updateRoomdetail = home?.houseRooms.map((room) => room._id === roomId ? result : room)
           const updatedRoom = {...home, houseRooms:updateRoomdetail};
          dispatch(setHome(updatedRoom));
        }
        setConfirmationModal(null);
 }

  return (
    <section className='mt-10'>
       <section className='sm:px-8 py-2 sm:p-6  bg-richblack-700 rounded-lg'>
        {
          home?.houseRooms?.map((room) => (
            <details key={room._id} open>
              <summary  className='flex justify-between gap-x-3 items-center border-b-[2px] border-richblack-50 pb-2'c>
                 <div className='flex gap-3 items-center'>
                   <RxDropdownMenu className='text-xl text-richblack-300'/>
                   <p className='text-richblack-300 font-medium sm:text-base'>Room Number {room.roomNum}</p>
                 </div>
                 <div className='flex gap-3 items-center justify-between'>
                  <button
                   onClick={() => handleEdit(room._id, room.roomNum, room.price, room.facility, room.aboutRoom, room.size)}
                  >
                    <MdEdit className='text-xl text-richblack-300'/>
                  </button>
                  <button
                   onClick={() => setConfirmationModal({
                                text1:"Delete This Room",
                                text2:"All the data & images in this room will be deteled",
                                btn1Text:"Delete",
                                btn2Text:"Cancel",
                                btn1Handler: ()=>handleDeleteRoom(room._id),
                                btn2Handler:()=>setConfirmationModal(null),
                   })}
                  >
                       <RiDeleteBin6Line className='text-xl text-richblack-300'/>
                  </button>
                  <span className='text-xl text-richblack-300'>|</span>
                 <AiOutlineCaretDown className='text-xl text-richblack-300'/>
                 </div>
              </summary>
              
              <div>
             
                {
                  
                  room?.images?.map((image) => (
                    <div
                     onClick={() => setViewSection(image)}
                     key={image?._id}
                     className='flex justify-between items-center bg-richblack-500 my-3 rounded-lg p-4'
                    >
                      
                       <img src={image.image} alt='Server Down' className='w-[100px] h-[50px] rounded-lg'/>
                       <div
                        onClick={(e) => e.stopPropagation()}
                       >
                         <button
                          onClick={() => setConfirmationModal({
                                text1:"Delete This Room",
                                text2:"All the data & images in this room will be deteled",
                                btn1Text:"Delete",
                                btn2Text:"Cancel",
                                btn1Handler: ()=>hanleDeleteImages(room._id, image._id),
                                btn2Handler:()=>setConfirmationModal(null),
                          })}
                         >
                            <RiDeleteBin6Line className='text-xl text-richblack-300'/>
                         </button>
                       </div>
                    </div>
                  ))
                }
                        <button
                         onClick={()=>setAddSection(room._id)}
                         className='mt-2 mb-4 flex text-yellow-50 items-center gap-x-2'
                        >
                            <AiOutlinePlus/>
                            <p>Add Room Image</p>
                      </button>
              </div>

            </details>
          ))
        }
       </section>
       {
        addSection ? <ImageUploaderForm 
            modalData = {addSection}
            setModalData ={setAddSection}
            add ={true}
            /> 

        :(viewSection ? <ImageUploaderForm
            modalData = {viewSection}
            setModalData ={setViewSection}
            view ={true}
        /> : <div></div>)
       }

       {confirmationModal ? <Confirmationmodal modalData = {confirmationModal}/>:"" }
    </section>
  )
}

export default NestedView