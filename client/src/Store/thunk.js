import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const storeTuition = createAsyncThunk(
  "tuition/storeTuition",
  async (data) => {
    try {
      //tuition protected routes || token checking (in tools sectioin)
      return {
        tuition: data.user,
        token: data.token,
      };
    } catch (error) {
      throw error;
    }
  }
);
