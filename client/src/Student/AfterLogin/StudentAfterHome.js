import React, { useEffect, useState } from 'react'
import NavBar from './NavBar'
import { Stack,Box,Typography,Paper,Button } from '@mui/material';
const StudentAfterHome = () => {
  const [studProfile, setstudProfile] = useState([])  
  return (
    <>
      <NavBar />
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
          Welcome student
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
            Name :- 
          </Typography>
          <Typography
            variant="body1"
            fontWeight={"bold"}
            fontFamily={"Comfortaa, cursive"}
            color={"#254061"}
            m={2}
          >
            Email :- 
          </Typography>
          <Typography
            variant="body1"
            fontWeight={"bold"}
            fontFamily={"Comfortaa, cursive"}
            color={"#254061"}
            m={2}
          >
            Student Id :- 
          </Typography>
          <Typography
            variant="body1"
            fontWeight={"bold"}
            fontFamily={"Comfortaa, cursive"}
            color={"#254061"}
            m={2}
          >
            Fees Per Month :- pending work...
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
            Owner Name :- 
          </Typography>
          <Typography
            variant="body1"
            fontWeight={"bold"}
            fontFamily={"Comfortaa, cursive"}
            color={"#254061"}
            m={2}
          >
            Email :- 
          </Typography>
          <Typography
            variant="body1"
            fontWeight={"bold"}
            fontFamily={"Comfortaa, cursive"}
            color={"#254061"}
            m={2}
          >
            Tuition Id :-
          </Typography>
          <Typography
            variant="body1"
            fontWeight={"bold"}
            fontFamily={"Comfortaa, cursive"}
            color={"#254061"}
            m={2}
          >
            Contact Number :-
          </Typography>
          <Typography
            variant="body1"
            fontWeight={"bold"}
            fontFamily={"Comfortaa, cursive"}
            color={"#254061"}
            m={2}
          >
            Tuition Class Address :-
          </Typography>
          <Typography
            variant="body1"
            fontWeight={"bold"}
            fontFamily={"Comfortaa, cursive"}
            color={"#254061"}
            m={2}
          >
            Tuition Class Name :- 
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
             
            >
              View More
            </Button>
          </Stack>
        </Paper>
      </Stack>
    </>
  );
}

export default StudentAfterHome