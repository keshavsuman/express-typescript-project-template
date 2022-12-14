import { Stripe } from "stripe";
import mongoose from "mongoose";
import { SettingsModel } from "../models";

enum PaymentModeEnum {
  PAYMENT = "payment",
  SUBSCRIPTION = "subscription",
  SETUP = "setup",
}

export async function createPaymentIntent(
  amount: number,
  currency: string,
  keySecret: string,
  success_url: string,
  failure_url: string
) {
  // Create a PaymentIntent with the order amount and currency
  const stripe = new Stripe(keySecret, {
    apiVersion: "2022-08-01",
  });
  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount,
    currency: currency,
    automatic_payment_methods: {
      enabled: true,
    },
  });
  return paymentIntent;
}

/**
 * @description This function is used to Create a customer at stripe
 * @param email
 * @returns {Promise<Object>}
 * @author Keshav suman
 */
export async function createCustomer(email: string) {
  const stripe = new Stripe(
    "sk_test_51LcA81SCGtvotFzJmkd9YS7clchQVR9BGehPsi8Q9Mxf6U5gYSLZp6fIis9emIq6Oxk1vwN4EHEUtIHCHxNKUh8I00qLkPoeqL",
    {
      apiVersion: "2022-08-01",
    }
  );
  const customer = await stripe.customers.create({
    email: email,
  });
  console.log(customer);
  return customer;
}

/**
 * @description This function is used to update the customer by Id
 * @param customerId
 * @returns {Promise<Object>}
 * @author Keshav Suman
 */
export async function updateCustomer(
  customertId: string,
  customerInfo: Object
) {
  const stripe = new Stripe(
    "sk_test_51LcA81SCGtvotFzJmkd9YS7clchQVR9BGehPsi8Q9Mxf6U5gYSLZp6fIis9emIq6Oxk1vwN4EHEUtIHCHxNKUh8I00qLkPoeqL",
    {
      apiVersion: "2022-08-01",
    }
  );
  const customer = await stripe.customers.update(customertId, {
    // ...customerInfo,
  });
  return customer;
}

/**
 * @description This function is used to create product at stripe side
 * @param
 * @returns {Promise<Object>}
 * @author Keshav suman
 */

export async function createProduct() {
  const stripe = new Stripe(
    "sk_test_51LcA81SCGtvotFzJmkd9YS7clchQVR9BGehPsi8Q9Mxf6U5gYSLZp6fIis9emIq6Oxk1vwN4EHEUtIHCHxNKUh8I00qLkPoeqL",
    {
      apiVersion: "2022-08-01",
    }
  );
  // return await stripe.products.createProduct({});
}

/**
 * @description This fucntion s used to create the
 */
export async function createSession(
  productName: string,
  amount: number,
  currency: string,
  access_secret: string,
  success_url: string,
  failure_url: string,
  productDescription: string = ""
) {
  const stripe = new Stripe(access_secret, {
    apiVersion: "2022-08-01",
  });

  const productData: any = {
    name: productName,
  };
  if (productDescription.length > 0) {
    productData.description = productDescription;
  }
  return await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: currency,
          product_data: productData,
          unit_amount: amount,
        },
        quantity: 1,
      },
    ],
    mode: PaymentModeEnum.PAYMENT,
    success_url: success_url,
    cancel_url: failure_url,
  });
}

export async function getStripeCredentialsByUserId(
  userId: mongoose.Types.ObjectId
) {
  const data = await SettingsModel.create({});
}
