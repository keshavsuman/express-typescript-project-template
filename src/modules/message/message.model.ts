import mongoose, { Schema } from "mongoose";
import { Room } from "../room/room.model";
import { User } from "../user/user.model";

export enum MessageTypeEnum {
  Alert = "alert",
  Text = "text",
  Image = "image",
  Audio = "audio",
  Video = "video",
  Document = "document",
}

export interface Message extends Document {
  room: mongoose.Schema.Types.ObjectId | Room;
  user: mongoose.Schema.Types.ObjectId | User;
  type: MessageTypeEnum;
  text: string;
  isReply: boolean;
}

const messageSchema: Schema = new mongoose.Schema<Message>({
  room: {
    type: mongoose.Schema.Types.ObjectId,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
  },
  type: {
    type: String,
    required: true,
    enum: MessageTypeEnum,
    trim: true,
    default: MessageTypeEnum.Text,
  },
  text: {
    type: String,
    trim: true,
  },
  isReply: {
    type: Boolean,
    default: false,
  },
});

export default mongoose.model<Message>("message", messageSchema);
