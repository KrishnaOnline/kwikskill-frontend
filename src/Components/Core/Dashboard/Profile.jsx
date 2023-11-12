import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { AiOutlineEdit } from 'react-icons/ai'


const Profile = () => {
    const {user} = useSelector((state) => state.profile)
    const navigate = useNavigate()
  return (
    <div className='flex flex-col justify-center'>
        <p className='text-3xl font-medium mb-9'>My Profile</p>
        <div className='flex flex-col gap-7 items-center justify-center'>
            <div className='flex items-center justify-between border bg-white w-[100%] p-6 rounded-2xl shadow-md drop-shadow-lg'>
                <div className='flex items-center'>
                    <img className='h-16 mr-5 aspect-square rounded-full' src={user.image}/>
                    <div className='flex flex-col'>
                        <p className='font-medium'>{user.firstName+" "+user.lastName}</p>
                        <p className='text-gray-600'>{user.email}</p>
                    </div>
                </div>
                <button className='bg-[#082F66] text-white hover:scale-95 transition-all duration-200 border flex items-center gap-x-2 border-black px-4 py-2 rounded-md' onClick={() => navigate('/dashboard/settings')}>
                    <div className='-translate-x-1'><AiOutlineEdit/></div> 
                    <p className='font-medium'>Edit</p>
                </button>
            </div>
            <div className='flex gap-4 items-center justify-between border bg-white w-[100%] p-6 rounded-2xl shadow-md drop-shadow-lg'>
                <div className='flex flex-col gap-3'>
                    <p className='text-lg font-medium'>About</p>
                    {
                        user.additionalDetails.about
                        ? (<p>{user.additionalDetails.about}</p>)
                        : (<p className='text-gray-500'>Write Something About Youself</p>)
                    }
                </div>
                <button className='bg-[#082F66] text-white hover:scale-95 transition-all duration-200 border flex items-center gap-x-2 border-black px-4 py-2 rounded-md' onClick={() => navigate('/dashboard/settings')}>
                    <div className='-translate-x-1'><AiOutlineEdit/></div> 
                    <p className='font-medium'>Edit</p>
                </button>
            </div>
            <div className='flex flex-col justify-between border w-[100%] bg-white p-6 rounded-2xl shadow-md drop-shadow-lg'>
                <div className='flex w-full justify-between'>
                    <p className='text-lg font-medium'>Personal Details</p>
                    <button className='bg-[#082F66] text-white hover:scale-95 transition-all duration-200 border flex items-center gap-x-2 border-black px-4 py-2 rounded-md' onClick={() => navigate('/dashboard/settings')}>
                        <div className='-translate-x-1'><AiOutlineEdit/></div> 
                        <p className='font-medium'>Edit</p>
                    </button>
                </div>
                <div className='my-2 bg-[#E5E7EB] h-[1px] w-[80%] mx-auto'></div>
                <div className='flex items-start flex-wrap'>
                    <label className='w-[30%] mx-8 my-4'>
                        <p className='text-gray-600'>First Name</p>
                        <p>{user.firstName}</p>
                    </label>
                    <label className='w-[30%] mx-8 my-4'>
                        <p className='text-gray-600'>Last Name</p>
                        <p>{user.lastName}</p>
                    </label>
                    <label className='w-[30%] mx-8 my-4'>
                        <p className='text-gray-600'>Email</p>
                        <p>{user.email}</p>
                    </label>
                    <label className='w-[30%] mx-8 my-4'>
                        <p className='text-gray-600'>Gender</p>
                        <p>{user.additionalDetails.gender ?? 'NA'}</p>
                    </label>
                    <label className='w-[30%] mx-8 my-4'>
                        <p className='text-gray-600'>Mobile Number</p>
                        <p>{user.additionalDetails.contactNumber ?? 'NA'}</p>
                    </label>
                    <label className='w-[30%] mx-8 my-4'>
                        <p className='text-gray-600'>Date of Birth</p>
                        <p>{user.additionalDetails.dateOfBirth ?? 'NA'}</p>
                    </label>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Profile