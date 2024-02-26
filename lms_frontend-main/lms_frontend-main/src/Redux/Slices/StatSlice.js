import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import toast from "react-hot-toast"

import axiosInstance from "../../Helpers/AxiosInstance"

const initialState = {
    allUserCount: 0,
    subscribedCount: 0
}

export const getStatsData = createAsyncThunk('stats/get', async()=>{
    try {
        const response = axiosInstance.get(`/admin/stats/user`)
        toast.promise(response,{
            loading: "Loading stats data",
            success: (data)=>{
                return data?.data?.message
            },
            error: "Failed to load stats data"
        })
        return (await response).data
    } catch (error) {
       toast.error(error?.reponse?.data?.message) 
    }
})

const statSlice = createSlice({
    name: 'stat',
    initialState,
    reducers: {},
    extraReducers: (builder)=>{
        builder.addCase(getStatsData.fulfilled, (state,action)=>{
            state.allUserCount = action?.payload?.allUserCount
            state.subscribedCount = action?.payload?.subscribedUserCount
        })
    }
})

export default statSlice.reducer