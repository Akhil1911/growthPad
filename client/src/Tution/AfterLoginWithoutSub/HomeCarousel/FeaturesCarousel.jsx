import React from "react";
import Slider from "react-slick";
import { Carousel_settings } from "./FeaturesCarouselFunc";
import "./Features-Carousel.css";
import { Stack, Button,Typography } from "@mui/material";

const HomeCarousel = ({ featuresData }) => { //Home
  return (
    <>
      <div>
        <Typography
          textAlign={"center"}
          sx={{ wordWrap: "break-word" }}
          variant="h3"
          color="#254061"
          mt={5}
        >
          What ASK Provides
        </Typography>
      </div>
      <div
        className="container"
        style={{
          margin: "0 auto",
          padding: "40px",
        }}
      >
        {/* {Carousel_settings} from "./FeaturesCarouselFunc"; */}
        <Slider {...Carousel_settings}>
          {featuresData.map((val, index) => {
            return (
              <div key={index}>
                <Stack
                  direction={{
                    lg: "row",
                    md: "row",
                    sm: "column",
                    xs: "column",
                  }}
                  justifyContent={"space-evenly"}
                  alignItems={"center"}
                  m={2}
                  mb={4}
                >
                  <img
                    width={"300px"}
                    height={"300px"}
                    style={{ objectFit: "contain" }}
                    src={val.image}
                    alt="..."
                  />

                  <Stack direction={"column"} alignItems={"center"} spacing={4}>
                    <h3>{val.title}</h3>
                    <Button
                      sx={{ borderColor: "#254061", color: "#254061" }}
                      variant="outlined"
                    >
                      {val.btnName}
                    </Button>
                  </Stack>
                </Stack>
              </div>
            );
          })}
        </Slider>
      </div>
    </>
  );
};

export default HomeCarousel;
