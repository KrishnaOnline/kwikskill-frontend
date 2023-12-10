import React, { useEffect, useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateProfileDetails, updateProfilePic } from '../../../services/operations/profileAPI'
import { useForm } from 'react-hook-form'
import { changePassword } from '../../../services/operations/profileAPI'
import { deleteAccount } from '../../../services/operations/profileAPI'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { logout } from '../../../services/operations/authAPI'
import { setUser } from '../../../slices/profileSlice'
import { ACCOUNT_TYPE } from '../../../utils/constants'


const Settings = () => {
        const useForm1 = useForm()
        const useForm2 = useForm()
        const {register: register1, handleSubmit: handleSubmit1, reset: reset1, formState: formState1, setValue: setValue1} = useForm1
        const {register: register2, handleSubmit: handleSubmit2, reset: reset2, formState: formState2} = useForm2
        const dispatch = useDispatch()
        const navigate = useNavigate()
        // const token = JSON.parse(localStorage.getItem('token')).token
        // const {token} = useSelector(state => state.auth.token)
        const userLocal = localStorage.getItem('user')
        const {token} = JSON.parse(userLocal)
        //console.log(token)
        const {user, loading: profileLoading} = useSelector((state) => state.profile)
        const authLoading = useSelector((state) => state.auth.loading)
        const [profilePicture, setProfilePicture] = useState(null)
        const [previewSource, setPreviewSource] = useState(null)
        const handleSelectFile = (e) => {
            e.preventDefault()
            const pic = e.target.files[0]
            setProfilePicture(pic)
            if(pic) {
                const reader = new FileReader()
                reader.onloadend = () => {
                    setPreviewSource(reader.result)
                }
                reader.readAsDataURL(pic)
            } else {
                //console.log("No File")
            }
        }
        const handleUpload = async (e) => {
            e.preventDefault()
            await dispatch(updateProfilePic(profilePicture, token))
        }
        const profDetailsSubmitHandler = async (formData1) => {
            const {firstName, lastName, dateOfBirth, gender, contactNumber, about} = formData1
            //console.log(formData1)
            dispatch(updateProfileDetails(firstName, lastName, dateOfBirth, gender, contactNumber, about, token))
        }
        const changePasswordHandler = async (formData2) => {
            const {oldPassword, newPassword, confirmPassword} = formData2
            //console.log(formData2)
            dispatch(changePassword(oldPassword, newPassword, confirmPassword, token))
        }
        const accountDeleteHandler = async () => {
            if(user.email === "stud01@mail.com" || user.email === "ins01@mail.com") {
                toast.error("You cannot Delete Demo User Account")
            }
            const confirmResponse = confirm("Are You Sure to Delete Your Account ?")
            if(confirmResponse) {
                let enterEmail = prompt("Enter Your Associated Email: ")
                if(enterEmail === user.email) {
                    dispatch(deleteAccount(token, navigate))
                    dispatch(logout(navigate))
                } else {
                    toast.error("Incorrect Email Address")
                }
            }
        }
        
  return (
    <div>
        <p className='text-3xl font-medium mb-9'>Edit Profile</p>
        <div className='flex mb-7 gap-7 mx-auto items-center p-6 w-[100%] border rounded-2xl shadow-md drop-shadow-lg'>
            <img className='h-16 aspect-square rounded-full' src={/*previewSource ||*/ user.image}/>
            <form className='flex flex-col gap-5'>
                <p className='font-medium'>Change Profile Picture</p>
                <div className='flex items-center justify-center gap-x-2'>
                    <label htmlFor='profilePicture' className='cursor-pointer px-3 font-medium py-1 border border-black rounded-md'>
                        <input
                            className='hidden'
                            id='profilePicture'
                            type='file'
                            accept='image/*, .jpeg, .jpg, .png'
                            onChange={handleSelectFile}
                            multiple={false}
                            // {...register1("profilePicture")}
                        />
                            Select
                    </label>
                    <span>{`>`}</span>
                    <button className='border border-black px-3 py-1 rounded-md bg-[#082F66] text-white font-medium hover:scale-95 transition-all duration-200' type='submit' onClick={handleUpload}>Upload</button>
                </div>
            </form>
        </div>
        <div className='flex flex-col mb-7 gap-7 mx-auto py-6 w-[100%] border rounded-2xl shadow-md drop-shadow-lg'>
            <p className='font-medium text-lg px-6'>Profile Information</p>
            <div>
                <form className='flex flex-col w-full' onSubmit={handleSubmit1(profDetailsSubmitHandler)}>
                    <div className='flex items-start flex-wrap w-full'>
                        <label className='w-full md:w-[40%] mx-8 my-4'>
                            <p>First Name</p>
                            <input
                                name='firstName'
                                type='text'
                                id='firstName'
                                className='w-full p-2 border rounded-lg'
                                defaultValue={user.firstName}
                                placeholder='Enter First Name'
                                {...register1("firstName")}
                            />
                        </label>
                        <label className='w-full md:w-[40%] mx-8 my-4'>
                            <p>Last Name</p>
                            <input
                                name='lastName'
                                type='text'
                                id='lastName'
                                className='w-full p-2 border rounded-lg'
                                defaultValue={user.lastName}
                                placeholder='Enter Last Name'
                                {...register1("lastName")}
                            />
                        </label>
                        <label className='w-full md:w-[40%] mx-8 my-4'>
                            <p>Date of Birth</p>
                            <input
                                name='dateOfBirth'
                                type='date'
                                id='dateOfBirth'
                                className='w-full p-2 border rounded-lg'
                                defaultValue={user.additionalDetails.dateOfBirth || null}
                                placeholder='DD/MM/YYYY'
                                {...register1("dateOfBirth")}
                            />
                        </label>
                        <label className='w-full md:w-[40%] mx-8 my-4'>
                            <p>Gender</p>
                            <select
                                name='gender'
                                className='w-full p-2 border rounded-lg'
                                defaultValue={user.additionalDetails.gender}
                                {...register1("gender")}
                            >
                                <option>Male</option>
                                <option>Female</option>
                                <option>Other</option>
                            </select>
                        </label>
                        <label className='w-full md:w-[40%] mx-8 my-4'>
                            <p>Contact Number</p>
                            <input
                                name='contactNumber'
                                type='tel'
                                id='contactNumber'
                                className='w-full p-2 border rounded-lg'
                                // onChange={handleChange}
                                defaultValue={user.additionalDetails.contactNumber}
                                // defaultValue={user.additionalDetails.contactNumber || null}
                                placeholder='Enter Contact Number'
                                {...register1("contactNumber")}
                            />
                        </label>
                        <label className='w-full md:w-[40%] mx-8 my-4'>
                            <p>About</p>
                            <input
                                name='about'
                                type='text'
                                id='about'
                                className='w-full p-2 border rounded-lg'
                                defaultValue={user.additionalDetails.about}
                                placeholder='Write about Yourself'
                                {...register1("about")}
                            />
                        </label>
                    </div>
                    <button onClick={handleSubmit1(profDetailsSubmitHandler)} className='mt-5 border border-black w-[17%] mx-auto py-2 rounded-md bg-[#082F66] text-white font-medium hover:scale-95 transition-all duration-200'>Save</button>
                </form>
            </div>
        </div>
        <div className='flex flex-col justify-start gap-7 mb-7 mx-auto p-6 w-[100%] border rounded-2xl shadow-md drop-shadow-lg'>
            <p className='font-medium text-lg'>Change Password</p>
            <form className='flex flex-col gap-5' onSubmit={handleSubmit2(changePasswordHandler)}>
                <label>
                    <p>Current Password</p>
                    <input
                        name='oldPassword'
                        type='password'
                        id='oldPassword'
                        className='w-full md:w-1/2 p-2 border rounded-lg'
                        required
                        placeholder='Enter Current Password'
                        {...register2("oldPassword")}
                    />
                </label>
                <label>
                    <p>Create New Password</p>
                    <input
                        name='newPassword'
                        type='password'
                        id='newPassword'
                        className='w-full md:w-1/2 p-2 border rounded-lg'
                        required
                        placeholder='Enter New Password'
                        {...register2("newPassword")}
                    />
                </label>
                <label>
                    <p>Confirm New Password</p>
                    <input
                        name='confirmPassword'
                        type='password'
                        id='confirmPassword'
                        className='w-full md:w-1/2 p-2 border rounded-lg'
                        required
                        placeholder='Confirm New Password'
                        {...register2("confirmPassword")}
                    />
                </label>
                <button className='mt-5 border border-black w-[30%] mx-auto py-2 rounded-md bg-[#082F66] text-white font-medium hover:scale-95 transition-all duration-200' onClick={handleSubmit2(changePasswordHandler)}>Change Password</button>
            </form>
        </div>
        {
            user?.accountType !== ACCOUNT_TYPE.ADMIN && (
                <div>
                    <p className='text-red-700 text-lg font-semibold mx-auto w-[100%] mb-3 mt-9'>Danger Zone</p>
                    <div className='bg-red-400 flex flex-col mb-7 gap-5 mx-auto p-6 w-[100%] border rounded-2xl shadow-md drop-shadow-lg'>
                        <p className='text-red-900 font-medium text-lg'>Delete My Account</p>
                        <p className='font-semibold'>By Deleting your Account, all of your Progress will be LOST, including all the courses you have {user?.accountType === ACCOUNT_TYPE.STUDENT ? 'Enrolled In' : 'Created'}. Proceed only if you're Sure About It</p>
                        <button onClick={accountDeleteHandler} className='border border-black w-[25%] mx-auto p-2 rounded-md bg-red-700 text-black hover:scale-95 transition-all duration-200 font-bold'>Delete Account</button>
                    </div>
                </div>
            )
        }
    </div>
  )
}

export default Settings