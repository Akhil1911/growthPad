import React from "react";
import BeforeAppbar from "./BeforeAppbar";
import Features from "./Features";
import RegisterNow from "./RegisterNow";
import CheckingTokens from "../../Tools/CheckingTokens";

const BeforeLogin = () => {

  const featureAry = [
    {
      src: "./images/QnA.png",
      title: "QnA Chat Area",
      description:
        "Teacher can solve doubts of any student from anywhere and at anytime",
      leftImage: true,
    },
    {
      src: "./images/ManageFees.png",
      title: "Fees Management",
      description:
        "Fees are managed in an organized manner, who had paid fees whoes is remaining etc can be handled and manage here",
      leftImage: false,
    },
    {
      src: "./images/Notice2.png",
      title: "Upload Notice",
      description:
        "Upload notice is our one of the finest feature which is useful to upload notice at one click and can be viewed by students. If tuition teacher feels the notice provided is wrong then they can delete or update the notice",
      leftImage: true,
    },
    {
      src: "./images/materialAdd.png",
      title: "Upload Materials",
      description:
        "Upload materials is our one of the finest feature which is useful to upload materials at one click and can be viewed by students. If tuition teacher feels the material provided is wrong then they can delete or update the notice",
      leftImage: false,
    },
  ];
  return (
    <>
      <CheckingTokens/>
      <BeforeAppbar />
      <RegisterNow />
      <h1 style={{ color: "#254061", textAlign: "center" }}>Features of ASK</h1>
      <Features ary={featureAry} />
    </>
  );
};

export default BeforeLogin;
