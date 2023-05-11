import express from "express";
import { getStudentDetailsController } from "../controllers/studentController.js";

const router = express.Router();
//get solo student details
router.get("/student-details/:token", getStudentDetailsController);

export default router;
