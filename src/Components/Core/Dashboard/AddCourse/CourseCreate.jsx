import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { setCourse, setEditCourse, setStep } from '../../../../slices/courseSlice'
import toast from 'react-hot-toast'
import { createSection, editSection } from '../../../../services/operations/courseAPI'
import SubSectionView from './SubSectionView'


const CourseCreate = () => {
  const [editSectionName, setEditSectionName] = useState(null)
  const {register, handleSubmit, setValue, getValues, formState: {errors, isSubmitSuccessful}} = useForm()
  const {course, editCourse} = useSelector(state => state.course)
  // const {token} = useSelector(state => state.auth.token)
  const userLocal = localStorage.getItem('user')
  const {token} = JSON.parse(userLocal)
  //console.log(token)
  const dispatch = useDispatch()
  const handleCancelEdit = () => {
    setEditSectionName(null)
    setValue("sectionName", "")
  }
  const goBack = () => {
    dispatch(setStep(1))
    dispatch(setEditCourse(true))
  }
  const goToNext = () => {
    if(course?.courseContent?.length === 0) {
      toast.error("Add atleast One Section")
      return
    }
    if(course?.courseContent.some(section => section.subSection.length === 0)) {
      toast.error("Add Lectures to Proceed")
      return
    }
    dispatch(setStep(3))
  }
  const submitHandler = async (data) => {
    const toastId = toast.loading("Loading...")
    let result
    if(editSectionName) {
      result = await editSection(
        {
          sectionName: data.sectionName,
          sectionId: editSectionName,
          courseId: course._id,
        }, token
      )
    } else {
      result = await createSection(
        {
          sectionName: data.sectionName,
          courseId: course._id,
        }, 
        token
      )
    }
    if(result) {
      dispatch(setCourse(result))
      setEditSectionName(null)
      setValue("sectionName", "")
    }
    toast.dismiss(toastId)
  }
  const handleChangeEditSectionName = (sectionId, sectionName) => {
    if(editSectionName === sectionId) {
      handleCancelEdit()
      return
    }
    setEditSectionName(sectionId)
    setValue("sectionName", sectionName)
  }

  return (
    <div className='flex flex-col justify-center'>
      {
        !editCourse && (
          <p className='text-3xl font-medium mb-9'>Create Course</p>
        )
      }
      <div className='flex flex-col gap-7 items-center justify-center'>
        <div className='flex flex-col items-center justify-between border w-[100%] p-6 rounded-2xl shadow-md drop-shadow-lg'>
          <form onSubmit={handleSubmit(submitHandler)} className='flex flex-col w-full gap-5'>
            <div>
              <label className='w-full'>
                <p className='text-lg mb-1'>Section Name</p>
                <input
                  id='sectionName'
                  // disabled={loading}
                  className='border w-full md:w-2/5 rounded-lg p-3'
                  type='text'
                  placeholder='Enter Section Name'
                  {...register("sectionName", {required: true})}
                />
              </label>
            </div>
            <div className='flex items-center gap-3'>
              <button className='mb-5 p-2 border rounded-lg font-medium hover:scale-95 transition-all duration-200 bg-[#082F66] text-white' type='submit'>
                {editSectionName ? 'Edit Section Name' : 'Add Section Name'}
              </button>
              {
                editSectionName && (
                  <button className='text-blue-700 underline' onClick={handleCancelEdit}>
                    Cancel Edit
                  </button>
                )
              }
            </div>
          </form>
          <div className='w-full mx-auto'>
            {
              course?.courseContent?.length > 0 && (
                <SubSectionView handleChangeEditSectionName={handleChangeEditSectionName}/>
              )
            }
          </div>
          <div className='flex gap-x-4 mt-7'>
            <button className='mb-5 p-2 px-3 border rounded-lg font-medium hover:scale-95 transition-all duration-200 bg-[#082F66] text-white' onClick={goBack}>
              Back
            </button>
            <button className='mb-5 p-2 px-3 border rounded-lg font-medium hover:scale-95 transition-all duration-200 bg-[#082F66] text-white' onClick={goToNext}>
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CourseCreate