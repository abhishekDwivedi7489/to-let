import React, { useEffect, useState } from 'react'
import Loader from '../component/common/Loader'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { categoryPagehome } from '../services/operation/homeApi';
import { setCategoryRoom } from '../slices/homeSlice';
import noImage from '../assets/NoConnection.PNG'

const Home = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {categoryRoom} = useSelector((state) => state.Room)
 

  useEffect(() => {
          
        async function categoryPageDetails(){
          setLoading(true);
          const result = await categoryPagehome()
          console.log(result)
          setLoading(false);
          if(result){
            dispatch(setCategoryRoom(result))
          }
          

        }

        categoryPageDetails();
      

  },[]);
  
  if(loading){
    return <Loader/>
  }

  else{
  return (
    <main className='bg-[#f6f4f4e3] pt-10'>
        {
          categoryRoom?.map((category, i) =>(
            <section key={i}  className='w-[100vw]  md:w-[11/12] mx-auto '>
               {
                category?.homes?.length > 0 &&
                <section className='flex flex-col gap-y-4 mb-5  p-3'>
                <p className='font-semibold text-xl font-edu max-w-max bg-gradient-to-br from-[#833ab4] via-[#fd1d1d] to-[#fcb045] bg-clip-text text-transparent'>
                    {category.name.toUpperCase()}
                    
                </p>
                <hr/>
               <section
               className='flex gap-4 flex-wrap'
               >
               
                {
                  category?.homes?.map((home) => (
                    <section key={home._id} onClick={()=> navigate(`/home/${home._id}`)} className='cursor-pointer  room_data_box_shadow_width border-[2px] border-[#B5B5B5] rounded-md'>
                      <div>
                        <img src={home.thumbnail} alt='server not respond' height={25} loading='lazy' className='rounded object-fill home_image_effect h-[130px] w-full'/>
                      </div>
                      <div className='flex p-1 pt-3 flex-wrap gap-y-2 justify-between'>
                        
                        <div className='flex gap-x-3'>
                           <div className='flex flex-col gap-y-3'>
                            <p className='text-base font-inter font-semibold text-richblack-900'>City</p>
                            <p className='text-base font-inter font-semibold text-richblack-900'>Area</p>
                           </div>
                          <div className='flex flex-col gap-y-4 mt-1'>
                          <p className='text-sm font-inter font-semibold text-richblack-900'>{home.city}</p>
                          <p className='text-sm font-inter font-semibold text-richblack-900'>{home.area}</p>
                          </div>
                        </div>

                        <div className='flex gap-x-3'>
                          <div className='flex flex-col gap-y-3'>
                           
                            <p className='text-base font-inter font-semibold text-richblack-900'>State</p>
                          </div>
                          <div className='flex flex-col gap-y-4 mt-1'>
                          
                           <p className='text-sm font-inter font-semibold text-richblack-900'>{home.state}</p>
                          </div>
                        </div>
                      </div>
                    </section> 
                  ))
                }
               </section>
               
                </section>  
               }
            </section>
          ))
          
        }
      {
        categoryRoom === null && <section className=' h-[100vh] flex flex-col gap-y-7 items-center justify-center 
                                       overflow-hidden absolute top-0 bottom-0 left-0 right-0 bg-richblack-5'>
                  <img 
                    src={noImage}
                    alt='No Connection Image'
                    
                  />
                  <p className='font-edu font-semibold text-2xl'>Check Your Internet Connection</p>
                 
        </section>
      }
    </main>
  )
}
}
export default Home