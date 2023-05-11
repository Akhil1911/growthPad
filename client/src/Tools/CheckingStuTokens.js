import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

const CheckingStuTokens = () => {
  const cookie = new Cookies();
  const navigate = useNavigate();
  useEffect(() => {
     if (localStorage.getItem("stutoken")) {
       let temptoken = localStorage.getItem("stutoken");
       cookie.set("stutoken", temptoken);
       navigate("/studenthome");
    }  
    
  }, []);
}

export default CheckingStuTokens

