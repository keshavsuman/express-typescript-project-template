import mongoose, { Schema } from "mongoose";

export enum CategoryPositionEnum {
  Top = "top",
  Bottom = "bottom",
  Regular = "regular",
}

export interface Category extends Document {
  name: string;
  position: CategoryPositionEnum;
  order: number;
  sequence: number;
  image: string;
}

const categorySchema: Schema = new mongoose.Schema<Category>(
  {
    name: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      maxlength: 50,
    },
    position: {
      type: String,
      required: true,
      enum: CategoryPositionEnum,
      trim: true,
    },
    order: {
      type: Number,
      required: true,
      trim: true,
    },
    sequence: {
      type: Number,
      required: true,
      trim: true,
      default: 0,
    },
    image: {
      type: String,
      trim: true,
      // default: config.app.defaultPlaceholderImage,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<Category>("category", categorySchema);
