import mongoose, { Schema, Document, mongo } from "mongoose";
import { Shop } from "../shop/shop.model";
import { User } from "../user/user.model";

export interface Rating extends Document {
  shop: mongoose.Schema.Types.ObjectId | Shop;
  user: mongoose.Schema.Types.ObjectId | User;
  rating: number;
  review: string;
  createdAt: Date;
  updatedAt: Date;
}

const ratingSchema: Schema = new mongoose.Schema<Rating>(
  {
    shop: {
      type: mongoose.Schema.Types.ObjectId,
    },
    user: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      trim: true,
      min: 1,
      max: 5,
    },
    review: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<Rating>("rating", ratingSchema);
