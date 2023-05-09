import { configureStore } from "@reduxjs/toolkit"
import TuitionSlice  from "./tuition"
export const store = configureStore({
  reducer: {
    tuition: TuitionSlice,
  },
});