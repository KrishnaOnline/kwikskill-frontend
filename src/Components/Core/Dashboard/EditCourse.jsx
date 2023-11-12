import React, { useEffect } from 'react'
import CourseCreateIndex from './AddCourse/index'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getFullCourseDetails } from '../../../services/operations/courseAPI'
import { setCourse, setEditCourse, setStep } from '../../../slices/courseSlice'


const EditCourse = () => {
    const dispatch = useDispatch()
    const {courseId} = useParams()
    const {course, editCourse} = useSelector(state => state.course)
    // const {token} = useSelector(state => state.auth.token)
    const userLocal = localStorage.getItem('user')
    const {token} = JSON.parse(userLocal)
    //console.log(token)
    useEffect(() => {
        const populateCourse = async () => {
            const result = await getFullCourseDetails(courseId, token)
            if(result?.courseDetails) {
                dispatch(setEditCourse(true))
                dispatch(setCourse(result?.courseDetails))
                //console.log("RESULT: ", result.courseDetails)
                dispatch(setStep(1))
            }
        }
        populateCourse()
    }, [])
    

  return (
    <div className='flex flex-col justify-center'>
        <p className='text-3xl font-medium mb-9'>Edit Course</p>
        <div>
            {
                course ? (<CourseCreateIndex/>)
                       : (<p>Course Not Found</p>)
            }
        </div>
    </div>
  )
}

export default EditCourse