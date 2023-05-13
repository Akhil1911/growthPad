import React, { useEffect, useState } from "react";
import NavBar from "./NavBar";
import { Stack, Box, Typography, Paper, Button } from "@mui/material";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Modal from "@mui/material/Modal";
import DropIn from "braintree-web-drop-in-react";
import { showToast } from "../../Tools/showToast";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const StudentAfterHome = () => {
  const cookies = new Cookies();
  const navigate = useNavigate();
  const [studProfile, setstudProfile] = useState([]);
  const [tuiProfile, settuiProfile] = useState([]);
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");
  const [open, setOpen] = React.useState(false);
  const [checkFees, setCheckFees] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const getDetails = async () => {
    const response = await axios.get(
      `${
        process.env.REACT_APP_URL_LINK
      }/api/v1/student/student-details/${cookies.get("stutoken")}`
    );

    setstudProfile(response.data.student);
    const id = response.data.student.tuition_db_id;
    const response1 = await axios.get(
      `${process.env.REACT_APP_URL_LINK}/api/v1/student/get-tuition-details/${id}`
    );

    settuiProfile(response1.data.tuition);

    const student_id = response.data.student.student_id;
    const tuition_id = response.data.student.tuition_id;
    const email = response.data.student.email;

    const response2 = await axios.post(
      `${process.env.REACT_APP_URL_LINK}/api/v1/student/student-fees-details`,
      { student_id, tuition_id }
    );

    if (response2.data.success) {
      if (
        new Date().getMonth() + 1 >
        new Date(response2.data.student.updatedAt).getMonth() + 1
      ) {
         const updateFees = await axios.put(
           `${process.env.REACT_APP_URL_LINK}/api/v1/student/update-fees-status-pending`,
           { email }
        );
        // console.log(updateFees);
        setCheckFees(false);
      } else {
        // console.log(response2.data.student);
        const updateFees = await axios.put(
          `${process.env.REACT_APP_URL_LINK}/api/v1/student/update-fees-status`,
          { email }
        );
        // console.log(updateFees);
        setCheckFees(true);
      }
    }
  };

  useEffect(() => {
    document.title = "Student - Home";
    if (localStorage.getItem("stutoken")) {
      let token = localStorage.getItem("stutoken");
      cookies.set("stutoken", token);
      getDetails();
    } else {
      navigate("/studentlogin");
    }
  }, []);

  //get braintree token
  const getToken = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_URL_LINK}/api/v1/payment/braintree/token`
      );
      setClientToken(data?.clientToken);
      //  console.log(data);
    } catch (error) {
      showToast("ERROR",error)
    }
  };
  useEffect(() => {
    getToken();
  }, []);

  const handlePayment = async () => {
    try {
      const { nonce } = await instance.requestPaymentMethod();
      const { data } = await axios.post(
        `${process.env.REACT_APP_URL_LINK}/api/v1/payment/braintree/student/payment`,
        {
          nonce,
          amount: studProfile?.feesPerMonth,
          tuition_id: tuiProfile?.tuition_id,
          student_id: studProfile?.student_id,
        }
      );

      if (data.success) {
        setOpen(false);
        setCheckFees(true);
        showToast("SUCCESS", data.message);
        navigate("/studenthome");
        getDetails();
      }
    } catch (error) {
            showToast("ERROR", error);
    }
  };

  return (
    <>
      <NavBar />

      {/* ///////////////////////////
      //Modal
      /////////////////////////// */}

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Pay {studProfile.feesPerMonth}
          </Typography>
          {!clientToken ? null : (
            <>
              <DropIn
                options={{
                  authorization: clientToken,
                  paypal: {
                    flow: "vault",
                  },
                }}
                onInstance={(instance) => setInstance(instance)}
              />

              <Button
                variant="contained"
                color="darkColor"
                sx={{ color: "white" }}
                onClick={handlePayment}
                disabled={!instance}
              >
                Make Payment
              </Button>
            </>
          )}
        </Box>
      </Modal>

      {/* ///////////////////////////
      //Modal Ends
      /////////////////////////// */}
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
          Welcome {studProfile.name}
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
            Name :- {studProfile.name}
          </Typography>
          <Typography
            variant="body1"
            fontWeight={"bold"}
            fontFamily={"Comfortaa, cursive"}
            color={"#254061"}
            m={2}
          >
            Email :- {studProfile.email}
          </Typography>
          <Typography
            variant="body1"
            fontWeight={"bold"}
            fontFamily={"Comfortaa, cursive"}
            color={"#254061"}
            m={2}
          >
            Student Id :- {studProfile.student_id}
          </Typography>
          <Typography
            variant="body1"
            fontWeight={"bold"}
            fontFamily={"Comfortaa, cursive"}
            color={"#254061"}
            m={2}
          >
            Fees Per Month :- {studProfile.feesPerMonth}
          </Typography>
          <Button
            variant="outlined"
            color="darkColor"
            sx={{ ml: 2 }}
            onClick={() => {
              handleOpen();
            }}
            disabled={checkFees}
          >
            {checkFees ? "Fees Paid" : "Pay Fees"}
          </Button>
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
                navigate("/student/profile");
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
            Tuition Details
          </Typography>
          <Typography
            variant="body1"
            fontWeight={"bold"}
            fontFamily={"Comfortaa, cursive"}
            color={"#254061"}
            m={2}
          >
            Owner Name :- {tuiProfile.name}
          </Typography>
          <Typography
            variant="body1"
            fontWeight={"bold"}
            fontFamily={"Comfortaa, cursive"}
            color={"#254061"}
            m={2}
          >
            Email :- {tuiProfile.email}
          </Typography>
          <Typography
            variant="body1"
            fontWeight={"bold"}
            fontFamily={"Comfortaa, cursive"}
            color={"#254061"}
            m={2}
          >
            Tuition Id :- {tuiProfile.tuition_id}
          </Typography>
          <Typography
            variant="body1"
            fontWeight={"bold"}
            fontFamily={"Comfortaa, cursive"}
            color={"#254061"}
            m={2}
          >
            Contact Number :- {tuiProfile.phone_number}
          </Typography>
          <Typography
            variant="body1"
            fontWeight={"bold"}
            fontFamily={"Comfortaa, cursive"}
            color={"#254061"}
            m={2}
          >
            Tuition Class Address :- {tuiProfile.tuition_address}
          </Typography>
          <Typography
            variant="body1"
            fontWeight={"bold"}
            fontFamily={"Comfortaa, cursive"}
            color={"#254061"}
            m={2}
          >
            Tuition Class Name :- {tuiProfile.tuition_class_name}
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

export default StudentAfterHome;
