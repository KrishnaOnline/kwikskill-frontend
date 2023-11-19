import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { buyCourse } from '../services/operations/paymentApi'
import { AiOutlineUnorderedList, AiOutlineFileAdd, AiFillCaretDown } from 'react-icons/ai'
import { SlScreenDesktop } from 'react-icons/sl'
import toast from 'react-hot-toast'
import { getAllCourses, getCourseDetails } from '../services/operations/courseAPI'
import RatingStars from '../Components/Common/RatingStars'
import getAvgRating from '../utils/avgRating'
import Spinner from '../Components/Common/Spinner'
import { addToCart } from '../slices/cartSlice'
import { ACCOUNT_TYPE } from '../utils/constants'
import Error from '../Pages/Error'
import { formatTime } from '../utils/dateFormat'


const CoursePage = () => {
    const {courseId} = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {user} = useSelector(state => state.profile)
    const {token} = useSelector(state => state.auth)
    // const userLocal = localStorage.getItem('user')
    // const {token} = JSON.parse(userLocal)
    const {paymentLoading} = useSelector(state => state.course)
    const {cart} = useSelector(state => state.cart)
    //console.log("TOKEN: ", token)
    const [response, setResponse] = useState(null)
    // const [allCourses, setAllCourses] = useState(null)
    const [avgReviewCount, setAvgReviewCount] = useState(0)
    // const [alreadyEnrolled, setAlreadyEnrolled] = useState(false)
    const [totalLectures, setTotalLectures] = useState(0)
    const handleBuyCourse = () => {
      if(!token) {
        toast("Please Login to Purchase Course", {icon: '⚠️'})
        // navigate('/login')
      }
      if(user?.accountType === ACCOUNT_TYPE.INSTRUCTOR) {
        toast("You Cannot Buy Course from Instructor Account", {icon: '⚠️'})
      }
      if(user?.accountType === ACCOUNT_TYPE.STUDENT) {
        if(token) {
          buyCourse(token, [courseId], user, navigate, dispatch)
        }
      }
    }
    const handleAddToCart = () => {
      if(!token) {
        toast("Please Login to Purchase Course", {icon: '⚠️'})
        // navigate('/login')
      }
      if(user && user?.accountType === ACCOUNT_TYPE.INSTRUCTOR) {
        toast("You Cannot Buy Course from Instructor Account", {icon: '⚠️'})
        // toast.error('You Cannot Buy Course from Instructor Account')
      }
      if(token) {
        if(user?.accountType === ACCOUNT_TYPE.STUDENT) {
          dispatch(addToCart(response))
        }
      }
    }
    useEffect(() => {
      const fetchCourseDetails = async () => {
        const res = await getCourseDetails(courseId)
        setResponse(res?.data?.courseDetails)
        //console.log(res?.data?.courseDetails)
      }
      fetchCourseDetails()
    }, [courseId])
    useEffect(() => {
      const count = getAvgRating(response?.reviewAndRating)
      setAvgReviewCount(count)
    }, [response])
    useEffect(() => {
      let lectures = 0
      response?.courseContent.forEach((sec) => {
        lectures += sec?.subSection.length || 0
      })
    }, [response])
    const [showSpinner, setShowSpinner] = useState(true)
    const [showError, setShowError] = useState(false)
    useEffect(() => {
      const timeOutId = setTimeout(() => {
        setShowSpinner(false)
        setShowError(true)
      }, 3000)
      return () => clearTimeout(timeOutId)
    }, [])
    
    if(paymentLoading) {
      return (
        <Spinner/>
      )
    }
  
  if(response) {  
  return (
    <div className='mx-auto max-w-[1280px]'>
        <div className='' /*className='md:bg-[#1f3a78] md:bg-opacity-95 md:h-[350px]'*/>
        <div className='max-w-[1280px] md:h-fit text-black px-6 py-8 mx-auto flex flex-col md:flex-row justify-center mb-5 items-center gap-y-5 md:justify-between'>
          <div className='flex flex-col gap-3 order-2 md:order-1 md:mt-9 -translate-y-14 max-md:hidden'>
            <p className='text-4xl font-bold'>{response?.courseName}</p>
            <p className='text-xl mt-3 font-normal'>{response?.courseDescription}</p>
            <div className='flex items-center text-xl mt-3 gap-2'>
              <p>{avgReviewCount}</p>
              <RatingStars rating={avgReviewCount}/>
              <p className='text-lg'>({response?.reviewAndRating?.length} Ratings) {response?.studentsEnrolled?.length} Students</p>
            </div>
            <p className='text-lg'>Created By <span className='text-blue-600 underline font-medium'>{response?.instructor?.firstName + ' ' + response?.instructor?.lastName}</span></p>
            <p className='text-lg'>Last Updated On {formatTime(response?.createdAt)}</p>
          </div>
          <div className='order-1 md:order-2 text-black flex flex-col justify-center bg-white md:min-w-[370px] md:max-w-[380px] md:pb-16 p-5 border border-gray-600 rounded-xl shadow-lg'>
            <img className='w-[450px] mx-auto h-[250px] shadow-lg rounded-xl' src={response?.thumbnail} alt={response?.courseName}/>
            <div className='flex flex-col gap-3 my-3 md:mt-9 md:hidden'>
              <p className='text-3xl font-bold'>{response?.courseName}</p>
              <p className='text-lg font-normal'>{response?.courseDescription.slice(0, 100)}</p>
              <div className='flex items-center text-xl mt-3 gap-2'>
                <p>{avgReviewCount}</p>
                <RatingStars rating={avgReviewCount}/>
                <p className='text-lg'>({response?.reviewAndRating?.length} Ratings) {response?.studentsEnrolled?.length} Students</p>
              </div>
              <p>Created By <span className='text-blue-600 font-medium'>{response?.instructor?.firstName + ' ' + response?.instructor?.lastName}</span></p>
              <p className=''>Last Updated On {formatTime(response?.createdAt)}</p>
            </div>
            <p className='text-2xl font-semibold md:font-bold md:ml-5 my-4 mb-6'><span className=''>Price: </span><span className='text-blue-700'>₹{response?.price}</span></p>
            <div className='flex flex-col items-center mx-auto w-11/12 order-3 gap-4'>
              <button className='w-full py-2 border bg-[#082F66] text-white font-medium transition-all hover:scale-95 duration-300 rounded-lg' onClick={
                user && response?.studentsEnrolled.includes(user._id)
                ? () => navigate('/dashboard/enrolled-courses')
                : handleBuyCourse
              }>
                {
                  user && response?.studentsEnrolled.includes(user._id)
                  ? 'Go To Course'
                  : 'Buy Now'
                }
              </button>
              {
                user && !response?.studentsEnrolled.includes(user._id) && (
                  <button className='w-full py-2 border border-black bg-[yellow-400] rounded-lg font-medium transition-all hover:scale-95 duration-300' onClick={handleAddToCart}>Add To Cart</button>
                )
              }
              {
                !user && (
                  <button className='w-full py-2 border border-black rounded-lg font-medium transition-all hover:scale-95 duration-300' onClick={handleBuyCourse}>Add To Cart</button>
                )
              }
              <p className='mt-5 max-md:mb-5 text-lg'>🎯 Happy Learning !!!</p>
            </div>
          </div>
          </div>
        </div>
      <div className='w-11/12 max-w-[1280px] mx-auto flex flex-col max-md:items-center'>
        <p className='text-3xl font-semibold mb-5'>Course Content</p>
        <div className='w-[90%] md:w-[80%]'>
          {/* Sections and SubSections Div*/}
          {
            response?.courseContent.map((section, index) => (
              <details className='bg-white' key={index} open>
                          <summary className='py-5 bg-gray-400 text-lg bg-opacity-10 shadow-lg pl-2 pr-5 flex cursor-pointer items-center gap-x-8 border'>
                              <div className='flex items-center'>
                                  {/* <div>
                                    <AiFillCaretDown/>
                                  </div> */}
                                  <div className='flex gap-x-5 items-center'>
                                      <AiOutlineUnorderedList className=''/>
                                      <p>{section?.sectionName}</p>
                                  </div>
                              </div>
                          </summary>
                          <div>
                              <div className='flex text-lg shadow-xl flex-col ml-2 border border-t-0'>
                                  {
                                      section?.subSection.map((data) => (
                                          <div className='flex justify-between border items-center p-3' key={data._id}>
                                              <div className='flex gap-x-5 items-center'>
                                                  <SlScreenDesktop className=''/>
                                                  <p>{data?.title}</p>
                                              </div>
                                          </div>
                                      ))
                                  }
                              </div>
                          </div>
              </details>
            ))
          }
        </div>
      </div>
      <div className='w-11/12 mt-14 mx-auto'>
        <p className='text-3xl text-center md:text-start font-semibold mb-5'>Reviews From Enrolled Students</p>
        <div className='border flex flex-col gap-3 shadow-lg rounded-lg py-5 w-[90%] md:w-[80%] mx-auto md:mx-0'>
        <div className='w-[95%] mx-auto flex items-center text-xl mb-3 gap-2'>
            <p><span className='text-3xl'>{avgReviewCount}</span>/5</p>
            <RatingStars rating={avgReviewCount}/>
            <p className='text-lg'>({response?.reviewAndRating?.length} Ratings) | {response?.studentsEnrolled?.length} Students</p>
        </div>
        {
          response?.reviewAndRating.map(feedback => (
            <div key={feedback._id} className='w-[95%] rounded-lg p-3 mx-auto flex gap-4 items-center'>
              <img className='h-14 md:h-16 rounded-full' src={feedback?.user?.image}/>
              <div className='flex flex-col flex-wrap'>
                <p className='text-lg font-medium'>{feedback?.user?.firstName+' '+feedback?.user?.lastName}</p>
                <div className='flex items-center gap-2'>
                  <p>{feedback?.rating}</p>
                  <RatingStars rating={feedback?.rating}/>
                </div>
                <p className='break-all'>{feedback?.review}</p>
              </div>
            </div>
          ))
        }
        </div>
      </div>
    </div>
  )
  } else {
    return(
      <>
        {showSpinner && <Spinner/>}
        {showError && <Error/>}
      </>
    )
  }
}

export default CoursePage