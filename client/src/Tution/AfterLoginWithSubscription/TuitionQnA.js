import React, { useEffect, useState } from "react";
import SidebarWithAppbar from "./SidebarWithAppbar";
import { useDispatch } from "react-redux";
import axios from "axios";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
import { clearTuition } from "../../Store/tuition";
import Modal from "@mui/material/Modal";
import { showToast } from "../../Tools/showToast";
import {
  Stack,
  Box,
  Paper,
  Typography,
  TextField,
  Container,
  Button,
} from "@mui/material";

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
  borderRadius: "10px",
};
const TuitionQnA = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cookies = new Cookies();
  const [queList, setqueList] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [modalId, setmodalId] = useState(null);
  const [modalQuestion, setmodalQuestion] = useState("");
  const [modalAnswer, setmodalAnswer] = useState("");
  const handleOpen = (id, question, answer) => {
    // console.log(id,question,answer)
    setOpen(true);
    setmodalId(id);
    setmodalQuestion(question);
    setmodalAnswer(answer);
    // console.log(modalId,modalQuestion,modalAnswer)
  };
  const handleClose = () => setOpen(false);
  const getQnaList = async () => {
    const response = await axios.get(
      `${
        process.env.REACT_APP_URL_LINK
      }/api/v1/student/student-view-question/${cookies.get("subtoken")}`
    );
    //  console.log(response.data);
    setqueList(response.data.questions);
    //  console.log(queList);
  };
  const handleSubmitAnswer = async () => {
    const response = await axios.put(
      `/api/v1/tuition/tuition-submit-answer/${modalId}`,
      { modalAnswer }
    );
    //
    if (response.data.success) {
      showToast("SUCCESS", response.data.message);
      setOpen(false);
      getQnaList();
    }
    // console.log(response)
  };
  useEffect(() => {
    document.title = "Tuition - QnA";
    if (localStorage.getItem("subtoken")) {
      cookies.set("subtoken", localStorage.getItem("subtoken"));
      getQnaList();
    } else if (localStorage.getItem("token")) {
      navigate("/tuition/home");
    } else {
      navigate(-1);
    }
    return () => {
      dispatch(clearTuition());
    };
  }, []);

  const deleteQuestionHandler = async (_id) => {
    const response = await axios.delete(
      `/api/v1/tuition/tuition-delete-question/${_id}`
    );
    if (response.data.success) {
      showToast("SUCCESS", response.data.message);
      getQnaList();
    }
  };
  /////////////////////////////////////
  // Get Tution Details
  /////////////////////////////////////

  return (
    <>
      <SidebarWithAppbar />
      <Container>
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
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      minHeight: 270,
                      backgroundColor: "#ebf4fa",
                      border: "2px solid #254061",
                      borderRadius: "20px",
                    }}
                    // elevation={10}
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
                      inputProps={{ readOnly: true }}
                    />
                    <TextField
                      label="Answer"
                      name="answer"
                      variant="standard"
                      sx={{
                        width: "75%",
                        marginTop: "10px",
                      }}
                      value={value.answer}
                      inputProps={{ readOnly: true }}
                    />
                    <Modal
                      keepMounted
                      open={open}
                      onClose={handleClose}
                      aria-labelledby="modal-modal-title"
                      aria-describedby="modal-modal-description"
                    >
                      <Box sx={style}>
                        <Stack
                          justifyContent={"center"}
                          alignItems={"center"}
                          direction="column"
                          spacing={2}
                        >
                          <Typography
                            id="modal-modal-title"
                            variant="h4"
                            component="h2"
                            color={"#254061"}
                          >
                            Give Answer
                          </Typography>
                          <TextField
                            id="outlined-basic"
                            label="Question"
                            variant="outlined"
                            value={modalQuestion}
                            sx={{ width: "75%" }}
                            onChange={(e) => {
                              setmodalQuestion(e.target.value);
                            }}
                            inputProps={{
                              readOnly: true,
                            }}
                          />
                          <TextField
                            id="outlined-basic"
                            label="Answer"
                            variant="standard"
                            value={modalAnswer}
                            sx={{ width: "75%" }}
                            onChange={(e) => {
                              setmodalAnswer(e.target.value);
                            }}
                          />
                          <Button
                            variant="contained"
                            color="darkColor"
                            sx={{ color: "white" }}
                            onClick={handleSubmitAnswer}
                          >
                            Submit
                          </Button>
                        </Stack>
                      </Box>
                    </Modal>
                    <Button
                      variant="contained"
                      color="darkColor"
                      sx={{
                        marginTop: "10px",
                        color: "white",
                      }}
                      onClick={() => {
                        handleOpen(value._id, value.question, value.answer);
                      }}
                    >
                      Give Answer
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      sx={{
                        marginTop: "10px",
                        color: "white",
                      }}
                      onClick={() => {
                        deleteQuestionHandler(value._id);
                      }}
                    >
                      Delete
                    </Button>
                  </Paper>
                </Stack>
              );
            })
          : null}
      </Container>
    </>
  );
};

export default TuitionQnA;
