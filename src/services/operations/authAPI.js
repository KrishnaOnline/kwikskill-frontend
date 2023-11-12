import toast from 'react-hot-toast'
import { setLoading, setToken, setSignupData } from '../../slices/authSlice'
import { apiConnector } from '../apiConnector'
import { endPoints } from '../apis'
import { setUser } from '../../slices/profileSlice'


export const sendOTP = (email, navigate) => {
    return async(dispatch) => {
        dispatch(setLoading(true))
        try {
            const response = await apiConnector("POST", endPoints.SEND_OTP_API, {
                email,
                userExists: true,
            })
            //console.log("SENDOTP Response: ", response)
            if(!response.data.success) {
                throw new Error(response.data.message)
            }
            toast.success("OTP Sent Successfully")
            navigate('/verify-email')
        } catch(err) {
            //console.log("SENDOTP API Error: ", err)
            toast.error(err?.response.data.message)
        }
        dispatch(setLoading(false))
    }
}

export const signup = (email, accountType, password, confirmPassword, firstName, lastName, otp, navigate) => {
    const toastId = toast.loading("Loading...")
    return async(dispatch) => {
        dispatch(setLoading(true))
        try {
            const response = await apiConnector("POST", endPoints.SIGNUP_API, {
                email, firstName, lastName, password, confirmPassword, accountType, otp,
            })
            //console.log("SIGNUP API Response: ", response)
            if(!response.data.success) {
                throw new Error(response.data.message)
            }
            toast.success("Signed Up Successfully")
            navigate('/login')
        } catch(err) {
            //console.log("SIGNUP API Error: ", err)
            toast.error(err?.response?.data.message)
            navigate('/signup')
        }
        dispatch(setLoading(false))
        toast.dismiss(toastId)
    }
}

export const login = (email, password, navigate) => {
    return async(dispatch) => {
        const toastId = toast.loading("Loading...")
        dispatch(setLoading(true))
        try {
            const response = await apiConnector("POST", endPoints.LOGIN_API, {
                email, password
            })
            //console.log("LOGIN API Response: ", response)
            if(!response.data.success) {
                throw new Error(response.data.message)
            }
            toast.success("Logged In Successfully")
            dispatch(setToken(response.data.token))
            const userImage = response.data.user.image
                              ? response.data.user.image
                              : `https://api.dicebear.com/7.x/initials/svg?seed=${response.data.user.firstName[0]}`
            dispatch(setUser({...response.data.user, image: userImage}))
            localStorage.setItem("user", JSON.stringify(response.data.user))
            localStorage.setItem("token", JSON.stringify(response.data.user))
            navigate('/dashboard/profile')
        } catch(err) {
            console.error("LOGIN API Error: ", err)
            toast.error(err?.response?.data.message)
        }
        dispatch(setLoading(false))
        toast.dismiss(toastId)
    }
}

export const logout = (navigate) => {
    return async(dispatch) => {
        dispatch(setToken(null))
        dispatch(setUser(null))
        // dispatch(resetCart())
        // localStorage.removeItem("token")
        // localStorage.removeItem("user")
        toast.success("Logged Out Successfully")
        navigate('/')
        localStorage.clear()
    }
}

export const getResetPassToken = (email, setEmailSent) => {
    return async(dispatch) => {
        dispatch(setLoading(true))
        const toastId = toast.loading("Loading...")
        try {
            const response = await apiConnector("POST", endPoints.RESETPASSTOKEN_API, {
                email,
            });
            //console.log("RESET PASSWORD TOKEN API Response: ", response)
            if(!response.data.success) {
                throw new Error(response.data.message)
            }
            toast.success("Reset Email Sent")
            setEmailSent(true)
        } catch(err) {
            //console.log("RESET PASSWORD TOKEN API Error: ", err)
            toast.error(err.response.data.message)
        }
        toast.dismiss(toastId)
        dispatch(setLoading(false))
    }
}

export const resetPassword = (password, confirmPassword, token, navigate) => {
    return async(dispatch) => {
        dispatch(setLoading(true))
        const toastId = toast.loading("Loading...")
        try {
            const response = await apiConnector("POST", endPoints.RESETPASSWORD_API, {
                password, confirmPassword, token,
            })
            //console.log("RESET PASSWORD API Response: ", response)
            if(!response.data.success) {
                throw new Error(response.data.message)
            }
            toast.success("Password Reset Successful")
            navigate('/login')
        } catch(err) {
            //console.log("RESET PASSWORD API Error: ", err)
            toast.error(err.response.data.message)
        }
        dispatch(setLoading(false))
        toast.dismiss(toastId)
    }
}