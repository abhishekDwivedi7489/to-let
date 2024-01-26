import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../services/operation/authApi';
import { Link, useNavigate } from 'react-router-dom';
import { AiOutlineCaretDown } from "react-icons/ai";
import { VscDashboard, VscSignOut } from "react-icons/vsc";
import useOnClickOutSide from '../../hook/useOnClickOutSide';

const ProfileDropDown = () => {
  const { user } = useSelector((state) => state.profile)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const ref = useRef();
  const [open, setOpen] = useState(false);

  function clickHandler(open){
    if(open ){
      
      setOpen(false);
      // console.log("true condition open",open)
     
    }
    else{
      
      setOpen(true)
      // console.log("false condition open",open)
    }
  }
  
  
 useOnClickOutSide(ref, ()=>setOpen(false))
  return (
    <section className='relative cursor-pointer' >

      <div className='flex items-center text-richblack-200 gap-x-0 sm:gap-x-2' onClick={() => clickHandler(open) } >
        <img src={user?.image} alt={user?.firstName}  className='aspect-square rounded-full w-[23px] sm:w-[30px] object-cover'/>
        <AiOutlineCaretDown/>
      </div>
       
      { open === true &&
        <div className='absolute rounded-md border-[1px] overflow-y-hidden
       border-richblack-200 z-[100] py-1 bg-[rgba(0,0,0,0.8)] text-richblack-200
        top-[143%] right-0 ' onClick={(e) => e.stopPropagation()} ref={ref}>
           <Link to={"/dashboard/my-profile"} className='flex items-center gap-x-1 p-2' onClick={() => setOpen(false)}>
              <VscDashboard className="text-lg"/>{/*divide-y-[1px] divide-richblack-200 */}
              Dashboard
           </Link>
          <hr></hr>
          <button onClick={()=>{dispatch(logout(navigate)) 
                               setOpen(false)}} className='flex items-center gap-x-1 p-2'>
                               <VscSignOut className="text-lg"/>
                               logout</button>

       </div>
      }
    </section>
  )
}

export default ProfileDropDown