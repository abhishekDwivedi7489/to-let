import React from 'react'
import { NavLink, matchPath, useLocation } from 'react-router-dom'
import * as Icons from "react-icons/vsc"
import './Sidebar.css'

const SidebarLinks = ({link, iconName, dashboardLen}) => {

    const Icon = Icons[iconName] ;
    const location = useLocation();

    function matchRoute(route){
        return matchPath({path:route}, location.pathname);
    }

  return (
   <NavLink to={link.path}
    className={`${matchRoute(link.path) ?"bg-yellow-800 text-yellow-50 border-l-[0.1rem] border-yellow-50":
    " text-richblack-300"} relative text-sm font-medium w-full sm:py-2 transition-all duration-200 link-hover-Color-Effect`}
   >
       <div className='flex gap-x-2 items-center justify-center link-hover-Effect'>
             <Icon className="text-lg link-hover-Effect-ico"/>
              <span className={`${dashboardLen ? "mobile-link-name" : "link-hover-Effect-name"}`}>{link.name}</span>
        </div>
   </NavLink>
  )
}

export default SidebarLinks