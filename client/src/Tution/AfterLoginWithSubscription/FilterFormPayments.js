import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import React, { useEffect, useState } from "react";
import { Button, Stack, Typography } from "@mui/material";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { checkFilteredData, filterAppliedStudents } from "../../Store/thunk";
import { clearFilterAppliedStudents } from "../../Store/student";

const FilterFormPayments = ({ token }) => {
  const [feesStatus, setFeesstatus] = useState("None");
  const [name, setName] = useState("");
  const dispatch = useDispatch();

  const handleFilters = async () => {
    try {
      if (feesStatus !== "None" || name !== "") {
        // console.log(keywords);
        const response = await axios.post(
          `/api/v1/tuition/get-filtered-feesBased-students/${token}`,
          { feesStatus, name }
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
        // showToast("ERROR", "Please Apply Filter");
        dispatch(checkFilteredData(false));
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
        <Typography>Fees Status</Typography>
        <div>
          <Select
            value={feesStatus ? feesStatus : "None"}
            onChange={(e) => {
              setFeesstatus(e.target.value);
            }}
          >
            <MenuItem value="None">None...</MenuItem>
            <MenuItem value={"Pending"}>Pending</MenuItem>
            <MenuItem value={"Paid"}>Paid</MenuItem>
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
            setFeesstatus("None");
            setFeesstatus("None");
            setName("");
            dispatch(clearFilterAppliedStudents());
            dispatch(checkFilteredData(false));
          }}
        >
          Reset
        </Button>

        {/* </FormControl> */}
      </Stack>
    </>
  );
};

export default FilterFormPayments;
