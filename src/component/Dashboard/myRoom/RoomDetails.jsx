import React, { useState } from 'react'
import { HOUSE_STATUS } from '../../../utils/constant';
import {AiOutlineClockCircle} from "react-icons/ai"
import {HiOutlineBadgeCheck} from "react-icons/hi"
import Confirmationmodal from "../../common/Confirmationmodal"
import { useNavigate } from 'react-router-dom';
import {MdEdit} from "react-icons/md"
import {RiDeleteBinLine} from "react-icons/ri"
import { deleteHomeDetail, editHomeDetails, getOwnerHomeData } from '../../../services/operation/roomsApi';
import { useSelector } from 'react-redux';

//import MyAllRoom from './allRoomsData/MyAllRoom';


const RoomDetails = ({ homeData, setHomeData}) => {
    // 
    const [confirmationmodal ,setConfirmationModal] = useState(null)
    const {token} = useSelector((state) => state.auth)
   // const {home} = useSelector((state) => state.home)
    const navigate = useNavigate()
   
    async function clickHandler( homeStatus, homeId){
        let status;
        
        if(homeStatus === "Empty"){
          status = "Booked"
        }
        else{
          status = "Empty"
        }
        const data ={
          homeId : homeId,
          homeStatus : status
        }
         await editHomeDetails(data, token);
         const response = await getOwnerHomeData(token);
        
        if(response){
          setHomeData(response);
        }
      }
    

    const handleHomeDelete =async(homeId) =>{
         await deleteHomeDetail(homeId, token);
        const result = await getOwnerHomeData(token);
        
        if(result){
            
            setHomeData(result);
        }
        setConfirmationModal(null)
    }

  return (
    <section className='flex flex-wrap gap-8 mx-auto'>
        {
            homeData?.map((homeData) =>(
                <div key={homeData._id} className='home_box_Shadow_Owner relative'>
                    <button className='absolute left-6 top-3 text-base text-caribbeangreen-800 border-[1px] hover:rounded-tl-lg hover:rounded-br-lg px-2 ' 
                            onClick={() => navigate(`/dashboard/All-Room-Data/${homeData._id}`)}>Open
                    </button>
                    <div className=' w-[100%] sm:w-[400px] overflow-hidden rounded '>
                        <img src={homeData.thumbnail} alt='Not Found' className='rounded w-full h-[150px] transition-all duration-300 '/>
                        <div className='flex items-center justify-between p-2 sm:p-4'>
                           <div className='font-inter font-semibold'>
                            <p>City : {homeData.city}</p>
                            <p>Area : {homeData.area}</p>
                            <p>Category : {homeData.category.name}</p>
                           </div>
                           <div>
                           {/*Book updata button */}
                            <button onClick={() => clickHandler(homeData.homeStatus , homeData._id)}
                            className='text-blue-300 mb-2 border-[1px] px-2 rounded-t-md'>
                                {homeData.homeStatus}
                            </button>

                            <div>
                            <button
                                //disabled={loading}
                                onClick={()=>navigate(`/dashboard/edit-home/${homeData._id}`) }
                                title="Edit"
                                className="px-2 transition-all duration-200 hover:scale-110 hover:text-caribbeangreen-300"
                                >
                                    <MdEdit size={20}/>
                                </button>
                                <button
                                //disabled={loading}
                                onClick={
                                  ()=>setConfirmationModal({
                                    text1:"Do You Want To Delete This Home?",
                                    text2:"All data releted to this home will be deleted",
                                    btn1Text:"Delete",
                                    btn2Text:"Cancel",
                                    btn1Handler:()=>handleHomeDelete(homeData._id),
                                    btn2Handler:()=>setConfirmationModal(null),
                                  })
                                }
                                title='Delete'
                                className="px-1 transition-all duration-200 hover:scale-110 hover:text-[#ff0000]"
                                >
                                  <RiDeleteBinLine size={20}/>
                                </button>
                            </div>
                            {
                                homeData.status === HOUSE_STATUS.DRAFT ?
                                (
                                    <p className="flex max-w-max flex-row items-center gap-2 mt-2 rounded-full bg-richblack-700 px-2 py-[2px] text-[12px] font-medium text-yellow-100">
                                        <AiOutlineClockCircle size={20}/>
                                        <span>Draft</span>
                                    </p>
                                 ) :
                                 (
                                    <p className='bg-richblack-800 flex gap-x-1 items-center mt-2 rounded-full py-1 px-2 text-pink-100 max-w-max'>
                                        <HiOutlineBadgeCheck size={20}/>
                                        <span>Publish</span>
                                    </p>
                                 )
                            }
                           </div>
                        </div>
                    </div>
                    <div>
                        {

                        }
                    </div>
                </div>
                
            ))
        }
        {
            confirmationmodal && <Confirmationmodal modalData={confirmationmodal}/>
        
        }
        
    </section>
  )
}

export default RoomDetails