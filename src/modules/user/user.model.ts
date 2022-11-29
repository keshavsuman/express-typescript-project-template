import mongoose, { Schema, Document } from "mongoose";

export interface User extends Document {}

export enum Role {
  User = "user",
  Admin = "admin",
}

export enum DeviceType {
  Android = "android",
  Ios = "ios",
}

export interface User extends Document {
  role: string;
  name: string;
  phone: string;
  profileImage: string;
  about: string;
  status: string;
  deviceType: DeviceType;
  notificationToken: string;
  authenticationToken: string | undefined;
  lastLogin: Date;
  isBlocked: boolean;
  isActive: boolean;
}

const userSchema: Schema = new Schema<User>(
  {
    role: {
      type: String,
      enum: Role,
      default: "user",
      private: true,
    },
    name: {
      type: String,
      trim: true,
      maxlength: 50,
      default: "",
    },
    phone: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 10,
      maxlength: 10,
      validate: {
        validator(v: any) {
          return /\d{10}/.test(v);
        },
        message: (props: any) => `${props.value} is not a valid phone number!`,
      },
    },
    profileImage: {
      type: String,
      trim: true,
      //   default: config.user.defaultImage,
    },
    about: {
      type: String,
      trim: true,
      maxlength: 250,
    },
    // status: {
    //   type: Boolean,
    //   trim: true,
    //   default: true,
    // },
    deviceType: {
      type: String,
      enum: DeviceType,
      required: true,
      trim: true,
    },
    // sendNotification: {
    //   type: Boolean,
    //   trim: true,
    //   default: true,
    // },
    notificationToken: {
      type: String,
      trim: true,
      maxlength: 250,
    },
    authenticationToken: {
      type: String,
      trim: true,
    },
    lastLogin: {
      type: Date,
      trim: true,
      default: Date.now(),
    },
    isBlocked: {
      type: Boolean,
      trim: true,
      default: false,
    },
    isActive: {
      type: Boolean,
      trim: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<User>("user", userSchema);
