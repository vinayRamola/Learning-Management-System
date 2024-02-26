
import { useState } from "react"
import toast from "react-hot-toast";
import {BiArrowBack} from 'react-icons/bi'
import { Link } from "react-router-dom";

import axiosInstance from "../Helpers/AxiosInstance";
import HomeLayout from "../Layouts/HomeLayout"

function ForgotPassword() {
    const [userInput,setUserInput] = useState({
        email: ''
    })
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserInput({
          ...userInput,
          [name]: value,
        })
      };

     async function onFormSubmit(e) {
        e.preventDefault();
        if(!userInput.email){
            toast.error("Email is required")
            return
        }
        try {
          const response = axiosInstance.post(`/user/reset`, userInput)
          toast.promise(response,{
            loading: 'Wait! authenticaion in proccess',
            success: (data)=>{
             return data?.data?.message
            },
            error: "Failed to send email"
          })
          const res = await response
          if(res?.data?.success){
            setUserInput({
              email: ""
            })
          }
      } catch (e) {
         toast.error(e?.response?.data?.message) 
      }
      }
  return (
    <HomeLayout>
      <div className="flex justify-center items-center h-[100vh]">
        <form
         onSubmit={onFormSubmit} className="text-white flex flex-col justify-center rounded-lg w-96 gap-4 shadow-[0_0_10px_black]"
        >
          <div className="flex justify-center items-center relative">
          <h1 className="font-bold text-center text-2xl ">Forgot Password</h1>

          <Link to={'/login'} className="text-green-600 text-xl absolute left-1"><BiArrowBack></BiArrowBack></Link>
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="font-semibold">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              onChange={handleInputChange}
              value={userInput.email}
              placeholder="Enter your registered email..."
              className="bg-transparent px-2 py-1 border"
            />
          </div>
          <button
            type="submit"
            className="bg-yellow-600 hover:bg-yellow-500 w-full rounded-sm transition-all ease-in-out duration-300 font-semibold text-xl py-2 mt-2"
          >
          Send Reset Link
          </button>

        </form>
      </div>
    </HomeLayout>
  )
}

export default ForgotPassword