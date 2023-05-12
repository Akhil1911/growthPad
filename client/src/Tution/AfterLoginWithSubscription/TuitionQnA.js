import React,{useEffect,useState} from 'react'
import SidebarWithAppbar from './SidebarWithAppbar'
import { useDispatch } from "react-redux";
import axios from "axios";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
import { clearTuition } from "../../Store/tuition";
import Modal from "@mui/material/Modal";
import { Stack,Box , Paper, Typography, TextField, Container, Button} from '@mui/material';
const TuitionQnA = () => {
     const dispatch = useDispatch();
     const navigate = useNavigate();
     const cookies = new Cookies();
     const [queList, setqueList] = useState([])
     const [open, setOpen] = React.useState(false);
     const handleOpen = () => setOpen(true);
     const handleClose = () => setOpen(false);
    const getQnaList = async()=>{
         const response = await axios.get(
           `${
             process.env.REACT_APP_URL_LINK
           }/api/v1/student/student-view-question/${cookies.get("subtoken")}`
         );
         console.log(response.data);
         setqueList(response.data.questions);
         console.log(queList);
    }

     useEffect(() => {
       if (localStorage.getItem("subtoken")) {
        cookies.set("subtoken",localStorage.getItem("subtoken"))
        getQnaList()
       } else if (localStorage.getItem("token")) {
         navigate("/tuition/home");
       } else {
         navigate(-1);
       }
       return () => {
         dispatch(clearTuition());
       };
     }, []);

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
                    justifyContent={"center"}
                    alignContent={"center"}
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      minHeight: 240,
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
                    <Modal
                      open={open}
                      onClose={handleClose}
                      aria-labelledby="modal-modal-title"
                      aria-describedby="modal-modal-description"
                    >
                      <Box>
                        <Typography
                          id="modal-modal-title"
                          variant="h6"
                          component="h2"
                        >
                          Text in a modal
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                          Duis mollis, est non commodo luctus, nisi erat
                          porttitor ligula.
                        </Typography>
                      </Box>
                    </Modal>
                    <Button
                      variant="contained"
                      color="darkColor"
                      sx={{
                        marginTop: "10px",
                        color: "white",
                      }}
                      onClick={handleOpen}
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
}

export default TuitionQnA