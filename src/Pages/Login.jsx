import React, { useState } from 'react'
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../services/operations/authAPI'
import { Link, useNavigate } from 'react-router-dom'
import Spinner from '../Components/Common/Spinner'


const Login = () => {
  const {loading} = useSelector((state) => state.auth)
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({email:"", password:"",})
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {email, password} = formData
  const handleChange = (event) => {
    const {name, value} = event.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }
  //console.log(formData)
  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(login(email, password, navigate))
  }
  return (
    loading ?
    (<Spinner/>) :
    (
    <div className='h-[750px] pt-12 mx-auto flex flex-col items-center gap-7 login-page'>
        <h1 className='text-4xl font-medium drop-shadow-lg'>Login</h1>
        <form className='w-[90%] md:w-[30%] mx-auto flex flex-col gap-5 drop-shadow-lg' onSubmit={handleSubmit}>
          <div className='flex flex-col gap-5'>
            <label>
              <p className='text-lg mb-1'>Email Address <span className='text-red-500'>*</span> </p>
              <input className='w-full p-3 border rounded-lg' placeholder='Enter Email Address' required name='email' type='email' value={email} onChange={handleChange}/>
            </label>
            <label className='relative'>
              <p className='text-lg mb-1'>Password <span className='text-red-500'>*</span> </p>
              <input className='w-full p-3 border rounded-lg' placeholder='Enter Password' required name='password' type={showPassword ? 'text' : 'password'} value={password} onChange={handleChange}/>
              <span className='absolute right-2 bottom-4 mr-2 scale-125' onClick={() => setShowPassword(prev => !prev)}>
                {
                  showPassword
                  ? (<AiOutlineEyeInvisible/>)
                  : (<AiOutlineEye/>)
                }
              </span>
            </label>
            <Link to='/forgot-password'>
              <p className='text-blue-700 underline text-end'>Forgot Password?</p>
            </Link>
            <button className='border border-black px-3 py-2 w-1/3 mx-auto rounded-md bg-[#082F66] text-white font-medium hover:scale-95 transition-all duration-200' type='submit'>Login</button>
          </div>
        </form>
        <div>
          <p>Not Registered Yet? <span className='text-blue-700 underline'><Link to='/signup'>Signup</Link></span></p>
        </div>
    </div>
    )
  )
}

export default Login