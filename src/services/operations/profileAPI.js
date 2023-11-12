import toast from "react-hot-toast"
import { setLoading } from "../../slices/authSlice"
import { apiConnector } from "../apiConnector"
import { profileApi } from "../apis"
import { endPoints } from '../apis'


export const updateProfilePic = (profilePicture, token) => {
    return async(dispatch) => {
        // dispatch(setLoading(true))
        const toastId = toast.loading("Updating...")
        try {
            const data = new FormData()
            data.append('profilePicture', profilePicture)
            // const token = Cookies.get('token')
            const response = await apiConnector("PUT", profileApi.UPDATE_PROFILE_PIC_API, data, {
                'Authorization': `Bearer ${token}`
            })
            //console.log("UPDATE PROFILE PIC API Response: ", response)
            if(!response.data.success) {
                throw new Error(response.data.message)
            }
            toast.success("Profile Picture Updated Successfully")
            window.location.reload()
            const user = JSON.parse(localStorage.getItem('user'))
            user.image = response?.data?.data?.image
            localStorage.setItem('user', JSON.stringify(user))
        } catch(err) {
            //console.log("UPDATE PROFILE PIC API Error: ", err)
            toast.error(err?.response?.data.message)
        }
        toast.dismiss(toastId)
        // dispatch(setLoading(false))
    }
}

export const getEnrolledCourses = async () => {
    try {
        const response = await apiConnector("GET", profileApi.GET_ENROLLED_COURSES, null, {
            'Authorization': `Bearer ${token}`
        })
        //console.log("GET ENROLLED COURSES API Response: ", response)
        if(!response.data.success) {
            throw new Error(response.data.message)
        }
    } catch(err) {
      //console.log("GET ENROLLED COURSES API Error: ", err)
      toast.error(err.response.data.message)
    }
}

export const updateProfileDetails = (firstName, lastName, dateOfBirth, gender, contactNumber, about, token) => {
    return async (dispatch) => {
        const toastId = toast.loading("Updating...")
        try {
            const response = await apiConnector("PUT", profileApi.UPDATE_PROFILE_DETAILS_API, {
                firstName, lastName, dateOfBirth, gender, contactNumber, about
            }, {
                'Authorization': `Bearer ${token}`
            })
            //console.log("UPDATE PROFILE DETAILS API Response: ", response)
            if(!response.data.success) {
                throw new Error(response.data.message)
            }
            toast.success("Profile Details Updated Successfully")
            window.location.reload()
            const user = JSON.parse(localStorage.getItem('user'))
            user.firstName = firstName || user.firstName
            user.lastName = lastName || user.lastName
            user.additionalDetails.dateOfBirth = dateOfBirth  || user.additionalDetails.dateOfBirth
            user.additionalDetails.contactNumber = contactNumber || user.additionalDetails.contactNumber
            user.additionalDetails.about = about || user.additionalDetails.about
            user.additionalDetails.gender = gender || user.additionalDetails.gender
            localStorage.setItem('user', JSON.stringify(user))
        } catch(err) {
            //console.log("UPDATE PROFILE DETAILS API Error: ", err)
            toast.error(err.response?.data.message)
        }
        toast.dismiss(toastId)
    }
}

export const changePassword = (oldPassword, newPassword, confirmPassword, token) => {
    return async(dispatch) => {
        dispatch(setLoading(true))
        try {
            const response = await apiConnector("POST", endPoints.CHANGE_PASSWORD_API, {
                oldPassword, newPassword, confirmPassword
            }, { 'Authorization': `Bearer ${token}` })
            //console.log("CHANGE PASSWORD API Response: ", response)
            if(!response.data.success) {
                throw new Error(response.data.message)
            }
            toast.success("Password Changed Successfully")
        } catch(err) {
            //console.log("CHANGE PASSWORD API Error: ", err)
            toast.error(err.response.data.message)
        }
        dispatch(setLoading(false))
    }
}

export const getInstructorStats = async (token) => {
    const toastId = toast.loading("Loading...")
    let result = []
    try {
        const response = await apiConnector("GET", profileApi.GET_INSTRUCTOR_DASHBOARD_STATS, null, {
            'Authorization': `Bearer ${token}`,
        })
        //console.log("GET INSTRUCTOR DASHBOARD STATS API Response: ", response)
        if(!response.data.success) {
            throw new Error(response.data.message)
        }
        result = response?.data
    } catch(err) {
        //console.log("GET INSTRUCTOR DASHBOARD STATS API Error: ", err)
        toast.error(err.response.data.message)
    }
    toast.dismiss(toastId)
    return result
}

export const deleteAccount = (token, navigate) => {
    return async(dispatch) => {
        try {
            const response = await apiConnector("DELETE", profileApi.DELETE_ACCOUNT_API, null, {
                'Authorization': `Bearer ${token}`
            })
            //console.log("DELETE ACCOUNT API Response: ", response)
            if(!response.data.success) {
                throw new Error(response.data.message)
            }
            toast.success("Deleted Account Successfully")
            navigate('/')
        } catch(err) {
            //console.log("DELETE ACCOUNT API Error: ", err)
            toast.error(err.response.data.message)
        }
    }
}