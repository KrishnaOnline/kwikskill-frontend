import React, { useEffect, useRef, useState } from 'react'
import ReviewBox from './ReviewBox'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Player, BigPlayButton, LoadingSpinner } from 'video-react'
import "video-react/dist/video-react.css"
import { markAsComplete } from '../../../services/operations/courseAPI'
import { setCompletedLectures, updateCompletedLectures } from '../../../slices/viewCourseSlice'
import toast from 'react-hot-toast'
import { formatTime } from '../../../utils/durationFormat'


const CourseLectures = ({reviewSection, setReviewSection}) => {
  const {courseId, sectionId, subSectionId} = useParams()
  const location = useLocation()
  const {user} = useSelector(state => state.profile)
  const dispatch = useDispatch()
  const userLocal = localStorage.getItem('user')
  const {token} = JSON.parse(userLocal)
  //console.log(token)
  const {courseSectionData, courseEntireData, completedLectures, totalNoOfLectures} = useSelector(state => state.viewCourse)
  const navigate = useNavigate()
  const playerRef = useRef(null)
  const [videData, setVideoData] = useState([])
  const [videoEnd, setVideoEnd] = useState(false)
  //console.log("COMPLETED VIDEOS: ", completedLectures)
  useEffect(() => {
    if(courseSectionData.length === 0) {
      return
    }
    if(!courseId && !sectionId && !subSectionId) {
      navigate('/dashboard/enrolled-courses')
    } else {
      const filteredSection = courseSectionData?.filter(
        data => data._id === sectionId
      )
      const filteredSubSection = filteredSection[0]?.subSection?.filter(
        data => data._id === subSectionId
      )
      setVideoData(filteredSubSection[0])
      setVideoEnd(false)
    }
  }, [courseSectionData, sectionId, subSectionId, courseEntireData, location.pathname])
  const handleLectureComplete = async () => {
    const res = await markAsComplete({courseId: courseId, subSectionId: subSectionId}, token)
    //console.log(res)
    if(res) {
      dispatch(updateCompletedLectures(subSectionId))
      // dispatch(setCompletedLectures([...completedLectures, videData._id]))
      //console.log("Completed Lectures: ", completedLectures)
    }
  }
  //console.log("COURSE ENTIRE DATA: ", courseEntireData)

  return (
    <div className=''>
      <div className=''>
        <Player
          ref={playerRef}
          aspectRatio='16:9'
          playsInline
          onEnded={() => setVideoEnd(true)}
          src={videData?.videoUrl}
        >
          <LoadingSpinner/>
          <BigPlayButton position='center'/>
        </Player>
      </div>
      <div className='flex gap-x-5 mt-5'>
        {
          completedLectures?.includes(subSectionId) ? <div></div> : (
            <button onClick={handleLectureComplete} className='mt-3 p-2 border rounded-lg font-medium hover:scale-95 transition-all duration-200 bg-[#082F66] text-white'>Mark As Complete</button>
          )
        }
        {/* DO THIS AS WELL
        <button onClick={handleLectureIncomplete}>Mark As Incomplete</button> */}
      {/* </div>
      <div> */}
        {
          (
            <button onClick={
              !courseEntireData?.reviewAndRating?.map(review => review?.user).includes(user._id)
              ? () => setReviewSection(true)
              : () => (toast.error("User Already Reviewed this Course"))
            } className='mt-3 p-2 border rounded-lg font-medium hover:scale-95 transition-all duration-200 bg-[#082F66] text-white'>Add Review</button>
          )
        }
        {
          //console.log(courseEntireData?.reviewAndRating?.map(review => review?.user).includes(user._id))
        }
      </div>
      {
          reviewSection && (
            <ReviewBox setReviewSection={setReviewSection}/>
          )
        }
    </div>
  )
}

export default CourseLectures