import { useState } from "react"
import toast from "react-hot-toast"

import axiosInstance from "../Helpers/AxiosInstance"
import { isEmail } from "../Helpers/regexMatcher"
import HomeLayout from "../Layouts/HomeLayout"

function Contact() {
  const [userInput,setUserInput] = useState({
    name: '',
    email: '',
    message: ''
  })

  function handleUserInput(e){
    const {name,value} = e.target 
    setUserInput({
      ...userInput,
      [name]: value
    })
  }

  async function onFormSubmit(e){
    e.preventDefault()
    if(!userInput.email || !userInput.name || !userInput.message){
      toast.error("All field are manadatory")
      return
    }

    if(userInput.name.length < 5){
      toast.error("Name must be atleast 5 character")
      return
    }
    if(!isEmail(userInput.email)){
      toast.error("Invalid email id")
      return
    }
    try {
      const response = axiosInstance.post(`/user/contactus`, userInput);
      console.log(response);
      toast.promise(response, {
          loading: "Submitting your message...",
          success: "Form submitted successfully",
          error: "Failed to submit the form"
      });
      const contactResponse = await (response)
      if(contactResponse?.data?.success) {
          setUserInput({
              name: "",
              email: "",
              message: "",
          });
      }
  } catch (err) {
      toast.error("operation failed....")
  }
  }
  return (
    <HomeLayout>
      <div className="flex items-center justify-center h-[100vh]">
      <form noValidate onSubmit={onFormSubmit} className="flex flex-col items-center justify-center gap-2 p-5 text-white shadow-[0_0_10px_black] rounded-md w-[22rem]">

        <h1 className="text-3xl font-semibold">
          Contact Form
        </h1>

        <div className="flex flex-col w-full gap-1">
            <label htmlFor="name" className="text-xl font-semibold">Name</label>
            <input 
            type="text" 
            className="bg-transparent border px-2 py-1 rounded-sm"
            id="name"
            name="name"
            placeholder="Enter your name"
            onChange={handleUserInput}
            value={userInput.name}
             />
        </div>

        <div className="flex flex-col w-full gap-1">
            <label htmlFor="email" className="text-xl font-semibold">Email</label>
            <input 
            type="email" 
            className="bg-transparent border px-2 py-1 rounded-sm"
            id="email"
            name="email"
            placeholder="Enter your email"
            onChange={handleUserInput}
            value={userInput.email}
             />
        </div>

        <div className="flex flex-col w-full gap-1">
            <label htmlFor="message" className="text-xl font-semibold">Message</label>
            <textarea 
            className="bg-transparent border px-2 py-1 rounded-sm resize-none h-40"
            id="message"
            name="message"
            placeholder="Enter your message"
            onChange={handleUserInput}
            value={userInput.message}
             />
        </div>

        <button type="submit" className="w-full bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 py-2 font-semibold text-lg cursor-pointer">
          Submit
        </button>

      </form>
      </div>
    </HomeLayout>
  )
}

export default Contact