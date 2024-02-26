import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import axiosInstance from "../../Helpers/AxiosInstance";
import HomeLayout from "../../Layouts/HomeLayout";
function ChangePassword() {
  const navigate = useNavigate();
  const [userInput, setUserInput] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  function handleInputChange(e) {
    const { name, value } = e.target;
    setUserInput({
      ...userInput,
      [name]: value,
    });
  }

  async function onFormSubmit(e) {
    e.preventDefault();
    if (
      !userInput.oldPassword ||
      !userInput.newPassword ||
      !userInput.confirmPassword
    ) {
      toast.error("All field are required");
      return;
    }
    if (userInput.newPassword !== userInput.confirmPassword) {
      toast.error("Confirm password doesn't match");
      return;
    }
    try {
      const response = axiosInstance.post(`/user/change-password`,
        userInput
      );

      toast.promise(response, {
        loading: "Wait! Password change is in process",
        success: (data) => {
          return data?.data?.message;
        },
        error: "Password change failed, Please try again later",
      });
      const finalResponse = await response;
      console.log(finalResponse);
      if (finalResponse?.data?.success) {
        navigate(-1);
      }
    } catch (e) {
      toast.error(e?.response?.data?.message);
    }
  }
  return (
    <HomeLayout>
      <div className="min-h-[90vh] flex justify-center items-center">
        <form
          onSubmit={onFormSubmit}
          className="flex flex-col w-96 text-white rounded-lg shadow-[0_0_10px_black]"
        >
          <h1 className="text-2xl text-center text-yellow-500 font-semibold mb-5 mt-5">
            Change Password
          </h1>
          <div className="flex flex-col gap-2">
            <label htmlFor="oldPassword" className="font-semibold text-lg">
              Old password
            </label>
            <input
              type="password"
              placeholder="Enter your old password"
              name="oldPassword"
              id="oldPassword"
              className="bg-transparent border px-2 py-1"
              value={userInput.oldPassword}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="newPassword" className="font-semibold text-lg">
              New password
            </label>
            <input
              type="password"
              placeholder="Enter your new password"
              name="newPassword"
              id="newPassword"
              className="bg-transparent border px-2 py-1"
              value={userInput.newPassword}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="confirmPassword" className="font-semibold text-lg">
              Confirm password
            </label>
            <input
              type="password"
              placeholder="Enter your new confirmPassword"
              name="confirmPassword"
              id="confirmPassword"
              className="bg-transparent border px-2 py-1"
              value={userInput.confirmPassword}
              onChange={handleInputChange}
            />
          </div>

          <button
            type="submit"
            className="text-lg font-semibold text-center bg-yellow-500 hover:bg-yellow-600 transition-all ease-in-out duration-300 w-full rounded-sm mt-4 py-2"
          >
            Change Password
          </button>
        </form>
      </div>
    </HomeLayout>
  );
}

export default ChangePassword;
