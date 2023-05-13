import React,{useEffect} from "react";
import { Box, Button, Grid, Typography } from "@mui/material";
import "./HomeForAll.css";
import { Link, useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";

const HomeForAll = () => {
  const navigate = useNavigate()
  useEffect(() => {
    document.title = "Growthpad - Home"
  },[])
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" sx={{ backgroundColor: "#254061" }}>
          <Toolbar>
            <Typography
              variant="h6"
              component="div"
              sx={{
                flexGrow: 1,
                fontFamily: "Montserrat",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              Growthpad
            </Typography>
            <Button color="inherit" onClick={() => navigate("/adminlogin")}>
              ADMIN
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
      <div className="image2">
        {/* <img
          src="../images/bgHome.jpg"
          alt=""
          srcSet=""
          style={{ width: "100%" }}
        /> */}
        <video
          autoPlay
          muted
          loop
          style={{ opacity: "60%", height: "100%", width: "100%" }}
        >
          <source src="../images/joinus.mp4" type="video/mp4" />
        </video>
        <div className="centered">
          <Typography
            fontFamily={"Montserrat, sans-serif"}
            sx={{
              fontSize: {
                lg: "4rem",
                md: "3rem",
                sm: "2rem",
                xs: "2rem",
              },
              mt: {
                lg: 1,
                md: 1,
                sm: 2,
                xs: 2,
              },
            }}
          >
            Join Us As
          </Typography>
        </div>
        <Box sx={{ mt: { xs: "1rem" } }} className="centeredButtons">
          <Grid
            container
            direction={{
              lg: "row",
              md: "row",
              sm: "row",
              xs: "column",
            }}
            className="typoJoinus"
            spacing={{
              lg: 10,
              md: 10,
              sm: 4,
              xs: 2,
            }}
          >
            <Grid item>
              <Link
                to={"/home"}
                style={{ textDecoration: "none", color: "white" }}
              >
                <Button
                  sx={{
                    fontSize: {
                      lg: "x-large",
                      md: "x-large",
                      sm: "large",
                      xs: "medium",
                    },
                  }}
                  variant="contained"
                  color="darkColor"
                >
                  Teacher
                </Button>
              </Link>
            </Grid>
            <Grid item>
              <Link to={"/student/home"} style={{ textDecoration: "none" }}>
                <Button
                  sx={{
                    fontSize: {
                      lg: "x-large",
                      md: "x-large",
                      sm: "large",
                      xs: "medium",
                    },
                    color: "#18074a",
                  }}
                  variant="outlined"
                  color="darkColor"
                >
                  Student
                </Button>
              </Link>
            </Grid>
          </Grid>
        </Box>
      </div>
      <Grid container justifyContent={"center"}>
        <Grid item lg={4} md={4} sm={6} xs={12}>
          <div className="features-row">
            <img
              src="../images/class.png"
              alt="classRoom"
              className="underOneRoof"
            />
            <h3 className="joinusas">Everything under one roof</h3> <br />
            {
              <p className="joinusas">
                Join growthpad, to get easy access <br />
                <br />
                Get everything under one roof, easy to use <br />
                <br />
                No registration fees
              </p>
            }
          </div>
        </Grid>
        <Grid item lg={4} md={4} sm={6} xs={12}>
          <div className="features-row">
            <img
              src="../images/rupi.png"
              alt="classRoom"
              className="underOneRoof"
            />
            <h3 className="joinusas">Fees Payment</h3> <br />
            {
              <p className="joinusas">
                <br />
                <br />
                Using Growthpad, Tuition owner can easily handle fees
                payments,and can give penalty for late fees payments
                <br />
                <br />
                Students can easily pay fees on a single click
              </p>
            }
          </div>
        </Grid>
        <Grid item lg={4} md={4} sm={6} xs={12}>
          <div className="features-row">
            <img
              src="../images/easy.png"
              alt="classRoom"
              className="underOneRoof"
            />
            <h3 className="joinusas">Easy to use</h3> <br />
            {
              <p className="joinusas">
                <br />
                <br />
                Its easy to use
                <br />
                <br />
                Where efficiency meets convenience <br /><br/> We save you time and
                effort
              </p>
            }
          </div>
        </Grid>
      </Grid>
    </>
  );
};

export default HomeForAll;
