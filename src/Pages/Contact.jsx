import React from 'react'
import ContactImg from '../assets/Images/contact-us2.png'
import ContactForm from '../Components/ContactUs/ContactForm'


const Contact = () => {
  return (
    <div className='flex items-center contact-us-page mt-20 md:mt-0'>
        <div className='md:h-[750px] w-11/12 translate-y-[-55px] max-w-[1280px] gap-10 mx-auto flex flex-col md:flex-row items-center justify-center'>
            <div className='w-[90%] md:w-[50%]'>
                <img src={ContactImg} alt='contact-us' loading='lazy'/>
            </div>
            <div className='w-[90%] md:w-[50%]'>
                <ContactForm/>
            </div>
        </div>
    </div>
  )
}

export default Contact