import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import getAvgRating from '../../utils/avgRating'
import RatingStars from './RatingStars'


const CourseCard = ({course, styling}) => {
  const [avgReviews, setAvgReviews] = useState(0)
  useEffect(() => {
    const count = getAvgRating(course?.reviewAndRating)
    setAvgReviews(count)
  }, [course])
  if(!course) {
      return null
  }
  //console.log("COURSES Props: ", course)
  //console.log("AVG Ratings: ", avgReviews)

  return (
    <div className={`${styling} w-fit`}>
        <Link key={course._id} to={`/course/${course._id}`}>
            <div className='flex flex-col flex-wrap gap-1 bg-white p-3 border rounded-lg transition-all duration-300 hover:drop-shadow-2xl shadow-md hover:shadow-xl'>
              <img className='h-[200px] w-[300px] mb-2 rounded-lg' src={course.thumbnail}/>
              <div className='flex flex-col gap-1 flex-wrap'>
                <p className='text-lg font-semibold'>{course.courseName}</p>
                <p className='text-[#2A447F] font-medium'><span className='text-black'>Price: </span>{course.price !== 0 ? `₹${course.price}` : 'Free'}</p>
                <div className='flex items-center gap-1'>
                  <p>{avgReviews}</p>
                  <RatingStars rating={avgReviews} />
                </div>
                <p>Taught By <span className='text-blue-600 font-medium'>{course.instructor.firstName} {course.instructor.lastName}</span></p>
              </div>
            </div>
        </Link>
    </div>
  )
}

export default CourseCard