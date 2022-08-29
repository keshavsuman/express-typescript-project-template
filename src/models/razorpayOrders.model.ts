import mongoose, { Schema, Document } from "mongoose";

export interface RazorpayOrder extends Document {
  orderId: string;
  amount: number;
  entity: string;
  amount_paid: number;
  currency: string;
  reciept: string;
  offer_id: string;
  attempts: number;
  orderCreatedAt: number;
  updatedAt: Date;
  createdAt: Date;
}

const razorpayOrderSchema: Schema = new Schema(
  {
    orderId: {
      type: String,
    },
    amount: {
      type: Number,
    },
    entity: {
      type: String,
    },
    amount_paid: {
      type: Number,
    },
    currency: {
      type: String,
    },
    reciept: {
      type: String,
    },
    offer_id: {
      type: String,
    },
    status: {
      type: String,
    },
    attempts: {
      type: Number,
    },
    notes: {
      type: [],
    },
    orderCreatedAt: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<RazorpayOrder>(
  "razorpayOrder",
  razorpayOrderSchema
);
