import mongoose, { Schema, Document } from "mongoose";

export interface User extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  isProfileCompleted: boolean;
  isEmailVerified: boolean;
  updatedAt: Date;
  createdAt: Date;
}

const userSchema: Schema = new Schema(
  {
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
    },
    isProfileCompleted: {
      type: Boolean,
      default: false,
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<User>("weather", userSchema);
