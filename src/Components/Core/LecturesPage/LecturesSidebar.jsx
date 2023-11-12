import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { BiArrowBack } from 'react-icons/bi'
import { markAsComplete } from '../../../services/operations/courseAPI'
import { updateCompletedLectures } from '../../../slices/viewCourseSlice'
import ProgressBar from "@ramonak/react-progress-bar"
import { formatTime } from '../../../utils/durationFormat'


const LecturesSidebar = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const location = useLocation()
    const {user} = useSelector(state => state.profile)
    const userLocal = localStorage.getItem('user')
    const {token} = JSON.parse(userLocal)
    //console.log(token)
    const [activeStatus, setActiveStatus] = useState("")
    const [videoBarActive, setVideoBarActive] = useState("")
    const {courseId, sectionId, subSectionId} = useParams()
    const {courseSectionData, courseEntireData, totalNoOfLectures, completedLectures} = useSelector(state => state.viewCourse)
    useEffect(() => {
        const lecturesSidebarData = () => {
            if(!courseSectionData.length) return
            const currentSectionIndex = courseSectionData.findIndex(
                data => data._id === sectionId
            )
            const currentSubSectionIndex = courseSectionData[currentSectionIndex]?.subSection.findIndex(
                data => data._id === subSectionId
            )
            //console.log("Current Section Index: ", currentSectionIndex)
            //console.log("Current SubSection Index: ", currentSubSectionIndex)
            const activeSubSectionId = courseSectionData[currentSectionIndex]?.subSection[currentSubSectionIndex]?._id
            //console.log("Active SubSection Id: ", activeSubSectionId)
            setActiveStatus(courseSectionData[currentSectionIndex]?._id)
            setVideoBarActive(activeSubSectionId)
        }
        lecturesSidebarData()
    }, [courseSectionData, courseEntireData, sectionId, subSectionId, location.pathname])

  return (
    <div className='flex flex-col gap-4'>
        <div>
            <button className='flex items-center gap-x-1 underline mb-3' onClick={() => {navigate('/dashboard/enrolled-courses')}}><BiArrowBack/><p>Back</p></button>
        </div>
        <div className='flex flex-col gap-3'>
            <p className='font-semibold text-lg'>{courseEntireData?.courseName}</p>
            <p>{completedLectures?.length}/{totalNoOfLectures} Completed</p>
            <ProgressBar
                completed={(completedLectures?.length || 0)/(totalNoOfLectures || 1)*100}
                bgColor="#8a1bcd"
                labelAlignment="outside"
                labelColor="black"
                animateOnRender
                height='8px'
            />
        </div>
        <div className='w-full'>
            {     
                courseSectionData.map((section, index) => (
                    <details className='cursor-pointer w-full' key={index} open>
                                <summary className='bg-gray-700 bg-opacity-40 h-14 w-full px-2 flex items-center justify-between border'>
                                        {/* <div className='flex'> */}
                                            <p className='text-base font-medium'>{section?.sectionName}</p>
                                            <p>{section?.subSection.length} Lecture(s)</p>
                                        {/* </div> */}
                                </summary>
                                <div>
                                    {
                                        /*activeStatus === section._id && */ (
                                            <div className='flex flex-col ml-2 border'>
                                                {
                                                    section?.subSection.map((subSec) => (
                                                        <div className={`flex justify-between p-3 ${videoBarActive === subSec._id ? 'bg-[#082F66] text-white' : 'hover:bg-[#082F66] hover:bg-opacity-70 hover:text-white'}`} key={subSec._id} onClick={() => {
                                                            navigate(`/view-course/${courseEntireData?._id}/section/${section._id}/sub-section/${subSec._id}`)
                                                            setVideoBarActive(subSec._id)
                                                        }}>
                                                            <div className='flex items-center gap-x-2'>
                                                                <input
                                                                    type='checkbox'
                                                                    readOnly={true}
                                                                    checked={completedLectures?.includes(subSec._id)}
                                                                    onChange={() => {}}
                                                                    className=''
                                                                />
                                                                <p>{subSec?.title}</p>
                                                            </div>
                                                            {/* <div className='flex justify-between'> */}
                                                                {/* <AiOutlineFileAdd className=''/> */}
                                                                <p>{formatTime(subSec?.timeDuration)}</p>
                                                            {/* </div> */}
                                                        </div>
                                                    ))
                                                }
                                            </div>
                                        )
                                    }
                                </div>
                    </details>
                ))
            }   
        </div>
    </div>
  )
}

export default LecturesSidebar