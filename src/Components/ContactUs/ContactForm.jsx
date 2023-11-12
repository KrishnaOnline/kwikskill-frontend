import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import Spinner from '../Common/Spinner'
import countryCodes from '../../data/countrycode.json'
import { contactApi } from '../../services/apis'
import { apiConnector } from '../../services/apiConnector'
import toast from 'react-hot-toast'


const ContactForm = () => {
  const [loading, setLoading] = useState(false)
  const { register,
          handleSubmit,
          reset,
          formState: {errors, isSubmitSuccessful} } = useForm()
  useEffect(() => {
    if(isSubmitSuccessful) {
      reset({
        name: "",
        email: "",
        message: "",
        mobileNo: "",
        countryCode: "",
      })
    }
  }, [reset, isSubmitSuccessful])
  const contactFormSubmit = async (formData) => {
    //console.log(formData)
    setLoading(true)
    try {
        const mobileNo = formData.countryCode+" "+formData.mobileNo
        const {name, email, message} = formData
        const response = await apiConnector("POST", contactApi.CONTACT_US_API, {
            name, email, message, mobileNo
        })
        //console.log("CONTACT US API Response: ", response)
        if(!response.data.success) {
            toast.error("Something Went Wrong")
        }
        toast.success("Message Sent Successfully")
    } catch(err) {
        //console.log("CONTACT US API Error: ", err)
        toast.error(err.response.data.message)
    }
    setLoading(false)
  }
  
  return (
    loading ? 
    (<Spinner/>) :
    (
        <div className='flex flex-col w-[80%] mx-auto'>
            <h1 className='text-4xl font-bold mb-9 text-center'>Get in Touch</h1>
            <form className='flex flex-col gap-5 drop-shadow-lg' onSubmit={handleSubmit(contactFormSubmit)}>
                <label>
                    <p className='text-lg mb-1'>Full Name</p>
                    <input
                        name='name'
                        type='text'
                        id='name'
                        required
                        className='w-full p-3 border rounded-lg'
                        placeholder='Enter your Name'
                        {...register("name", {required: true})}
                    />
                    {
                        errors.name && <span>Enter your Name</span>
                    }
                </label>
                <label>
                    <p className='text-lg mb-1'>Email Address</p>
                    <input
                        name='email'
                        type='email'
                        id='email'
                        required
                        className='w-full p-3 border rounded-lg'
                        placeholder='Enter your Email'
                        {...register("email", {required: true})}
                    />
                    {
                        errors.email && <span>Enter your Email</span>
                    }
                </label>
                <div>
                    <label>
                        <p className='text-lg mb-1'>Mobile Number <span className='opacity-70'>(optional)</span></p>
                        <div className='flex'>
                            <select className='w-[20%] p-3 border rounded-lg rounded-r-none' name='countryCode' {...register("countryCode")}>
                                {
                                    countryCodes.map((item, index) => {
                                        return (
                                            <option className='' key={index} value={item.code}>
                                                {item.code} - {item.country}
                                            </option>
                                        )
                                    })
                                }
                            </select>
                            <input
                                className='w-full p-3 border rounded-lg rounded-l-none'
                                name='mobileNo'
                                type='tel'
                                id='mobileNo'
                                placeholder='Enter your Mobile Number'
                                {...register("mobileNo")}
                            />
                        </div>
                        {/* {
                            errors.mobileNo && <span>Enter Mobile Number</span>
                        } */}
                    </label>
                </div>
                <label>
                    <p className='text-lg mb-1'>Message</p>
                    <textarea
                        name='message'
                        required
                        id='message'
                        className='w-full p-3 border rounded-lg'
                        placeholder='Enter your Message Here...'
                        {...register("message", {required: true})}
                    />
                    {
                        errors.message && <span>Enter Message to be Sent</span>
                    }
                </label>
                <button className='w-[30%] mx-auto justify-center items-center bg-[#082F66] text-white hover:scale-95 transition-all duration-200 border flex items-center gap-x-2 border-black px-4 py-2 rounded-md' type='submit'>Send</button>
            </form>
        </div>
    )
  )
}

export default ContactForm