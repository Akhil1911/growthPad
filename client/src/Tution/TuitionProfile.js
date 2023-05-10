import React, { useEffect, useState } from "react";
import { ErrorMessage, Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { TextField, Button, Box, Stack, Typography } from "@mui/material";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import AccountCircle from "@mui/icons-material/AccountCircle";
import EmailIcon from "@mui/icons-material/Email";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import PhoneIcon from "@mui/icons-material/Phone";
import HomeIcon from "@mui/icons-material/Home";
import { Link, useNavigate } from "react-router-dom";
import { showToast } from "../Tools/showToast";
import axios from "axios";
import SidebarWithAppbar from "./AfterLoginWithSubscription/SidebarWithAppbar";
import HomeAppBar from "./AfterLoginWithoutSub/HomeAppBar";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "universal-cookie";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { storeTuition } from "../Store/thunk";
import { clearTuition } from "../Store/tuition";

const TuitionProfile = () => {
  const dispatch = useDispatch();
  const cookies = new Cookies();
  const navigate = useNavigate();
  const getSettingState = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_URL_LINK}/api/v1/auth/auth-tuition/${cookies.get(
        "token"
      )||cookies.get("subtoken")}`
    );
    if (response.data) {
      dispatch(storeTuition(response.data));
    }
  };

  useEffect(() => {
    if (!cookies.get("token") && !cookies.get("subtoken")) {
      navigate("/login");
    } else {
      getSettingState();
    }
     return () => {
       dispatch(clearTuition());
     };
  }, []);

  //checkbox || updating or not
  const [confUpdate, setConfUpdate] = useState(true)
  const tuiProfile = useSelector((state) => state.tuition.tuition);
  // console.log(tuiProfile);
  const initialValues = tuiProfile
    ? {
        name: tuiProfile.name,
        email: tuiProfile.email,
        address: tuiProfile.address,
        phone_number: tuiProfile.phone_number,
        tuition_class_name: tuiProfile.tuition_class_name,
        tuition_address: tuiProfile.tuition_address,
      }
    : {
        name: "",
        email: "",
        address: "",
        phone_number: "",
        tuition_class_name: "",
        tuition_address: "",
      };

  const validationSchema = Yup.object({
    name: Yup.string("Enter valid name")
      .required("Name is required")
      .min(2, "Name is too short, enter valid name"),
    email: Yup.string("Enter valid email")
      .required("Email is required")
      .email("Enter valid email"),
    address: Yup.string()
      .required("Address is required")
      .max(100, "Address is too long, enter valid address"),
    phone_number: Yup.number("Must be a number")
      .required("Phone number is required")
      .integer("No Decimal Value Allowed")
      .typeError("Only Numbers Can Be Entered"),
    tuition_class_name: Yup.string().required("Tution Name is required"),
    tuition_address: Yup.string()
      .required("Address is required")
      .max(100, "Address is too long, enter valid address"),
  });

  const handleChange = (e) => {
    if (e.target.checked) {
      setConfUpdate(false)
    } else {
      setConfUpdate(true)
    }
  }

  return (
    <>
     
      {(tuiProfile?tuiProfile.subscribed?<SidebarWithAppbar/>:<HomeAppBar/>:null)}

      <Stack
        direction={{
          lg: "row-reverse",
          md: "row",
          sm: "column",
          xs: "column",
        }}
        justifyContent={{
          lg: "space-around",
          md: "space-around",
          sm: "center",
          xs: "center",
        }}
        alignItems={{
          lg: "space-around",
          md: "space-around",
          sm: "center",
          xs: "center",
        }}
        spacing={2}
        marginTop={"8%"}
      >
        <Box
          sx={{
            width: {
              lg: "45%",
              md: "45%",
              sm: "50%",
              xs: "100%",
            },
          }}
        >
          <img
            src="../images/profile.png"
            alt=""
            style={{
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}
          />
        </Box>
        <Box>
          {tuiProfile ? (
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={async (values, { resetForm }) => {
                const {
                  name,
                  email,
                  phone_number,
                  address,
                  tuition_class_name,
                  tuition_address,
                } = values;
                if (name === tuiProfile.name && phone_number === tuiProfile.phone_number && address === tuiProfile.address && tuition_address === tuiProfile.tuition_address && tuition_class_name === tuiProfile.tuition_class_name) {
                    showToast("ERROR","Please Update Someting")
                } else {
                   try {
                     console.log(tuiProfile);
                    
                     const response = await axios.put(
                       `${process.env.REACT_APP_URL_LINK}/api/v1/tuition/update-profile`,
                       {
                         name,
                         email,
                         address,
                         phone_number,
                         tuition_class_name,
                         tuition_address,
                        
                       }
                     );
                     if (response.data.success) {
                       showToast("SUCCESS", `${response.data.message}`);
                       dispatch(storeTuition(response.data))
                       navigate("/tuition/profile");
                       // navigate("/login");
                     } else {
                       showToast("ERROR", `${response.data.message}`);
                     }
                   } catch (error) {
                    //  console.log(error);
                     showToast("ERROR", "Something Went Wrong");
                   }
                }
               
              }}
            >
              <Stack alignItems={"center"} mt={"2rem"}>
                <h1>
                  <p style={{ color: "#254061" }} className="joinusas">
                    <HowToRegIcon fontSize="medium" /> My Profile
                  </p>
                </h1>
                <Form>
                  <Box sx={{ "& > :not(style)": { m: 1.5 } }}>
                    <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                      <AccountCircle
                        color="darkColor"
                        sx={{ mr: 1, my: 0.5 }}
                      />
                      <Field
                        as={TextField}
                        inputProps={{ readOnly: confUpdate }}
                        color="darkColor"
                        label="Enter Your Name"
                        variant="standard"
                        fullWidth
                        name="name"
                      />
                    </Box>
                    <Typography color={"red"} sx={{ textAlign: "center" }}>
                      <ErrorMessage name="name" />
                    </Typography>
                    <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                      <EmailIcon color="darkColor" sx={{ mr: 1, my: 0.5 }} />
                      <Field
                        as={TextField}
                        color="darkColor"
                        label="Your Email"
                        variant="standard"
                        fullWidth
                        name="email"
                        inputProps={{ readOnly: true }}
                      />
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                      <HomeIcon color="darkColor" sx={{ mr: 1, my: 0.5 }} />
                      <Field
                        multiline
                        maxRows={3}
                        as={TextField}
                        inputProps={{ readOnly: confUpdate }}
                        color="darkColor"
                        label="Enter Your Address"
                        variant="standard"
                        fullWidth
                        name="address"
                      />
                    </Box>
                    <Typography color={"red"} sx={{ textAlign: "center" }}>
                      <ErrorMessage name="address" />
                    </Typography>
                    <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                      <PhoneIcon color="darkColor" sx={{ mr: 1, my: 0.5 }} />
                      <Field
                        as={TextField}
                        inputProps={{ readOnly: confUpdate }}
                        color="darkColor"
                        label="Enter Your Mobile No."
                        variant="standard"
                        fullWidth
                        name="phone_number"
                      />
                    </Box>
                    <Typography color={"red"} sx={{ textAlign: "center" }}>
                      <ErrorMessage name="phone_number" />
                    </Typography>
                    <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                      <MenuBookIcon color="darkColor" sx={{ mr: 1, my: 0.5 }} />
                      <Field
                        as={TextField}
                        inputProps={{ readOnly: confUpdate }}
                        color="darkColor"
                        label="Enter Tuition Name"
                        variant="standard"
                        fullWidth
                        name="tuition_class_name"
                      />
                    </Box>
                    <Typography color={"red"} sx={{ textAlign: "center" }}>
                      <ErrorMessage name="tuition_class_name" />
                    </Typography>
                    <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                      <AutoStoriesIcon
                        color="darkColor"
                        sx={{ mr: 1, my: 0.5 }}
                      />
                      <Field
                        multiline
                        maxRows={3}
                        as={TextField}
                        inputProps={{ readOnly: confUpdate }}
                        color="darkColor"
                        label="Enter Tuition Address"
                        variant="standard"
                        fullWidth
                        name="tuition_address"
                      />
                    </Box>
                    <Typography color={"red"} sx={{ textAlign: "center" }}>
                      <ErrorMessage name="tuition_address" />
                    </Typography>
                    <FormControlLabel
                      control={
                        <Checkbox
                          onChange={(e) => {
                            handleChange(e);
                          }}
                        />
                      }
                      label="Update Profile"
                    />
                    <Stack
                      direction={{
                        lg: "row",
                        md: "row",
                        xs: "row",
                        sm: "row",
                      }}
                      justifyContent="center"
                      alignItems={"center"}
                      spacing={2}
                    >
                      <Button
                        variant="contained"
                        color="darkColor"
                        type="submit"
                        sx={{ color: "white" }}
                        disabled={confUpdate}
                      >
                        Update
                      </Button>
                      <Button
                        variant="contained"
                        sx={{ color: "white" }}
                        color="darkColor"
                        type="reset"
                      >
                        Clear
                      </Button>
                    </Stack>
                    <Stack
                      direction={"row"}
                      justifyContent="center"
                      alignItems={"center"}
                      style={{ marginBottom: "2rem" }}
                    ></Stack>
                  </Box>
                </Form>
              </Stack>
            </Formik>
          ) : null}
        </Box>
      </Stack>
    </>
  );
};

export default TuitionProfile;
