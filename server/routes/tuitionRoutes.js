import express from "express";
import { confirmStudentController, getStudentController, removeStudentController } from "../controllers/authControllers.js";
import {requireSignIn} from "../middlewares/authMiddleware.js"


const router = express.Router();

//get all students
router.get("/students-list", getStudentController)

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

export default router;
