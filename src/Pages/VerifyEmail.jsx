import React, { useState } from 'react'
import Spinner from '../Components/Common/Spinner'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import OtpInput from 'react-otp-input'
import { signup } from '../services/operations/authAPI'


const VerifyEmail = () => {
    const {loading, signupData} = useSelector((state) => state.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [otp, setOtp] = useState('')
    const handleSubmit = (e) => {
        e.preventDefault()
        const {email, accountType, password, confirmPassword, firstName, lastName} = signupData
        dispatch(signup(email, accountType, password, confirmPassword, firstName, lastName, otp, navigate))
    }
  return (
        loading
        ? (<Spinner/>)
        : (
        <div className='h-[75vh] w-11/12 max-w-[1280px] gap-5 mx-auto flex flex-col justify-center items-center'>
            <h1 className='text-4xl font-medium'>Verify Email</h1>
            <p className='text-lg'>A Verification Code has been sent to you. Enter the Code below</p>
            <form onSubmit={handleSubmit} className='flex flex-col gap-5'>
                {/* <OTPInput
                    value={otp}
                    onChange={setOtp}
                    inputStyle='shadow-lg border border-black h-12 p-5 rounded-md'
                    numInputs={6}
                    renderSeparator={<span className='mx-2 font-bold'> - </span>}
                    renderInput={(props) => <input {...props} />}
                /> */}
                <OtpInput
                    value={otp}
                    onChange={setOtp}
                    numInputs={6}
                    // inputStyle={'w-12'}
                    renderSeparator={<span>-</span>}
                    renderInput={(props) => <input {...props} className='text-2xl'/>}
                />
                <button type='submit' className='mt-3 py-2 border rounded-lg font-medium hover:scale-95 transition-all duration-200 bg-[#082F66] text-white'>Verify OTP</button>
            </form>
        </div>
        )
  )
}

export default VerifyEmail