import React, { useEffect, useState } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import { apiConnector } from '../services/apiConnector'
import { categories, courseApi } from '../services/apis'
import { getCategoryPageDetails } from '../services/operations/courseAPI'
import toast from 'react-hot-toast'
import CourseCard from '../Components/Common/CourseCard'
import Error from './Error'
import Spinner from '../Components/Common/Spinner'


const CategoryPage = () => {
  const {categoryName} = useParams()
  //console.log(categoryName)
  const [pageData, setPageData] = useState(null)
  const [categoryId, setCategoryId] = useState("")
  const selectedCategDetails = pageData?.data?.selectedCategory
  const otherCategDetails = pageData?.data?.differentCategory
  const topSellCategDetails = pageData?.data?.mostSellingCourses
  useEffect(() => {
    const getCategories = async () => {
      const response = await apiConnector("GET", categories.GET_ALL_CATEGORIES_API_URL)
      //console.log("GET CATEGORIES Response: ", response)
      const category_ID = response.data.data.filter((c) => c.name.split(" ").join("+").toLowerCase() === categoryName)[0]._id
      //console.log("Category ID: ", category_ID)
      setCategoryId(category_ID)
    }
    getCategories()
  }, [categoryName])
  useEffect(() => {
    const getCategoryDetails = async () => {
      try {
        const response = await getCategoryPageDetails(categoryId)
        //console.log("Response: ", response?.data)
        setPageData(response)
      } catch(err) {
        //console.log(err)
      }
    }
    if(categoryId) {
      getCategoryDetails()
    }
  }, [categoryId])
  const [showSpinner, setShowSpinner] = useState(true)
    const [showError, setShowError] = useState(false)
    useEffect(() => {
      const timeOutId = setTimeout(() => {
        setShowSpinner(false)
        setShowError(true)
      }, 3000)
      return () => clearTimeout(timeOutId)
  }, [])
  
  if(pageData) {
  return (
    <div className=''>
      <div className='bg-[#1f3a78] bg-opacity-95 text-white px-5 py-8 mx-auto'>
          <div className='mx-auto w-11/12 max-w-[1280px]'>
            <p className='text-md'>{`Home / Category / `}<span className='text-yellow-300'>{selectedCategDetails?.name}</span></p>
            <p className='text-3xl font-semibold mt-3 mb-3 drop-shadow-sm'>{selectedCategDetails?.name}</p>
            <p className='text-xl mb-3 text-justify'>{selectedCategDetails?.description}</p>
          </div>
      </div>
      <div className='w-11/12 max-w-[1280px] mx-auto flex flex-col'>
        <div>
          <p className='text-4xl font-medium px-5 mt-6 mb-3'>{selectedCategDetails?.name} Courses</p>
          <div className='flex flex-wrap items-center px-5 justify-center md:justify-start gap-8'>
            {
              !selectedCategDetails?.courses.length ? (
                <p className='text-lg mt-3'>No Courses Created in this Category Yet</p>
              ) :
              selectedCategDetails?.courses.map((course) => (
                <div className='' key={course._id}>
                  <CourseCard course={course} styling={``}/>
                </div>
              ))
            }
          </div>
        </div>
        <hr className='mt-9 mb-5'/>
        <div>
          <p className='text-4xl font-medium px-5 mb-3'>Other Popular Courses</p>
          <div className='flex flex-wrap px-5 items-center justify-center md:justify-start gap-8'>
            {
              !otherCategDetails?.courses?.length ? (
                <p className='text-lg mt-3'>No Other Courses Created Yet</p>
              ) :
              otherCategDetails?.courses?.slice(0, 5).map((course) => (
                <div key={course._id}>
                  <CourseCard course={course} styling={``}/>
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </div>
  )
  } else {
    return(
      <>
        {showSpinner && <Spinner/>}
        {showError && <Error/>}
      </>
    )
  }
}

export default CategoryPage