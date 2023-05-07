import React from 'react'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Routing from './Routing';
const App = () => {
  return (
    <>
      <Routing />
      <ToastContainer />
    </>
  );
}

export default App