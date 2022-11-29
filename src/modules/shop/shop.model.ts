import mongoose, { Document } from "mongoose";

export interface Shop extends Document {
  room: mongoose.Schema.Types.ObjectId;
  category: mongoose.Schema.Types.ObjectId;
  subcategory: Array<mongoose.Schema.Types.ObjectId>;
  keywords: Array<string>;
  user: mongoose.Types.ObjectId;
  coverImage: string;
  image: string;
  catalogueImage: string;
  name: string;
  contactNumber: string;
  reason: string;
  address: string;
  manualAddress: string;
  location: any;
  openingHour: string;
  closingHour: string;
  nonWorkingDay: string;
  offerType: string;
  offerFlat: number;
  offerPrice: number;
  isDeleted: Boolean;
  totalMembers: number;
  totalRating: number;
  averageRating: number;
  status: string;
  city: mongoose.Schema.Types.ObjectId;
  state: mongoose.Schema.Types.ObjectId;
  zipcode: number;
  deletedBy: mongoose.Schema.Types.ObjectId;
}

const shopSchema = new mongoose.Schema<Shop>({
  room: {
    // RoomId of shop
    type: mongoose.Schema.Types.ObjectId,
    ref: "Room",
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  subcategory: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "SubCategory",
      },
    ],
  },
  keywords: [
    {
      type: String,
      required: true,
      trim: true,
    },
  ],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  coverImage: {
    type: String,
    required: true,
    trim: true,
    maxlength: 250,
    default: process.env.defaultCoverImage,
  },
  image: {
    type: String,
    required: true,
    trim: true,
    maxlength: 250,
    default: process.env.defaultImage,
  },
  catalogueImage: {
    type: String,
    trim: true,
    default: process.env.defaultImage,
  },
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100,
  },
  contactNumber: {
    type: String,
    required: true,
    trim: true,
    maxlength: 10,
  },
  reason: {
    type: String,
    trim: true,
    maxlength: 500,
  },
  address: {
    type: String,
    required: true,
    trim: true,
    maxlength: 250,
  },
  manualAddress: {
    type: String,
    required: true,
    trim: true,
    maxlength: 250,
  },
  location: {
    type: {
      type: String,
      enum: ["Point"],
      required: true,
    },
    coordinates: {
      type: [Number], // [ longitude, latitude ]
      required: true,
    },
  },
  openingHour: {
    type: String,
    required: true,
    trim: true,
    maxlength: 10,
  },
  closingHour: {
    type: String,
    required: true,
    trim: true,
    maxlength: 10,
  },
  nonWorkingDay: {
    type: String,
    required: true,
    enum: [
      "None",
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ],
    trim: true,
  },
  offerType: {
    type: String,
    enum: ["none", "todayOffer", "freeDelivery", "freeTrial"],
    trim: true,
    default: "none",
  },
  offerFlat: {
    // The value in this field will be percentage(1-100) if offerType is todayOffer, for freeDelivery it will be distance(1-9999), and for freeTrial it will be numberOfSessions(1-99). All value must be in numbers.
    type: Number,
    trim: true,
    default: 0,
  },
  offerPrice: {
    // This field is required only for todayOffer and freeDelivery. The value must be in numbers(1-99999)
    type: Number,
    trim: true,
    default: 0,
  },
  isDeleted: {
    type: Boolean,
    trim: true,
    default: false,
  },
  totalMembers: {
    type: Number,
    trim: true,
    default: 1,
  },
  totalRating: {
    type: Number,
    trim: true,
    default: 0,
  },
  averageRating: {
    type: Number,
    trim: true,
    default: 0,
  },
  status: {
    type: String,
    trim: true,
    default: "pending",
    enum: ["pending", "active", "inactive", "rejected", "accept"],
  },
  city: {
    type: String,
  },
  state: {
    type: String,
  },
  zipcode: {
    type: Number,
  },
  deletedBy: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User",
  },
});

export default mongoose.model<Shop>("shop", shopSchema);
