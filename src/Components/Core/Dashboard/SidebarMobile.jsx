import React, { useState } from 'react'
import { sidebarLinks } from '../../../data/dashboard-links'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import SideBarLink from './SideBarLink'
import { logout } from '../../../services/operations/authAPI'
import Spinner from '../../Common/Spinner'


const SidebarMobile = ({isSidebarOpen, setIsSidebarOpen}) => {
  const {user} = useSelector((state) => state.profile)
  const profileLoading = useSelector((state) => state.profile.loading)
  const authLoading = useSelector((state) => state.auth.loading)
  if(authLoading || profileLoading) {
      return (
          <Spinner/>
      )
  }
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [confirmModal, setConfirmModal] = useState(null)
  const logoutHandler = () => {
      dispatch(logout(navigate))
  }

  return (
    <div className='w-full'>
        {
            sidebarLinks.map((link) => {
                if(link.type && user?.accountType !== link.type) return null
                return (
                    <SideBarLink  isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} styling={'hover:bg-[#082F66] hover:bg-opacity-20 transition-all duration-300'} key={link.id} link={link} iconName={link.icon}/>
                )
            })
        }
        <div className='my-5 bg-[#E5E7EB] h-[1px] w-[90%] mx-auto'></div>
        <div className=''>
            <SideBarLink  isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} styling={'hover:bg-[#082F66] hover:bg-opacity-20 transition-all duration-300'} link={{name: 'Settings', path: '/dashboard/settings'}} iconName={'VscSettingsGear'}/>
        </div>
        <button className='' onClick={logoutHandler}>
            <SideBarLink  isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} styling={'hover:bg-red-400'} link={{name: 'Logout', path: '/'}} iconName={'VscSignOut'}/>
        </button>
    </div>
  )
}

export default SidebarMobile