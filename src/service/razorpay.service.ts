import mongoose, { ObjectId } from "mongoose";
import Razorpay from "razorpay";
import { UserModel } from "../models";
import CryptoJS from "crypto-js";
import userModel, { User } from "../models/user.model";

/**
 * @description this function is used to create a payment using razorpay
 * @param {Number} amount
 * @param {Number} currency
 * @author Keshav suman
 * @returns {Promise<Array>}
 */
export async function createOrder(
  userId: mongoose.Types.ObjectId,
  amount: Number,
  currency: string
) {
  const user: User | null = await userModel.findById(userId, {
    razorpayKeyId: 1,
    razorpayKeySecret: 1,
  });
  // console.log(user);
  const razorpay = new Razorpay({
    key_id: user?.razorpayKeyId,
    key_secret: user?.razorpayKeySecret,
  });

  return await razorpay.orders.create({
    amount: amount,
    currency: currency,
  });
}

/**
 * @description This function is used to saveRazorpay credentials in database
 * @param {ObjectId} userId
 * @param {String} keyId
 * @param {String} keySecret
 * @returns {Promise<Object>}
 * @author keshav suman
 */
export async function saveClientCredentials(
  userId: mongoose.Types.ObjectId,
  keyId: string,
  keySecret: string
) {
  // const encryptedKeyId = CryptoJS.AES.encrypt(
  //   keyId,
  //   process.env.razorpayEncryptonKey!
  // );
  // const encryptedKeySecret = CryptoJS.AES.encrypt(
  //   keySecret,
  //   process.env.RazorpayEncryptionKey!
  // );

  return await UserModel.findByIdAndUpdate(
    userId,
    {
      razorpayKeyId: keyId,
      razorpayKeySecret: keySecret,
    },
    { new: true }
  );
}
