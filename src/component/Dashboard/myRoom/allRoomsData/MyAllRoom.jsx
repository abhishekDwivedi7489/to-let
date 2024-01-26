import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getOwnerALLHomeData, updateRoomDetail } from '../../../../services/operation/roomsApi';
import { useDispatch, useSelector } from 'react-redux';
import {setHome} from '../../../../slices/roomSlice'
import Loader from '../../../common/Loader'
import "./button.css"
 

const MyAllRoom = () => {
 
  const {token} = useSelector((state) =>state.auth);
 const [loading, setLoading] = useState(false);
  const {home} = useSelector((state) => state.home)
 const dispatch = useDispatch();
   
  const {homeId} = useParams();
  
  useEffect(() => {
    const getAllData = async() => {
      setLoading(true)
      const result = await getOwnerALLHomeData(homeId, token)
      console.log(result)
      if(result){
        dispatch(setHome(result));
      }
      setLoading(false)
    }
    getAllData();
  },[])

  async function onClickHandler(roomId, roomStatus){
    let status;
    if(roomStatus == "Empty"){
      status = "Booked"
    }
    else{
      status = "Empty"
    }
    const data ={
      roomId : roomId,
      homeId : homeId,
      status : status
    }
    const response = await updateRoomDetail(data, token);
    if(response){
      dispatch(setHome(response));
    }
  }

  if(loading){
   return <Loader/>
  }
 else{
  return (
    <section className='rounded-md space-y-8 w-[100%] lg:w-[80%] mx-auto '>
    
      <p className='font-inter bg-gradient-to-bl from-[#833ab4] via-[#fd1d1d] to-[#fcb045] bg-clip-text text-transparent
                      text-xl md:text-2xl font-extrabold tracking-tighter'>My Room</p>
                      
      <section>
        {
          home?.houseRooms?.map((room) => (
            <section key={room._id}>
            <hr  className='mb-4 mt-4'/>
              <section className='flex  items-start justify-between'>
                <section className='font-mono font-semibold mb-3'>
                 <p className='text-[#833ab4] font-bold'> Room No : {room.roomNum}</p>
                 <p>Price : {room.price}</p>
                 <p>Size : {room.size}</p>
                 <p> Facility : {room.facility}</p>
                 <p>About : {room.aboutRoom}</p>
                </section>
                <button
                  className='btn'
                  onClick={() => onClickHandler(room._id, room.status)}
                >{room.status}
                </button>
              </section>
              
              <section className='flex flex-wrap gap-4'>
                {
                  room?.images?.map((image) =>(
                    <img src={image.image} alt={image._id} key={image._id} width={200} height={500}
                      className='border-[2px] border-[#833ab4] rounded hover:border-[#fd1d1d]'
                    />
                  ))
                }
              </section>
            

            </section>
          ))
        }
      </section>
    
    </section>
  )
}
}

export default MyAllRoom