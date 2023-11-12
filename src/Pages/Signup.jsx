import React, { useState } from 'react'
import { ACCOUNT_TYPE } from '../utils/constants'
import { toast } from 'react-hot-toast'
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import Tab from '../Components/Common/Tab'
import { useDispatch, useSelector } from 'react-redux'
import { setSignupData } from '../slices/authSlice'
import { sendOTP } from '../services/operations/authAPI'
import { useNavigate } from 'react-router-dom'
import Spinner from '../Components/Common/Spinner'
import { Link } from 'react-router-dom'


const Signup = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { loading } = useSelector((state) => state.auth)
  const [accountType, setAccountType] = useState('')
  const [formData, setFormData] = useState({firstName:"", lastName:"", email:"", password:"", confirmPassword:""})
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const { firstName, lastName, email, password, confirmPassword } = formData
  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((prevData) => ({
      ...prevData, 
      [name]:value,
    }))
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    if(password !== confirmPassword) {
      toast.error("Passwords Do Not Match")
      return
    }
    const signupData = {
      ...formData, accountType,
    }
    if(signupData.accountType === '') {
      toast.error("Select Account Type")
    } else {
      dispatch(setSignupData(signupData))
      dispatch(sendOTP(formData.email, navigate))
    }
    //console.log(signupData)
    setFormData({
      firstName:"", lastName:"", email:"", password:"", confirmPassword:"",
    })
    // setAccountType(ACCOUNT_TYPE.STUDENT)
  }
  const tabData = [
    {
      id:1, tabName:"Student", type:ACCOUNT_TYPE.STUDENT,
    },
    {
      id:2, tabName:"Instructor", type:ACCOUNT_TYPE.INSTRUCTOR,
    }
  ]
  return (
    loading 
    ? (<Spinner/>)
    : (<div className='h-[750px] pt-12 mx-auto flex flex-col items-center gap-7 signup-page'>
        <h1 className='text-4xl font-medium drop-shadow-lg'>Signup</h1>
        <Tab tabData={tabData} field={accountType} setField={setAccountType}/>
        <form onSubmit={handleSubmit} className='w-[90%] md:w-[30%] mx-auto flex flex-col gap-5 drop-shadow-lg'>
          <div className='flex flex-col gap-5'>
              <div className='flex flex-row gap-2'>
                <div className='flex flex-col w-[50%]'>
                  <label htmlFor='firstName' className='text-lg mb-1'>First Name <span className='text-red-500'>*</span> </label>
                  <input required className='w-full p-3 border rounded-lg' placeholder='Enter First Name' name='firstName' type='text' value={firstName} onChange={handleChange}/>
                </div>
                <div className='flex flex-col w-[50%]'>
                  <label htmlFor='lastName' className='text-lg mb-1'>Last Name <span className='text-red-500'>*</span> </label>
                  <input required className='w-full p-3 border rounded-lg' placeholder='Enter Last Name' name='lastName' type='text' value={lastName} onChange={handleChange}/>
                </div>
              </div>
              <div className='flex flex-col w-[100%]'>
                <label htmlFor='email' className='text-lg mb-1'>Email Address <span className='text-red-500'>*</span> </label>
                <input required className='w-full p-3 border rounded-lg' placeholder='Enter Email Address' name='email' type='email' value={email} onChange={handleChange}/>
              </div>
              <div className='flex flex-row gap-2'>
                <div className='flex flex-col w-[50%]'>
                  <label className='relative'>
                    <p className='text-lg mb-1'>Create Password <span className='text-red-500'>*</span> </p> 
                    <input required className='w-full p-3 border rounded-lg' placeholder='Create Password' name='password' type={showPassword ? 'text' : 'password'} value={password} onChange={handleChange}/>
                    <span className='absolute right-2 bottom-4 mr-2 scale-125' onClick={() => setShowPassword((prev) => !prev)}>
                      {
                        showPassword 
                        ? (<AiOutlineEyeInvisible/>) 
                        : (<AiOutlineEye/>)
                      }
                    </span>
                  </label>
                </div>
                <div className='flex flex-col w-[50%]'>
                  <label className='relative'>
                    <p className='text-lg mb-1'>Confirm Password <span className='text-red-500'>*</span> </p> 
                    <input required className='w-full p-3 border rounded-lg' placeholder='Confirm Password' name='confirmPassword' type={showConfirmPassword ? 'text' : 'password'} value={confirmPassword} onChange={handleChange}/>
                    <span className='absolute right-2 bottom-4 mr-2 scale-125' onClick={() => setShowConfirmPassword((prev) => !prev)}>
                      {
                        showConfirmPassword 
                        ? (<AiOutlineEyeInvisible/>) 
                        : (<AiOutlineEye/>)
                      }
                    </span>
                  </label>
                </div>
              </div>
              <button className='mt-3 border border-black px-3 py-2 w-1/3 mx-auto rounded-md bg-[#082F66] text-white font-medium hover:scale-95 transition-all duration-200' type='submit'>SignUp</button>
          </div>
        </form>
        <div>
          <p>Already Registered? <span className='text-blue-700 underline'><Link to='/login'>Login</Link></span></p>
        </div>
    </div>)
  )
}

export default Signup