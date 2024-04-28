import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { getHomeData, getRoomData } from '../../services/operation/homeApi';
import { setRoom , setHome} from '../../slices/homeSlice';
import '../Dashboard/myRoom/allRoomsData/button.css';
import Loader from '../common/Loader'
import { CiSquareChevLeft } from "react-icons/ci";
import { CiSquareChevRight } from "react-icons/ci";
import OwnerDataModal from './OwnerDataModal';

const Room = () => {
    const {roomId , homeId} = useParams();
    
    const dispatch = useDispatch()
    const[loading, setLoading] = useState(false)
    const[modal, setModal] = useState(false);
    const [count, setCount] = useState(0);
    const {room} = useSelector((state) => state.Room)
    const [ home, sethome] = useState()
    useEffect(() => {
        async function getRoom(){
            setLoading(true)
             const result = await getRoomData(roomId);
             const res = await getHomeData(homeId);
             setLoading(false)
             if(result && res){
                sethome(res)
               dispatch(setRoom(result)); 
               dispatch(setHome(res))
               
             }
        }

        getRoom()
    },[])
   
   const decrementCount = (length) => {
          if(count === 0)
          {
            setCount(length-1);
          }
          else{
            
            setCount((prev) => prev-1);
          }
          
   }

   const incrementCount = (length) => {     
        if(count < length -1) 
        {
          setCount((prev) => prev + 1);
          
        }
        else{
          setCount(0)
        }
   }

  const clickHandler = () => {
    window.scrollTo({top: 0, left: 0, behavior: 'smooth' })
    setModal(true)
  }
  
  if(loading)
  {
    return <Loader/>
  }

   
  return (
    <section className='overflow-hidden  w-[100vw] mt-2 pb-[1rem]'>
    
       {
        room && (
          <section className=' max-w-[1035px] w-[96%] mx-auto'>
          <marquee className ="text-pink-200 ">NOTE :-  You need to contact the owner for booking</marquee>
          <section className='flex flex-wrap justify-between'>
          <div className='flex flex-col gap-y-6'>
             <div className='relative border w-[100%] md:w-[500px] h-[250px] rounded overflow-hidden p-3 bg-richblack-900 room_data_box_shadow '>
                <img src={room.images[count].image} alt='Image not found' className='h-full w-[85%] md:w-[410px] mx-auto'/>
                <span className='absolute bottom-2 right-0 text-xl cursor-pointer text-richblack-25'>{count +1}/{room.images.length}</span>
                <span onClick={() =>decrementCount(room.images.length)} className='absolute top-[40%] left-0 font-semibold text-4xl cursor-pointer text-richblack-25'>
                   <CiSquareChevLeft />
                </span>
                <span onClick={()=>incrementCount(room.images.length)} className='absolute top-[40%] right-0 font-semibold text-4xl cursor-pointer text-richblack-25'>
                   <CiSquareChevRight />
                </span>
             </div>
             <div className='flex flex-wrap gap-2 mt-3'>
              {
                room?.images?.map((imageData,i) => (
                  <div key={i} onClick={() => setCount(i)} className={`w-[60px] sm:w-[100px] rounded-full text-pink-400 p-1 flex items-center ${count === i ? "bg-gradient-to-tr from-[#833ab4] via-[#fd1d1d] to-[#fcb045] ": "border-[2px] border-[#88662D]"} `}>
                    <img src={imageData.image} alt={imageData._id} className='h-[60px] sm:h-[90px] object-fill w-full rounded-full'/>
                  </div>
                ))
              }
             </div>

          </div>
          <div className='flex flex-col items-center  gap-4 mx-auto'>
            <div className='room_data_box_shadow border-[2px] border-[#B5B5B5] rounded-md p-3 max-w-max  px-5 py-3 flex flex-col gap-2  mt-4'>
              <p className='text-2xl font-inter font-semibold text-richblack-900'>Price</p>
              <p className='text-2xl font-inter font-semibold text-richblack-800 ml-2'>₹ {room.price}</p>
              <button className='btn' onClick={clickHandler}>Book</button>
            </div>
            <div className='room_data_box_shadow p-3 w-[90vw] md:w-[440px] rounded-md px-5 py-3 flex flex-col gap-2 mt-[4rem] border-[2px] border-[#B5B5B5]'>
              <p className='text-2xl font-inter font-semibold text-richblack-900'>Room Details</p>
              <hr/>
              <div className='flex gap-4'>
                <div className='flex flex-col gap-y-3'>

                   
                   <p className='text-base font-inter font-semibold text-richblack-900'>Room No</p>
                   <p className='text-base font-inter font-semibold text-richblack-900'>Facility</p>
                   <p className='text-base font-inter font-semibold text-richblack-900'>Size</p>
                   <p className='text-base font-inter font-semibold text-richblack-900'>Status</p>
                  
                </div>
                <div className='flex flex-col gap-y-4'>
                   <p className='text-sm font-inter font-semibold text-richblack-900'>{room.roomNum}</p>
                   <p className='text-sm font-inter font-semibold text-richblack-900'>{room.facility}</p>
                   <p className='text-sm font-inter font-semibold text-richblack-900'>{room.size}</p>
                   <p className='text-sm font-inter font-semibold text-richblack-900'>{room.status}</p>
                   
                </div>
              </div>
              <div className='flex gap-x-7'>
                <p className='text-base font-inter font-semibold text-richblack-900'>About</p>
                <p className='text-sm font-inter font-semibold text-richblack-900 '>{room.aboutRoom}</p>
              </div>
            </div>
          </div>
         </section>
         {/* Home Details are here */}
         <section className='mb-4'>
            {
              home &&(
                
               <section className='room_data_box_shadow p-3 w-[95%] mx-auto rounded-md px-5 py-3 flex flex-col gap-2 mt-[2rem] border-[2px] border-[#B5B5B5]'>
                 <p className='text-2xl font-inter font-semibold text-richblack-900'>Home Details</p>
                 <hr></hr>
                 <section className='flex justify-between flex-wrap items-center '>
                  {/* left home Details */}
                   <div className='mb-3'>
                     <div className='flex flex-col gap-y-3'>
                       <div className='flex gap-x-11'>
                          <p className='text-base font-inter font-semibold text-richblack-900'>Address</p>
                          <p className='text-sm font-inter font-semibold text-richblack-900'>{home.address}</p>
                       </div>
                       <div className='flex gap-4'>
                           <p className='text-base font-inter font-semibold text-richblack-900'>Instructions</p>
                           <p className='text-sm font-inter font-semibold text-richblack-900'>{home.instructions}</p>
                       </div>
                       <div className='flex gap-4'>
                           <p className='text-base font-inter font-semibold text-richblack-900'>Description</p>
                           <p className='text-sm font-inter font-semibold text-richblack-900'>{home.description}</p>
                       </div>
                 
                     </div>
                    {/* Right Home Detail */}
                   </div>
                   <div className='flex gap-4'>
                   <div className='flex flex-col gap-y-3'>
                      <p className='text-base font-inter font-semibold text-richblack-900'>Area</p>
                      <p className='text-base font-inter font-semibold text-richblack-900'>City</p>
                      <p className='text-base font-inter font-semibold text-richblack-900'>State</p>
                     </div>
                     <div className='flex flex-col gap-y-4'>
                      <p className='text-sm font-inter font-semibold text-richblack-900'>{home.area}</p>
                      <p className='text-sm font-inter font-semibold text-richblack-900'>{home.city}</p>
                      <p className='text-sm font-inter font-semibold text-richblack-900'>{home.state}</p>
                     </div>
                   </div>
                 </section>
                 
               </section>
                
              )
            }
         </section>
          </section>
        )
       }

       {modal && <OwnerDataModal setModal = {setModal}/>}
    
    </section>
  )
}

export default Room
