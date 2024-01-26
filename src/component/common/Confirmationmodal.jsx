import React from 'react'

const Confirmationmodal = ({modalData}) => {
  return (
    <div className='w-full absolute top-0 left-0 right-0 bottom-0 bg-richblack-400 opacity-95  
    z-10'>
<div className='text-white bg-richblack-900 
           absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]
          sm:max-w-max max-h-max rounded-lg flex flex-col gap-y-4 p-6 border-[1px] border-[richblack-5] w-[70%]'>
 <p className='text-xl font-semibold'>
    {modalData.text1}
 </p>
 <p className='text-sm text-richblack-300'>
   {modalData.text2}
 </p>
 <div className='flex flex-row gap-x-3 '>
 <button onClick={modalData?.btn1Handler}
      className='text-richblack-5 font-semibold bg-pink-900 py-1 px-2 rounded-md border-[1px] border-[richblack-5] '>
         {modalData?.btn1Text}
     </button>
     <button onClick={modalData?.btn2Handler}
      className='text-richblack-900 font-semibold bg-richblack-500 py-1 px-2 rounded-md border-[1px] border-[richblack-5] '>
         {modalData?.btn2Text}
     </button>
 </div>
</div>
</div>
  )
}

export default Confirmationmodal