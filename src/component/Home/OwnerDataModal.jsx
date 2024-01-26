import React from 'react'
import { useSelector } from 'react-redux'

const OwnerDataModal = ({setModal}) => {
    const {home} = useSelector((state) => state.Room)
    
  return (
    <section className='absolute bg-richblack-500 opacity-[95%] w-full h-full top-0 bottom-0 left-0 right-0 z-10 items-center justify-center '>
    
      <section className='flex gap-2 items-center justify-center w-full h-full '>
      
      <section className='rounded-md border-richblack-700 bg-richblack-900 space-y-8 w-[90%] md:w-[500px] flex flex-col '>
            <div className='flex items-center justify-between  bg-richblack-800 rounded-md py-3 px-2'>
                <p className='text-richblack-5 text-lg font-semibold'>Room Owner Details</p>
                <span onClick={() => setModal(false)} className='cursor-pointer text-2xl font-bold text-richblack-300 border-[1px] border-[white] rounded-full px-2'>
                X</span>
                
            </div>
            <section className='mx-auto flex flex-col gap-y-3 px-3'>
                <img src={home.owner.image} alt={home.owner.firstName} className='aspect-square w-[100px] rounded-full  object-center mx-auto'/>
                <section className='flex flex-col gap-y-4 text-richblack-100 font-inter mb-8'>
                    <fieldset className='border-[1px] rounded-lg px-2 py-1 '>
                        <legend className='text-sm font-semibold'>Name</legend>
                        {home.owner.firstName +" "+ home.owner.lastName}
                    </fieldset>
                    <fieldset className='border-[1px] rounded-lg px-2 py-1 '>
                        <legend className='text-sm font-semibold'>Mobile Number </legend>
                        {home.owner.contactNum}
                    </fieldset>
                    <fieldset className='border-[1px] rounded-lg px-2 py-1'>
                        <legend className='text-sm font-semibold'>Mobile Number II</legend>
                        {home.owner.additionalDetails.mobNumber ? home.owner.additionalDetails.mobNumber : "Same Number"}
                    </fieldset>

                    <marquee className ="text-pink-200 ">NOTE :-  You need to contact the owner for booking</marquee>
                </section>
            </section>
        </section>
      </section>
    </section>
  )
}

export default OwnerDataModal