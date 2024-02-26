import { RxCrossCircled } from "react-icons/rx"
import { Link } from "react-router-dom"

import HomeLayout from "../../Layouts/HomeLayout"

function CheckoutFailure() {
  return (
    <HomeLayout>
        <div className="min-h-[90vh] flex items-center justify-center text-white">
            <div className="w-80 h-[26rem] flex flex-col items-center justify-center shadow-[0_0_10px_black] rounded-lg relative">
            <h1 className="bg-red-500 text-center absolute top-0 w-full py-4 text-2xl font-bold rounded-tr-lg rounded-tl-lg">
                Payment failed
            </h1>

            <div className="px-4 flex flex-col justify-center items-center space-y-2">
                <div className="text-center space-y-2">
                <h2 className="text-lg font-bold">Oops ! Your payment failed</h2>
                <p className="text-left">Please try again later</p>
                </div>
                <RxCrossCircled className="text-red-500 text-5xl"/>
            </div>
            <Link to={'/checkout'} className="bg-red-500 w-full py-2 text-lg font-bold hover:bg-red-600 transition-all ease-in-out duration-300 text-center rounded-bl-lg rounded-br-lg absolute bottom-0">
            <button>Try again</button>
            </Link>
            </div>
        </div>
    </HomeLayout>
  )
}

export default CheckoutFailure