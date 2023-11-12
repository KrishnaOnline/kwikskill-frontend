import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ReactStars from 'react-rating-stars-component'
import { BsStarFill, BsStarHalf, BsStar } from 'react-icons/bs'
import { RiDeleteBinLine } from 'react-icons/ri' 
import { removeFromCart } from '../../../slices/cartSlice'
import { useNavigate } from 'react-router-dom'
import { buyCourse } from '../../../services/operations/paymentApi'
import Spinner from '../../Common/Spinner'


const Cart = () => {
  const {cart, total, totalItems} = useSelector(state => state.cart)
  //console.log(total)
  const {paymentLoading} = useSelector(state => state.course)
  // const {token} = useSelector(state => state.auth.token)
  const userLocal = localStorage.getItem('user')
  const {token} = JSON.parse(userLocal)
  const {user} = useSelector(state => state.profile)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  //console.log("TOKEN: ", token)
  const handleBuyCourse = () => {
    const courses = cart.map(course => course._id)
    buyCourse(token, [courses], user, navigate, dispatch, total)
    //console.log("Courses Bought: ", courses)
  }

  if(paymentLoading) {
    return (
      <Spinner/>
    )
  }

  return (
    <div className='flex flex-col justify-center'>
      <p className='text-3xl font-medium mb-9'>Your Cart</p>
      <hr className='mb-9'/>
      {
        totalItems === 0
        ? (<p className='text-xl text-center'>Your Cart is EMPTY 🙄</p>)
        : (
            <div className='flex flex-col md:flex-row gap-5'>
              <div className='w-[100%] md:w-[70%]'>
                {
                  cart.map((item, index) => (
                      <div className='flex flex-col' key={index}>
                        <div className='flex gap-3 bg-white flex-col lg:flex-row items-center mb-3 border shadow-lg rounded-lg p-3'>
                            <img className='h-[200px] w-[300px] rounded-lg' src={item?.thumbnail}/>
                            <div className='flex flex-col p-2 gap-2'>
                              <p className='text-xl font-bold'>{item?.courseName}</p>
                              <p className='text-lg'>{item?.courseDescription.slice(0,50)+'...'}</p>
                              <div className='flex items-center gap-x-3'>
                                {/* <span>4.8</span>
                                <ReactStars
                                  count={5}
                                  size={20}
                                  edit={false}
                                  activeColor={'#ffd700'}
                                  emptyIcon={<BsStar/>}
                                  filledIcon={<BsStarFill/>}
                                  halfIcon={<BsStarHalf/>}
                                /> */}
                                {/* <p>{item?.reviewAndRating.length} Ratings</p> */}
                              </div>
                              <p className='mb-2'><span className='font-medium'>Price: </span><span className='text-[#2A447F] text-lg'>₹{item?.price}</span></p>
                              <button onClick={() => dispatch(removeFromCart(item._id))}>
                                <div className='flex gap-2 border p-2 bg-red-700 text-white font-medium hover:scale-95 transition-all duration-200 rounded-lg justify-center items-center'>
                                  <RiDeleteBinLine/>
                                  <p>Remove</p>
                                </div>
                              </button>
                            </div>
                          </div>
                          <div>
                        </div>
                      </div>
                    )
                  )
                }
              </div>
              <div className='w-[90%] md:w-[30%] border h-fit shadow-lg p-5 bg-gray-300 bg-opacity-30 rounded-lg'>
                <div className='flex flex-col gap-3'>
                  <p className='text-3xl font-bold mb-1'>Total</p>
                  <p className='text-4xl text-[#1f3a78]'>₹{total}</p>
                  <p className='text-2xl'>(for {totalItems} items)</p>
                  <button className='border hover:scale-95 transition-all duration-200 p-3 rounded-lg shadow-lg bg-[#082F66] text-white font-medium mt-5' onClick={handleBuyCourse}>
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          )
      }
    </div>
  )
}

export default Cart