import mongoose, { Document, Schema } from "mongoose";

const razorpayAuthorizationURLSchema: Schema = new mongoose.Schema({});

export default mongoose.model(
  "razorpay-oauth-history",
  razorpayAuthorizationURLSchema
);
