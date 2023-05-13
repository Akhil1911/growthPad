import React,{useEffect} from 'react'
import StudentBeforeAppbar from "./StudentBeforeAppbar";
import Features from './Features'
import StudentRegister from './StudentRegister';
import CheckingStuTokens from '../../Tools/CheckingStuTokens';

const StudentBeforeLogin = () => {
  useEffect(() => {
    document.title = "Student - Home";
  },[])
    const featureAry = [
      {
        src: "../images/QnA.png",
        title: "QnA Facility",
        description: "Students can ask question to their respective tuition classes and can get answer",
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
      <CheckingStuTokens/>
      <StudentBeforeAppbar  />
      <StudentRegister />
      <h1 style={{ color: "#254061", textAlign: "center" }}>Login To Access</h1>
      <Features ary={featureAry} />
    </>
  );
}

export default StudentBeforeLogin