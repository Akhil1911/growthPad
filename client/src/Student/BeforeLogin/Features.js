import { Box, Stack } from "@mui/material";
import React from "react";
import "../../Home/HomeForAll.css";
const Features = ({ ary }) => {
  return (
    <>
      {ary.map((value, i) => {
        const { src, title, description, leftImage } = value;
        return (
          <div key={i}>
            <Stack
              direction={
                leftImage
                  ? {
                      lg: "row",
                      md: "row",
                      sm: "column",
                      xs: "column",
                    }
                  : {
                      lg: "row-reverse",
                      md: "row-reverse",
                      sm: "column",
                      xs: "column",
                    }
              }
              justifyContent="space-around"
              alignItems={"center"}
              spacing={2}
            >
              <Box
                sx={{
                  minWidth: {
                    lg: 300,
                    md: "40%",
                    sm: "80%",
                    xs: "80%",
                  },
                  maxWidth: {
                    lg: 300,
                    md: "40%",
                    sm: "80%",
                    xs: "80%",
                  },
                }}
                justifyContent="center"
                alignItems="center"
                textAlign={"center"}
                margin={"1rem"}
              >
                <img
                  src={src}
                  alt=""
                  className="imgClas"
                  style={{
                    width: "50%",
                    textAlign: "center",
                  }}
                />
              </Box>
              <Stack justifyContent={"center"} alignItems={"center"}>
                <h1
                  style={{ color: "#254061" }}
                  className="joinusas"
                >
                  {title}
                </h1>
                <p
                  style={{
                    textAlign: "center",
                    padding: "2px",
                    color: "#254061",
                  }}
                >
                  {description}
                </p>
              </Stack>
            </Stack>
          </div>
        );
      })}
    </>
  );
};

export default Features;
