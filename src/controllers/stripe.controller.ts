import { Request, Response } from "express";
import httpStatus from "http-status";
import { StripeService } from "../service";

export async function createPaymentIntent(req: Request, res: Response) {
  try {
    const { amount, currency } = req.body;
    const payment = await StripeService.createPaymentIntent(amount, currency);
    res.status(httpStatus.OK).send({
      data: payment,
    });
  } catch (error) {
    console.log(error);
    res.status(httpStatus.OK).send({
      status: httpStatus.INTERNAL_SERVER_ERROR,
      data: error,
    });
  }
}

export async function createPaymentSession(req: Request, res: Response) {
  try {
    const { productName, currency, amount } = req.body;
    const session = await StripeService.createSession(
      productName,
      currency,
      amount
    );
    res.status(httpStatus.OK).send(session);
  } catch (error) {
    console.log(error);
    res.status(httpStatus.OK).send({
      status: httpStatus.INTERNAL_SERVER_ERROR,
      data: error,
    });
  }
}

export async function createCustomer(req: Request, res: Response) {
  try {
    const { email } = req.body;
    const customer = await StripeService.createCustomer(email);
  } catch (error) {
    console.log(error);
  }
}

export async function createProduct(req: Request, res: Response) {
  try {
    const product = await StripeService.createProduct();
  } catch (error) {
    console.log(error);
  }
}

export async function createPrice(req: Request, res: Response) {
  try {
  } catch (error) {
    console.log(error);
  }
}

export async function success(req: Request, res: Response) {
  res.send("Success");
}

export async function failed(req: Request, res: Response) {
  res.send("Failed");
}
