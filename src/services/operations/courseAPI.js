import toast from "react-hot-toast"
import { apiConnector } from "../apiConnector"
import { courseApi } from "../apis"


export const addCourse = async (formData, token) => {
    let result = null
    const toastId = toast.loading("Loading...")
    try {
        const response = await apiConnector("POST", courseApi.CREATE_COURSE_API, formData, {
            //"Content-Type": "multipart/form-data",
            'Authorization': `Bearer ${token}`
        })
        //console.log("ADD COURSE API Response: ", response)
        if(!response.data.success) {
            throw new Error(response.data.message)
        }
        toast.success("Course Created Successfully")
        result = response?.data?.data
    } catch(err) {
        //console.log("ADD COURSE API Error: ", err)
        toast.error(err.response.data.message)
    }
    toast.dismiss(toastId)
    return result
}

export const updateCourse = async (formData, token) => {
    let result = null
    const toastId = toast.loading("Loading...")
    try {
        const response = await apiConnector("POST", courseApi.UPDATE_COURSE_API, formData, {
            //"Content-Type": "multipart/form-data",
            'Authorization': `Bearer ${token}`
        })
        //console.log("UPDATE COURSE API Response: ", response)
        if(!response.data.success) {
            throw new Error(response.data.message)
        }
        toast.success("Course Updated Successfully")
        result = response?.data?.data
    } catch(err) {
        //console.log("UPDATE COURSE API Error: ", err)
        toast.error(err.response.data.message)
    }
    toast.dismiss(toastId)
    return result
}

export const deleteCourse = async (data, token) => {
    const toastId = toast.loading("Loading...")
    try {
        const response = await apiConnector("DELETE", courseApi.DELETE_COURSE_API, data, {
            'Authorization': `Bearer ${token}`,
        })
        //console.log("DELETE COURSE API Response: ", response)
        if(!response.data.success) {
            throw new Error(response.data.message)
        }
        toast.success("Course Deleted Successfully")
    } catch(err) {
        //console.log("DELETE COURSE API Error: ", err)
        toast.error(err.response.data.message)
    }
    toast.dismiss(toastId)
}

export const createSection = async (formData, token) => {
    let result = null
    const toastId = toast.loading("Loading...")
    try{
        const response = await apiConnector("POST", courseApi.CREATE_SECTION_API, formData, {
            'Authorization': `Bearer ${token}`
        })
        //console.log("CREATE SECTION API Response: ", response)
        if(!response.data.success) {
            throw new Error(response.data.message)
        }
        // toast.success("Section Created")
        result = response.data.data
    } catch(err) {
        //console.log("CREATE SECTION API Error: ", err)
        toast.error(err.response.data.message)
    }
    toast.dismiss(toastId)
    return result
}

export const editCourse = async (formData, token) => {
    let result = null
    const toastId = toast.loading("Loading...")
    try {
        const response = await apiConnector("POST", courseApi.UPDATE_COURSE_API, formData, {
            'Authorization': `Bearer ${token}`
        })
        //console.log("UPDATE COURSE API Response: ", response)
        if(!response.data.success) {
            throw new Error(response.data.message)
        }
        toast.success("Course Updated Successfully")
        result = response?.data?.data
    } catch(err) {
        //console.log("UPDATE COURSE API Error: ", err)
        toast.error(err.response.data.message)
    }
    toast.dismiss(toastId)
    return result
}

export const editSection = async (formData, token) => {
    let result = null
    const toastId = toast.loading("Loading...")
    try {
        const response = await apiConnector("POST", courseApi.UPDATE_SECTION_API, formData, {
            'Authorization': `Bearer ${token}`
        })
        //console.log("EDIT SECTION API Response: ", response)
        if(!response.data.success) {
            throw new Error(response.data.message)
        }
        result = response.data.data
    } catch(err) {
        //console.log("EDIT SECTION API Error: ", err)
        toast.error(err.response.data.message)
    }
    toast.dismiss(toastId)
    return result
}

export const deleteSection = async (data, token) => {
    let result = null
    const toastId = toast.loading("Loading...")
    try {
        const response = await apiConnector("POST", courseApi.DELETE_SECTION_API, data, {
            'Authorization': `Bearer ${token}`
        })
        //console.log("DELETE SECTION API Response: ", response)
        if(!response.data.success) {
            throw new Error(response.data.message)
        }
        toast.success("Deleted Section")
        result = response.data.data
    } catch(err) {
        //console.log("DELETE SECTION API Error: ", err)
        toast.error(err.response.data.message)
    }
    toast.dismiss(toastId)
    return result
}

export const createSubSection = async (data, token) => {
    let result = null
    const toastId = toast.loading("Loading...")
    try {
        const response = await apiConnector("POST", courseApi.CREATE_SUBSECTION_API, data, {
            'Authorization': `Bearer ${token}`
        })
        //console.log("CREATE SUBSECTION API Response: ", response)
        if(!response.data.success) {
            throw new Error(response.data.message)
        }
        toast.success("Lecture Added")
        result = response?.data?.data
        //console.log("RESULT OF CREATE SUBSECTION: ", result)
    } catch(err) {
        //console.log(err)
        toast.error(err.response.data.message)
    }
    toast.dismiss(toastId)
    return result
}

export const updateSubSection = async (data, token) => {
    let result = null
    const toastId = toast.loading("Loading...")
    try {
        const response = await apiConnector("POST", courseApi.UPDATE_SUBSECTION_API, data, {
            'Authorization': `Bearer ${token}`
        })
        //console.log("UPDATE SUBSECTION API Response: ", response)
        if(!response.data.success) {
            throw new Error(response.data.message)
        }
        toast.success("Sub Section Updated")
        result = response?.data?.data
    } catch(err) {
        //console.log(err)
        toast.error(err.response.data.message)
    }
    toast.dismiss(toastId)
    return result
}

