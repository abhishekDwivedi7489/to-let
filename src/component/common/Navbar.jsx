import React, { useState } from 'react'
import Logo from '../../component/logo/Logo'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import ProfileDropDown from '../auth/ProfileDropDown'
import {AiOutlineMenu} from 'react-icons/ai'
import {RxCross2} from 'react-icons/rx'
import {BsSearch} from 'react-icons/bs'
import "./Navbar.css"



const Navbar = () => {

  const {token} = useSelector((state) => state.auth)
  const navigate = useNavigate()
  const [showMenu, setShowMenu] = useState(false)
  const [formData, setFormData] = useState("");


  const submitHandler =(e)=>{
    e.preventDefault();
    navigate(`/${formData}`);
    setFormData("") 
  }
  return (
    <div className=' h-14 mx-auto flex items-center bg-richblack-700 '>
         <nav className='font-mono main-nav-bar-section'>
            <section>
               <Link to={"/"}>
                 <Logo/>
               </Link>
                
            </section>
            <section className='w-[50%] '>
             <form onSubmit={submitHandler} className='w-full flex items-center gap-x-2'>
              <input type='search'
               placeholder='City Name.....'
               value={formData}
               onChange={(e) => setFormData(e.target.value)}
               className='rounded-md w-[85%] pl-2 pr-0 py-1 outline-none'
              />
              <button className='text-xl text-richblack-25 font-bold'
              >
                <BsSearch/>
              </button>
              </form>
            </section>
           <section>
            <section className={`${showMenu ?'mobile-navbar' :'navbar' } `}>
              <div className='nav-link'>
               
                {
                  token === null && <Link to={"/signup"}>
                    <button className='login-button '
                      onClick={()=>setShowMenu(false)}
                    >
                      <span className='w-full h-14 flex items-center text-richblack-25 font-semibold'>Sign up</span>
                    </button>
                  </Link>
                }
                {
                  token === null && <Link to={"/login"}>
                    <button className='login-button'
                     onClick={()=>setShowMenu(false)}
                    > 
                      <span className='w-full h-14 flex items-center text-richblack-25 font-semibold'>Login </span>
                    </button>
                    
                  </Link>
                }
                
              </div>
             
            </section>
            { token === null &&
            <section className='text-richblack-25 text-2xl hamburgar-menu'
              onClick={() => setShowMenu((prev) => !prev)}
             >
              {
                showMenu  ? <RxCross2/> : <AiOutlineMenu/>
              }
            </section>
            }
            </section>
            {
              token !== null && <ProfileDropDown/>
            }
         </nav>
    </div>
  )
}

export default Navbar