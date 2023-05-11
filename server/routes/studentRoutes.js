import express from "express";
import { getStudentDetailsController, getTuitionDetailsController } from "../controllers/studentController.js";

const router = express.Router();
//get solo student details
router.get("/student-details/:token", getStudentDetailsController);
//get tuitionDetails
router.get("/get-tuition-details/:id",getTuitionDetailsController)
export default router;
