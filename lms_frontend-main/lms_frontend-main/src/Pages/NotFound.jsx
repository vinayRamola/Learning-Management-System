import { useNavigate } from "react-router-dom"

function NotFound() {
    const navigate = useNavigate()
  return (
    <div className="h-screen w-full flex flex-col justify-center items-center bg-[#1A2238]">
        <h1 className="text-9xl font-extrabold text-white tracking-widest">
            404
        </h1>
        <div className="bg-black text-white text-sm px-2 rotate-12 absolute">
            Page Not Found...
        </div>
        <button className="mt-5">
            <a className="relative inline-block text-sm font-medium  text-[#FF6A3D] group active:text-yellow-500 focus:outline-none focus:ring">
                <span onClick={()=>navigate(-1)}  className="py-3 px-8 bg-[#1A2238] border border-current">Go Back</span>
            </a>
        </button>
    </div>
  )
}

export default NotFound