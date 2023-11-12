import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { logout } from '../../../services/operations/authAPI'
import { BiLogOut } from 'react-icons/bi'


const ProfileDropdown = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {user} = useSelector((state) => state.profile)
  if(!user) {
    //console.log("No User")
    return localStorage.setItem("token", null)
  }
  const handleLogout = () => {
    dispatch(logout(navigate))
  }
  return (
    <div className='flex gap-5 flex-row items-center justify-center'>
      <button
        onClick={handleLogout}
        className='bg-red-300 border border-black p-2 px-3 font-medium rounded-lg hidden md:flex'
      >Logout</button>
      <button onClick={handleLogout} className='bg-red-200 border px-2 border-black p-1 rounded-md text-black font-medium flex md:hidden'>
        Logout
      </button>
      <Link to='/dashboard/profile'>
        <div className='flex flex-col'>
          <img src={user?.image} className='aspect-square rounded-full object-cover h-[50px]'/>
          {/* <button>Dashboard</button> */}
        </div>
      </Link>
    </div>
  )
}

export default ProfileDropdown