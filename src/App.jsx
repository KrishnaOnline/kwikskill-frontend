import { Route, Routes, useNavigate } from 'react-router-dom'
import './App.css'
import Home from './Pages/Home'
import Navbar from './Components/Common/Navbar'
import Categories from './Pages/Categories'
import Login from './Pages/Login'
import Signup from './Pages/Signup'
import Error from './Pages/Error'
import Footer from './Components/Common/Footer'
import VerifyEmail from './Pages/VerifyEmail'
import Profile from './Components/Core/Dashboard/Profile'
import Settings from './Components/Core/Dashboard/Settings'
import PrivateRoute from './Components/Core/Auth/PrivateRoute'
import OpenRoute from './Components/Core/Auth/OpenRoute'
import ForgotPassword from './Pages/ForgotPassword'
import ResetPassword from './Pages/ResetPassword'
import Contact from './Pages/Contact'
import Dashboard from './Pages/Dashboard'
import EnrolledCourses from './Components/Core/Dashboard/EnrolledCourses'
import Cart from './Components/Core/Dashboard/Cart'
import { useDispatch, useSelector } from 'react-redux'
import { ACCOUNT_TYPE } from './utils/constants'
import InstructorCourses from './Components/Core/Dashboard/InstructorCourses'
import AddCourse from './Components/Core/Dashboard/AddCourse'
import EditCourse from './Components/Core/Dashboard/EditCourse'
import CategoryPage from './Pages/CategoryPage'
import CoursePage from './Pages/CoursePage'
import CourseViewPage from './Pages/CourseViewPage'
import CourseLectures from './Components/Core/LecturesPage/CourseLectures'
import InstructorDashboard from './Components/Core/Dashboard/InstructorDashboard'
import { useState } from 'react'
import NavbarMobile from './Components/Common/NavbarMobile'


function App() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {user} = useSelector(state => state.profile)
  console.log("By KRISHNA VAMSHI KUSUMA")
  const [reviewSection, setReviewSection] = useState(false)

  return (
    <div /*className='page-with-bg'*/>
      <div className='min-h-screen'>
        <div className='hidden md:flex'>
          <Navbar/>
        </div>
        <p>vbsdjhxkbvn dfcbv fm,jk</p>
        <div className='flex md:hidden'>
          <NavbarMobile/>
        </div>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/categories' element={<Categories/>}/>
          <Route path='/categories/:categoryName' element={<CategoryPage/>}/>
          <Route path='/course/:courseId' element={<CoursePage/>}/>
          <Route path='/login' element={<OpenRoute><Login/></OpenRoute>}/>
          <Route path='/signup' element={<OpenRoute><Signup/></OpenRoute>}/>
          <Route path='/verify-email' element={<VerifyEmail/>}/>
          <Route element={<PrivateRoute><Dashboard/></PrivateRoute>}>
              <Route path='/dashboard/profile' element={<Profile/>}/>
              <Route path='/dashboard/settings' element={<Settings/>}/>
              {
                user?.accountType === ACCOUNT_TYPE.STUDENT && (
                  <>
                    <Route path='/dashboard/enrolled-courses' element={<EnrolledCourses/>}/>
                    <Route path='/dashboard/purchase-history' element={<Profile/>}/>
                    <Route path='/dashboard/cart' element={<Cart/>}/>
                  </>
                )
              }
              {
                user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
                  <>
                    <Route path='/dashboard/my-courses' element={<InstructorCourses/>}/>
                    <Route path='/dashboard/add-course' element={<AddCourse/>}/>
                    <Route path='/dashboard/edit-course/:courseId' element={<EditCourse/>}/>
                    <Route path='/dashboard/instructor' element={<InstructorDashboard/>}/>
                  </>
                )
              }
          </Route>
          <Route element={<PrivateRoute><CourseViewPage/></PrivateRoute>} >
              {
                user?.accountType === ACCOUNT_TYPE.STUDENT && (
                  <>
                    <Route path='/view-course/:courseId/section/:sectionId/sub-section/:subSectionId' element={<CourseLectures reviewSection={reviewSection} setReviewSection={setReviewSection}/>}/>
                  </>
                )
              }
          </Route>
          <Route path='/forgot-password' element={<ForgotPassword/>}/>
          <Route path='/resetPassword/:id' element={<ResetPassword/>}/>
          <Route path='/contact' element={<Contact/>}/>
          <Route path='*' element={<Error/>}/>
        </Routes>
        <Footer/>
      </div>
    </div>
  )
}

export default App
