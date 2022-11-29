import mongoose, { Schema, Document } from "mongoose";

export interface Otp extends Document {
  phone: number;
  otp: number;
  createdAt: Date;
  updatedAt: Date;
  expiredAt: Date;
}

const otpSchema: Schema = new Schema<Otp>(
  {
    phone: {
      type: Number,
      required: true,
      trim: true,
    },
    otp: {
      type: Number,
      required: true,
      trim: true,
    },
    expiredAt: {
      type: Date,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<Otp>("otp", otpSchema);
