import React,{useEffect,useState} from "react";
import SidebarWithAppbar from "./SidebarWithAppbar";
import { useDispatch } from "react-redux";
import axios from "axios";
import Cookies from "universal-cookie";
import { storeTuition } from "../../Store/thunk";
import { useNavigate } from "react-router-dom";
import { clearTuition } from "../../Store/tuition";
import "./Styles.css"
import { Box, Stack, Typography,Grid } from "@mui/material";

const AfterHome = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cookies = new Cookies();
  const getSettingState = async () => {
    // console.log("Inside setting state");
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
      // navigate("/login");
    } else {
      getSettingState();
    }
    return () => {
      dispatch(clearTuition());
    };
  }, []);

  /////////////////////////////////////
  // Get Tution Details
  /////////////////////////////////////

  const [tutDetails, setTutDetails] = useState([])

  const getTuitoinDetails = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_URL_LINK}/api/v1/tuition/get-tuition-detail/${cookies.get("token")}`
    );
    if (response.data.success) {
      setTutDetails(response.data.tuition)
    }
  }
  
  useEffect(() => {
    getTuitoinDetails()
  },[])

  return (
    <>
      <SidebarWithAppbar />
      <Stack
        direction={{
          lg: "row",
          md: "row",
          sm: "row",
          xs: "column",
        }}
        alignItems={"center"}
        justifyContent={"space-evenly"}
        mt={5}
      >
        <Box>
          <img
            src="../../images/WelcomeTuition.png"
            alt="welcome home"
            height={"230px"}
            width={"230px"}
          ></img>
        </Box>
        <Typography
          textAlign={"center"}
          variant="h3"
          fontWeight={"bold"}
          fontFamily={"Comfortaa, cursive"}
          color={"#254061"}
        >
          Welcome {tutDetails.name}
        </Typography>
      </Stack>
      <hr
        style={{
          backgroundColor: "#254061",
          width: "70%",
          height: "3px",
          borderRadius: "10px",
          opacity: "40%",
          margin: "auto",
        }}
      ></hr>
      {/* <--------------------------------------------------->
      Main Component 
      <--------------------------------------------------->  */}
      <pre>
        {JSON.stringify(tutDetails,null,4)}
     </pre>
    </>
  );
};

export default AfterHome;
