"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStripeCredentialsByUserId = exports.createSession = exports.createProduct = exports.updateCustomer = exports.createCustomer = exports.createPaymentIntent = void 0;
const stripe_1 = require("stripe");
const models_1 = require("../models");
var PaymentModeEnum;
(function (PaymentModeEnum) {
    PaymentModeEnum["PAYMENT"] = "payment";
    PaymentModeEnum["SUBSCRIPTION"] = "subscription";
    PaymentModeEnum["SETUP"] = "setup";
})(PaymentModeEnum || (PaymentModeEnum = {}));
function createPaymentIntent(amount, currency, keySecret, success_url, failure_url) {
    return __awaiter(this, void 0, void 0, function* () {
        // Create a PaymentIntent with the order amount and currency
        const stripe = new stripe_1.Stripe(keySecret, {
            apiVersion: "2022-08-01",
        });
        const paymentIntent = yield stripe.paymentIntents.create({
            amount: amount,
            currency: currency,
            automatic_payment_methods: {
                enabled: true,
            },
        });
        return paymentIntent;
    });
}
exports.createPaymentIntent = createPaymentIntent;
/**
 * @description This function is used to Create a customer at stripe
 * @param email
 * @returns {Promise<Object>}
 * @author Keshav suman
 */
function createCustomer(email) {
    return __awaiter(this, void 0, void 0, function* () {
        const stripe = new stripe_1.Stripe("sk_test_51LcA81SCGtvotFzJmkd9YS7clchQVR9BGehPsi8Q9Mxf6U5gYSLZp6fIis9emIq6Oxk1vwN4EHEUtIHCHxNKUh8I00qLkPoeqL", {
            apiVersion: "2022-08-01",
        });
        const customer = yield stripe.customers.create({
            email: email,
        });
        console.log(customer);
        return customer;
    });
}
exports.createCustomer = createCustomer;
/**
 * @description This function is used to update the customer by Id
 * @param customerId
 * @returns {Promise<Object>}
 * @author Keshav Suman
 */
function updateCustomer(customertId, customerInfo) {
    return __awaiter(this, void 0, void 0, function* () {
        const stripe = new stripe_1.Stripe("sk_test_51LcA81SCGtvotFzJmkd9YS7clchQVR9BGehPsi8Q9Mxf6U5gYSLZp6fIis9emIq6Oxk1vwN4EHEUtIHCHxNKUh8I00qLkPoeqL", {
            apiVersion: "2022-08-01",
        });
        const customer = yield stripe.customers.update(customertId, {
        // ...customerInfo,
        });
        return customer;
    });
}
exports.updateCustomer = updateCustomer;
/**
 * @description This function is used to create product at stripe side
 * @param
 * @returns {Promise<Object>}
 * @author Keshav suman
 */
function createProduct() {
    return __awaiter(this, void 0, void 0, function* () {
        const stripe = new stripe_1.Stripe("sk_test_51LcA81SCGtvotFzJmkd9YS7clchQVR9BGehPsi8Q9Mxf6U5gYSLZp6fIis9emIq6Oxk1vwN4EHEUtIHCHxNKUh8I00qLkPoeqL", {
            apiVersion: "2022-08-01",
        });
        // return await stripe.products.createProduct({});
    });
}
exports.createProduct = createProduct;
/**
 * @description This fucntion s used to create the
 */
function createSession(productName, amount, currency, access_secret, success_url, failure_url, productDescription = "") {
    return __awaiter(this, void 0, void 0, function* () {
        const stripe = new stripe_1.Stripe(access_secret, {
            apiVersion: "2022-08-01",
        });
        const productData = {
            name: productName,
        };
        if (productDescription.length > 0) {
            productData.description = productDescription;
        }
        return yield stripe.checkout.sessions.create({
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
    });
}
exports.createSession = createSession;
function getStripeCredentialsByUserId(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = yield models_1.SettingsModel.create({});
    });
}
exports.getStripeCredentialsByUserId = getStripeCredentialsByUserId;
