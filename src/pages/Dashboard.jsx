import React from 'react'
import { useSelector } from 'react-redux'
import Loader from '../component/common/Loader';
import { Outlet } from 'react-router-dom';
import Sidebar from '../component/Dashboard/Sidebar';

const Dashboard = () => {

  const {loading : profileLoading} = useSelector((state) => state.profile);
  const {loading : authLoading } = useSelector((state) => state.auth)

 if(profileLoading || authLoading){
  return <Loader/>
 }

  return (
    <div className='-z-10 overflow-hidden min-h-[calc(100vh-3.5rem)] flex'>
         <Sidebar/>
          <div className='flex-1 overflow-auto h-[calc(100vh-3.5rem)]'>
            <div className='mx-auto w-11/12 max-w-[1000px] py-10'>
              <Outlet/>
            </div>
          </div>
    </div>
  )
}

export default Dashboard