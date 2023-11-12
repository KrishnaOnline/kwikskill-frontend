import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { FiEdit } from 'react-icons/fi'
import { AiOutlineDelete } from 'react-icons/ai'
import { deleteCourse, getInstructorCourses } from '../../../services/operations/courseAPI'
import { COURSE_STATUS } from '../../../utils/constants'


const InstructorCourses = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {user} = useSelector(state => state.profile)
    // const courses = user?.courses
    // const {token} = useSelector(state => state.auth.token)
    const userLocal = localStorage.getItem('user')
    const {token} = JSON.parse(userLocal)
    //console.log(token)
    const [courses, setCourses] = useState([])
    const fetchedCourses = async () => {
        const result = await getInstructorCourses(token)
        //console.log("RESULT: ", result)
        if(result) {
            setCourses(result)
        }
    }
    useEffect(() => {
        fetchedCourses()
    }, [])
    const handleCourseDelete = async (courseId) => {
        const deleteConfirm = confirm('Are you Sure to Delete the Course')
        if(!deleteConfirm) {
            return
        }
        await deleteCourse({courseId: courseId}, token)
        const result = await getInstructorCourses(token)
        if(result) {
            setCourses(result)
        }
    }

  return (
    <div className='flex flex-col justify-center'>
        <div className='flex items-center justify-between mb-9'>
            <p className='text-3xl font-medium'>My Courses</p>
            <button className='border rounded-lg p-2 hover:scale-95 transition-all duration-200 bg-[#082F66] text-white font-medium' onClick={() => navigate('/dashboard/add-course')}>Add Course</button>
        </div>
        <hr className='mb-9'/>
        {
            courses.length === 0
            ? (<p className='text-xl text-center'>No Courses Created Yet</p>)
            : (
                <div className='flex flex-wrap items-center max-md:justify-center gap-6'>
                    {
                        courses.map((course) => {
                            return (
                                <div key={course._id} className='flex rounded-lg flex-col w-[300px] border p-3 shadow-lg mb-5 gap-3'>
                                    <img className='w-[300px] h-[200px] rounded-lg' src={course?.thumbnail}/>
                                    <div className='flex flex-col flex-wrap gap-1'>
                                        <p className='text-xl font-bold'>{course?.courseName}</p>
                                        <p className='text-lg'>{course?.courseDescription.slice(0, 50)}</p>
                                        <p>{course?.category?.name}</p>
                                        <p><span className='font-semibold'>Price: </span>₹{course?.price}</p>
                                        <p>Ratings and Reviews Add Kardo Yaha</p>
                                        <p className={`border w-fit p-2 rounded-3xl font-medium bg-opacity-60 ${course?.status === COURSE_STATUS.PUBLISHED ? "bg-green-500" : "bg-yellow-500"}`}>
                                            {course?.status === COURSE_STATUS.PUBLISHED ? "Published" : "Drafted"}
                                        </p>
                                    </div>
                                    <div className='flex w-[90%] mx-auto gap-3 items-center justify-center mt-1'>
                                        <button className='w-[30%] p-3 border rounded-lg text-white text-xl shadow-md hover:scale-95 transition-all duration-200 bg-green-600 flex justify-center' onClick={() => navigate(`/dashboard/edit-course/${course._id}`)}><FiEdit/></button>
                                        <button className='w-[30%] p-3 border rounded-lg text-white text-xl shadow-md hover:scale-95 transition-all duration-200 bg-red-700 flex justify-center' onClick={() => handleCourseDelete(course._id)}><AiOutlineDelete/></button>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            )
        }
    </div>
  )
}

export default InstructorCourses