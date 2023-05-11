import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import React, { useState } from "react";
import { Button, Stack, Typography } from "@mui/material";

const FilterForm = () => {
  const [confirm, setConfirm] = useState("None");
  const [feesstatus, setFeesstatus] = useState("None");
  const [standard, setStandard] = useState("None");
  const [keywords, setKeywords] = useState("");
  return (
    <>
      <Stack
        direction="row"
        justifyContent="flex-start"
        alignItems="center"
        spacing={3}
        m={4}
      >
        {/* <FormControl sx={{ m: 1, minWidth: 120 }}> */}
        <Typography variant="h4" fontFamily={"Montserrat"} color={"#254061"}>
          Filters
        </Typography>
        <div>
          <TextField
            label="Search Student"
            value={keywords}
            onChange={(e) => {
              setKeywords(e.target.value);
            }}
          />
        </div>
        <Typography>Confirmation</Typography>
        <div>
          <Select
            defaultValue={confirm}
            onChange={(e) => {
              setConfirm(e.target.value);
            }}
          >
            <MenuItem value="None">None</MenuItem>
            <MenuItem value={"confirm"}>Confirm</MenuItem>
            <MenuItem value={"not confirmed"}>Not Confirmed</MenuItem>
          </Select>
        </div>
        <Typography>Standard</Typography>
        <div>
          <Select
            defaultValue={standard}
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
            defaultValue={feesstatus}
            onChange={(e) => {
              setFeesstatus(e.target.value);
            }}
          >
            <MenuItem value="None">None</MenuItem>
            <MenuItem value={"pending"}>Pending</MenuItem>
            <MenuItem value={"paid"}>Paid</MenuItem>
          </Select>
        </div>
        <Button variant="contained" size={"large"} color="success">
          Submit
        </Button>
        <Button variant="contained" size={"large"} color="error">
          Reset
        </Button>

        {/* </FormControl> */}
      </Stack>
    </>
  );
};

export default FilterForm;
