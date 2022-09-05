import mongoose, { Schema, Document } from "mongoose";

export enum PaymentGatewayEnum {
  Stripe = "stripe",
  Razorpay = "razorpay",
}

export enum PaymentStatus {
  Pending = "pending",
  Completed = "completed",
  Cancelled = "cancelled",
  Failed = "failed",
  default = "default",
}

export interface PaymentOrder extends Document {
  invoice: object;
  payment_gateway: PaymentGatewayEnum;
  orderId: string;
  amount: number;
  entity: string;
  amount_paid: number;
  currency: string;
  reciept: string;
  offer_id: string;
  attempts: number;
  orderCreatedAt: number;
  success_url: string;
  failure_url: string;
  updatedAt: Date;
  createdAt: Date;
}

const paymentOrderSchema: Schema = new Schema(
  {
    invoice: {
      type: Object,
      required: true,
    },
    orderId: {
      type: String,
      required: true,
    },
    payment_gateway: {
      type: String,
      enum: PaymentGatewayEnum,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    entity: {
      type: String,
    },
    amount_paid: {
      type: Number,
    },
    currency: {
      type: String,
      required: true,
    },
    reciept: {
      type: String,
    },
    offer_id: {
      type: String,
    },
    status: {
      type: String,
      enum: PaymentStatus,
      default: PaymentStatus.Pending,
    },
    success_url: {
      type: String,
    },
    failure_url: {
      type: String,
    },
    payment_url: {
      type: String,
      required: true,
    },
    attempts: {
      type: Number,
    },
    notes: {
      type: [],
    },
    orderCreatedAt: {
      type: Number,
      default: Date.now(),
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<PaymentOrder>("paymentOrder", paymentOrderSchema);
