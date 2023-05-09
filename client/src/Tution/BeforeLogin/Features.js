import { Box, Stack } from "@mui/material";
import React from "react";
import '../../Home/HomeForAll.css'
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
                    sm: "100%",
                    xs: "100%",
                  },
                  maxWidth: {
                    lg: 300,
                    md: "40%",
                    sm: "100%",
                    xs: "100%",
                  },
                }}
                justifyContent="center"
                alignItems="center"
              >
                <img
                  src={src}
                  alt=""
                  className="imgClas"
                  style={{
                    width: "100%",
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
            <hr
              style={{
                backgroundColor: "#254061",
                width: "40%",
                height: "3px",
                borderRadius: "10px",
                opacity: "20%",
                margin:"auto"
              }}
            ></hr>
          </div>
        );
      })}
    </>
  );
};

export default Features;
