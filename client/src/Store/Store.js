import { configureStore } from "@reduxjs/toolkit"
import TuitionSlice  from "./tuition"
import StudentSlice from "./student";
export const store = configureStore({
  reducer: {
    tuition: TuitionSlice,
    student: StudentSlice,
  },
});