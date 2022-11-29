import mongoose, { Document, Schema } from "mongoose";
import { Shop } from "../shop/shop.model";
import { User } from "../user/user.model";

export enum RoomStatus {
  Active = "active",
  Dissolved = "dissolved",
}

export interface Room extends Document {
  shop: mongoose.Schema.Types.ObjectId | Shop;
  user: mongoose.Schema.Types.ObjectId | User;
  isGroup: boolean;
  openToAll: boolean;
  lastMessageAt: Date;
  status: RoomStatus;
}

const roomSchema: Schema = new mongoose.Schema<Room>(
  {
    shop: {
      // shop ref for which the chat room is created
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Shop",
      required: true,
    },
    user: {
      // user who creates the chat room
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
      required: true,
    },
    isGroup: {
      // this will be true if the chat room is created for group chat, for personal chat it will be false
      type: Boolean,
      required: true,
      trim: true,
    },
    openToAll: {
      type: Boolean,
      trim: true,
      default: false,
    },
    lastMessageAt: {
      type: Date,
      trim: true,
      default: Date.now(),
    },
    status: {
      type: String,
      enum: RoomStatus,
      trim: true,
      default: RoomStatus.Active,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<Room>("room", roomSchema);
