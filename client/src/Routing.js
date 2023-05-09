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
const Routing = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<HomeForAll />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Signup />} />
          <Route exact path="/tBeforeHome" element={<BeforeLogin />} />
          <Route exact path="tHome" element={<AfterHome />} />
          <Route exact path="tHomeWithoutSub" element={<HomeWithoutSub />} />
          {/* ///////////////////////////////////////// */}
          <Route exact path="/studentlogin" element={<StudentLogin />} />
          <Route exact path="/studentregister" element={<StudentSignup />} />
          <Route exact path="/sBeforeHome" element={<StudentBeforeLogin />} />
          <Route exact path="/studenthome" element={<StudentAfterHome />} />
          <Route exact path="*" element={<Error404 />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default Routing;
