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

//update studentiya profile
export const updateStudentProfileController = async (req, res) => {
  try {
    const { name, email, address, phone_number } = req.body;
    const student = await studentModel.findOneAndUpdate({ email }, { name, address, phone_number }, { new: true });
    res.status(200).send({
      success: true,
      message: "Updated Successfully",
      student
    })
    
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in Updating",
      error,
    });
  }
}

//delete student account
export const deleteStudentAccountController = async (req,res) => {
  try {
    const {email} = req.params
    const student = await studentModel.findOneAndDelete({ email })   
    res.status(200).send({
      success: true,
      message: "Deleted Successfully",
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in Deleting Account",
      error,
    });
  }
}