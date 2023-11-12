import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import { resetPassword } from '../services/operations/authAPI'
import toast from 'react-hot-toast'


const ResetPassword = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()
    const token = location.pathname.split('/').at(-1)
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPass, setShowConfirmPass] = useState(false)
    const [formData, setFormData] = useState({
        password: "",
        confirmPassword: "",
    })
    const {password, confirmPassword} = formData
    const handleChange = (e) => {
        const {name, value} = e.target
        setFormData({
            ...formData,
            [name]: value,
        })
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        if(formData.password === formData.confirmPassword) {
            dispatch(resetPassword(formData.password, formData.confirmPassword, token, navigate))
        } else {
            toast.error("Passwords Do Not Match")
        }
    }
  return (
    <div>
        <h1>Create New Password</h1>
        <form onSubmit={handleSubmit}>
            <label className='relative'>
                <p>Enter New Password <span className='text-red-500'>*</span></p>
                <input className='border border-black w-full' required type={showPassword ? 'text' : 'password'} name='password' value={password} onChange={handleChange}/>
                <span className='absolute right-2 bottom-1 scale-125' onClick={() => setShowPassword((prev) => !prev)}>{showPassword ? <AiOutlineEye/> : <AiOutlineEyeInvisible/>}</span>
            </label>
            <label className='relative'>
                <p>Confirm New Password <span className='text-red-500'>*</span></p>
                <input className='border border-black w-full' required type={showConfirmPass ? 'text' : 'password'} name='confirmPassword' value={confirmPassword} onChange={handleChange}/>
                <span className='absolute right-2 bottom-1 scale-125' onClick={() => setShowConfirmPass((prev) => !prev)}>{showConfirmPass ? <AiOutlineEye/> : <AiOutlineEyeInvisible/>}</span>
            </label>
            <button type='submit'>
                Change Password
            </button>
        </form>
        <Link to='/login'>
            Back to Login
        </Link>
    </div>
  )
}

export default ResetPassword