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
  async(data)=>{
    try{
      return {
        student: data.user,
      };
    }
    catch(error){
      throw error;
    }
  }
)