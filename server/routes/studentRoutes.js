import express from "express";
import { deleteStudentAccountController, getStudentDetailsController, getTuitionDetailsController, updateStudentProfileController } from "../controllers/studentController.js";
import { getStudentController } from "../controllers/authControllers.js";

const router = express.Router();
//get solo student details
router.get("/student-details/:token", getStudentController);
//get tuitionDetails
router.get("/get-tuition-details/:id", getTuitionDetailsController)
//put || update studnet
router.put("/update-student-profile", updateStudentProfileController);
//delete || delete student account
router.delete("/delete-student-account/:email",deleteStudentAccountController)
export default router;
