import React from 'react'
import { FaCheck } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import RoomInfo from "./roomInfo/RoomInfo"
import RoomBuilder from './homebuild/RoomBuilder';
import Publish from './publish/Publish';

const AddRooms = () => {

   const {step} = useSelector((state) => state.home);

   const steps = [
    {
        id:1,
        title:"Home Information"
    },
    {
        id:2,
        title:"Room Builder"
    },
    {
        id:3,
        title:"Publish"
    }
   ]
  return (
    <section className="w-[100%] lg:w-[80%] mx-auto ">
        <section className='relative flex w-full mb-2'>
            {
                steps.map((item, i) => (
                    <>
                        <div className="flex items-center ">
                            <button className={`${step === item.id ? " border-yellow-50 bg-yellow-900 text-yellow-50"
                                                                    : " border-richblack-900  text-richblack-900"}
                                                                   border-[1px] grid cursor-default aspect-square w-[34px] place-items-center rounded-full
                                                 ${step > item.id && " bg-yellow-50"}`}
                            >
                                 {
                                   step > item.id ? (<FaCheck/>) : (item.id)
                                 }
                            </button>
                             
                            
                        </div>
                        {
                            item.id !== steps.length && (
                                <div
                                 className={`${step > item.id ? "border-yellow-50" :" border-richblack-800"}
                                 h-[calc(34px/2)] border-dashed w-[46%] border-b-[1px]
                                 `}
                                ></div>
                            )
                        }
                    </>
                ))
            }
        </section>
        <section className='flex select-none justify-between mb-16'>
            {
                steps.map((item) =>(
                    <div key={item.id} className=''>
                        <p className={`${step > item.id ? " text-richblack-900" : "text-richblack-700"} text-sm font-semibold`}>
                            {item.title}
                        </p>
                    </div>
                ))
            }
        </section>


        {step === 1 && <RoomInfo/>}
        {step === 2 && <RoomBuilder/>}
        {step === 3 && <Publish/>}
    </section>
  )
}

export default AddRooms