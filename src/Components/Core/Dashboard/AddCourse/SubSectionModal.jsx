import React, { useEffect, useState } from 'react'
import { Form, useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { RxCross2 } from 'react-icons/rx'
import Upload from './Upload'
import { createSubSection, updateSubSection } from '../../../../services/operations/courseAPI'
import { setCourse } from '../../../../slices/courseSlice'
import toast from 'react-hot-toast'


const SubSectionModal = ({modalData, setModalData, view=false, add=false, edit=false}) => {
    const {register, handleSubmit, setValue, getValues, formState: {errors, isSubmitSuccessful}} = useForm()
    // const {token} = useSelector(state => state.auth.token)
    const userLocal = localStorage.getItem('user')
    const {token} = JSON.parse(userLocal)
    //console.log(token)
    const {course} = useSelector(state => state.course)
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        if(view || edit) {
            setValue("subSecTitle", modalData.title)
            setValue("subSecDesc", modalData.description)
            setValue("subSecVideo", modalData.videoUrl)
        }
    }, [])
    const isFormUpdated = () => {
        const currentValues = getValues()
        if(currentValues.subSecTitle !== modalData.title || currentValues.subSecDesc !== modalData.description || currentValues.subSecVideo !== modalData.videoUrl) {
            return true
        }
        return false
    }
    const handleEditSubSection = async () => {
        const currentValues = getValues()
        const formData = new FormData()
        formData.append("sectionId", modalData.sectionId)
        formData.append("subSectionId", modalData._id)
        if(currentValues.subSecTitle !== modalData.title) {
            formData.append("title", currentValues.subSecTitle)
        }
        if(currentValues.subSecDesc !== modalData.description) {
            formData.append("description", currentValues.subSecDesc)
        }
        if(currentValues.subSecVideo !== modalData.videoUrl) {
            formData.append("video", currentValues.subSecVideo)
        }
        const result = await updateSubSection(formData, token)
        if(result) {
            const updatedCourseContent = course?.courseContent.map(section => (
                section._id === modalData.sectionId ? result : section
            ))
            const updatedCourse = {...course, courseContent: updatedCourseContent}
            dispatch(setCourse(updatedCourse))
        }
        // setLoading(false)
        setModalData(null)
        //console.log("modalData after Created SubSec: ", modalData)
    }
    const submitHandler = async (data) => {
        if(view) {
            return
        }
        if(edit) {
            if(!isFormUpdated()) {
                toast.error("No Changes Made")
            } else {
                handleEditSubSection()
            }
            return
        }

        const formData = new FormData()
        formData.append("sectionId", modalData)
        formData.append("title", data.subSecTitle)
        formData.append("description", data.subSecDesc)
        formData.append("video", data.subSecVideo)
        setLoading(true)
        const result = await createSubSection(formData, token)
        if(result) {
            const updatedCourseContent = course?.courseContent.map(section => (
                section._id === modalData ? result : section
            ))
            const updatedCourse = {...course, courseContent: updatedCourseContent}
            dispatch(setCourse(updatedCourse))
            //console.log("updatedCourse at createSubSec: ", updatedCourse)
        }
        setValue("subSecTitle", "")
        setValue("subSecDesc", "")
        setValue("subSecVideo", "")
        setModalData(null)
        setLoading(false)
        //console.log("modalData after Created SubSec: ", modalData)
    }

  return (
    <div className='border w-7/12 p-5 rounded-lg mt-10 shadow-lg mx-auto'>
        <div className=''>
            <div className='flex justify-between items-center'>
                <p className='text-lg mb-5 font-medium'>{view && "View"} {add && "Add"} {edit && "Edit"} Lecture</p>
                {
                    !add && (
                        <button className='border p-2 bg-red-400 rounded-sm' onClick={() => (!loading ? setModalData(null) : {})}>
                            <RxCross2/>
                        </button>
                    )
                }
            </div>
            <form className='flex flex-col gap-5' onSubmit={handleSubmit(submitHandler)}>
                <Upload
                    name={'subSecVideo'}
                    label={'Lecture Video'}
                    register={register}
                    errors={errors}
                    setValue={setValue}
                    video={true}
                    viewData={view ? modalData.videoUrl : null}
                    editData={edit ? modalData.videoUrl : null}
                />
                <label>
                    <p className='text-md'>Lecture Title</p>
                    <input
                        disabled={view || loading}
                        id='subSecTitle'
                        required
                        placeholder='Enter Lecture Title'
                        {...register("subSecTitle", {required:true})}
                        className='border shadow-lg w-full mx-auto rounded-lg p-2'
                    />
                </label>
                <label>
                    <p>Lecture Description</p>
                    <textarea
                        disabled={view || loading}
                        id='subSecDesc'
                        required
                        className='border shadow-lg w-full mx-auto rounded-lg p-2'
                        placeholder='Enter Lecture Description'
                        {...register("subSecDesc", {required:true})}
                    />
                </label>
                {
                    !view && (
                        <div>
                            <button className='mt-5 mb-5 p-2 px-3 border rounded-lg font-medium hover:scale-95 transition-all duration-200 bg-[#082F66] text-white' type='submit'>
                                {edit ? "Save Changes" : "Save"}
                            </button>
                        </div>
                    )
                }                
            </form>
        </div>
    </div>
  )
}

export default SubSectionModal