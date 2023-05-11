import React from 'react'
import StudentBeforeAppbar from "./StudentBeforeAppbar";
import Features from './Features'
import StudentRegister from './StudentRegister';

const StudentBeforeLogin = () => {
    const featureAry = [
      {
        src: "../images/notice.png",
        title: "View Notice",
        description: "Students can view notice provided by their tuitions",
        leftImage: true,
      },
      {
        src: "../images/rupee.png",
        title: "Pay Fees",
        description: "Student Can Pay Fees online",
        leftImage: false,
      },
      {
        src: "../images/interact.png",
        title: "Interact With Teacher",
        description: "Students can interact with teachers and get their doubts solved easily and frequently",
        leftImage: true,
      },
    ];
  return (
    <>
      <StudentBeforeAppbar  />
      <StudentRegister />
      <h1 style={{ color: "#254061", textAlign: "center" }}>Login To Access</h1>
      <Features ary={featureAry} />
    </>
  );
}

export default StudentBeforeLogin