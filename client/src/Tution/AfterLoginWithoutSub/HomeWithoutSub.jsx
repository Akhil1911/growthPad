import React, { useEffect } from "react";
import HomeAppBar from "./HomeAppBar";
import HomeCarousel from "./HomeCarousel/FeaturesCarousel";
import SubscriptionPlans from "./SubscriptionPlans";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import Cookies from "universal-cookie";
import { storeTuition } from "../../Store/thunk";
import { clearTuition } from "../../Store/tuition";

const HomeWithoutSub = () => {
  const dispatch = useDispatch();
  const getSettingState = async () => {
    let temptoken = localStorage.getItem("token");
    cookies.set("token", temptoken);
    const response = await axios.get(
      `${process.env.REACT_APP_URL_LINK}/api/v1/auth/auth-tuition/${cookies.get(
        "token"
      )}`
    );
    if (response.data) {
      dispatch(storeTuition(response.data));
    }
  };

  const navigate = new useNavigate();
  const cookies = new Cookies();
  useEffect(() => {
    if (localStorage.getItem("token")) {
      getSettingState();
    } else if (localStorage.getItem("subtoken")) {
      navigate("/tuition/subscribed/home");
    } else {
      navigate(-1);
    }
    return () => {
      dispatch(clearTuition());
    };
  }, []);

  const featuresData = [
    {
      image: "../images/ManageFees.png",
      title: "Fees Management",
      btnName: "Take Subscription",
    },
    {
      image: "../images/Notice2.png",
      title: "Add Notice",
      btnName: "Take Subscription",
    },
    {
      image: "../images/QnA.png",
      title: "QnA Chat Area",
      btnName: "Take Subscription",
    },
    {
      image: "../images/materialAdd.png",
      title: "Upload Materials",
      btnName: "Take Subscription",
    },
  ];

  const SubscriptionDetails = [
    {
      id: 0,
      name: "Silver",
      duration: "1",
      price: "4999",
      btnName: "Purchase Plan",
      bgColor: "lightblue",
    },
    {
      id: 1,
      name: "Gold",
      duration: "2",
      price: "9999",
      btnName: "Purchase Plan",
      bgColor: "#d8d8d8",
    },
    {
      id: 2,
      name: "Platinum",
      duration: "3",
      price: "11999",
      btnName: "Purchase Plan",
      bgColor: "#146d78",
    },
  ];

  const SubscriptionFeatures = [
    {
      fName: "Manage Fees ",
    },
    {
      fName: "Add Notice",
    },
    { fName: "QnA Chat Area" },
  ];

  return (
    <>
      <HomeAppBar />
      <HomeCarousel featuresData={featuresData} />
      <SubscriptionPlans
        SubscriptionDetails={SubscriptionDetails}
        SubscriptionFeatures={SubscriptionFeatures}
      />
      <Footer />
    </>
  );
};

export default HomeWithoutSub;
