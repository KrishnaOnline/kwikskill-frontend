import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { apiConnector } from '../../../services/apiConnector'
import { profileApi } from '../../../services/apis'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { getCourseProgress, getFullCourseDetails } from '../../../services/operations/courseAPI'
import ProgressBar from "@ramonak/react-progress-bar"


const EnrolledCourses = () => {
  // const {token} = useSelector((state) => state.auth.token)
  const token = JSON.parse(localStorage.getItem('token')).token
  const {user} = useSelector((state) => state.profile)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [progressData, setProgressData] = useState(null)
  const [enrolledCourses, setEnrolledCourses] = useState([])
  const getEnrolledCourses = async () => {
    try {
      const response = await apiConnector("GET", profileApi.GET_ENROLLED_COURSES, null, {
        'Authorization': `Bearer ${token}`
      })
      //console.log("ENROLLED COURSES API Response: ", response.data.data)
      if(!response.data.success) {
        throw new Error(response.data.message)
      }
      setProgressData(response.data.data.courseProgress)
      setEnrolledCourses(response.data.data.courses)
    } catch(err) {
      //console.log("ENROLLED COURSES API Error: ", err)
      toast.error(err.response.data.message)
    }
  }
  // const fetchCourseDetails = async () => {
  //   const response = await getFullCourseDetails(courseId, token)
  // }
  const totalNoOfLectures = (course) => {
    let total = 0
    course.courseContent.forEach(section => {
      total += section.subSection.length
    })
    return total
  }
  //console.log("COURSE PROGRESS DATA: ",progressData)
  useEffect(() => {
    getEnrolledCourses()
  }, [])

  return (
    <div className='flex flex-col justify-center'>
        <p className='text-3xl font-medium mb-9'>My Courses</p>
        <hr className='mb-9'/>
        <div className='flex flex-wrap items-center max-md:justify-center gap-6'>
            {
              enrolledCourses.length === 0
              ? (<p className='text-xl text-center'>No Courses Purchased Yet 🙄</p>)
              : (
                enrolledCourses.map((course, index) => {
                  return (
                    <div key={index}>
                      <div className='cursor-pointer flex rounded-lg flex-col w-[300px] border p-3 shadow-lg mb-5 gap-3' onClick={() => {
                        navigate(`/view-course/${course?._id}/section/${course?.courseContent[0]?._id}/sub-section/${course?.courseContent[0]?.subSection[0]?._id}`)
                      }}>
                        <img className='w-[300px] h-[200px] rounded-lg' src={course?.thumbnail} alt='course thumbnail'/>
                        <p className='text-xl font-bold'>{course?.courseName}</p>
                        {/* <p className='text-lg'>{course?.courseDescription}</p> */}
                        {/* <p>{course.reviewAndRating}</p> */}
                        {
                          progressData && (
                            progressData?.map((progress, index) => {
                              if(progress?.courseId === course?._id) {
                                return (
                                  <div key={index}>
                                    <p className='mb-3'>Course Progress: {progress?.completedVideos?.length/totalNoOfLectures(course)*100}%</p>
                                    <p className='text-base mb-3 font-medium'>{progress?.completedVideos?.length} of {totalNoOfLectures(course)} Lectures Completed</p>
                                    <ProgressBar
                                      completed={(progress?.completedVideos?.length/totalNoOfLectures(course)).toFixed(2)*100}
                                      bgColor="#8a1bcd"
                                      labelAlignment="outside"
                                      labelColor="black"
                                      animateOnRender
                                      height='12px'
                                    />
                                  </div>
                                )
                              }
                            })
                          )
                        }
                      </div>
                    </div>
                  )
                })
              )
            }
        </div>
    </div>
  )
}

export default EnrolledCourses