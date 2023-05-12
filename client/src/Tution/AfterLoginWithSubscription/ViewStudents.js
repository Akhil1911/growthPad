import React, { useEffect, useState } from "react";
import SidebarWithAppbar from "./SidebarWithAppbar";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import FilterForm from "./FilterForm";
import { showToast } from "../../Tools/showToast";
import { useDispatch, useSelector } from "react-redux";
import { filteredStudents, storeStudent } from "../../Store/thunk";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Container, Grid, Modal, Paper, Stack, TextField } from "@mui/material";
import axios from "axios";
import { clearFilterAppliedStudents, clearFilteredStudents } from "../../Store/student";

const ViewStudents = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cookies = new Cookies();
  const studentList = useSelector((state) => state.student.filteredStudents);
  const checkData = useSelector((state) => state.student.noDataFound);
  const [fees, setFees] = useState(0);
  const [studentArray, setStudentArray] = useState([]);

  const filterAppliedStud = useSelector(
    (state) => state.student.filterAppliedStudents
  );

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
  };

  const getStudents = async () => {
    try {
      const response = await axios.get(
        `${
          process.env.REACT_APP_URL_LINK
        }/api/v1/tuition/students-list/${cookies.get("subtoken")}`
      );
      // console.log(response);
      dispatch(filteredStudents(response.data));
    } catch (error) {
      showToast("ERROR", "Error...");
    }
  };

  useEffect(() => {
    document.title = "Tuition - View Students"
    if (localStorage.getItem("subtoken")) {
      cookies.set("subtoken", localStorage.getItem("subtoken"));
      getStudents();
    } else if (localStorage.getItem("token")) {
      navigate("/tuition/home");
    } else {
      navigate(-1);
    }
     return () => {
       dispatch(clearFilteredStudents());
       dispatch(clearFilterAppliedStudents());
     };
  }, []);

  const [open, setOpen] = React.useState(false);
  const [modalId, setmodalId] = useState(null);
  const [modalName, setmodalName] = useState("");
  const [modalFees, setmodalFees] = useState(0);
  const [modalConfirm, setmodalConfirm] = useState(false);
  const handleOpen = (id, name, fees, confirn) => {
    setOpen(true);
    setmodalId(id);
    setmodalName(name);
    setmodalFees(fees);
    setmodalConfirm(confirn);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleFees = async () => {
    setOpen(false);
    if (modalFees > 0) {
      const response = await axios.put(
        `${process.env.REACT_APP_URL_LINK}/api/v1/tuition/confirm-students/${modalId}`,
        { modalFees }
      );
      if (response.data.success) {
        getStudents();
        navigate("/tuition/subscribed/view-students");
        showToast("SUCCESS", `${response.data.message}`);
      }
    } else {
      showToast("ERROR", "Please Enter Valid Fees");
      setOpen(true);
    }
  };

  const handleDelete = async (id, name) => {
    const confirm = window.confirm(`Are you sure you want to delete ${name}?`);
    if (confirm) {
      const response = await axios.delete(
        `${process.env.REACT_APP_URL_LINK}/api/v1/tuition/remove-student/${id}`
      );
      if (response.data.success) {
        getStudents();
        navigate("/tuition/subscribed/view-students");
        showToast("SUCCESS", `${response.data.message}`);
      }
    }
  };

  // console.log(filterAppliedStud);

  useEffect(() => {
    if (filterAppliedStud.length > 0) {
      setStudentArray(filterAppliedStud);
      // console.log(studentArray);
    } else if (filterAppliedStud.length === 0) {
      if (checkData) {
        setStudentArray([]);
      } else {
        setStudentArray(studentList);
      }
      // console.log(studentArray);
    }
  }, [filterAppliedStud, studentList, studentArray, setStudentArray]);

  return (
    <>
      <SidebarWithAppbar />
      <FilterForm token={cookies.get("subtoken")} />
      <Container>
        <Grid container direction={"row"}>
          {studentArray?.map((value, index) => (
            <Grid
              item
              xs={12}
              sm={12}
              md={4}
              lg={4}
              sx={{ padding: 2 }}
              key={value._id}
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Paper
                sx={{ minWidth: 300, maxWidth: 320, minHeight: 400 }}
                elevation={10}
              >
                <Card sx={{ minWidth: 300, maxWidth: 320, minHeight: 400 }}>
                  {" "}
                  <CardContent>
                    <Typography
                      variant="body1"
                      mb={1}
                      color="text"
                      gutterBottom
                    >
                      Name: {value.name}
                    </Typography>
                    <Typography variant="body1" mb={1} color="text">
                      Email: {value.email}
                    </Typography>
                    <Typography variant="body1" mb={1}>
                      address: {value.address}
                    </Typography>
                    <Typography variant="body1" mb={1}>
                      Phone number: {value.phone_number}
                    </Typography>
                    <Typography variant="body1" mb={1}>
                      standard: {value.standard}
                    </Typography>
                    <Typography variant="body1" mb={1}>
                      Student_id: {value.student_id}
                    </Typography>
                    <Typography variant="body1" mb={1}>
                      Confirmed: {value.confirm ? "Yes" : "No"}
                    </Typography>
                    <Typography variant="body1" mb={1}>
                      Fees: {value.feesPerMonth}
                    </Typography>
                    <div>
                      {/* <Button onClick={()=>{handleOpen(value._id,value.name,value.feesPerMonth,value.confirm)}}>Open modal</Button> */}
                      <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                      >
                        <Box sx={style}>
                          {/* <form onSubmit={()=>{handleSubmit()}}> */}
                          <Typography
                            id="modal-modal-title"
                            variant="h6"
                            component="h2"
                            mb={2}
                          >
                            Enter Fees for {modalName}
                          </Typography>
                          <TextField
                            required={true}
                            type="number"
                            name="fees"
                            sx={{ mb: 3 }}
                            value={modalFees}
                            label="Fees Per Month"
                            onChange={(e) => {
                              setmodalFees(e.target.value);
                            }}
                          />{" "}
                          <br />
                          <Button
                            variant="contained"
                            type="submit"
                            color="success"
                            onClick={() => {
                              handleFees();
                            }}
                          >
                            Confirm
                          </Button>
                          {/* </form> */}
                        </Box>
                      </Modal>
                    </div>
                    {/* <TextField required sx={{ mt: 2 }} value={fees} name={index}  onChange={(e)=>{setFees(e.target.value)}}  label="Fees"></TextField> */}
                  </CardContent>
                  <CardActions>
                    <Button
                      sx={{ m: "auto" }}
                      mb={3}
                      color="success"
                      variant="contained"
                      size="small"
                      onClick={() => {
                        handleOpen(
                          value._id,
                          value.name,
                          value.feesPerMonth,
                          value.confirm
                        );
                      }}
                    >
                      {value.confirm ? "Update Fees" : "Confirm"}
                    </Button>
                    <Button
                      sx={{ m: "auto" }}
                      mb={3}
                      color="error"
                      variant="contained"
                      size="small"
                      onClick={() => {
                        handleDelete(value._id, value.name);
                      }}
                    >
                      Delete
                    </Button>
                  </CardActions>
                </Card>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
      {checkData || studentArray.length === 0 ? (
        <div className="div">
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
            mb={5}
          >
            <Box>
              <img
                src="../../images/NoData.png"
                alt="welcome home"
                height={"300px"}
                width={"300px"}
              ></img>
            </Box>
            <Typography
              textAlign={"center"}
              variant="h3"
              fontWeight={"bold"}
              fontFamily={"Comfortaa, cursive"}
              color={"#254061"}
            >
             No Data Found
            </Typography>
          </Stack>
        </div>
      ) : null}
    </>
  );
};

export default ViewStudents;
