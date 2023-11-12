import React, { useEffect, useState } from 'react'
import LecturesSidebar from '../Components/Core/LecturesPage/LecturesSidebar'
import { Outlet, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getFullCourseDetails } from '../services/operations/courseAPI'
import { setCompletedLectures, setCourseEntireData, setCourseSectionData, setTotalNoOfLectures } from '../slices/viewCourseSlice'


const CourseViewPage = () => {
    const dispatch = useDispatch()
    const {courseId} = useParams()
    const [reviewSection, setReviewSection] = useState(false)
    // const {token} = useSelector(state => state.auth.token)
    const userLocal = localStorage.getItem('user')
    const {token} = JSON.parse(userLocal)
    const [completedVids, setCompletedVids] = useState([])
    //console.log(token)
    useEffect(() => {
        const fullCourseDetails = async () => {
            const courseData = await getFullCourseDetails(courseId, token)
            //console.log("Course Data Api Response: ", courseData)
            dispatch(setCourseSectionData(courseData?.courseDetails?.courseContent))
            dispatch(setCourseEntireData(courseData?.courseDetails))
            dispatch(setCompletedLectures(courseData?.completedVideos))
            setCompletedVids(courseData?.completedVideos)

            let lectures = 0
            courseData?.courseDetails?.courseContent.forEach(section => {
                lectures += section.subSection.length
            })
            dispatch(setTotalNoOfLectures(lectures))
        }
        if(courseId && token) {
            fullCourseDetails()
        }
    }, [])

  return (
    <>
        <div className='flex flex-col gap-4 p-3 md:flex-row max-w-[1366px] mx-auto mt-3'>
            <div className='w-full md:w-[75%] mx-auto'>
                <Outlet/>
            </div>
            <div className='w-[90%] md:w-[25%] mx-auto'>
                <LecturesSidebar/>
            </div>
        </div>
    </>
  )
}

export default CourseViewPage