export const deleteSubSection = async (data, token) => {
    let result = null
    const toastId = toast.loading("Loading...")
    try {
        const response = await apiConnector("POST", courseApi.DELETE_SUBSECTION_API, data, {
            'Authorization': `Bearer ${token}`
        })
        //console.log("DELETE SUBSECTION API Response: ", response)
        if(!response.data.success) {
            throw new Error(response.data.message)
        }
        toast.success("Sub Section Deleted")
        result = response.data.data
    } catch(err) {
        //console.log(err)
        toast.error(err.response.data.message)
    }
    toast.dismiss(toastId)
    return result
}

export const getAllCourses = async () => {
    const toastId = toast.loading("Loading...")
    let result = []
    try {
        const response = await apiConnector("GET", courseApi.GET_ALL_COURSES_API)
        //console.log("GET ALL COURSES API Response: ", response)
        if(!response.data.success) {
            throw new Error(response.data.message)
        }
        result = response.data.data
    } catch(err) {
        //console.log("GET ALL COURSES API Error: ", err)
        toast.error(err.message)
    }
    toast.dismiss(toastId)
    return result
}

export const getCourseDetails = async (courseId) => {
    let result = null
    // const toastId = toast.loading("Loading...")
    try {
        const response = await apiConnector("POST", courseApi.GET_COURSE_DETAILS_API, {courseId})
        //console.log("GET COURSE DETAILS API Response: ", response)
        if(!response.data.success) {
            throw new Error(response.data.message)
        }
        result = response.data
    } catch(err) {
        //console.log("GET COURSE DETAILS API Error: ", err)
        result = err.response.data
        toast.error(err.response.data.message)
    }
    return result
    // toast.dismiss(toastId)
}

export const getFullCourseDetails = async (courseId, token) => {
    const toastId = toast.loading("Loading...")
    let result = null
    try {
        const response = await apiConnector("POST", courseApi.GET_FULL_COURSES_DETAILS_API, { courseId }, {
            'Authorization': `Bearer ${token}`,
        })
        //console.log("GET FULL COURSE DETAILS API Response: ", response)
        if(!response.data.success) {
            throw new Error(response.data.message)
        }
        result = response.data.data
        //console.log("RESULT bvdbskjbvj: ", result)
    } catch(err) {
        //console.log("GET FULL COURSE DETAILS API Error: ", err)
        toast.error(err.response.data.message)
    }
    toast.dismiss(toastId)
    return result
}

export const getInstructorCourses = async (token) => {
    let result = []
    const toastId = toast.loading("Loading...")
    try {
        const response = await apiConnector("GET", courseApi.GET_INSTRUCTOR_COURSES_API, null, {
            'Authorization': `Bearer ${token}`,
        })
        //console.log("GET INSTRUCTOR COURSES API Response: ", response)
        if(!response.data.success) {
            throw new Error(response.data.message)
        }
        result = response.data.data
    } catch(err) {
        //console.log("GET INSTRUCTOR COURSES API Error: ", err)
        toast.error(err.response.data.message)
    }
    toast.dismiss(toastId)
    return result
}

export const getCategoryPageDetails = async (categoryId) => {
    const toastId = toast.loading("Loading...")
    let result = []
    try {
        const response = await apiConnector("POST", courseApi.GET_CATEGORY_PAGE_DETAILS_API, {categoryId: categoryId})
        //console.log("GET CATEGORY PAGE DETAILS API Response: ", response)
        if(!response.data.success) {
            throw new Error(response.data.message)
        }
        result = response?.data
    } catch(err) {
        //console.log("GET CATEGORY PAGE DETAILS API Error: ", err)
        toast.error(err.response.data.message)
        result = err.response.data
    }
    toast.dismiss(toastId)
    return result
}

export const markAsComplete = async (data, token) => {
    let result = false
    const toastId = toast.loading("Loading...")
    //console.log("Req DATA: ", data)
    try {
        const response = await apiConnector("POST", courseApi.MARK_LECTURE_AS_COMPLETE_API, data, {
            'Authorization': `Bearer ${token}`,
        })
        //console.log("MARK AS COMPLETE API Response: ", response)
        if(!response.data.success) {
            throw new Error(response.data.message)
        }
        toast.success("Marked As Completed")
        result = true
    } catch(err) {
        //console.log("MARK AS COMPLETE API Error: ", err)
        toast.error(err.response.data.message)
        result = false
    }
    toast.dismiss(toastId)
    return result
}

export const getCourseProgress = async (data, token) => {
    let result
    try {
        const response = await apiConnector("POST", courseApi.GET_COURSE_PROGRESS_API, data, {
            'Authorization': `Bearer ${token}`,
        })
        //console.log("GET COURSE PROGRESS API Response: ", response)
        if(!response.data.success) {
            throw new Error(response.data.message)
        }
        result = response.data
    } catch(err) {
        //console.log("GET COURSE PROGRESS API Error: ",err)
    }
    return result
}

export const createRatingReview = async (data, token) => {
    const toastId = toast.loading("Loading...")
    let result = false
    try {
        const response = await apiConnector("POST", courseApi.CREATE_RATING_REVIEW_API, data, {
            'Authorization': `Bearer ${token}`,
        })
        //console.log("CREATE RATING API Response: ", response)
        if(!response.data.success) {
            throw new Error(response.data.message)
        }
        toast.success("Rating Posted")
        result = true
    } catch(err) {
        result = false
        //console.log("CREATE RATING API Error: ", err)
        toast.error(err.message)
    }
    toast.dismiss(toastId)
    return result
}