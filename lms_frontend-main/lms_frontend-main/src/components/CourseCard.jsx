import { useNavigate } from "react-router-dom"

function CourseCard({data}) {
    const navigate = useNavigate()
  return (
    <div onClick={()=> navigate('/courses/description', {state: {... data}})} className="text-white w-[23rem] h-[430px] shadow-lg rounded-lg cursor-pointer group overflow-hidden bg-zinc-700">
        <div className="overflow-hidden">
        <img className="h-48 w-full rounded-tl-lg rounded-tr-lg group-hover:scale=[1,2] transition-all ease-in-out duration-300" 
        src={data?.thumbnail?.secure_url}
        alt="Course thumbnail"/>
        </div>
        <div className="p-3 text-white space-y-1">
         <h2 className="text-xl font-bold text-yellow-500 line-clamp-2">
            {data?.title}
            </h2>
         <p className="line-clamp-2">
            {data?.description}
         </p>
         <p className="font-semibold">
            <span className="text-yellow-500 font-bold">Category:</span>
            {data?.category}
         </p>
         <p className="font-semibold">
            <span className="text-yellow-500 font-bold">Total lectures:</span>
            {data?.numberoflectures}
         </p>
         <p className="font-semibold">
            <span className="text-yellow-500 font-bold">Instructor:</span>
            {data?.creeatedBy}
         </p>
        </div>

    </div>
  )
}

export default CourseCard