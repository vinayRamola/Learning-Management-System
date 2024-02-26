
import { Route, Routes } from "react-router-dom";

import RequireAuth from "./Auth/RequireAuth";
import AboutPage from "./Pages/AboutPage";
import ChangeForgotPassword from "./Pages/ChangeForgotPassword";
import Contact from "./Pages/Contact";
import CourseDescription from "./Pages/Course/CourseDescription";
import CourseList from "./Pages/Course/CourseList";
import CreateCourse from "./Pages/Course/CreateCourse";
import AddLecture from "./Pages/Dashboard/AddLecture";
import AdminDashboard from "./Pages/Dashboard/AdminDashboard";
import DisplayLecture from "./Pages/Dashboard/DisplayLecture";
import Denied from "./Pages/Denied";
import ForgotPassword from "./Pages/ForgotPassword";
import HomePage from "./Pages/HomePage";
import Login from "./Pages/Login";
import NotFound from "./Pages/NotFound";
import Checkout from "./Pages/Payment/Checkout";
import CheckoutFailure from "./Pages/Payment/CheckoutFailure";
import CheckoutSuccess from "./Pages/Payment/CheckoutSuccess";
import Signup from "./Pages/Signup";
import ChangePassword from "./Pages/User/ChangePassword";
import EditProfile from "./Pages/User/EditProfile";
import Profile from "./Pages/User/Profile";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage></HomePage>}></Route>
        <Route path="/courses" element={<CourseList></CourseList>}></Route>
        <Route path="/about" element={<AboutPage></AboutPage>}></Route>
        <Route path="/contact" element={<Contact></Contact>}></Route>
        <Route path="/denied" element={<Denied></Denied>}></Route>
        <Route
          path="/courses/description"
          element={<CourseDescription></CourseDescription>}
        ></Route>

        <Route element={<RequireAuth allowedRole={["ADMIN"]} />}>
          <Route
            path="/course/create"
            element={<CreateCourse></CreateCourse>}
          ></Route>
            <Route path="/course/addlecture" element={<AddLecture></AddLecture>}></Route>
            <Route path="/admin/dashboard" element={<AdminDashboard></AdminDashboard>}></Route>
        </Route>

        <Route element={<RequireAuth allowedRole={["ADMIN", "USER"]} />}>
          <Route path="/user/profile" element={<Profile></Profile>}></Route>
          <Route path="/user/editprofile" element={<EditProfile></EditProfile>}></Route>
          <Route path="/checkout" element={<Checkout></Checkout>}></Route>
          <Route path="/checkout/success" element={<CheckoutSuccess></CheckoutSuccess>}></Route>
          <Route path="/checkout/fail" element={<CheckoutFailure></CheckoutFailure>}></Route>
          <Route path="/course/lecture" element={<DisplayLecture></DisplayLecture>}></Route>
          <Route path="/change-password" element={<ChangePassword></ChangePassword>}></Route>
        </Route>

        <Route path="/signup" element={<Signup></Signup>}></Route>
        <Route path="/forgot/password" element={<ForgotPassword></ForgotPassword>}></Route>
        <Route path={`/forgot/change/password/:resetToken`} element={<ChangeForgotPassword></ChangeForgotPassword>}></Route>
        <Route path="/login" element={<Login></Login>}></Route>

        <Route path="*" element={<NotFound></NotFound>}></Route>
      </Routes>
    </>
  );
}

export default App;
