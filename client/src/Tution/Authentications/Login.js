import React, { useEffect } from "react";
import { ErrorMessage, Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { TextField, Button, Box, Stack, Typography } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import EmailIcon from "@mui/icons-material/Email";
import { Link, useNavigate } from "react-router-dom";
import BeforeAppbar from "../BeforeLogin/BeforeAppbar";
import { showToast } from "../../Tools/showToast";
import axios from "axios";
import LoginRoundedIcon from "@mui/icons-material/LoginRounded";
import { useDispatch } from "react-redux";
import { storeTuition } from "../../Store/thunk";
import Cookies from "universal-cookie";
import "../../Home/HomeForAll.css";
import CheckingTokens from "../../Tools/CheckingTokens";
const cookie = new Cookies();
const Login = () => {
  useEffect(() => {
    document.title = "Tuition - Login";
  }, []);
  const [values, setValues] = React.useState({
    showPassword: false,
  });

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .required("Email is required")
      .email("Enter valid email"),
    password: Yup.string().required("Password is required"),
  });

  return (
    <>
      <CheckingTokens />
      <BeforeAppbar />
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
        alignItems={{
          lg: "space-around",
          md: "space-around",
          sm: "center",
          xs: "center",
        }}
        spacing={2}
        marginTop={"4%"}
        // sx={{display:"block"}}
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
            src="../images/login.png"
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
              const { email, password } = values;
              try {
                const response = await axios.post(`/api/v1/auth/login`, {
                  email,
                  password,
                });
                if (response.data.success) {
                  resetForm();
                  dispatch(storeTuition(response.data));
                  {
                    response.data.user.subscribed ? (
                      <>
                        {cookie.set("subtoken", response.data.token)}
                        {localStorage.setItem("subtoken", response.data.token)}
                      </>
                    ) : (
                      <>
                        {cookie.set("token", response.data.token)}
                        {localStorage.setItem("token", response.data.token)}
                      </>
                    );
                  }
                  // console.log(response);
                  if (response.data.user.subscribed) {
                    // console.log("tHomep");
                    navigate("/tuition/subscribed/home");
                    showToast("SUCCESS", `${response.data.message}`);
                  } else {
                    // console.log("tHomeWithoutSub");
                    navigate("/tuition/home");
                    showToast("SUCCESS", `${response.data.message}`);
                  }
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
                      Login
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
                      <Link to="/register" style={{ textDecoration: "none" }}>
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

export default Login;
