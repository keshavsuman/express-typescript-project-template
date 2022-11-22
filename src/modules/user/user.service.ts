import { ObjectId } from "mongoose";
import otpModel, { Otp } from "./otp.model";
import userModel, { User } from "./user.model";
import jwt from "jsonwebtoken";

/**
 * @description This function is used to create the user
 * @param {any} createUserDto
 * @returns {Promise<User>}
 * @author Keshav suman
 */
export async function registerUser(createUserDto: any): Promise<User> {
  const data = await userModel.create(createUserDto);
  return data;
}

/**
 * @description this function is used to update the user by Id
 */
export async function updateUserById(userId: ObjectId, updatedUserDto: any) {
  return await userModel.findByIdAndUpdate(userId, updatedUserDto, {
    new: true,
  });
}

/**
 * @description This Function is used to get the user by phone Number
 * @param {Number} phone
 * @returns {Promise<User|null>  }
 * @author Keshav suman
 */
export async function getUserbyPhone(phone: string): Promise<User | null> {
  return await userModel.findOne({
    phone,
  });
}

/**
 * @description This function is used to get the OTP By phone number
 * @param {Number} phone
 * @returns {Promise<Object>}
 * @author Keshav suman
 */
export async function getOTPByPhone(phone: number) {
  return await otpModel.findOne({
    phone,
  });
}
/**
 * @description This function is used to delete ths OTP By phone number
 * @param {number} phone
 * @returns {Promise<number>}
 */
export async function deleteOTPByPhone(phone: number): Promise<boolean> {
  const otp = await otpModel.deleteMany({ phone });
  // return otp;
  return true;
}

/**
 * @description This function is used to generate the Auth token
 * @param {User} user
 * @returns {string}
 * @author Keshav suman
 */
export function generateAuthToken(user: User): string {
  const token = jwt.sign(user, process.env.JWT_SECRET!);
  return token;
}
/**
 * @description this function is used to create entry in OTP
 * @param {number} phone
 * @param {number} otp
 * @returns {Promise<Otp>}
 * @author Keshav suman
 */
export async function saveOTP(phone: number, otp: number): Promise<Otp> {
  return await otpModel.create({
    phone,
    otp,
    expiredAt: Date.now(),
  });
}

export async function verifyOTP(phone: number, otp: number): Promise<boolean> {
  return true;
}
