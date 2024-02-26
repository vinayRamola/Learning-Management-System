import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

import CourseCard from "../../components/CourseCard"
import HomeLayout from "../../Layouts/HomeLayout"
import { getAllCourses } from "../../Redux/Slices/CourseSlice"

function CourseList() {
    const dispatch = useDispatch()

    const {courseData} = useSelector((state)=> state.course)

    async function loadCourse(){
       await dispatch(getAllCourses())
    }

    useEffect(()=>{
        loadCourse()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
  return (
    <HomeLayout>
    <div className="min-h-[90vh] pt-12 pl-20 text-white gap-10 flex flex-col ">
        <h1 className="text-center text-3xl font-semibold">Explore the courses made by <span className="font-bold text-yellow-500">Industry Expertes</span></h1>

        <div className="mb-0 flex flex-wrap gap-14">
            {courseData?.map((element)=>{
                return <CourseCard key={element._id} data={element} />
            })}
        </div>

    </div>
    </HomeLayout>
  )
}

export default CourseList