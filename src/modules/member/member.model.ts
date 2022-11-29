import mongoose, { Schema, Document } from "mongoose";
import { Room } from "../room/room.model";
import { Shop } from "../shop/shop.model";
import { User } from "../user/user.model";

export enum MemberRoleEnum {
  Member = "member",
  Admin = "admin",
  SubAdmin = "subadmin",
}

export enum MemberStatus {
  Left = "left",
  Joined = "joined",
  Blocked = "blocked",
}

export interface Member extends Document {
  room: mongoose.Schema.Types.ObjectId | Room;
  user: mongoose.Schema.Types.ObjectId | User;
  shop: mongoose.Schema.Types.ObjectId | Shop;
  role: MemberRoleEnum;
  status: MemberStatus;
  isDeleted: boolean;
}

const memberSchema: Schema = new mongoose.Schema<Member>({
  room: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  shop: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  role: {
    type: String,
    enum: MemberRoleEnum,
    required: true,
  },
  status: {
    type: String,
    enum: MemberStatus,
    required: true,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

export default mongoose.model<Member>("member", memberSchema);
