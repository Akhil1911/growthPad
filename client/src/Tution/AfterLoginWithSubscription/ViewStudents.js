
import React,{useEffect} from 'react'
import SidebarWithAppbar from './SidebarWithAppbar';
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import FilterForm from './FilterForm';
import { showToast } from '../../Tools/showToast';
import axios from 'axios';
const ViewStudents = () => {
 
  const navigate = useNavigate();
  const cookies = new Cookies();

  const getStudents = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_URL_LINK}/api/v1/student/student-details/${cookies.get("subtoken")}`
      );
      console.log(response);
    } catch (error) {
      showToast("ERROR","Error...")
    }
  }

  useEffect(() => {
    if (localStorage.getItem("subtoken")) {
      cookies.set("subtoken", localStorage.getItem("subtoken"))
      getStudents();
    } else if (localStorage.getItem("token")) {
      navigate("/tuition/home");
    } else {
      navigate(-1);
    }
  }, []);

 
  return (
    <>
      <SidebarWithAppbar />
      <FilterForm/>
    </>
  );
}

export default ViewStudents