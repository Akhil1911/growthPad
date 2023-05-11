import JWT from "jsonwebtoken";
import tuitionModel from "../models/tuitionModel.js";
import studentModel from "../models/studentModel.js";

//get student details controller

export const getStudentDetailsController = async (req, res) => {
  try {
    const { token } = req.params;
    // console.log(token)
    const id = JWT.verify(token, process.env.JSONWEBTOKENKEY);
    // console.log(id)
    const student = await studentModel.findOne({ _id: id });
    // console.log(student)
    res.status(200).send({
      success: true,
      message: "Fetched Successfully",
      student,
    });
  } catch (err) {
    res.status(500).send({
      success: false,
      message: "Error in server",
      err,
    });
  }
};
//get tuintion-details
export const getTuitionDetailsController = async (req, res) => {
  try {
    const { id } = req.params;
    // console.log(id)
    const tuition = await tuitionModel.findOne({ _id: id });
    res.status(200).send({
      success: true,
      message: "Fetched Successfully",
      tuition,
    });
  } catch (err) {
    res.status(500).send({
      success: false,
      message: "Error in server",
      err,
    });
  }
};
