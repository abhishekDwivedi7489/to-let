import React, { useState } from 'react'
import { sidebarLinks } from '../../data/dashboard-links'
import { useDispatch, useSelector } from 'react-redux'
import SidebarLinks from './SidebarLinks';
import {VscSettingsGear, VscSignOut } from 'react-icons/vsc';
import Loader from '../common/Loader';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../services/operation/authApi';
import Confirmationmodal from '../common/Confirmationmodal';
import {FaAngleDoubleRight, FaAngleDoubleLeft} from 'react-icons/fa'
import './Sidebar.css'

const Sidebar = () => {

    const {user , loading : profileLoading} = useSelector((state) => state.profile);
    const [confirmationModal, setConfirmationModal] = useState(null)
    const [dashboardLen, setDashboardLen] = useState(false)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    if(profileLoading){
        return <Loader/>
    }

  return (
    <section >
        <div className={`${dashboardLen ? "mobile-Sidebar":"Side-Bar"} z-50`}>
          
            <div className='inside-sidebar-box'>
                {
                    sidebarLinks.map((link) => {
                        if(link.type && user.accountType !== link.type) return null
                        return(
                            <SidebarLinks key={link.id} link = {link} iconName = {link.icon} dashboardLen ={dashboardLen}/>
                        )
                })
                }
            </div>

            <div className='mt-6 mb-6 w-full mx-auto h-[1px] bg-richblack-700'></div>

            <div className='flex flex-col gap-y-2'>
               <SidebarLinks link={{name:"Settings", path:"/dashboard/settings"}} iconName="VscSettingsGear" dashboardLen ={dashboardLen}/> 
               <button
                 onClick={ () => setConfirmationModal({
                    text1 : "Are you Sure",
                    text2 : "You will be logged out of your account",
                    btn1Text : "Log Out",
                    btn2Text : "Cancel",
                    btn1Handler : () => dispatch(logout(navigate)),
                    btn2Handler : () => setConfirmationModal(null)
                 })}
                 className='text-sm font-medium text-richblack-300 link-hover-Color-Effect'
               >
                      <div className='flex gap-x-2 items-center justify-center py-2 link-hover-Effect'>
                        <VscSignOut className='text-lg link-hover-Effect-ico'/>
                        <span className={`${dashboardLen ? "mobile-link-name" : "link-hover-Effect-name"}`}>Log Out</span>
                      </div>
               </button> 
            </div>
            <div className='text-richblack-300 dashboard-set text-2xl'
            onClick={()=>setDashboardLen((prev) => !prev)}>
             {
              dashboardLen ? (<div className='Arrow'><FaAngleDoubleLeft/><span className='span-tag'>Less</span></div>) 
                            : (<div className='Arrow'><FaAngleDoubleRight/><span className='span-tag'>More</span></div>)
             }
            </div>
        </div>
       
        { confirmationModal && <Confirmationmodal modalData={confirmationModal}/>}
        
    </section>
  )
}

export default Sidebar