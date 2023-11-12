import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import SideBar from '../Components/Core/Dashboard/SideBar'
import { useSelector } from 'react-redux'
import Spinner from '../Components/Common/Spinner'
import SidebarMobile from '../Components/Core/Dashboard/SidebarMobile'
import { AiOutlineMenu } from 'react-icons/ai'


const Dashboard = () => {
    const profileLoading = useSelector((state) => state.profile.loading)
    const authLoading = useSelector((state) => state.auth.loading)
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)
    //console.log(isSidebarOpen)

    if(authLoading || profileLoading) {
        return (
            <Spinner/>
        )
    }

  return (
    <div className=''>
        <button className='md:hidden flex items-center gap-2 w-screen bg-gray-300 p-3 pl-6 mx-auto' onClick={() => setIsSidebarOpen(isSidebarOpen ? false : true)}>
            <AiOutlineMenu size={25}/>
            <p className='text-xl'>Menu</p>
        </button>
        <div className='flex relative flex-row justify-center h-fit max-w-[1280px] mx-auto w-11/12'>
            <div className='bg-white md:w-[20%] border-r-2'>
                <SideBar/>
            </div>
            {
                isSidebarOpen && (
                    <div className='absolute w-3/4 shadow-lg bg-white left-0 z-50 h-screen flex md:hidden'><SidebarMobile isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen}/></div>
                )
            }
            <div className='w-full md:w-[80%] px-6 py-5'>
                <Outlet/>
            </div>
        </div>
    </div>
  )
}

export default Dashboard