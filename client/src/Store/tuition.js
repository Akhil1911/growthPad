import { createSlice } from "@reduxjs/toolkit";
import { storeTuition } from "./thunk";


export const TuitionSlice = createSlice({
  name: "tuition",
  initialState: {
    tuition: null,
    token: "",
  },
  reducers: {
    clearTuition: (state) => {
      // console.log("Inside Clear");
          state.tuition = null;
          state.token = "";
    },
  },
  extraReducers: (builder) => {
    builder

      //storing student after login
      .addCase(storeTuition.fulfilled, (state, action) => {
        state.tuition = action.payload.tuition;
        state.token = action.payload.token;
        // console.log(state.tuition);
      });
  },
});

export const {clearTuition} = TuitionSlice.actions
export default TuitionSlice.reducer;