import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import toast from "react-hot-toast"

import axiosInstance from "../../Helpers/AxiosInstance"

const initialState = {
    key : '',
    subscription_id : '',
    isPaymentVerified : false,
    allPayments : {},
    finalMonths : {},
    monthlySalesRecord : []
}

export const getRazorPayId = createAsyncThunk("razorpay/getid", async()=>{
    try {
        const response = await axiosInstance.get(`/payment/razorpay-key`)
        return response.data
    } catch (error) {
        toast.error("Failed to load data")
    }
})

export const purchaseCourseBundle = createAsyncThunk("purchaseCourse", async()=>{
    try {
        const response = await axiosInstance.post(`/payment/subscribe`)
        return response.data
    } catch (error) {
        console.log(error);
        toast.error(error?.response?.data?.message)
    }
})

export const verifyUserPayment = createAsyncThunk("payment/verify", async(data)=>{
    try {
        const response = await axiosInstance.post(`/payment/verify`,{
            razorpay_payment_id: data.razorpay_payment_id,
            razorpay_subscription_id: data.razorpay_subscription_id,
            razorpay_signature: data.razorpay_signature
        })

        return response.data
    } catch (error) {
        toast.error(error?.response?.data?.message)
    }
})

export const getPaymentRecord = createAsyncThunk("payment/records", async()=>{
    try {
        const response =  axiosInstance.get(`/payment/?count=100`)

        toast.promise(response, {
            loading: 'Getting the payment record',
            success: "Retrive payment successfuly",
            error: 'Failed to get payment records'
        })
        console.log((response));
        return await (response)
    } catch (error) {
        toast.error(error?.response?.data?.message)
    }
})

export const cancelCourseBundle = createAsyncThunk("payment/cancel", async()=>{
    try {
        const response =  axiosInstance.get(`/payment/unsubscribe`)
        const successMessage = (await response).data.message
        toast.promise(Promise.resolve(successMessage), {
            loading: 'Unsubscribing the bundle',
            success: successMessage,
            error: 'Failed to unsubscribe'
        })
        return response.data
    } catch (error) {
        console.log(error);
        toast.error(error?.response?.data?.message);
    }
})

const razorpaySlice = createSlice({
    name: 'razorpay',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(getRazorPayId.fulfilled, (state,action)=>{
            state.key = action?.payload?.key
        })
        .addCase(purchaseCourseBundle.fulfilled,(state,action)=>{
            state.subscription_id = action?.payload?.subscription_id
        })
        .addCase(verifyUserPayment.fulfilled,(state,action)=>{
            toast.success(action?.payload?.message)
            state.isPaymentVerified = action?.payload?.success
        })
        .addCase(verifyUserPayment.rejected,(state,action)=>{
            toast.success(action?.payload?.message)
            state.isPaymentVerified = action?.payload?.success
        })
        .addCase(getPaymentRecord.fulfilled, (state,action)=>{
            console.log(action);
            state.allPayments = action?.payload?.allPayments
            state.finalMonths = action?.payload?.finalMonths
            state.monthlySalesRecord = action?.payload?.data?.subscriptions
        })

    }
})

export default razorpaySlice.reducer