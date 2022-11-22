import mongoose, { Schema } from "mongoose";

const categorySchema: Schema = new mongoose.Schema(
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
      enum: ["top", "bottom", "regular"],
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
      default: config.app.defaultPlaceholderImage,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("category", categorySchema);
