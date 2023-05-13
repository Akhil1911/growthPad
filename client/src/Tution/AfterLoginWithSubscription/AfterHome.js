import React, { useEffect, useState } from "react";
import SidebarWithAppbar from "./SidebarWithAppbar";
import { useDispatch } from "react-redux";
import axios from "axios";
import Cookies from "universal-cookie";
import { storeTuition } from "../../Store/thunk";
import { useNavigate } from "react-router-dom";
import { clearTuition } from "../../Store/tuition";
import "./Styles.css";
import { Box, Stack, Typography, Grid, Paper, Button } from "@mui/material";
import { useSelector } from "react-redux";

const AfterHome = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cookies = new Cookies();
  const tuiProfile = useSelector((state) => state.tuition.tuition);
  const getSettingState = async () => {
    const response = await axios.get(
      `/api/v1/auth/auth-tuition/${cookies.get("subtoken")}`
    );
    if (response.data) {
      if (response.data.user.subscribed) {
        dispatch(storeTuition(response.data));
      } else {
        navigate(-1);
      }
    }
  };

  useEffect(() => {
    document.title = "Subscribed Tuition - Home";
    if (localStorage.getItem("subtoken")) {
      let temptoken = localStorage.getItem("subtoken");
      cookies.set("subtoken", temptoken);
      getSettingState();
      getTuitoinDetails();
      getSubscriptionDetails();
    } else if (localStorage.getItem("token")) {
      navigate("/tuition/home");
    } else {
      navigate(-1);
    }
    return () => {
      dispatch(clearTuition());
    };
  }, []);

  /////////////////////////////////////
  // Get Tution Details
  /////////////////////////////////////

  const [tutDetails, setTutDetails] = useState([]);

  const getTuitoinDetails = async () => {
    const response = await axios.get(
      `${
        process.env.REACT_APP_URL_LINK
      }/api/v1/tuition/get-tuition-detail/${cookies.get("subtoken")}`
    );
    // console.log(response.data);
    if (response.data.success) {
      setTutDetails(response.data.tuition);
    }
  };

  const [subscriptionDetails, setSubscriptionDetails] = useState([]);

  const getSubscriptionDetails = async () => {
    const response = await axios.get(
      `${
        process.env.REACT_APP_URL_LINK
      }/api/v1/tuition/get-subscription-detail/${cookies.get("subtoken")}`
    );
    if (response.data.success) {
      setSubscriptionDetails(response.data.tuition);
    }
  };

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
          Welcome {tutDetails?.name}
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
      <Stack
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={10}
        mt={4}
        mb={5}
      >
        <Paper
          mb={5}
          sx={{ width: "75%", borderRadius: "21px" }}
          elevation={24}
        >
          <Typography
            textAlign={"center"}
            variant="h5"
            fontWeight={"bold"}
            fontFamily={"Comfortaa, cursive"}
            color={"#254061"}
            mt={3}
          >
            Your Details
          </Typography>
          <Typography
            variant="body1"
            fontWeight={"bold"}
            fontFamily={"Comfortaa, cursive"}
            color={"#254061"}
            m={2}
          >
            Name :- {tutDetails.name}
          </Typography>
          <Typography
            variant="body1"
            fontWeight={"bold"}
            fontFamily={"Comfortaa, cursive"}
            color={"#254061"}
            m={2}
          >
            Email :- {tutDetails.email}
          </Typography>
          <Typography
            variant="body1"
            fontWeight={"bold"}
            fontFamily={"Comfortaa, cursive"}
            color={"#254061"}
            m={2}
          >
            Tuition Id :- {tutDetails.tuition_id}
          </Typography>
          <Typography
            variant="body1"
            fontWeight={"bold"}
            fontFamily={"Comfortaa, cursive"}
            color={"#254061"}
            m={2}
          >
            Tuition Class Name :- {tutDetails.tuition_class_name}
          </Typography>
          <Stack mb={3} m={3} justifyContent={"center"} alignContent={"center"}>
            <Button
              sx={{
                fontSize: {
                  lg: "large",
                  md: "large",
                  sm: "large",
                  xs: "medium",
                },
              }}
              variant="outlined"
              color="darkColor"
              onClick={() => {
                navigate("/tuition/profile");
              }}
            >
              View More
            </Button>
          </Stack>
        </Paper>

        <Paper
          mb={5}
          sx={{
            width: "75%",
            backgroundColor: "#E1EBEE",
            borderRadius: "21px",
          }}
          elevation={24}
        >
          <Typography
            textAlign={"center"}
            variant="h5"
            fontWeight={"bold"}
            fontFamily={"Comfortaa, cursive"}
            color={"#254061"}
            mt={3}
          >
            Subscription Details
          </Typography>
          <Typography
            variant="body1"
            fontWeight={"bold"}
            fontFamily={"Comfortaa, cursive"}
            color={"#254061"}
            m={2}
          >
            Name :- {subscriptionDetails.name + " Subscription"}
          </Typography>
          <Typography
            variant="body1"
            fontWeight={"bold"}
            fontFamily={"Comfortaa, cursive"}
            color={"#254061"}
            m={2}
          >
            Price :-{" "}
            {subscriptionDetails.payment?.params.transaction.amount + " ₹"}
          </Typography>
          <Typography
            variant="body1"
            fontWeight={"bold"}
            fontFamily={"Comfortaa, cursive"}
            color={"#254061"}
            m={2}
          >
            Duration :- {subscriptionDetails.duration + " Years"}
          </Typography>
          <Typography
            variant="body1"
            fontWeight={"bold"}
            fontFamily={"Comfortaa, cursive"}
            color={"#254061"}
            m={2}
          >
            Purchased Date :- {subscriptionDetails.createdAt?.substring(0, 10)}
          </Typography>
          <Typography
            variant="body1"
            fontWeight={"bold"}
            fontFamily={"Comfortaa, cursive"}
            color={"#254061"}
            m={2}
          >
            Expires On :- {subscriptionDetails.expireDate}
          </Typography>
          <Stack
            mb={3}
            m={3}
            justifyContent={"center"}
            alignContent={"center"}
          ></Stack>
        </Paper>
      </Stack>
    </>
  );
};

export default AfterHome;
