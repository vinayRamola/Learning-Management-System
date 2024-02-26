import { useState } from "react";
import toast from "react-hot-toast";
import { BsPersonCircle } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { isEmail, isValidPassword } from "../Helpers/regexMatcher";
import HomeLayout from "../Layouts/HomeLayout";
import { createAccount } from "../Redux/Slices/AuthSlice";

function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [imagePreview, setImagePreview] = useState("");
  const [signupData, setSignupData] = useState({
    fullName: "",
    email: "",
    password: "",
    avatar: "",
  });

  function handleUserInput(e) {
    const { name, value } = e.target;
    setSignupData({
      ...signupData,
      [name]: value,
    });
  }

  function getImage(event) {
    event.preventDefault();
    const uploadedImage = event.target.files[0];
    if (uploadedImage) {
      setSignupData({
        ...signupData,
        avatar: uploadedImage,
      });

      const fileReader = new FileReader();
      fileReader.readAsDataURL(uploadedImage);
      fileReader.addEventListener("load", function () {
        setImagePreview(this.result);
      });
    }
  }

  async function createNewAccount(event) {
    event.preventDefault();
    if (
      !signupData.email ||
      !signupData.fullName ||
      !signupData.password ||
      !signupData.avatar
    ) {
      toast.error("Please fill the details");
      return;
    }
    if (signupData.fullName.length < 5) {
      toast.error("Name should be atlest 5 character");
      return;
    }
    if (!isEmail(signupData.email))
    {
        toast.error("Invalid email id");
        return;
    }
if(!isValidPassword(signupData.password)){
    toast.error("Password must be at least one letter (uppercase or lowercase),one digit (0-9), one special character among @$!%*?& and minimum length of 8 characters");
        return;
}
    
      const formData = new FormData();
      formData.append("fullName", signupData.fullName);
      formData.append("email", signupData.email);
      formData.append("password", signupData.password);
      formData.append("avatar", signupData.avatar);
          const response = await dispatch(createAccount(formData));
          if (response.payload.success) {
            navigate("/login");
          }
        
          setSignupData({
            fullName: "",
            email: "",
            password: "",
            avatar: "",
          });
          setImagePreview("");
  }


  return (
    <HomeLayout>
      <div className="flex justify-center items-center h-[100vh]">
        <form
          noValidate
          onSubmit={createNewAccount}
          className="text-white flex flex-col justify-center rounded-lg w-96 gap-4 shadow-[0_0_10px_black]"
        >
          <h1 className="font-bold text-center text-2xl ">Registration Page</h1>

          <label htmlFor="image_uploads">
            {imagePreview ? (
              <img
                className="h-24 w-24 rounded-full m-auto"
                src={imagePreview}
              />
            ) : (
              <BsPersonCircle className="h-24 w-24 rounded-full m-auto" />
            )}
          </label>

          <input
            onChange={getImage}
            className="hidden"
            name="image_uploads"
            id="image_uploads"
            type="file"
            accept=".jpg,.jpeg,.png,.svg"
          />

          <div className="flex flex-col gap-1">
            <label htmlFor="fullName" className="font-semibold">
              Name
            </label>
            <input
              onChange={handleUserInput}
              value={signupData.fullName}
              type="text"
              name="fullName"
              id="fullName"
              placeholder="Enter your name..."
              className="bg-transparent px-2 py-1 border"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="font-semibold">
              Email
            </label>
            <input
              onChange={handleUserInput}
              value={signupData.email}
              type="email"
              name="email"
              id="email"
              placeholder="Enter your email..."
              className="bg-transparent px-2 py-1 border"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="password" className="font-semibold">
              Password
            </label>
            <input
              onChange={handleUserInput}
              value={signupData.password}
              type="password"
              name="password"
              id="password"
              placeholder="Enter your password..."
              className="bg-transparent px-2 py-1 border"
            />
          </div>

          <button
            type="submit"
            className="bg-yellow-600 hover:bg-yellow-500 w-full rounded-sm transition-all ease-in-out duration-300 font-semibold text-xl py-2 mt-2"
          >
            Create Account
          </button>

          <p className="text-center">
            Already have an account ?{" "}
            <Link className="link text-accent cursor-pointer" to={"/login"}>
              Login
            </Link>
          </p>
        </form>
      </div>
    </HomeLayout>
  );
}

export default Signup;
