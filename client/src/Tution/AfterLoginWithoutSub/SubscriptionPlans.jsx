import React, { useState, useEffect } from "react";
import { Button, Box, Stack, Typography, duration } from "@mui/material";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import DoneIcon from "@mui/icons-material/Done";
import "./Styles.css";
import Modal from "@mui/material/Modal";
import { useSelector } from "react-redux";
import DropIn from "braintree-web-drop-in-react";
import { showToast } from "../../Tools/showToast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const SubscriptionPlans = ({ SubscriptionDetails, SubscriptionFeatures }) => {
  const navigate = useNavigate();
  const cookies = new Cookies();
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");
  const tuition_id = useSelector((state) => state.tuition.tuition?.id);
  const [tempId, setTempId] = useState(1);
  const [modalAmount, setmodalAmount] = useState("0");
  const [modalName, setmodalName] = useState("0");
  const [modalDuration, setmodalDuration] = useState("0");
  const [open, setOpen] = React.useState(false);
  const handleOpen = (price,name,duration) => {
    setOpen(true);
    setmodalAmount(price);
    setmodalName(name);
    setmodalDuration(duration)
  };
  const getToken = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_URL_LINK}/api/v1/payment/braintree/token`
      );
      setClientToken(data?.clientToken);
    } catch (error) {
      showToast("ERROR","Something Went Wrong")
    }
  };
  useEffect(() => {
    getToken();
  }, []);
  const handlePayment = async () => {
    try {
      const { nonce } = await instance.requestPaymentMethod();
      const { data } = await axios.post(
        `${process.env.REACT_APP_URL_LINK}/api/v1/payment/braintree/payment`,
        {
          nonce,
          amount: modalAmount,
          tuition_id,
          name: modalName,
          duration:modalDuration,
          student_id: "",
        }
      );

      const response = await axios.put(
        `${process.env.REACT_APP_URL_LINK}/api/v1/tuition/tuition-update-subscribe`,
        { tuition_id }
      );
      if (response.data.success) {
        showToast("SUCCESS", "Payment Completed Successfully ");
        cookies.remove("token");
        localStorage.removeItem("token");
        navigate("/login");
      }
    } catch (error) {
            showToast("ERROR", "Something Went Wrong");

    }
  };
  const handleClose = () => setOpen(false);
  return (
    <>
      <div>
        <Typography
          textAlign={"center"}
          sx={{ wordWrap: "break-word" }}
          variant="h3"
          color="#254061"
          m={5}
        >
          Subscription Plans
        </Typography>
      </div>

      <Stack
        m={"20px 100px"}
        spacing={3}
        justifyContent={"space-evenly"}
        alignItems={"center"}
        direction={{
          lg: "row",
          md: "row",
          sm: "column",
          xs: "column",
        }}
      >
        {SubscriptionDetails.map((value, index) => {
          const { id, name, duration, price, btnName, bgColor } = value;
          const finalPrice = Math.ceil(price / (duration * 12));
          return (
            <div key={index}>
              <Box
                sx={{
                  minWidth: {
                    lg: 250,
                    md: 250,
                    sm: 250,
                    xs: 250,
                  },
                  p: 2,
                  bgcolor: bgColor,
                  color: name === "Platinum" ? "white" : "black",
                }}
                // onClick={() => {
                //   setTempId(id);
                // }}
                onMouseEnter={() => {
                  setTempId(id);
                }}
                className={id === tempId ? "active-class" : "non-acitve-class"} //APP.CSS
              >
                {name === "Gold" ? (
                  <>
                    <Typography variant="h6" mb={1}>
                      <AutoFixHighIcon fontSize="small" /> Most Popular
                    </Typography>
                    <hr />
                  </>
                ) : null}
                <Typography
                  variant="h3"
                  mt={2}
                  sx={{ fontFamily: "Josefin Sans" }}
                >
                  {price}₹
                </Typography>
                ({finalPrice} ₹ Every Month)
                <Typography variant="h4" m={2} fontFamily={"Signika Negative"}>
                  {name}
                </Typography>
                <Typography m={2} variant={"h6"} textAlign={"left"}>
                  <DoneIcon fontSize="small" sx={{ mr: 2 }} />
                  <b>{duration} Year</b>
                  {SubscriptionFeatures.map((val, ind) => (
                    <div key={ind}>
                      <DoneIcon fontSize="small" sx={{ mr: 2 }} />
                      {val.fName} <br />
                    </div>
                  ))}
                </Typography>
                <Button
                  onClick={() => {
                    handleOpen(price,name,duration);
                  }}
                  sx={{ m: "auto" }}
                  variant={"contained"}
                  size="medium"
                >
                  {btnName}
                </Button>
                <Modal
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box sx={style}>
                    <Typography
                      id="modal-modal-title"
                      variant="h6"
                      component="h2"
                    >
                      Pay {modalAmount}
                    </Typography>
                    {!clientToken ? null : (
                      <>
                        <DropIn
                          options={{
                            authorization: clientToken,
                            paypal: {
                              flow: "vault",
                            },
                          }}
                          onInstance={(instance) => setInstance(instance)}
                        />

                        <Button
                          variant="contained"
                          color="darkColor"
                          sx={{ color: "white" }}
                          onClick={handlePayment}
                          disabled={!instance}
                        >
                          Make Payment
                        </Button>
                      </>
                    )}
                  </Box>
                </Modal>
              </Box>
            </div>
          );
        })}
      </Stack>
    </>
  );
};

export default SubscriptionPlans;
