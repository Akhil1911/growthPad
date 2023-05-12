import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const storeTuition = createAsyncThunk(
  "tuition/storeTuition",
  async (data) => {
    try {
      //tuition protected routes || token checking (in tools sectioin)
      // console.log(data.user);
      return {
        tuition: data.user,
      };
    } catch (error) {
      throw error;
    }
  }
);

export const storeStudent = createAsyncThunk(
  "student/storeStudent",
  async (data) => {
    // console.log(data);
    try{
      return {
        student: data.student,
        filteredStudents:data.students
      };
    }
    catch(error){
      throw error;
    }
  }
)
export const filteredStudents = createAsyncThunk(
  "student/filteredStudents",
  async (data) => {
    // console.log(data);
    try{
      return {
        filteredStud:data.students
      };
    }
    catch(error){
      throw error;
    }
  }
)
export const filterAppliedStudents = createAsyncThunk(
  "student/filterAppliedStudents",
  async (data) => {
    // console.log(data);
    try {
      return {
        filterAppliedStud: data.students,
      };
    } catch (error) {
      throw error;
    }
  }
);

