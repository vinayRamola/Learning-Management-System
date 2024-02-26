import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import toast from "react-hot-toast"

import axiosInstance from "../../Helpers/AxiosInstance"

const initialState = {
    courseData: []
}

export const getAllCourses = createAsyncThunk('/courses/get', async()=>{
    try {
        const response = await axiosInstance.get(`/courses/`)
        const successMessage = response?.data?.message
        toast.promise(
            Promise.resolve(successMessage),
            {
                loading: "Loading course data...",
                success: "Courses loaded successfully",
                error: "Failed to get the courses"
            }
        )
        return await response.data.course
    } catch (error) {
        toast.error(error?.response?.data?.message)
    }
})
export const deleteCourse = createAsyncThunk('/course/delete', async(id)=>{
    try {
        const response = axiosInstance.delete(`/courses/${id}`)
        toast.promise(response,
            {
                loading: "Deleting course ",
                success: "Courses deleted successfully",
                error: "Failed to delete courses"
            }
        )
        return (await response).data
    } catch (error) {
        toast.error(error?.response?.data?.message)
    }
})
export const createNewCourse = createAsyncThunk('/courses/create', async(data)=>{
    try {
        const response = await axiosInstance.post(`/courses/`, data)
        const successMessage = await data?.data?.message
        toast.promise(
            Promise.resolve(successMessage),
            {
                loading: "Loading course data...",
                success: "Courses loaded successfully",
                error: "Failed to get the courses"
            }
        )
        return response.data
    } catch (error) {
        toast.error(error?.response?.data?.message)
        throw error
    }
})

const courseSlice = createSlice({
    name: 'courses',
    initialState,
    reducers: {},
    extraReducers: (builder)=>{
        builder.addCase(getAllCourses.fulfilled, (state, action)=>{
            if(action.payload){
                    state.courseData = [...action.payload]
                }
            })
    }
})

export default courseSlice.reducer