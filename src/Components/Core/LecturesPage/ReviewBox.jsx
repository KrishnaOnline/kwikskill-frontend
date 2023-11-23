import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { createRatingReview } from '../../../services/operations/courseAPI'
import ReactStars from "react-rating-stars-component"
import { RxCross1 } from 'react-icons/rx'


const ReviewBox = ({setReviewSection}) => {
  const {user} = useSelector(state => state.profile)
  // const {token} = useSelector(state => state.auth.token)
  const userLocal = localStorage.getItem('user')
  const {token} = JSON.parse(userLocal)
  const {courseEntireData} = useSelector(state => state.viewCourse)
  const [ratingValue, setRatingValue] = useState(0)
  const {register, handleSubmit, setValue, getValues, formState: {errors}} = useForm()
  //console.log(setReviewSection)
  useEffect(() => {
    setValue("courseReview", "")
    setValue("courseRating", 0)
  }, [])
  const ratingChanged = (newRating) => {
    setValue("courseRating", newRating)
  }
  const handleReviewSubmit = async (data) => {
    await createRatingReview(
      {
        courseId: courseEntireData._id,
        rating: data.courseRating,
        review: data.courseReview,
      }, token
    )
    setReviewSection(false)
  } 

  return (
    <div className='mt-5 border p-5 rounded-lg shadow-lg'>
      <div className='flex justify-between mb-3'>
        <p className='text-lg font-semibold'>Add Review</p>
        <button onClick={() => setReviewSection(false)} className='border p-2 bg-red-500 text-white rounded-md font-bold'><RxCross1/></button>
      </div>
      <div>
        <div className='flex gap-5 items-center'>
          <img className='h-[50px] rounded-full' src={user?.image}/>
          <div>
            <p className='font-medium'>{user?.firstName} {user?.lastName}</p>
            <p>Posting Publicly...</p>
        </div>
      </div>
      <form onSubmit={handleSubmit(handleReviewSubmit)}>
        {
          <ReactStars
            size={24}
            isHalf={false}
            count={5}
            value={ratingValue}
            color='black'
            required={true}
            activeColor='#ffd700'
            onChange={ratingChanged}
          />
        }
        <div className='flex flex-col gap-3 items-start rounded-lg w-full lg:w-1/2 p-4'>
          <label className='w-full'>
            {/* <p>Write your Review Here...</p> */}
            <textarea className='w-full p-2 min-h-[100px] border rounded-lg' required id='courseReview' placeholder='Write your Review Here...'
              {...register("courseReview", {required: true})}
            />
            {
              errors.courseReview && (
                <span>Please Add Your Review</span>
              )
            }
          </label>
          <button className='border border-black p-2 rounded-lg font-medium hover:bg-[#082F66] hover:text-white' type='submit'>Submit</button>
        </div>
      </form>
      </div>
    </div>
  )
}

export default ReviewBox