import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomeForAll from "./Home/HomeForAll";
import Login from "./Tution/Authentications/Login";
import Signup from "./Tution/Authentications/Signup";
import StudentLogin from "./Student/Authentications/StudentLogin";
import StudentSignup from "./Student/Authentications/StudentSignup";
import BeforeLogin from "./Tution/BeforeLogin/BeforeLogin";
import Error404 from "./Home/Error404";
import HomeWithoutSub from "./Tution/AfterLoginWithoutSub/HomeWithoutSub";
import StudentBeforeLogin from "./Student/BeforeLogin/StudentBeforeLogin";
import AfterHome from "./Tution/AfterLoginWithSubscription/AfterHome";
import StudentAfterHome from "./Student/AfterLogin/StudentAfterHome";
import TuitionProfile from "./Tution/TuitionProfile";
import ViewStudents from "./Tution/AfterLoginWithSubscription/ViewStudents";
import StudentProfile from "./Student/AfterLogin/StudentProfile";
const Routing = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<HomeForAll />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Signup />} />
          <Route exact path="/home" element={<BeforeLogin />} />
          <Route
            exact
            path="/tuition/subscribed/view-students"
            element={<ViewStudents />}
          />
          <Route
            exact
            path="/tuition/subscribed/home"
            element={<AfterHome />}
          />
          <Route exact path="/tuition/home" element={<HomeWithoutSub />} />
          <Route exact path="/tuition/profile" element={<TuitionProfile />} />
          {/* ///////////////////////////////////////// */}
          <Route exact path="/studentlogin" element={<StudentLogin />} />
          <Route exact path="/studentregister" element={<StudentSignup />} />
          <Route exact path="/student/home" element={<StudentBeforeLogin />} />
          <Route exact path="/studenthome" element={<StudentAfterHome />} />
          <Route
            exact
            path="/student/profile"
            element={<StudentProfile />}
          />
          <Route exact path="*" element={<Error404 />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default Routing;
