import {
  comparePassword,
  generateStudentId,
  generateTuitionId,
  passwordHashing,
} from "../helper/authHelper.js";
import JWT from "jsonwebtoken";
import tuitionModel from "../models/tuitionModel.js";
import studentModel from "../models/studentModel.js";

//Tuition register controlleer

export const registerController = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      address,
      phone_number,
      tuition_class_name,
      tuition_address,
    } = req.body;
    if (
      !name &&
      !email &&
      !password &&
      !address &&
      !phone_number &&
      !tuition_class_name &&
      !tuition_address
    ) {
      return res.send({
        success: false,
        message: "All Fields are required",
      });
    }
    //existing tuition
    const existingTuition = await tuitionModel.findOne({ email });

    if (existingTuition) {
      return res.status(200).send({
        success: false,
        message: "Already Register",
      });
    }
    const hashPassword = await passwordHashing(password);
    //genrating tuition id
    const tuitionlen = await tuitionModel.find({});
    const length = tuitionlen.length;
    const tuition_id = await generateTuitionId(length, tuition_class_name);
    const tuition = await new tuitionModel({
      name,
      email,
      password: hashPassword,
      address,
      phone_number,
      tuition_class_name,
      tuition_address,
      tuition_id,
    }).save();
    res.status(201).send({
      success: true,
      message: "Registered Succesfully",
      tuition,
    });
  } catch (err) {
    res.status(500).send({
      success: false,
      message: "Error in registration",
      err,
    });
  }
};

//Tuition login controller\
export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email && !password) {
      return res.send({
        success: false,
        message: "All fields are required",
      });
    }
    let userExist = await tuitionModel.findOne({ email });
    if (!userExist) {
      return res.status(200).send({
        success: false,
        message: "Please Register Before Login",
      });
    }
    const match = await comparePassword(password, userExist.password);
    if (!match) {
      return res.status(200).send({
        success: false,
        message: "Password does not match",
      });
    }
    const token = JWT.sign({ _id: userExist._id }, process.env.JSONWEBTOKENKEY);
    const addToken = await tuitionModel.findByIdAndUpdate(
      userExist._id,
      { token },
      { new: true }
    );
    // res.cookie("token", token, {
    //   httpOnly: true,
    //   expires: new Date(Date.now() + 2589200000),
    // });
    return res.status(200).send({
      success: true,
      message: "Login Successfull",
      user: {
        name: userExist.name,
        email: userExist.email,
        phone_number: userExist.phone_number,
        tuition_id: userExist.tuition_id,
        tuition_class_name: userExist.tuition_class_name,
        address: userExist.address,
        tuition_address: userExist.tuition_address,
        _id: userExist._id,
        subscribed: userExist.subscribed,
      },
      token,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: "Error in Login",
      err,
    });
  }
};

//Student Register Controller

export const stdRegisterController = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      address,
      phone_number,
      standard,
      tuition_class_name,
      tuition_id,
      age,
    } = req.body;
    if (
      !name &&
      !email &&
      !password &&
      !address &&
      !phone_number &&
      !tuition_class_name &&
      !tuition_id &&
      !age &&
      !standard 
    ) {
      return res.send({
        success: false,
        message: "All Fields are required",
      });
    }
    //find existing student
    const existingStudent = await studentModel.findOne({ email });
    if (existingStudent) {
      return res.status(200).send({
        success: false,
        message: "Already Register",
      });
    }

    const hashpass = await passwordHashing(password);
    const student_id = await generateStudentId(name, tuition_id);

    const student = await new studentModel({
      name,
      email,
      password: hashpass,
      address,
      phone_number,
      standard,
      tuition_class_name,
      tuition_id,
      student_id,
      age
    }).save();
    return res.status(201).send({
      success: true,
      message: "Register Succesfully",
      student,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: "Error in Registration",
      err,
    });
  }
};

//Student Login Controller

