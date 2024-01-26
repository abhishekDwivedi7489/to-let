import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getOwnerALLHomeData} from '../../../services/operation/roomsApi'
import { setEditHome, setHome } from '../../../slices/roomSlice'
import Loader from '../../common/Loader'
import AddRooms from '../AddRooms/AddRooms'

const EditHome = () => {
    const {home} = useSelector((state) => state.home)
    const {token} = useSelector((state) => state.auth)
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch();
    const{homeId} = useParams();
    
    useEffect(() => {
        const getHomeData = async() =>{
            setLoading(true);
           const result = await getOwnerALLHomeData(homeId, token);
           if(result){
            dispatch(setEditHome(true));
            dispatch(setHome(result));
           }
           setLoading(false);
        }

        getHomeData();
    },[]);

    if(loading){
        return(
            <Loader/>
        )
       }
  return (
    <section>
       
       <div>
         {
           home ? (<AddRooms/>) :(<p className='text-white text-4xl font-bold flex justify-center items-center h-[100vh]'>Course not found</p>)
         }
       </div>
    </section>
  )
}

export default EditHome