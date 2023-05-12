import express from "express";
import { brainTreePaymentController, brainTreeTokenController } from "../controllers/paymentController.js";
const router = express.Router();
router.get("/braintree/token",brainTreeTokenController)
router.post("/braintree/payment",brainTreePaymentController)
export default router;
