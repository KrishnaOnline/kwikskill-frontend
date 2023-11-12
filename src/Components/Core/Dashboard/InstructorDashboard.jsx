import React, { useEffect, useState } from 'react'
import { getInstructorStats } from '../../../services/operations/profileAPI'
import { getInstructorCourses } from '../../../services/operations/courseAPI'
import { Link, useNavigate } from 'react-router-dom'
import { Doughnut, Pie, PolarArea } from 'react-chartjs-2'
import { Chart, registerables } from 'chart.js'
Chart.register(...registerables)


const InstructorDashboard = () => {
    const userLocal = localStorage.getItem('user')
    const {token} = JSON.parse(userLocal)
    //console.log(token)
    const [instructorDashData, setInstructorDashData] = useState(null)
    const [courses, setCourses] = useState(null)
    const navigate = useNavigate()
    const instructorStats = async () => {
        try {
            const response = await getInstructorStats(token)
            const result = await getInstructorCourses(token)
            if(response?.data?.length) {
                setInstructorDashData(response.data)
            }
            if(result) {
                setCourses(result)
            }
        } catch(err) {
            //console.log(err)
        }
    }
    const totalAmount = instructorDashData?.reduce(
        (acc, curr) => acc + curr.totalIncome, 0
    )
    const totalNoOfStudents = instructorDashData?.reduce(
        (acc, curr) => acc + curr.totalStudents, 0
    )
    useEffect(() => {
        instructorStats()
    }, [])
    //console.log(instructorDashData)
    const chartDataStudents = {
        labels: instructorDashData?.map(course => course.courseName),
        datasets: [
            {
                data: instructorDashData?.map(course => course.totalStudents),
                backgroundColor: ['#1E40AF', '#082F66'],
            }
        ]
    }
    const chartDataIncome = {
        labels: instructorDashData?.map(course => course.courseName),
        datasets: [
            {
                data: instructorDashData?.map(course => course.totalIncome),
                backgroundColor: ['#7f1c36', '#f70d09'],
            }
        ]
    }
    //console.log(chartDataStudents, chartDataIncome)
    const options = {}

  return (
    <div className='flex flex-col justify-center max-w-[350px]'>
        <p className='text-3xl font-medium mb-9'>Dashboard</p>
        {
            !instructorDashData 
            ? (<p className='text-lg'>No Dashboard Data Available</p>)
            : (
                <div className=''>
                    <div className='flex gap-10 flex-col md:flex-row mb-9'>
                        <Pie
                            className=''
                            data={chartDataStudents}
                        />
                        <Pie
                            data={chartDataIncome}
                        />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <p className='text-2xl font-medium'><span className=''>Total Courses: </span><span className='text-[#1E40AF]'>{courses?.length}</span></p>
                        <p className='text-2xl font-medium'><span className=''>Total Students: </span><span className='text-[#1E40AF]'>{totalNoOfStudents}</span></p>
                        <p className='text-2xl font-medium'><span className=''>Total Income: </span><span className='text-[#1E40AF]'>₹{totalAmount}</span></p>
                        {/* <Link to={'/dashboard/my-courses'}>
                            <button className=''>Go To My Courses</button>
                        </Link> */}
                    </div>
                </div>
            )
        }
    </div>
  )
}

export default InstructorDashboard