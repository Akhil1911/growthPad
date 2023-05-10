import express from "express";
import {
  authTuitionController,
  loginController,
  registerController,
  stdRegisterController,
  studentLoginController,
  studentTestController,
  testController,
} from "../controllers/authControllers.js";
import {
  requireSignIn,
  isTutionSubscribed,
  isStudentConfirmed,
} from "../middlewares/authMiddleware.js";

const router = express.Router();

//Tuitioin Class Registration Route
router.post("/register", registerController);
//Tuition class login
router.post("/login", loginController);
//Student Register
router.post("/studentregister", stdRegisterController);
//Studen login
router.post("/studentlogin", studentLoginController);
//test routes
router.get("/test", requireSignIn, isTutionSubscribed, testController);
//test student routes
router.get("/sTest", requireSignIn, isStudentConfirmed, studentTestController);
//authenticate tuition
router.get("/auth-tuition/:token", authTuitionController); 
export default router;
