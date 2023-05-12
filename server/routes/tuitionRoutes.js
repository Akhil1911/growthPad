import express from "express";
import { confirmStudentController, getFilteredStudentsController, getStudentController, getTuitionDetailController, removeStudentController, updateTuitionProfileController } from "../controllers/authControllers.js";
import {isTutionSubscribed, requireSignIn} from "../middlewares/authMiddleware.js"


const router = express.Router();

//get all students
router.get("/students-list/:token", getStudentController)

//update || confirm student
router.put(
  "/confirm-students/:id",
  confirmStudentController
);

//delete || delete-student
router.delete(
  "/remove-student/:id",
  removeStudentController
);

//update || tuition profile
router.put("/update-profile", updateTuitionProfileController)

//get tuition details
router.get("/get-tuition-detail/:token", getTuitionDetailController)


//get || filter students
router.post("/get-filtered-students/:token", getFilteredStudentsController);
export default router;
