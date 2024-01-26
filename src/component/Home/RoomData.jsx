import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getHomeData } from '../../services/operation/homeApi';
import { useDispatch, useSelector } from 'react-redux';
import { sethome } from '../../slices/homeSlice';
import Loader from '../common/Loader';

const RoomData = () => {

   const {homeId} = useParams();
  //  const dispatch = useDispatch();
  //  const {home} = useSelector((state) => state.Room)
   const[loading, setLoading] = useState(false)
   const navigate = useNavigate();
   const[data, setdata] = useState([]);
   useEffect(() => {
           
        async function getData(){
          let result;
          setLoading(true)
          result = await getHomeData(homeId);
          
          if(result){
            setLoading(false);
            const res =  result.houseRooms.filter((room) => room.status !== "Booked")
            setdata(res);
            //dispatch(sethome(result))
          }
        }
        getData();
   },[])


   
  
  if(loading)
  {
    return <Loader/>
  }
  else{
    return (
      <section className='max-w-[1035px] w-[11/12] mx-auto mt-10 h-[100vh]'>
      <section className='  flex flex-wrap gap-7 '>
         {
           data.length > 0 ?
           data?.map((home) => (
            <section key={home._id} onClick={()=> navigate(`/home/${homeId}/${home._id}`)} className='cursor-pointer mx-auto lg:mx-0 room_data_box_shadow_width 
            border-[2px] border-[#B5B5B5] rounded-md p-3 overflow-hidden '>
                <img src={home.images[0].image} alt='Not Found'  className='h-[100px] w-[100%] mb-2 hover:scale-[1.03] rounded-md transition-all duration-150'/>
                <section className='flex justify-between'>
                <div className='flex flex-col gap-y-1 font-inter font-semibold text-base '>
                  {/* <p>Room NO</p> */}
                  <p>Price</p>
                  <p>Type/Size</p>
                  <p>Facility</p>
                 
                </div>
                <div className='flex flex-col gap-y-1 font-inter font-semibold text-base'>
                  {/* <p>{home.roomNum}</p> */}
                  <p>{home.price}</p>
                  <p>{home.size}</p>
                  <p>{home.facility}</p>
                 
                </div>
                </section>
            </section>
          ) ) :(<p className='font-edu font-semibold text-2xl'>Not yet available Room in the home</p>)
         }
      </section>
      </section>
    )
  }
}

export default RoomData