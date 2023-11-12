import React, { useState } from 'react'
import { Form, useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setStep } from '../../../../slices/courseSlice'
import { COURSE_STATUS } from '../../../../utils/constants'
import { editCourse } from '../../../../services/operations/courseAPI'


const PublishCourse = () => {
  const {register, handleSubmit, setValue, getValues} = useForm()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {course} = useSelector(state => state.course)
  // const {token} = useSelector(state => state.auth.token)
  const userLocal = localStorage.getItem('user')
  const {token} = JSON.parse(userLocal)
  //console.log(token)
  const [loading, setLoading] = useState(false)
  const goBack = () => {
    dispatch(setStep(2))
  }
  const goToCourses = () => {
    //
    navigate('/dashboard/my-courses')
  }
  const handleCoursePublish = async () => {
    if((course.status === COURSE_STATUS.PUBLISHED && getValues('public') === true) || course.status === COURSE_STATUS.DRAFT && getValues('public') === false) {
      goToCourses()
      return
    }
    const formData = new FormData()
    formData.append('courseId', course._id)
    const courseStatus = getValues('public') ? COURSE_STATUS.PUBLISHED : COURSE_STATUS.DRAFT
    formData.append('status', courseStatus)
    const result = await editCourse(formData, token)
    if(result) {
      goToCourses()
    }
  }
  const formSubmit = () => {
    handleCoursePublish()
  }

  return (
    <div className='flex flex-col justify-center'>
      <p className='text-3xl font-medium mb-9'>Publish Course</p>
      <form onSubmit={handleSubmit(formSubmit)}>
        <div>
          <label className='flex gap-3'>
            <input
              type='checkbox'
              id='public'
              defaultChecked
              {...register('public')}
              className=''
            />
            <p className='text-lg'>Make this Course Public</p>
          </label>
        </div>
        <div className='flex gap-3'>
          <button className='mt-5 mb-5 p-2 px-3 border rounded-lg font-medium hover:scale-95 transition-all duration-200 bg-[#082F66] text-white' type='button' onClick={goBack}>Back</button>
          <button className='mt-5 mb-5 p-2 px-3 border rounded-lg font-medium hover:scale-95 transition-all duration-200 bg-[#082F66] text-white' type='submit'>Save Changes</button>
        </div>
      </form>
    </div>
  )
}

export default PublishCourse