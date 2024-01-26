import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {BiPlusCircle} from 'react-icons/bi'
import { useNavigate } from 'react-router-dom'
import { getOwnerHomeData } from '../../../services/operation/roomsApi'
import Loader from "../../common/Loader"
import RoomDetails from './RoomDetails'




const MyRoom = () => {
    const {token} = useSelector((state) => state.auth)
    const [loading, setLoading] = useState(false);
   // const {home} = useSelector((state) => state.home);
    
    const [homeData, setHomeData] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
      
     async function fetchHomeData(){
        setLoading(true);
        const result = await getOwnerHomeData(token);
        
        if(result){
          setLoading(false);
          setHomeData(result);
        }
       
      } 
       fetchHomeData();
       
    },[])
    
  return (
    <section>
      {
        loading ? (<Loader/>) :
      <section>
        <div className='flex justify-between items-center mb-10'>
           <h1 className='font-inter bg-gradient-to-tr from-[#833ab4] via-[#fd1d1d] to-[#fcb045] bg-clip-text text-transparent
                      text-xl md:text-2xl font-extrabold tracking-tighter max-w-max'>My Home
                      <div className='stay_Div'>
                        <div className='move_Div'></div>
                      </div>
            </h1>
           <button
            onClick={() => navigate("/dashboard/add-rooms")}
            className='flex gap-x-1 items-center pulse-button p-2'
           >
            <span className='font-normal'>Add Home</span>
            <BiPlusCircle/>
           </button>
        </div>
        {homeData && <RoomDetails homeData = {homeData} setHomeData ={ setHomeData}/>}
      </section>
      }
    </section>
    
  )
}

export default MyRoom