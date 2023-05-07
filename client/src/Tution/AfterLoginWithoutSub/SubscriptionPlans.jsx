import React, { useState } from "react";
import { Button, Box, Stack, Typography } from "@mui/material";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import DoneIcon from "@mui/icons-material/Done";
import "./Styles.css";

const SubscriptionPlans = ({ SubscriptionDetails, SubscriptionFeatures }) => {
  const [tempId, setTempId] = useState(1);

  return (
    <>
      <div>
        <Typography
          textAlign={"center"}
          sx={{ wordWrap: "break-word" }}
          variant="h3"
          color="#254061"
          m={5}
        >
          Subscription Plans
        </Typography>
      </div>

      <Stack
        m={"20px 100px"}
        spacing={3}
        justifyContent={"space-evenly"}
        alignItems={"center"}
        direction={{
          lg: "row",
          md: "row",
          sm: "column",
          xs: "column",
        }}
      >
        {SubscriptionDetails.map((value, index) => {
          const { id, name, duration, price, btnName, bgColor } = value;
          const finalPrice = Math.ceil(price / (duration * 12));
          return (
            <div key={index}>
              <Box
                sx={{
                  minWidth: {
                    lg: 250,
                    md: 250,
                    sm: 250,
                    xs: 250,
                  },
                  p: 2,
                  bgcolor: bgColor,
                  color: name === "Platinum" ? "white" : "black",
                }}
                // onClick={() => {
                //   setTempId(id);
                // }}
                onMouseEnter={() => {
                  setTempId(id);
                }}
                className={id === tempId ? "active-class" : "non-acitve-class"} //APP.CSS
              >
                {name === "Gold" ? (
                  <>
                    <Typography variant="h6" mb={1}>
                      <AutoFixHighIcon fontSize="small" /> Most Popular
                    </Typography>
                    <hr />
                  </>
                ) : null}
                <Typography
                  variant="h3"
                  mt={2}
                  sx={{ fontFamily: "Josefin Sans" }}
                >
                  {price}₹
                </Typography>
                ({finalPrice} ₹ Every Month)
                <Typography variant="h4" m={2} fontFamily={"Signika Negative"}>
                  {name}
                </Typography>
                <Typography m={2} variant={"h6"} textAlign={"left"}>
                  <DoneIcon fontSize="small" sx={{ mr: 2 }} />
                  <b>{duration} Year</b>
                  {SubscriptionFeatures.map((val, ind) => (
                    <div key={ind}>
                      <DoneIcon fontSize="small" sx={{ mr: 2 }} />
                      {val.fName} <br />
                    </div>
                  ))}
                </Typography>
                <Button sx={{ m: "auto" }} variant={"contained"} size="medium">
                  {btnName}
                </Button>
              </Box>
            </div>
          );
        })}
      </Stack>
    </>
  );
};

export default SubscriptionPlans;
