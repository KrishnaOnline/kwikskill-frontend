import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import Upload from './Upload'
import { useDispatch, useSelector } from 'react-redux'
import { getAllCategories } from '../../../../services/operations/categoriesAPI'
import { setStep, setCourse, setEditCourse } from '../../../../slices/courseSlice'
import { addCourse, updateCourse } from '../../../../services/operations/courseAPI'


const CourseInfo = () => {
  const {register, handleSubmit, setValue, getValues, formState: {errors, isSubmitSuccessful}} = useForm()
  // const {token} = useSelector(state => state.auth.token)
  const userLocal = localStorage.getItem('user')
  const {token} = JSON.parse(userLocal)
  //console.log(token)
  const {course, editCourse} = useSelector(state => state.course)
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const [allCategories, setAllCategories] = useState([])
    useEffect(() => {
        const getCategories = async() => {
          const categories = await getAllCategories()
          if(categories.length > 0) {
            setAllCategories(categories)
          }
        }
        if(editCourse) {
          setValue("courseTitle", course.courseName)
          setValue("courseDesc", course.courseDescription)
          setValue("coursePrice", course.price)
          setValue("courseCategory", course.category._id)
          setValue("courseImage", course.thumbnail)
        }
        getCategories()
    }, [])
    const isFormUpdated = () => {
      const currentValues = getValues()
      if(currentValues.courseTitle !== course.courseName || currentValues.courseDesc !== course.courseDescription || currentValues.coursePrice !== course.price || currentValues.courseCategory !== course.category || currentValues.courseImage !== course.thumbnailImage) {
        return true
      } else {
        return false
      }
    }
    const submitHandler = async (data) => {
      //console.log(data)
      if(editCourse) {
        if(isFormUpdated) {
          const currentValues = getValues()
          const formData = new FormData()
          formData.append("courseId", course._id)
          if(currentValues.courseTitle !== course.courseName) {
            formData.append("courseName", data.courseTitle)
          }
          if(currentValues.courseDesc !== course.courseDescription) {
            formData.append("courseDescription", data.courseDesc)
          }
          if(currentValues.coursePrice !== course.price) {
            formData.append("price", data.coursePrice)
          }
          if(currentValues.courseCategory._id !== course.category._id) {
            formData.append("category", data.courseCategory)
          }
          if(currentValues.courseImage !== course.thumbnailImage) {
            formData.append("thumbnailImage", data.courseImage)
          }
          const result = await updateCourse(formData, token)
          if(result) {
            dispatch(setEditCourse(false))
            dispatch(setStep(2))
            dispatch(setCourse(result))
          } else {
            toast.error("No Changes Made to the Course")
          }
          //console.log("FORM DATA of EDIT_COURSE: ", formData)
          //console.log("RESULT", result)
          return
        }
      }

      const formData = new FormData()
      formData.append("courseName", data.courseTitle)
      formData.append("courseDescription", data.courseDesc)
      formData.append("price", data.coursePrice)
      formData.append("category", data.courseCategory)
      formData.append("thumbnailImage", data.courseImage)
      // formData.append("status", COURSE_STATUS.DRAFT)
      //console.log("FORM DATA of ADD_COURSE: (before API call) ", formData)
      const result = await addCourse(formData, token)
      if(result) {
        dispatch(setStep(2))
        dispatch(setCourse(result))
      }
      //console.log("FORM DATA of ADD_COURSE: (after API call) ", formData)
    }

  return (
    <div className='flex flex-col justify-center'>
      <p className='text-3xl font-medium mb-9'>Course Information</p>
      <div className='flex flex-col gap-7 items-center justify-center'>
        <div className='flex items-center justify-between border w-[100%] p-6 rounded-2xl shadow-md drop-shadow-lg'>
          <form className='flex flex-col w-full gap-5' onSubmit={handleSubmit(submitHandler)}>
            <label className='w-full'>
              <p className='text-lg mb-1'>Course Title <span className='text-red-500'>*</span></p>
              <input
                className='w-full p-3 border rounded-lg'
                type='text'
                placeholder='Enter Course Title'
                required
                {...register("courseTitle")}
              />
            </label>
            <label>
              <p className='text-lg mb-1'>Course Description <span className='text-red-500'>*</span></p>
              <textarea
                className='w-full p-3 border rounded-lg'
                placeholder='Enter Course Description'
                required
                {...register("courseDesc")}
              />
            </label>
            <label>
              <p className='text-lg mb-1'>Price <span className='text-red-500'>*</span></p>
              <input
                className='w-full p-3 border rounded-lg'
                type='number'
                placeholder='Enter Course Price'
                required
                min='1'
                {...register("coursePrice")}
              />
            </label>
            <label>
              <p className='text-lg mb-1'>Category <span className='text-red-500'>*</span></p>
              <select className='w-full p-3 border rounded-lg' required defaultValue='' {...register("courseCategory", {required: true})}>
                <option value='' disabled>Select Category</option>
                {
                  allCategories.map((category, index) => (
                    <option key={index} value={category._id}>
                      {category.name}
                    </option>
                  ))
                }
              </select>
            </label>
            <Upload
              name={'courseImage'}
              label={'Course Thumbnail'}
              register={register}
              errors={errors}
              setValue={setValue}
            />
            <div className='flex'>
              {
                editCourse && (
                  <button className='mt-3 border border-black px-3 py-2 w-1/3 mx-auto rounded-md bg-[#082F66] text-white font-medium hover:scale-95 transition-all duration-200' onClick={() => dispatch(setStep(2))}>
                    Continue Without Saving
                  </button>
                )
              }
              <button className='mt-3 border border-black px-3 py-2 w-1/3 mx-auto rounded-md bg-[#082F66] text-white font-medium hover:scale-95 transition-all duration-200' type='submit'>
                {
                  !editCourse ? 'Next' : 'Save Changes'
                }
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default CourseInfo