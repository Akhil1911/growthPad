import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import InstagramIcon from "@mui/icons-material/Instagram";
import { Facebook, GitHub, LinkedIn, Twitter } from "@mui/icons-material";

const Footer = () => {
  return (
    <>
      <Box sx={{ width: "100%", backgroundColor: "#254061", color: "white" }}>
        <Stack
          spacing={3}
          direction={{
            lg: "row",
            md: "row",
            sm: "column",
            xs: "column",
          }}
          justifyContent={"space-between"}
          alignItems={"center"}
          padding={3}
        >
          <Typography sx={{ fontSize: "larger" }}>
            Copyright © {new Date().getFullYear()} ASK, India
          </Typography>

          <Stack
            spacing={3}
            direction={"row"}
            alignItems={"center"}
          >
            <InstagramIcon />
            <Facebook />
            <GitHub />
            <LinkedIn />
            <Twitter />
          </Stack>
        </Stack>
      </Box>
    </>
  );
};

export default Footer;
