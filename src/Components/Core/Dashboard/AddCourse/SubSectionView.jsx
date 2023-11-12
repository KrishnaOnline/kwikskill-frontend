import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AiOutlineUnorderedList, AiOutlineEdit, AiOutlineDelete, AiOutlineFileAdd, AiOutlinePlus, AiFillCaretDown, AiOutlineEye } from 'react-icons/ai'
import { deleteSection, deleteSubSection } from '../../../../services/operations/courseAPI'
import { setCourse } from '../../../../slices/courseSlice'
import SubSectionModal from './SubSectionModal'


const SubSectionView = ({handleChangeEditSectionName}) => {
    const {course} = useSelector(state => state.course)
    // const {token} = useSelector(state => state.auth.token)
    const userLocal = localStorage.getItem('user')
    const {token} = JSON.parse(userLocal)
    //console.log(token)
    const dispatch = useDispatch()
    const [addSubSection, setAddSubSection] = useState(null)
    const [viewSubSection, setViewSubSection] = useState(null)
    const [editSubSection, setEditSubSection] = useState(null)
    const [confirmModal, setConfirmModal] = useState(false)

    const handleDeleteSection = async (sectionId) => {
        const result = await deleteSection({sectionId, courseId: course._id}, token)
        if(result) {
            dispatch(setCourse(result))
        }
    }
    const handleDeleteSubSection = async (subSectionId, sectionId) => {
        const result = await deleteSubSection({sectionId, subSectionId}, token)
        if(result) {
            const updatedCourseContent = course.courseContent.map(section => (
                section._id === sectionId ? result : section
            ))
            const updatedCourse = {...course, courseContent: updatedCourseContent}
            dispatch(setCourse(updatedCourse))
        }
    }

  return (
    <div>
        <p className='text-center mb-5 text-base'>(Please Go Back and Try Again, if any of the button is NOT WORKING)</p>
        <div className='w-9/12 mx-auto'>
            {
                course?.courseContent?.map((section, index) => (
                    <details className='cursor-pointer w-full' key={index} open>
                        <summary className='bg-gray-700 bg-opacity-40 h-14 w-full px-2 flex items-center justify-between border'>
                            <div className='flex items-center'>
                                <AiFillCaretDown/>
                                <div className='flex items-center'>
                                    <AiOutlineUnorderedList className=''/>
                                    <p>{section?.sectionName}</p>
                                </div>
                            </div>
                            <div className='flex gap-x-2'>
                                <button className='border p-2 rounded-md shadow-lg' onClick={() => handleChangeEditSectionName(section._id, section.sectionName)}>
                                    <AiOutlineEdit size={20} className=''/>
                                </button>
                                <button className='border p-2 rounded-md shadow-lg' onClick={() => handleDeleteSection(section._id)}>
                                    <AiOutlineDelete size={20} className=''/>
                                </button>
                            </div>
                        </summary>
                        <div>
                            <div className='flex flex-col ml-2 border'>
                                {
                                    section?.subSection.map((data) => (
                                        <div className='flex p-3 justify-between items-center' key={data._id}>
                                            <div className='flex items-center'>
                                                <AiOutlineFileAdd className=''/>
                                                <p>{data?.title}</p>
                                            </div>
                                            <div className='flex gap-x-3'>
                                                <button className='border p-2 rounded-md shadow-lg' onClick={() => setViewSubSection(data)}>
                                                    <AiOutlineEye size={20} className=''/>
                                                </button>
                                                <button className='border p-2 rounded-md shadow-lg' onClick={() => setEditSubSection({...data, sectionId: section._id})}>
                                                    <AiOutlineEdit size={20} className=''/>
                                                </button>
                                                <button className='border p-2 rounded-md shadow-lg' onClick={() => handleDeleteSubSection(data._id, section._id)}>
                                                    <AiOutlineDelete size={20} className=''/>
                                                </button>
                                            </div>
                                        </div>
                                    ))
                                }
                                <button className='flex gap-2 w-fit m-3 bg-[#082F66] text-white font-medium items-center p-2 border' onClick={() => setAddSubSection(section._id)}>
                                    <AiOutlinePlus className=''/>
                                    <p>Add Lecture</p>
                                </button>
                            </div>
                        </div>
                    </details>
                ))
            }
        </div>
        {
            addSubSection ? (<SubSectionModal modalData={addSubSection} setModalData={setViewSubSection} add={true}/>)
            : viewSubSection ? (<SubSectionModal modalData={viewSubSection} setModalData={setViewSubSection} view={true}/>)
            : editSubSection ? (<SubSectionModal modalData={editSubSection} setModalData={setEditSubSection} edit={true}/>)
            : (<></>)
        }
        {/* {
            <div>
                <SubSectionModal modalData={addSubSection} setModalData={setViewSubSection} add={true}/>
                <SubSectionModal modalData={viewSubSection} setModalData={setViewSubSection} view={true}/>
                <SubSectionModal modalData={editSubSection} setModalData={setEditSubSection} edit={true}/>
            </div>
        } */}
    </div>
  )
}

export default SubSectionView