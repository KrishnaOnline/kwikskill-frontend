import React from 'react'
import {HiArrowRight} from 'react-icons/hi'
import { Link } from 'react-router-dom'
import Button from '../Components/Core/HomePage/Button'
import HeroVideo from '../assets/Images/hero_section_vid.mp4'
import HighlightText from '../Components/Core/HomePage/HighlightText'
import blurBlob from '../assets/Images/bbblurry.svg'


const Home = () => {
  return (
    <div className='mt-20 md:mt-0'>
      <section className='flex flex-col items-center home-hero-section'>
        <div className='h-[750px] translate-y-[-55px] w-11/12 max-w-[1280px] gap-10 mx-auto flex flex-row justify-center items-center max-md:flex-col'>
          <div className='w-full md:w-1/2 flex flex-col gap-7'>
            <div className='text-center md:text-left text-4xl md:text-5xl font-bold drop-shadow-lg shadow-black leading-[3rem] md:leading-[3.5rem]'>
              Elevate Your Learning Journey with <HighlightText text={"KwikSkill"}/>
            </div>
            <p className='text-center w-[95%] text-xl md:text-left drop-shadow-lg shadow-black font-normal'>Unlock the doors of learning with <span className='text-blue-800 underline'><Link to={'/'}>KwikSkill</Link></span>. Our platform is your ally on your learning journey, offering a wealth of resources and courses to help you thrive. Discover your potential, explore new interests, and embark on a path of continuous self-discovery and growth.</p>
            <div className='flex gap-7 justify-center md:justify-start'>
              <Link to={"/categories"}><Button text={"Explore Categories >"}/></Link>
              {/* <Link to={"/login"}><Button text={"LogIn"}/></Link> */}
            </div>
          </div>
          <div className='w-full md:w-1/2 flex justify-center'>
            <video className='w-full rounded-xl shadow-lg shadow-black border border-black' muted loop autoPlay>
              <source src={HeroVideo}/>
            </video>
          </div>
          {/* <div>
            <img className='w-[100px]' src={blurBlob} alt=''/>
          </div> */}
        </div>
        <div className='max-w-[1280px] gap-10 mx-auto flex max-md:items-center md:-translate-y-14 flex-col md:flex-row w-full'>
          <div className='w-11/12 md:w-1/2 gap-5 flex flex-col items-center'>
            <p className='text-3xl text-center font-medium'>Learn With Us</p>
            <p className='md:w-11/12 text-center text-lg'>Join as a student and dive into a world of learning opportunities. Explore diverse courses on our platform, designed to fuel your educational journey and enhance your skills.</p>
          </div>
          <div className='w-[1px] hidden md:flex bg-black mx-5'></div>
          <div className='w-11/12 md:w-1/2 gap-5 flex flex-col items-center'>
            <p className='text-3xl text-center font-medium'>Teach With Us</p>
            <p className='md:w-11/12 text-center text-lg'>Join as an instructor to empower learners and share your expertise. Create engaging courses on our platform and contribute to the global exchange of knowledge</p>
          </div>
        </div>
        <div className='flex pt-12 md:pt-5 flex-row gap-5'>
          <Link to={'/signup'}><button className='border bg-[#002456] border-black px-3 p-2 font-medium text-white rounded-lg hover:bg-white hover:text-black'>SignUp</button></Link>
          <Link to={'/login'}><button className='border bg-[#002456] border-black px-3 p-2 font-medium text-white rounded-lg hover:bg-white hover:text-black'>LogIn</button></Link>
        </div>
      </section>
    </div>
  )
}

export default Home;