import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import React, { useEffect, useState } from "react";
import { Button, Stack, Typography } from "@mui/material";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { checkFilteredData, filterAppliedStudents } from "../../Store/thunk";
import { clearFilterAppliedStudents } from "../../Store/student";
import { showToast } from "../../Tools/showToast";

const FilterForm = ({ token, getStudents }) => {
  const [confirm, setConfirm] = useState("None");
  const [feesstatus, setFeesstatus] = useState("None");
  const [standard, setStandard] = useState("None");
  const [name, setName] = useState("");
  const dispatch = useDispatch();

  const handleFilters = async () => {
    try {
      if (
        confirm !== "None" ||
        feesstatus !== "None" ||
        standard !== "None" ||
        name !== ""
      ) {
        // console.log(keywords);
        const response = await axios.post(
          `${process.env.REACT_APP_URL_LINK}/api/v1/tuition/get-filtered-students/${token}`,
          { confirm, standard, name }
        );
        if (response.data.success) {
          if (response.data.students.length === 0) {
            // showToast("ERROR", "No Data Found");
            dispatch(checkFilteredData(true));
          } else {
            dispatch(checkFilteredData(false));
          }
          dispatch(filterAppliedStudents(response.data.students));
        }
      } else {
        showToast("ERROR", "Please Apply Filter");
      }
    } catch (error) {}
  };

  return (
    <>
      <Stack
        direction={{
          lg: "row",
          md: "row",
          sm: "column",
          xs: "column",
        }}
        justifyContent="flex-start"
        alignItems="center"
        spacing={2}
        m={4}
      >
        {/* <FormControl sx={{ m: 1, minWidth: 120 }}> */}
        <Typography variant="h4" fontFamily={"Montserrat"} color={"#254061"}>
          Filters
        </Typography>
        <div>
          <TextField
            label="Name Of Student"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </div>
        <Typography>Confirmation</Typography>
        <div>
          <Select
            value={confirm ? confirm : "None"}
            onChange={(e) => {
              setConfirm(e.target.value);
            }}
          >
            <MenuItem value="None">None</MenuItem>
            <MenuItem value={"true"}>Confirm</MenuItem>
            <MenuItem value={"false"}>Not Confirmed</MenuItem>
          </Select>
        </div>
        <Typography>Standard</Typography>
        <div>
          <Select
            value={standard ? standard : "None"}
            onChange={(e) => {
              setStandard(e.target.value);
            }}
          >
            <MenuItem value="None">None</MenuItem>
            <MenuItem value={1}>1</MenuItem>
            <MenuItem value={2}>2</MenuItem>
            <MenuItem value={3}>3</MenuItem>
            <MenuItem value={4}>4</MenuItem>
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={6}>6</MenuItem>
            <MenuItem value={7}>7</MenuItem>
            <MenuItem value={8}>8</MenuItem>
            <MenuItem value={9}>9</MenuItem>
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={11}>11</MenuItem>
            <MenuItem value={12}>12</MenuItem>
          </Select>
        </div>
        <Typography>Fees Status</Typography>
        <div>
          <Select
            value={feesstatus ? feesstatus : "None"}
            onChange={(e) => {
              setFeesstatus(e.target.value);
            }}
            disabled
          >
            <MenuItem value="None">Pending Work...</MenuItem>
            <MenuItem value={"pending"}>Pending</MenuItem>
            <MenuItem value={"paid"}>Paid</MenuItem>
          </Select>
        </div>
        <Button
          variant="contained"
          size={"large"}
          color="success"
          onClick={() => {
            handleFilters();
          }}
        >
          Submit
        </Button>
        <Button
          variant="contained"
          size={"large"}
          color="error"
          onClick={() => {
            setConfirm("None");
            setFeesstatus("None");
            setStandard("None");
            setName("");
            dispatch(clearFilterAppliedStudents());
            dispatch(checkFilteredData(false))
          }}
        >
          Reset
        </Button>

        {/* </FormControl> */}
      </Stack>
    </>
  );
};

export default FilterForm;
