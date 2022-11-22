import mongoose, { Schema } from "mongoose";

export enum DeviceType {
  ANDROID = "android",
  IOS = "ios",
}

const notificationSchema: Schema = new mongoose.Schema({
  title: {
    type: String,
  },
  content: {
    type: String,
  },
  senderId: {
    type: String,
  },
  recieverId: {
    type: String,
  },
});

export default mongoose.model("notification", notificationSchema);
