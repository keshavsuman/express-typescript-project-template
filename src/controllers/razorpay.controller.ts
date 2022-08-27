import { Request, Response } from "express";
import httpStatus from "http-status";
import mongoose from "mongoose";
import { RazorpayService } from "../service";

export async function createOrder(req: Request, res: Response) {
  try {
    const { amount, currency } = req.body;
    const data = await RazorpayService.createOrder(
      new mongoose.Types.ObjectId(res.get("userId")),
      amount,
      currency
    );
    res.status(httpStatus.CREATED).send({
      message: "Order created successfully",
      data: data,
      status: httpStatus.CREATED,
    });
  } catch (error) {
    console.log(error);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error);
  }
}

export async function saveRazorpayCredentials(req: Request, res: Response) {
  try {
    const { keyId, keySecret } = req.body;
    const userId = res.get("userId");
    const data = await RazorpayService.saveClientCredentials(
      new mongoose.Types.ObjectId(userId),
      keyId,
      keySecret
    );
    res.status(httpStatus.OK).send({
      status: httpStatus.OK,
      message: "Razorpay credentials saved successfully",
      data: data,
    });
  } catch (error) {
    console.log(error);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error);
  }
}
