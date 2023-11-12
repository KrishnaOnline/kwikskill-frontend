import React from 'react'
import * as Icons from 'react-icons/vsc'
import { useDispatch } from 'react-redux'
import { Link, NavLink, matchPath, useLocation } from 'react-router-dom'


const SideBarLink = ({link, iconName, styling, isSidebarOpen, setIsSidebarOpen}) => {
    const Icon = Icons[iconName]
    const location = useLocation()
    const dispatch = useDispatch()
    const matchRoute = (route) => {
        return matchPath({path: route}, location.pathname)
    }
  return (
    <div className={`${styling}`}>
        <Link
            onClick={() => setIsSidebarOpen(false)}
            to={link.path}
            className={`relative py-4 flex px-4 text-black ${matchRoute(link.path) ? 'bg-[#082F66] bg-opacity-20' : 'bg-opacity-0'} transition-all duration-300`}
        >
            <div className=''>
                <span
                    className={`absolute left-0 top-0 h-full w-[3.5px] bg-[#082F66] ${matchRoute(link.path) ? 'opacity-100' : 'opacity-0'}`}    
                ></span>
                <div className='flex justify-center gap-3 items-center'>
                    <Icon className='text-lg'/>
                    <span className=''>{link.name}</span>
                </div>
            </div>
        </Link>
    </div>
  )
}

export default SideBarLink