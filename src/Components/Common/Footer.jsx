import React from 'react'
import { AiFillLinkedin, AiOutlineLinkedin, AiFillGithub, AiOutlineTwitter, AiOutlineGoogle, AiOutlineInstagram } from 'react-icons/ai'
import { RiTwitterXLine } from 'react-icons/ri'
import { Link } from 'react-router-dom'
import KwikSkillGit from '../../assets/KwikSkill_GitHub2.png'
import { SiOpenai } from 'react-icons/si'


const Footer = () => {
  return (
    <div className='bg-[#002456] text-white mt-20 pt-5 pb-8'>
      <div className='max-w-[1280px] mx-auto'>
        {/* <p className='absolute left-0 bottom-2 text-[5rem] select-none'>Krishna Vamshi Kusuma</p> */}
        <div className='flex justify-normal items-center gap-10 flex-col md:flex-row md:justify-between pt-20 pb-16 px-10'>
          <p className='font-normal text-md'>© KrishnaVamshiKusuma@2023.</p>
          <p className='text-3xl md:text-4xl'>🎯</p>
          <div className='flex gap-x-2 items-center'>
            <Link className='hover:text-[#1E40AF]' to='https://www.linkedin.com/in/krishna-vamshi-kusuma/' target='_blank'><AiFillLinkedin size={40}/></Link>
            <Link className='hover:text-[#1E40AF]' to='https://github.com/KrishnaOnline' target='_blank'><AiFillGithub size={40}/></Link>
            <Link className='hover:text-[#1E40AF]' to='https://twitter.com/Krishnavamshi_1' target='_blank'><RiTwitterXLine size={35}/></Link>
            <Link className='hover:text-[#1E40AF]' to='mailto:krishnavamshikusuma@gmail.com' target='_blank'><AiOutlineGoogle size={40}/></Link>
            <Link className='hover:text-[#1E40AF]' to='https://www.instagram.com/the_krishnavamshi/' target='_blank'><AiOutlineInstagram size={40}/></Link>
          </div>
        </div>
        <div className='px-20 flex flex-col md:flex-row max-md:gap-12 justify-around items-center'>
          <p className='text-sm md:text-base'>Title and Descriptive Stuff By - <span className='text-yellow-300'>GPT 3.5</span></p>
          <img className='h-[120px] bg-black p-2' src={KwikSkillGit}/>
        </div>
        {/* <p className='left-0 bottom-0 text-5xl text-gray-300 select-none'>Krishna Vamshi Kusuma</p> */}
      </div>
    </div>
  )
}

export default Footer