
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom";

import HomeLayout from "../../Layouts/HomeLayout"
import { deleteUser, getUserData } from "../../Redux/Slices/AuthSlice";
import { cancelCourseBundle } from "../../Redux/Slices/RazorpaySlice";

function Profile() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
    const userData = useSelector((state)=> state?.auth?.data)
    
    async function handleCancellation(){
    await dispatch(cancelCourseBundle())
    await dispatch(getUserData())
    navigate('/')
    }
    async function handleDelete(){
      if(window.confirm("Are you sure you want delete your account")){
    const res = await dispatch(deleteUser())
    if(res?.data?.success){
      navigate('/')
    }}
    }
  return (
    <HomeLayout>
      <div className="min-h-[90vh] flex justify-center items-center">
        <div className="flex flex-col gap-4 p-4 roundede-lg w-96 my-10 text-white shadow-[0_0_10px_black]">
          <img src={userData?.avatar?.secure_url} alt="profile image" className="w-40 m-auto rounded-full border border-black" />

          <h1 className="text-xl font-semibold capitalize text-center">{userData?.fullName}</h1>

          <div className="grid grid-cols-2">
            <p>Email: </p> <span>{userData?.email}</span>
            <p>Subscription: </p> <span>{userData?.subscription?.status === 'active' ? "Active": "Inactive"}</span>
          </div>

          <div className="flex items-center justify-between gap-2">
            <Link to={'/change-password'} className="bg-yellow-600 w-1/2 rounded-sm hover:bg-yellow-500 transition-all ease-in-out duration-300 font-semibold py-2 cursor-pointer px-1 text-center">Change Password</Link>

            <Link to={'/user/editprofile'} className="bg-yellow-600 w-1/2 rounded-sm hover:bg-yellow-500 transition-all ease-in-out duration-300 font-semibold py-2 cursor-pointer px-1 text-center">Edit Profile</Link>

          </div>
            <button onClick={handleDelete} className="rounded-sm w-full bg-red-500 hover:bg-red-600 transition-all ease-in-out duration-300 font-semibold py-2 text-center">Delete Account</button>

          {userData?.subscription?.status === 'active' && (
            <button onClick={handleCancellation} className="w-full bg-red-600 hover:bg-red-500 transition-all ease-in-out duration-300 font-semibold py-2 cursor-pointer px-1 text-center rounded-sm">
              Cancel Subscription
            </button>
          )}
        </div>
      </div>
    </HomeLayout>
  )
}

export default Profile