import { Response } from "express";
import httpStatus from "http-status";

export default class HttpResponse {
  constructor(
    res: Response,
    statusCode: number,
    message: string,
    data?: any,
    error?: any
  ) {
    res.status(statusCode).send({
      statusCode: statusCode,
      message: message,
      data: data,
    });
  }
}
