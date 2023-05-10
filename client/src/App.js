import React from 'react'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Routing from './Routing';
// import SettingState from './Tools/SettingState';
const App = () => {
  return (
    <>
      <Routing />
      <ToastContainer />
      {/* <SettingState/> */}
    </>
  );
}

export default App