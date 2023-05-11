import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

const CheckingTokens = () => {
  const cookie = new Cookies();
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("token")) {
      let temptoken = localStorage.getItem("token");
      cookie.set("token", temptoken);
      navigate("/tuition/home");
    }
     if (localStorage.getItem("subtoken")) {
       let temptoken = localStorage.getItem("subtoken");
       cookie.set("subtoken", temptoken);
       navigate("/tuition/subscribed/home");
    }  
  }, []);
};

export default CheckingTokens;
