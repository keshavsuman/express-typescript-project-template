import mongoose, { Schema } from "mongoose";

export interface SubCategory extends Document {
  categoryId: mongoose.Schema.Types.ObjectId;
  name: string;
  image: string;
  keywords: Array<string>;
}

const subCategorySchema: Schema = new mongoose.Schema<SubCategory>(
  {
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 50,
    },
    image: {
      type: String,
      trim: true,
      // default: config.app.defaultPlaceholderImage,
    },
    keywords: [
      {
        type: String,
        trim: true,
        maxlength: 250,
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<SubCategory>("subCategory", subCategorySchema);
