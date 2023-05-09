import { Button, Stack, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom';
// const bgImg = "./images/teacherHome.jpg"
const RegisterNow = () => {
    return (
      <>
        <Stack
          className="image2"
          style={{
            position: "relative",
            textAlign: "center",
            // backgroundImage:`url(${bgImg})`
          }}
        >
          <img
            src="../images/bHome2.jpg"
            alt=""
            // srcSet=""
            style={{ width: "100%" }}
          />
          <div
            className="centered"
            style={{
              position: "absolute",
              top: "30%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            <Typography
              fontFamily={"Montserrat, sans-serif"}
              sx={{
                fontSize: {
                  lg: "3rem",
                  md: "3rem",
                  sm: "20px",
                  xs: "20px",
                },
                color: "#254061",
                marginTop: {
                  xs: "70px",
                },
              }}
            >
              Click Below button to register
              <br />
              <Link to="/register">
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "#254061",
                    "&:hover": {
                      backgroundColor: "#254061",
                    },
                  }}
                >
                  Register Now
                </Button>
              </Link>
            </Typography>
          </div>
        </Stack>
        {/* <div style={{
                backgroundImage:`url(${".images/teacherHome.jpg"})`,
            }}>
                <h1>HelloWorld</h1>
            </div> */}
      </>
    );
}

export default RegisterNow