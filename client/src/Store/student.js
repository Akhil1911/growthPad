import { createSlice } from "@reduxjs/toolkit";
import { storeStudent } from "./thunk";

export const StudentSlice = createSlice({
  name: "student",
  initialState: {
    student: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

      //storing student after login
      .addCase(storeStudent.fulfilled, (state, action) => {
        state.student = action.payload.student;
      });
  },
});

export default StudentSlice.reducer;
