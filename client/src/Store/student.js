import { createSlice } from "@reduxjs/toolkit";
import { filterAppliedStudents, filteredStudents, storeStudent } from "./thunk";

export const StudentSlice = createSlice({
  name: "student",
  initialState: {
    student: null,
    filteredStudents: [],
    filterAppliedStudents: [],
  },
  reducers: {
    clearFilteredStudents: (state) => {
      state.filteredStudents = [];
    },
    clearFilterAppliedStudents: (state) => {
      state.filterAppliedStudents = [];
    },
  },
  extraReducers: (builder) => {
    builder

      //storing student after login
      .addCase(storeStudent.fulfilled, (state, action) => {
        state.student = action.payload.student;
      })
      .addCase(filteredStudents.fulfilled, (state, action) => {
        state.filteredStudents = action.payload.filteredStud;
      })
      .addCase(filterAppliedStudents.fulfilled, (state, action) => {
        state.filterAppliedStudents = action.payload.filterAppliedStud;
      });
  },
});
export const { clearFilteredStudents, clearFilterAppliedStudents } =
  StudentSlice.actions;
export default StudentSlice.reducer;
