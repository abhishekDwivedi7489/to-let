import React from 'react'
import IconBtn from '../common/IconBtn'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';
import {VscEdit} from 'react-icons/vsc'

const MyProfile = () => {
  const navigate = useNavigate();
  const {user} = useSelector((state) => state.profile);
  
  return (
    <section className='w-[98%] lg:w-[800px] sm:mx-auto lg:px-8 mt-[0rem] flex flex-col justify-between'>
       <h1 className='mb-9 font-bold text-3xl font-inter'>
         My Profile
       </h1>
      {/* Section 1 */}

      <section className='flex flex-col sm:flex-row justify-between p-4 items-start gap-3 border-[1px] rounded-lg mb-11'>
         <div className='flex items-center gap-x-8 gap-y-4 flex-wrap'>
           <img src={user?.image} alt={user?.firstName}
            className='aspect-square w-[68px] rounded-full object-cover'
           />
           <div>
            <p className='font-inter font-semibold'>{user?.firstName}  {user?.lastName}</p>
            <p className='font-edu font-medium'>{user?.email}</p>
           </div>
         </div>
         <IconBtn
            text = {"Edit"}
            type={"Edit"}
            onclick={()=>navigate("/dashboard/settings")}
         >
          <VscEdit/>
         </IconBtn>
      </section>

      {/* section 2 */}
      <fieldset className='border-[1px] rounded-lg p-4 '>
        <legend className='text-lg font-semibold '>Personal Details </legend>
         <section className='flex flex-col sm:flex-row gap-5 mb-6 gap-x-11'>
          {/* left section */}
         <section className='flex flex-col gap-y-3'>
           <div>
             <p className='font-inter font-bold'>First Name</p>
             <p className='font-mono font-medium text-lg'>{user?.firstName}</p>
           </div>
           <div>
             <p className='font-inter font-bold'>Last Name</p>
             <p className='font-mono font-medium text-lg'>{user?.lastName}</p>
           </div>
           
           <div>
             <p className='font-inter font-bold'>Gender</p>
             <p className='font-mono font-medium text-lg'>{user?.additionalDetails?.gender ?? "Add Gender"}</p>
           </div>
         </section>
         {/* Right Section */}
         <section className='flex flex-col gap-y-3'>
           <div>
             <p className='font-inter font-bold'>Email</p>
             <p className='font-mono font-medium text-base sm:text-lg tracking-normal'>{user?.email}</p>
           </div>
           <div>
             <p className='font-inter font-bold'>Mobile Number</p>
             <p className='font-mono font-medium text-lg'>{user?.contactNum}</p>
           </div>
           <div>
             <p className='font-inter font-bold'>Mobile Number II</p>
             <p className='font-mono font-medium text-lg'>{user?.additionalDetails?.mobNumber ?? "Add Additional Mobile Number"}</p>
           </div>
         </section>
         </section>
         <IconBtn
         text={"Edit"}
         type={"Edit"}
         onclick={() => navigate("/dashboard/settings")}
         
         >
            <VscEdit/>
         </IconBtn>
      </fieldset>
     
    </section>
  )
}

export default MyProfile