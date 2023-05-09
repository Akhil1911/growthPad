import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
import React, { useEffect } from 'react'

const CheckLogin = () => {
    const cookies = new Cookies();
    const navigate = new useNavigate();
    useEffect(() => {
      if (!cookies.get("token")) {
        navigate("/login");
      }
    }, [])
    
}

export default CheckLogin