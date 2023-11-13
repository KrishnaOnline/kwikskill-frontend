import React, { useEffect, useState } from 'react'
import { apiConnector } from '../services/apiConnector'
import { categories } from '../services/apis'
import { Link } from 'react-router-dom'
import Spinner from '../Components/Common/Spinner'


const Categories = () => {
    const [allCategories, setAllCategories] = useState([])
    const fetchCategories = async() => {
        try {
            const result = await apiConnector("GET", categories.GET_ALL_CATEGORIES_API_URL)
            //console.log(import.meta.env.VITE_BASE_URL)
            //console.log(categories.CATEGORIES_API_URL)
            //console.log("API Result:", result)
            setAllCategories(result?.data?.data)
        } catch(err) {
            //console.log("Error fetching categories:", err)
        }
    }
    
    useEffect(() => {
        fetchCategories();
    }, [])

    if(allCategories.length === 0) {
        return (
            <Spinner/>
        )
    }
  return (
    <div className='categories-page'>
        <div className='w-11/12 max-w-[1280px] mx-auto min-h-[750px] flex flex-col'>
            <h1 className='text-4xl font-semibold mt-7 mb-7'>Categories</h1>
            <div className='flex items-center max-md:justify-center mx-auto flex-wrap gap-5'>
                {
                    allCategories.length > 0
                    ? (
                            allCategories.map((category, index) => 
                            (
                                <Link to={`${category.name.split(' ').join('+').toLowerCase()}`} key={index}>
                                    <div className='bg-white border flex flex-col gap-2 rounded-lg transition-all duration-300 hover:drop-shadow-2xl shadow-md hover:shadow-xl h-[200px] p-3 w-[300px]'>
                                        <p className='text-lg text-[#2A447F] font-medium'>{category?.name}</p>
                                        <p>{category?.description.length > 160 ? category?.description.slice(0, 160)+'...' : category?.description}</p>
                                    </div>
                                </Link>
                            )
                        )
                    )
                    : (<p className='h-[400px] text-3xl flex justify-center items-center'>No Categories Found</p>)
                }
            </div>
        </div>
    </div>
  )
}

export default Categories