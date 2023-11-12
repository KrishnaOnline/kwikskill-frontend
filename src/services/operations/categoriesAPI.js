import toast from "react-hot-toast"
import { setLoading } from "../../slices/authSlice"
import { apiConnector } from "../apiConnector"
import { categories } from "../apis"


export const getAllCategories = async () => {
    let result = []
    try {
        const response = await apiConnector("GET", categories.GET_ALL_CATEGORIES_API_URL)
        //console.log("GET ALL CATEGORIES API Response: ", response)
        if(!response.data.success) {
            throw new Error(response.data.message)
        }
        result = response?.data?.data
    } catch(err) {
        //console.log("GET ALL CATEGORIES API Error: ", err)
        toast.error(err?.response?.data?.message)
    }
    return result
}