export const studentLoginController = async (req, res) => {
  try {
    const { student_id, email, password } = req.body;
    if (!student_id && !email && !password) {
      return res.send({
        success: false,
        message: "All fields requred",
      });
    }
    let studentExist = await studentModel.findOne({ email, student_id });
    if (!studentExist) {
      return res.status(200).send({
        success: false,
        message: "Please Register before login",
      });
    }
    if (studentExist.confirm) {
      const match = await comparePassword(password, studentExist.password);
      if (!match) {
        return res.status(200).send({
          success: false,
          message: "Invalid email or password",
        });
      }
      const token = JWT.sign(
        { _id: studentExist._id },
        process.env.JSONWEBTOKENKEY
      );
      const addToken = await studentModel.findByIdAndUpdate(
        studentExist._id,
        { token },
        { new: true }
      );
      res.cookie("token", token, {
        httpOnly: true,
        expires: new Date(Date.now() + 2589200000),
      });
      return res.status(200).send({
        success: true,
        message: "Login Successfull",
        user: {
          name: studentExist.name,
          email: studentExist.email,
          phone_number: studentExist.phone_number,
          student_id: studentExist.student_id,
          standard: studentExist.standard,
          tuition_class_name: studentExist.tuition_class_name,
          address: studentExist.address,
          tuition_id: studentExist.tuition_id,
          _id: studentExist._id,
          confirm: studentExist.confirm,
        },
        token,
      });
    } else {
      return res.status(200).send({
        success: false,
        message: "Confirmation pending by tuition class",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: "Error in Login",
      err,
    });
  }
};

// test controller
export const testController = (req, res) => {
  try {
    res.send("Protected Routes");
  } catch (error) {
    console.log(error);
    res.send({ error });
  }
};

//studentTestController
export const studentTestController = (req, res) => {
  try {
    res.send("Welcome Confirmed Student :->");
  } catch (error) {
    console.log(error);
    res.send({ error });
  }
};

// get all Student list
export const getStudentController = async (req, res) => {
  try {
    const students = await studentModel.find({});
    res.status(200).send({
      success: true,
      message: "Successfully Getted",
      students,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in getting students lists",
    });
  }
};

// put  confirm student
export const confirmStudentController = async (req, res) => {
  try {
    const { confirm } = req.body;
    const { id } = req.params;
    const student = await studentModel.findByIdAndUpdate(
      id,
      { confirm },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: " Confirmed Successfully",
      student,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error While Confirming Student",
    });
  }
};

//delete  discrad student
export const removeStudentController = async (req, res) => {
  try {
    const { id } = req.params;
    const student = await studentModel.findByIdAndDelete(id);
    res.status(200).send({
      success: true,
      message: " Deleted Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error While Confirming Student",
    });
  }
};

//verifying tuition || token based
export const authTuitionController = async (req, res) => {
  try {
    const { token } = req.params;
    // console.log(token);
    const id = JWT.verify(token, process.env.JSONWEBTOKENKEY);
    const tuition = await tuitionModel.findOne({ _id:id });
    res.status(200).send({
      user: {
        name: tuition.name,
        email: tuition.email,
        address: tuition.address,
        phone_number: tuition.phone_number,
        tuition_class_name: tuition.tuition_class_name,
        tuition_address: tuition.tuition_address,
        subscribed:tuition.subscribed
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error ....",
    });
  }
};

// put  || update tuition profile
export const updateTuitionProfileController = async (req, res) => {
  try {
    const {
      name,
      email,
      address,
      phone_number,
      tuition_class_name,
      tuition_address,
    } = req.body;
    console.log(email);
    // const tuition = await tuitionModel.findOne({email})
    const tuition = await tuitionModel.findOneAndUpdate(
      {email} , 
      {
        name,
        address,
        phone_number,
        tuition_class_name,
        tuition_address,
      },
      { new: true }
    );
    console.log(tuition);
    res.status(200).send({
      success: true,
      message: " Updated Successfully",
      user: {
        name: tuition.name,
        email: tuition.email,
        address: tuition.address,
        phone_number: tuition.phone_number,
        tuition_class_name: tuition.tuition_class_name,
        tuition_address: tuition.tuition_address,
        subscribed:tuition.subscribed
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In Updating...",
    });
  }
};

// get || tuition details
export const getTuitionDetailController = async (req, res) => {
  try {
    const { token } = req.params;
    // console.log(token);
     const id = JWT.verify(token, process.env.JSONWEBTOKENKEY);
    const tuition = await tuitionModel.findOne({ _id: id });
    res.status(200).send({
      success: true,
      message: "Fetched Successfully",
      tuition
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error In Fetching Details...",
    });
  }
}
