import { Response } from "express";
import httpStatus from "http-status";

export default class HttpResponse {
  constructor(
    res: Response,
    statusCode: number,
    message: string,
    data?: any,
    error?: Error
  ) {
    if (
      statusCode === httpStatus.BAD_REQUEST ||
      httpStatus.INTERNAL_SERVER_ERROR
    ) {
      console.log(error);
    }
    res.status(statusCode).send({
      statusCode: statusCode,
      message: message,
      data: data,
    });
  }
}
