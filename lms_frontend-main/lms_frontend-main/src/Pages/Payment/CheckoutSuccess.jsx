import { useEffect } from "react"
import { AiFillCheckCircle } from "react-icons/ai"
import { useDispatch } from "react-redux"
import { Link } from "react-router-dom"

import HomeLayout from "../../Layouts/HomeLayout"
import { getUserData } from "../../Redux/Slices/AuthSlice"

function CheckoutSuccess() {
  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(getUserData())
  })
  return (
    <HomeLayout>
        <div className="min-h-[90vh] flex items-center justify-center text-white">
            <div className="w-80 h-[26rem] flex flex-col items-center justify-center shadow-[0_0_10px_black] rounded-lg relative">
            <h1 className="bg-green-500 text-center absolute top-0 w-full py-4 text-2xl font-bold rounded-tr-lg rounded-tl-lg">
                Payment successfull
            </h1>

            <div className="px-4 flex flex-col justify-center items-center space-y-2">
                <div className="text-center space-y-2">
                <h2 className="text-lg font-bold">Welcome to the pro bundle</h2>
                <p className="text-left">Now you can enjoy the courses.</p>
                </div>
                <AiFillCheckCircle className="text-green-500 text-5xl"/>
            </div>
            <Link to={'/'} className="bg-green-500 w-full py-2 text-lg font-bold hover:bg-green-600 transition-all ease-in-out duration-300 text-center rounded-bl-lg rounded-br-lg absolute bottom-0">
            <button>Go to dashboard</button>
            </Link>
            </div>
        </div>
    </HomeLayout>
  )
}

export default CheckoutSuccess