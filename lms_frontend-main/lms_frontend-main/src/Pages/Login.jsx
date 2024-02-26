import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import HomeLayout from "../Layouts/HomeLayout";
import { login } from "../Redux/Slices/AuthSlice";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  function handleUserInput(e) {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  }

  async function onLogin(event) {
    event.preventDefault();
    if (!loginData.email || !loginData.password) {
      toast.error("Please fill the details");
      return;
    }
    const response = await dispatch(login(loginData));
    if (response?.payload?.success) {
      navigate("/");
    }

    setLoginData({
      email: "",
      password: "",
    });
  }

  return (
    <HomeLayout>
      <div className="flex justify-center items-center h-[100vh]">
        <form
          noValidate
          onSubmit={onLogin}
          className="text-white flex flex-col justify-center rounded-lg w-96 gap-4 shadow-[0_0_10px_black]"
        >
          <h1 className="font-bold text-center text-2xl ">Login Page</h1>

          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="font-semibold">
              Email
            </label>
            <input
              onChange={handleUserInput}
              value={loginData.email}
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
              value={loginData.password}
              type="password"
              name="password"
              id="password"
              placeholder="Enter your password..."
              className="bg-transparent px-2 py-1 border"
            />
          </div>
          <p className="text-right">
            {" "}
            <Link className="link text-accent cursor-pointer font-semibold" to={"/forgot/password"}>
              Forgot Password?
            </Link>
          </p>
          <button
            type="submit"
            className="bg-yellow-600 hover:bg-yellow-500 w-full rounded-sm transition-all ease-in-out duration-300 font-semibold text-xl py-2 mt-2"
          >
            Login
          </button>

          <p className="text-center font-semibold">
            Do not have an account ?
            <Link className="link text-accent cursor-pointer" to={"/signup"}>
              Signup
            </Link>
          </p>
        </form>
      </div>
    </HomeLayout>
  );
}

export default Login;
