import { Request, Response } from "express";
import httpStatus from "http-status";
import HttpResponse from "../../utils/httpResponse";
import { Otp } from "./otp.model";
import { User } from "./user.model";
import * as userService from "./user.service";
import moment from "moment";

export async function sendOTP(req: Request, res: Response) {
  const { phone } = req.body;
  const user: User | null = await userService.getUserbyPhone(phone);
  if (user && user.isBlocked) {
    new HttpResponse(
      res,
      httpStatus.BAD_REQUEST,
      "Your account is blocked,Please contact admin"
    );
  }

  const previousOTPData = await userService.getOTPByPhone(phone);
  if (previousOTPData) {
    const lastSentTime = moment(previousOTPData.createdAt);
    const diffrence = lastSentTime.diff(moment.now(), "seconds");
    if (diffrence <= parseInt(process.env.OTP_EXPIRATION_SECONDS!)) {
      new HttpResponse(
        res,
        httpStatus.BAD_REQUEST,
        `Please wait ${process.env.OTP_REQUEST_AFTER_SECONDS} seconds for another OTP_EXPIRATION_SECONDS`
      );
    }
  }

  let otp = 123456;
  let data = "test315f-6d5f-40f9-fake-response";
  // const sendRealOTP = await settingService.getSettingValueBySettingName(
  //   "sendRealOTP"
  // );
  // if (sendRealOTP && sendRealOTP === "Yes") {
  //   otp = Math.floor(100000 + Math.random() * 900000);
  //   // data = await smsHelper.sendOTP(phone, otp);
  // }

  if (!data) {
    new HttpResponse(res, httpStatus.OK, "OTP not sent,Please try again");
  }
  const response: Otp = await userService.saveOTP(phone, otp);
  if (!response) {
    new HttpResponse(
      res,
      httpStatus.OK,
      "There is some error, Please try again"
    );
  }
  new HttpResponse(res, httpStatus.OK, "OTP sent successfully", {
    error: false,
    message: data,
  });
}

export async function verifyOTP(req: Request, res: Response) {
  const { phone, otp: enteredOtp, deviceType, notificationToken } = req.body;

  let user: User | null = await userService.getUserbyPhone(phone);
  if (user && user.isBlocked) {
    new HttpResponse(res, httpStatus.BAD_REQUEST, "User is blocked");
  }

  const otp: Otp | null = await userService.getOTPByPhone(phone);
  if (!otp) {
    new HttpResponse(
      res,
      httpStatus.BAD_REQUEST,
      "No OTP generated for this phone number"
    );
  }

  const isOTPVerified = await userService.verifyOTP(phone, enteredOtp);
  if (!isOTPVerified) {
    new HttpResponse(res, httpStatus.BAD_REQUEST, "OTP is not verified");
  }

  // OTP Verified successfully
  // Register user if its not found in database
  // Create access token and update in user record

  await userService.deleteOTPByPhone(phone);

  if (!user) {
    // if user is not registered, then register the user
    const userObj = {
      phone,
      deviceType,
      notificationToken,
    };
    user = await userService.registerUser(userObj);
  } else {
    const { _id: userId } = user;

    // if user is registered, then update the user data
    const userObj = {
      deviceType,
      notificationToken,
    };
    user = await userService.updateUserById(userId, userObj);
  }
  const isProfileCompleted = user!.name.length > 0;
  const token: string = userService.generateAuthToken(user!);
  user!.authenticationToken = token;
  user?.save();
  new HttpResponse(res, httpStatus.OK, "User login successfull", {
    user,
    token,
    isProfileCompleted,
  });
}
