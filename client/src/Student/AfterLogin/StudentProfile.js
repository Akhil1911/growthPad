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
import { showToast } from "../../Tools/showToast";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "universal-cookie";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import NavBar from "./NavBar";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import { storeStudent } from "../../Store/thunk";

const StudentProfile = () => {
  const cookies = new Cookies();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const studProfile = useSelector((state) => state.student.student);
  const getDetails = async () => {
    const response = await axios.get(
      `${
        process.env.REACT_APP_URL_LINK
      }/api/v1/student/student-details/${cookies.get("stutoken")}`
    );
    dispatch(storeStudent(response.data));
  };

  useEffect(() => {
    if (localStorage.getItem("stutoken")) {
      let token = localStorage.getItem("stutoken");
      cookies.set("stutoken", token);
      getDetails();
    } else {
      navigate("/studentlogin");
    }
  }, []);

  //checkbox || updating or not
  const [confUpdate, setConfUpdate] = useState(true);

  const validationSchema = Yup.object({
    name: Yup.string("Enter valid name")
      .required("Name is required")
      .min(2, "Name is too short, enter valid name"),
    address: Yup.string()
      .required("Address is required")
      .max(100, "Address is too long, enter valid address"),
    phone_number: Yup.number("Must be a number")
      .required("Phone number is required")
      .integer("No Decimal Value Allowed")
      .typeError("Only Numbers Can Be Entered"),
    standard: Yup.number()
      .required("Standard is required")
      .max(12, "Max 12 Standard Is Allowed")
      .min(1, "Invalid Standard"),
    age: Yup.number()
      .required("Age is required")
      .max(20, "Invalid Age Entered")
      .min(5, "Invalid Age Entered"),
  });

  const handleChange = (e) => {
    if (e.target.checked) {
      setConfUpdate(false);
    } else {
      setConfUpdate(true);
    }
    };
    
    const handleDeleteAccount = async (email) => {
        const confirm = window.confirm("Are you sure you want to delete account?")
        if (confirm) {
            const response = await axios.delete(
              `${process.env.REACT_APP_URL_LINK}/api/v1/student/delete-student-account/${email}`
            );
            if (response.data.success) {
                showToast("SUCCESS",`${response.data.message}`)
                navigate("/studentregister");
            }
        } else {
            ///
        }
    }

  return (
    <>
      <NavBar />

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
        // marginTop={"2%"}
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
          {studProfile ? (
            <Formik
              initialValues={{
                name: studProfile.name,
                email: studProfile.email,
                address: studProfile.address,
                phone_number: studProfile.phone_number,
                tuition_class_name: studProfile.tuition_class_name,
                tuition_id: studProfile.tuition_id,
                student_id: studProfile.student_id,
                age: studProfile.age,
                              standard: studProfile.standard,
              }}
              validationSchema={validationSchema}
              onSubmit={async (values) => {
                const { name, phone_number, address, email } = values;
                if (
                  name === studProfile.name &&
                  phone_number === studProfile.phone_number &&
                  address === studProfile.address
                ) {
                  showToast("ERROR", "Please Update Someting");
                } else {
                  try {
                    // console.log(tuiProfile);
                    const response = await axios.put(
                      `${process.env.REACT_APP_URL_LINK}/api/v1/student/update-student-profile`,
                      {
                        name,
                        email,
                        address,
                        phone_number,
                      }
                    );
                    if (response.data.success) {
                      console.log(response.data);
                      showToast("SUCCESS", `${response.data.message}`);
                      // dispatch(storeStudent(response.data.student));
                      navigate("/student/profile");
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
                      <VpnKeyIcon color="darkColor" sx={{ mr: 1, my: 0.5 }} />
                      <Field
                        as={TextField}
                        inputProps={{ readOnly: true }}
                        color="darkColor"
                        label="Tuition ID"
                        variant="standard"
                        fullWidth
                        name="tuition_id"
                      />
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                      <VpnKeyIcon color="darkColor" sx={{ mr: 1, my: 0.5 }} />
                      <Field
                        as={TextField}
                        inputProps={{ readOnly: true }}
                        color="darkColor"
                        label="Student ID"
                        variant="standard"
                        fullWidth
                        name="student_id"
                      />
                    </Box>
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
                      <MenuBookIcon color="darkColor" sx={{ mr: 1, my: 0.5 }} />
                      <Field
                        as={TextField}
                        inputProps={{ readOnly: true }}
                        color="darkColor"
                        label="Tuition Name"
                        variant="standard"
                        fullWidth
                        name="tuition_class_name"
                      />
                    </Box>
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
                    <Typography
                      color={"red"}
                      sx={{ textAlign: "center", fontFamily: "Montserrat" }}
                    >
                      <ErrorMessage name="name" />
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
                    <Typography
                      color={"red"}
                      sx={{ textAlign: "center", fontFamily: "Montserrat" }}
                    >
                      <ErrorMessage name="phone_number" />
                    </Typography>
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
                    <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                      <AutoStoriesIcon
                        color="darkColor"
                        sx={{ mr: 1, my: 0.5 }}
                      />
                      <Field
                        as={TextField}
                        inputProps={{ readOnly: true }}
                        color="darkColor"
                        label="Your Standard"
                        variant="standard"
                        fullWidth
                        name="standard"
                      />
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                      <InsertEmoticonIcon
                        color="darkColor"
                        sx={{ mr: 1, my: 0.5 }}
                      />
                      <Field
                        as={TextField}
                        inputProps={{ readOnly: true }}
                        color="darkColor"
                        label="Your Age"
                        variant="standard"
                        fullWidth
                        name="age"
                      />
                    </Box>
                    <Typography
                      color={"red"}
                      sx={{ textAlign: "center", fontFamily: "Montserrat" }}
                    >
                      <ErrorMessage name="address" />
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
                    >
                      <Button
                        variant="contained"
                        sx={{ color: "white" }}
                        color="error"
                                              type="button"
                                              onClick={() => {
                                                  handleDeleteAccount(studProfile.email)
                                              }}
                      >
                        Delete Account
                      </Button>
                    </Stack>
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

export default StudentProfile;
