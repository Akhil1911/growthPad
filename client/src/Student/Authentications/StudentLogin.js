import React from "react";
import { ErrorMessage, Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { TextField, Button, Box, Stack, Typography } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import EmailIcon from "@mui/icons-material/Email";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import { Link, useNavigate } from "react-router-dom";
import { showToast } from "../../Tools/showToast";
import StudentBeforeAppbar from "../BeforeLogin/StudentBeforeAppbar";
import axios from "axios";
import "../../Home/HomeForAll.css";
import LoginRoundedIcon from "@mui/icons-material/LoginRounded";
import { useDispatch } from "react-redux";
import { storeStudent } from "../../Store/thunk";
import Cookies from 'universal-cookie'
const StudentLogin = () => {
  const [values, setValues] = React.useState({
    showPassword: false,
  });

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const cookies = new Cookies()
  const initialValues = {
    student_id: "",
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string("Enter valid email")
      .required("Email is required")
      .email("Enter valid email"),
    password: Yup.string()
      .required("Password is required"),
    student_id: Yup.string().required("StudentID is required"),
  });

  return (
    <>
      <StudentBeforeAppbar />
      <Stack
        direction={{
          lg: "row",
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
        spacing={2}
        marginTop={"4%"}
        alignItems={"center"}
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
            src="../images/signup.png"
            alt=""
            style={{
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}
          />
        </Box>
        <Box>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={async (values, { resetForm }) => {
              const { email, password, student_id } = values;
              try {
                const response = await axios.post(
                  `${process.env.REACT_APP_URL_LINK}/api/v1/auth/studentlogin`,
                  {
                    email,
                    password,
                    student_id,
                  }
                );
                if (response.data.success) {
                  dispatch(storeStudent(response.data))
                  resetForm();
                  cookies.set("token",response.data.token)
                  showToast("SUCCESS", `${response.data.message}`);
                  navigate("/studenthome");
                } else {
                  showToast("ERROR", `${response.data.message}`);
                }
              } catch (error) {
                console.log(error);
                showToast("ERROR", "Something Went Wrong");
              }
            }}
          >
            <Stack alignItems={"center"}>
              <h1>
                <p style={{ color: "#254061" }} className="joinusas">
                  <LoginRoundedIcon fontSize="medium" /> Login Here
                </p>
              </h1>
              <Form>
                <Box sx={{ "& > :not(style)": { m: 1.5 } }}>
                  <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                    <EmailIcon color="darkColor" sx={{ mr: 1, my: 0.5 }} />
                    <Field
                      as={TextField}
                      color="darkColor"
                      label="Enter Your email"
                      variant="standard"
                      fullWidth
                      name="email"
                    />
                  </Box>
                  <Typography
                    color={"red"}
                    sx={{ textAlign: "center", fontFamily: "Montserrat" }}
                  >
                    <ErrorMessage name="email" />
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                    {values.showPassword ? (
                      <VisibilityOff
                        color="darkColor"
                        sx={{ mr: 1, my: 0.5 }}
                        onClick={handleClickShowPassword}
                        style={{ cursor: "pointer" }}
                      />
                    ) : (
                      <Visibility
                        style={{ cursor: "pointer" }}
                        color="darkColor"
                        sx={{ mr: 1, my: 0.5 }}
                        onClick={handleClickShowPassword}
                      />
                    )}
                    <Field
                      type={values.showPassword ? "text" : "password"}
                      as={TextField}
                      color="darkColor"
                      label="Enter Password"
                      variant="standard"
                      fullWidth
                      name="password"
                    />
                  </Box>
                  <Typography
                    color={"red"}
                    sx={{ textAlign: "center", fontFamily: "Montserrat" }}
                  >
                    <ErrorMessage name="password" />
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                    <VpnKeyIcon color="darkColor" sx={{ mr: 1, my: 0.5 }} />
                    <Field
                      as={TextField}
                      color="darkColor"
                      label="Enter Student ID"
                      variant="standard"
                      fullWidth
                      name="student_id"
                    />
                  </Box>
                  <Typography
                    color={"red"}
                    sx={{ textAlign: "center", fontFamily: "Montserrat" }}
                  >
                    <ErrorMessage name="student_id" />
                  </Typography>
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
                      sx={{ color: "white" }}
                      color="darkColor"
                      type="submit"
                    >
                      SignIn
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
                    <h4 style={{ color: "#254061" }} className="joinusas">
                      Not Registered Yet?
                      <Link
                        to="/studentregister"
                        style={{ textDecoration: "none" }}
                      >
                        <Button color="darkColor" variant="text">
                          Register Here
                        </Button>
                      </Link>
                    </h4>
                  </Stack>
                </Box>
              </Form>
            </Stack>
          </Formik>
        </Box>
      </Stack>
    </>
  );
};

export default StudentLogin;
