import { Request, Response } from "express";
import httpStatus from "http-status";
import mongoose from "mongoose";
import { SettingsService } from "../service";

export async function getSettings(req: Request, res: Response) {
  const userId = res.get("userId");
  const settings = await SettingsService.getSettings(
    new mongoose.Types.ObjectId(userId)
  );
  res.status(httpStatus.OK).send({
    status: httpStatus.OK,
    message: "Settings fetched Successfully",
    data: settings,
  });
}

export async function updateSettings(req: Request, res: Response) {
  const userId = res.get("userId");
  const updateObj: any = req.body;
  const settings = await SettingsService.updateSettings(
    new mongoose.Types.ObjectId(userId),
    updateObj
  );
  res.status(httpStatus.OK).send({
    status: httpStatus.OK,
    message: "Settings updated Successfully",
    data: settings,
  });
}
