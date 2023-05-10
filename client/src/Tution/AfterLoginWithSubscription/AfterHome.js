import React,{useEffect} from "react";
import SidebarWithAppbar from "./SidebarWithAppbar";
import { useDispatch } from "react-redux";
import axios from "axios";
import Cookies from "universal-cookie";
import { storeTuition } from "../../Store/thunk";
import { useNavigate } from "react-router-dom";
import { clearTuition } from "../../Store/tuition";

const AfterHome = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cookies = new Cookies();
  const getSettingState = async () => {
    console.log("Inside setting state");
    const response = await axios.get(
      `${process.env.REACT_APP_URL_LINK}/api/v1/auth/auth-tuition/${cookies.get(
        "token"
      )}`
    );
    // console.log(response.data);
    if (response.data) {
      dispatch(storeTuition(response.data));
    }
  };

  useEffect(() => {
    if (!cookies.get("token")) {
      navigate("/login");
    } else {
      getSettingState();
    }
    return () => {
      dispatch(clearTuition());
    };
  }, []);

  return (
    <>
      <SidebarWithAppbar />
      <h1>Tuition Data</h1>
    </>
  );
};

export default AfterHome;
