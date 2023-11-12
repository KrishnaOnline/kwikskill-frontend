import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Spinner from '../Components/Common/Spinner'
import { Link } from 'react-router-dom'
import { getResetPassToken } from '../services/operations/authAPI'


const ForgotPassword = () => {
  const dispatch = useDispatch()
  const {loading} = useSelector((state) => state.auth)
  const [email, setEmail] = useState('')
  const [emailSent, setEmailSent] = useState(false)
  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(getResetPassToken(email, setEmailSent))
  }
  return (
    <div className='h-[500px] flex flex-col items-center justify-center'>
        {
          loading
          ? (<Spinner/>)
          : (
          <div className='flex flex-col gap-5'>
            <h1 className='text-4xl font-medium'>
              {
                !emailSent ? "Reset Your Password" : "Check your Mail"
              }
            </h1>
            {/* <p>
              {
                !emailSent ? "blah blah blah do it later" : "do it later again"
              }
            </p> */}
            <form className='flex flex-col' onSubmit={handleSubmit}>
              {
                !emailSent && (
                  <label>
                    <p className='text-lg'>Email Address<span className='text-red-500'>*</span></p>
                    <input className='border w-full p-3 rounded-lg shadow-lg' placeholder='Enter Your Registered Email' required type='email' name='email' value={email} onChange={(e) => setEmail(e.target.value)}/>
                  </label>
                )
              }
              <button className='mt-3 py-2 border rounded-lg font-medium hover:scale-95 transition-all duration-200 bg-[#082F66] text-white' type='submit'>
                {
                  !emailSent ? "Reset Password" : "Resend Email"
                }
              </button>
            </form>
            <div className='underline text-blue-500'>
              <Link to='/login'>
                {'Back to Login'}
              </Link>
            </div>
          </div>
          )
        }
    </div>
  )
}

export default ForgotPassword