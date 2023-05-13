import React, { useState, useEffect } from "react";
import NavBar from "./NavBar";
import {
  Button,
  Container,
  Paper,
  Stack,
  TextField,
  TextareaAutosize,
  Typography,
} from "@mui/material";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { showToast } from "../../Tools/showToast";
const QnA = () => {
  const cookies = new Cookies();
  const navigate = useNavigate();
  const [studProfile, setstudProfile] = useState([]);
  const [tuiProfile, settuiProfile] = useState([]);
  const [queList, setqueList] = useState([]);
  const [que, setque] = useState("");
  const getDetails = async () => {
    const response = await axios.get(
      `/api/v1/student/student-details/${cookies.get("stutoken")}`
    );
    setstudProfile(response.data.student);
    const id = response.data.student.tuition_db_id;
    const response1 = await axios.get(
      `/api/v1/student/get-tuition-details/${id}`
    );
    settuiProfile(response1.data.tuition);
  };
  const submitQuestion = async () => {
    const student_id = studProfile._id;
    const { name, email } = studProfile;
    const tuition_db_id = tuiProfile._id;
    // console.log(student_id,name,email,tuition_db_id)
    // console.log(que)
    const response = await axios.post(`/api/v1/student/submit-question`, {
      student_id,
      name,
      email,
      tuition_db_id,
      que,
    });
    if (response.data.success) {
      showToast("SUCCESS", response.data.message);
      getQuestion();
      setque("");
    }
  };
  const getQuestion = async () => {
    // console.log("get details")
    const response = await axios.get(
      `/api/v1/student/student-view-question/${cookies.get("stutoken")}`
    );
    // console.log(response.data)
    setqueList(response.data.questions);
    // console.log(queList);
  };
  useEffect(() => {
    document.title = "Student - QnA";
    if (localStorage.getItem("stutoken")) {
      let token = localStorage.getItem("stutoken");
      cookies.set("stutoken", token);
      getDetails();
      getQuestion();
    } else {
      navigate("/studentlogin");
    }
  }, []);
  return (
    <>
      <NavBar />
      <Container>
        <Stack
          direction={{
            lg: "row",
            md: "row",
            sm: "column",
            xs: "column",
          }}
          spacing={2}
          mt={4}
          justifyContent={"center"}
          alignContent={"center"}
        >
          <Typography mt={1} variant="h5" color="#254061">
            Question:-{" "}
          </Typography>
          <TextField
            name="question"
            placeholder="Enter Your Question..."
            variant="outlined"
            sx={{
              width: "100%",
              marginTop: "10px",
            }}
            value={que}
            onChange={(e) => {
              setque(e.target.value);
            }}
          />
          <Button
            disabled={que === "" ? true : false}
            onClick={submitQuestion}
            variant="contained"
            color="darkColor"
            sx={{ color: "white" }}
          >
            Submit
          </Button>
        </Stack>
        {queList
          ? queList.map((value, index) => {
              return (
                <Stack
                  mb={5}
                  direction={{
                    lg: "column",
                    md: "column",
                    sm: "column",
                    xs: "column",
                  }}
                  spacing={2}
                  mt={4}
                  justifyContent={"center"}
                  alignContent={"center"}
                  key={index}
                  minHeight={100}
                >
                  <Paper
                    justifyContent={"center"}
                    alignContent={"center"}
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      minHeight: 240,
                      backgroundColor: "#ebf4fa",
                      border: "1px#254061",
                      borderRadius: "20px",
                    }}
                    elevation={10}
                  >
                    <Typography mt={1} variant="h5" color="#254061">
                      Question {index + 1}
                    </Typography>
                    <TextField
                      label="Question"
                      name="question"
                      variant="outlined"
                      sx={{
                        width: "75%",
                        marginTop: "10px",
                      }}
                      value={value.question}
                    />
                    <TextField
                      label="Answer"
                      name="answer"
                      variant="standard"
                      sx={{
                        width: "75%",
                        marginTop: "10px",
                        marginBottom: 5,
                      }}
                      value={value.answer}
                    />
                  </Paper>
                </Stack>
              );
            })
          : null}
      </Container>
    </>
  );
};

export default QnA;
