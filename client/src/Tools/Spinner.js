import React,{useState,useEffect} from 'react'
import Box from "@mui/material/Box";
import { useNavigate } from 'react-router-dom';
import { Typography } from '@mui/material';

const Spinner = () => {
    
    const naviagate = useNavigate();
    const [count, setCount] = useState(5)

    useEffect(() => {
        const interval = setInterval(() => {
            setCount((prevValue) => --prevValue)
        }, 1000);
        count === 0 && naviagate(`/`)
        return () => clearInterval(interval)
    },[count,naviagate])

  return (
    <Box
      textAlign={"center"}
      height={"100vh"}
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <img
        src="../images/401Chor.png"
        alt="ERROR 404,Page Not Found"
        height={"400px"}
        width={"400px"}
      />
      <Typography variant="h4" color={"#254061"} fontFamily={"Montserrat,sans-serif"}>
        Redirecting To Home Page in {count} seconds
      </Typography>
    </Box>
  );
}

export default Spinner