import React from 'react'
import { useSelector } from 'react-redux'
import CourseInfo from '../AddCourse/CourseInfo'
import CourseCreate from '../AddCourse/CourseCreate'
import PublishCourse from '../AddCourse/PublishCourse'


const AddCourse = () => {
    const {step} = useSelector(state => state.course)
    const steps = [
        { id: 1, title: "Course Information" },
        { id: 2, title: "Course Creation" },
        { id: 3, title: "Publish Course" }
    ]
  return (
    <div>
        {step === 1 && <CourseInfo/>}
        {step === 2 && <CourseCreate/>}
        {step === 3 && <PublishCourse/>}
    </div>
  )
}

export default AddCourse