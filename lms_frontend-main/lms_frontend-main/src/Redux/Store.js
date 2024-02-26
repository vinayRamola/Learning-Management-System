import { configureStore } from "@reduxjs/toolkit";

import AuthSlice from "./Slices/AuthSlice";
import CourseSlice from "./Slices/CourseSlice";
import LectureSlice from "./Slices/LectureSlice";
import RazorpaySlice from "./Slices/RazorpaySlice";
import StatSlice from "./Slices/StatSlice";

const store = configureStore({
    reducer: {
        auth: AuthSlice,
        course: CourseSlice,
        razorpay: RazorpaySlice,
        lecture: LectureSlice,
        stat: StatSlice,
    },
    deveTools: true
})

export default store