import React, { useEffect, useState } from "react";
import AdminAppbar from "./AdminAppbar";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Button, Container } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { showToast } from "../Tools/showToast";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
const ViewAllTuitions = () => {
  const cookies = new Cookies();
  const navigate = useNavigate();
  const [allTuitions, setAllTuitions] = useState([]);

  const getTuitions = async () => {
    const response = await axios.get(`/api/v1/admin/all-tuitions`);
    if (response.data.success) {
      setAllTuitions(response.data.allTuitions);
    }
  };

  const handleDelete = async (email, name) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this profile?"
    );
    if (confirm) {
      const response = await axios.delete(
        `/api/v1/auth/delete-tuition-profile/${email}`
      );
      if (response.data.success) {
        showToast("SUCCESS", `${name + " Deleted Successfully"}`);
        getTuitions();
      }
    }
  };

  useEffect(() => {
    document.title = "Admin - Home";
    getTuitions();
    if (localStorage.getItem("admintoken")) {
      cookies.set("admintoken", localStorage.getItem("admintoken"));
    } else {
      navigate(-1);
    }
  }, []);
  return (
    <>
      <AdminAppbar />
      <Container>
        <TableContainer sx={{ mt: 4 }}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell
                  sx={{
                    fontWeight: "bold",
                    fontFamily: "Montserrat",
                    fontSize: "large",
                  }}
                  align="center"
                >
                  Sr No
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: "bold",
                    fontFamily: "Montserrat",
                    fontSize: "large",
                  }}
                  align="center"
                >
                  Name
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: "bold",
                    fontFamily: "Montserrat",
                    fontSize: "large",
                  }}
                  align="center"
                >
                  Email
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: "bold",
                    fontFamily: "Montserrat",
                    fontSize: "large",
                  }}
                  align="center"
                >
                  Address
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: "bold",
                    fontFamily: "Montserrat",
                    fontSize: "large",
                  }}
                  align="center"
                >
                  Mobile No.
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: "bold",
                    fontFamily: "Montserrat",
                    fontSize: "large",
                  }}
                  align="center"
                >
                  Tuition Name
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: "bold",
                    fontFamily: "Montserrat",
                    fontSize: "large",
                  }}
                  align="center"
                >
                  Tuition ID
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: "bold",
                    fontFamily: "Montserrat",
                    fontSize: "large",
                  }}
                  align="center"
                >
                  Subscribed
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: "bold",
                    fontFamily: "Montserrat",
                    fontSize: "large",
                  }}
                  align="center"
                >
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {allTuitions?.map((value, index) => (
                <TableRow
                  key={value._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="center">{index + 1}</TableCell>
                  <TableCell align="center">{value.name}</TableCell>
                  <TableCell align="center">{value.email}</TableCell>
                  <TableCell align="center">{value.address}</TableCell>
                  <TableCell align="center">{value.phone_number}</TableCell>
                  <TableCell align="center">
                    {value.tuition_class_name}
                  </TableCell>
                  <TableCell align="center">{value.tuition_id}</TableCell>
                  <TableCell align="center">
                    {value.subscribed ? "YES" : "NO"}
                  </TableCell>
                  <TableCell align="center">
                    <Button
                      color="error"
                      variant="contained"
                      onClick={() => {
                        handleDelete(value?.email, value?.name);
                      }}
                    >
                      <DeleteIcon />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </>
  );
};

export default ViewAllTuitions;
