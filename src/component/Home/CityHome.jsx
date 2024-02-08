import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { areaWiseHomeData, cityWiseHomeData } from '../../services/operation/homeApi';
import Loader from '../common/Loader';
import  './Filter.css';

const CityHome = () => {
  
    const {cityName} = useParams();
    const [loading, setLoading] = useState(false);
    const [homeData, setHomeData] = useState(null);
    const [openCate, setOpenCate] = useState(false);
   
   
    const navigate = useNavigate()
    // filter Section
    const [open, setOpen] = useState(false)
    const [formData, setFormData] = useState({area :""})
    let [homeDataFil, setHomeDataFil] = useState(null);
    console.log("home",homeDataFil);
    //
    useEffect(() =>{
              async function cityWiseSerch(){
                setLoading(true)
                 const result = await cityWiseHomeData();
                 setLoading(false)
                 if(result){
                    
                    const data = result?.filter((home) => home.city.toUpperCase() === cityName.toUpperCase())
                    setHomeData(data);
                    setHomeDataFil(data);
                 }
                 } 

              cityWiseSerch();

               },[cityName])


               const formSubmitHadler =async(e) => {
                e.preventDefault();
                setLoading(true)
                 const res = await areaWiseHomeData(formData.area);
                 const result  = res.filter((home) => home.area === formData.area);
                 
                if(result){
                   setHomeData(result);
                }
                setFormData("");
                setLoading(false)

               }

               function clickHandler(data){    
                  setFormData({area : data});
                  setOpenCate(false);
               } 

               const changeHandler = (e) => {
                  // setOpenCate(true);
                 const d = e.target.value;
                  const d1 = d.toUpperCase();
                 const data = ( homeData.filter((h) => h.area.toUpperCase().includes(d1)));
                
                  setHomeDataFil(data);
                  setFormData(e.target.value);
               }

               

if(loading){
    return <Loader/>
}

 else{ return (
    <section className='h-[100vh] md:w-[11/12] mt-3  p-3 mx-auto'>
      <button className='text-caribbeangreen-900 font-inter font-semibold border-[1px] border-[#001B0D] rounded-sm mb-3 px-3'
       onClick={() => setOpen((prev) => !prev)}>Filter
       </button>
      <section className='flex flex-wrap gap-4 md:p-4 overflow-y-auto'>
      {
         homeData?.length > 0 ? (
            homeData?.map((home) => (
            <section key={home._id} onClick={()=> navigate(`/home/${home._id}`)}
             className='cursor-pointer room_data_box_shadow_width border-[2px] border-[#B5B5B5] rounded-md'>
                      <div>
                        <img src={home.thumbnail} alt='server not respond' height={25} 
                        className='rounded object-fill home_image_effect h-[130px] w-full'/>
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
                           <p className='text-sm font-inter font-semibold bg-gradient-to-br from-[#833ab4] via-[#fd1d1d] to-[#fcb045] bg-clip-text text-transparent'>{home.category.name}</p>
                          </div>
                        </div>
                      </div>
                    </section>
         ))
         ) :(
            <p className='font-edu font-semibold text-2xl'>Not yet available in your entered city</p>
         )
      }
      </section>
         {open && 
              <section className={`${open ? "Open_Filter_Bar" : "close_filter_Bar"} `}>
             <section className=' overflow-hidden flex justify-end border-b-[1px] mb-1 px-3 '>
              <p className='text-xs font-semibold items-center cursor-pointer text-richblack-300' onClick={() => setOpen(false)}>
                 X
              </p>
             </section>
             {/* Area Section */}
              <section>
              <form onSubmit={formSubmitHadler} className='flex justify-between'>
                    
                    <div>
                    <label htmlFor='area' className='text-sm font-semibold mb-3'>Select Area</label>
                     <div className='flex gap-3'>
                     <input
                        name='area'
                        required
                        value={formData.area}
                        onChange={changeHandler}
                        onClick={() => setOpenCate(true)}
                        placeholder='Area Name'
                        className='text-black text-sm p-1 rounded-sm outline-none font-semibold'
                     />
                    <button className='text-sm font-semibold filter-button'>Search</button>
                    </div>
                    </div>
                   
                     
               </form>
               { openCate &&
               <section className='flex flex-col gap-1 bg-richblack-100 w-[60%] overflow-auto p-1 h-[30%] mt-1 rounded-sm shadow'>
                   {
                   homeDataFil?.length > 0 && (
                       homeDataFil?.map((home) => (
                         <section key={home._id} onClick={() => clickHandler(home.area)} 
                         className='cursor-pointer text-sm font-semibold bg-richblack-200 p-1 rounded-lg'>
                            {home.area}
                         </section>
                       ))
                     )
                     
                   }  
               </section>
               }
              </section>
             

              </section>
         
         }
    </section>
  )
 }
}

export default CityHome