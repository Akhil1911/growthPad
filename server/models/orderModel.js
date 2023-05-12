import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    payment: {},
    tuition_id: {
      type: String,
      default: "",
    },
    student_id: {
      type: String,
      default: "",
    },
    status: {
      type: String,
      default: "Not Process",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
