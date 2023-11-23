import toast from "react-hot-toast"
import { paymentApi } from "../apis"
import { apiConnector } from '../apiConnector'
import Logo from '../../assets/Logo/K_Logo.png'
import { resetCart } from '../../slices/cartSlice'
import { getEnrolledCourses } from "./profileAPI"
import { setPaymentLoading } from "../../slices/courseSlice"


// function loadScript(src){
//     return new Promise((resolve)=>{
//         const script =document.createElement("script");
//         script.src=src;
//         script.onload=()=>{
//             resolve(true);
//         }
//         script.onerror=()=>{
//             resolve(false);
//         }
//         document.body.appendChild(script);
//     })
// }

export const buyCourse = async (token, courses, userDetails, navigate, dispatch, cartTotal) => {
    const toastId = toast.loading("Loading...")
    // const res = await  loadScript("https://checkout.razorpay.com/v1/checkout.js")
    // if(!res){
    //     toast.error("Razorpay SDK failed to load")
    //     return;
    // }
    try {
        const response = await apiConnector("POST", paymentApi.CAPTURE_PAYMENT_API, cartTotal ? {cartTotal, courses} : {courses}, {
            'Authorization': `Bearer ${token}`,
        })
        //console.log("CAPTURE PAYMENT API Response: ", response)
        if(!response.data.success) {
            throw new Error(response.data.message)
        }
        const options = {
            key: import.meta.env.VITE_RAZORPAY_KEY,
            currency: response.data.message.currency,
            amount: `${response.data.message.amount}`,
            order_id: response.data.message.id,
            name: "KwikSkill",
            description: "Thank You for using KwikSkill",
            image: Logo,
            prefill: {
                name: `${userDetails.firstName+' '+userDetails.lastName}`,
                email: userDetails.email
            },
            handler: function(res) {
                // sendPaymentSuccessMail(res, response.data.amount, token)
                verifyPayment({...res, courses}, token, navigate, dispatch)
            },
            // theme: {
            //     color: "#3399cc",
            // }
        }
        const paymentWindow = new window.Razorpay(options)
        paymentWindow.open()
        paymentWindow.on('payment.failed', function(response){
            //console.log("Payment Window Error: ", response)
            toast.error("Something is Wrong with Razorpay, Please Try Again Later")
        })
    } catch(err) {
        toast.error(/*err.message*/ "Something went Wrong, Please Add to Cart and Try Again")
        //console.log(err)
    }
    toast.dismiss(toastId)
}

const verifyPayment = async (payData, token, navigate, dispatch) => {
    const toastId = toast.dismiss("Loading...")
    dispatch(setPaymentLoading(true))
    try {
        const verifyPaymentResponse = await apiConnector("POST", paymentApi.VERIFY_PAYMENT_API, payData, {
            'Authorization': `Bearer ${token}`,
        })
        //console.log("VERIFY PAYMENT API Response: ", verifyPaymentResponse)
        if(!verifyPaymentResponse.data.success) {
            toast.error(verifyPaymentResponse.data.message)
            return
        }
        toast.success("Payment Successful")
        navigate('/dashboard/enrolled-courses')
        dispatch(resetCart())
        // const userEnrolledCourses = await getEnrolledCourses(token)
        // const user = JSON.parse(localStorage.getItem('user'))
        // user.courses = userEnrolledCourses
        localStorage.setItem('user', user)
    } catch(err) {
        //console.log("VERIFY PAYMENT API Error: ", err)
        toast.error("Payment Failed")
    }
    toast.dismiss(toastId)
    dispatch(setPaymentLoading(false))
}