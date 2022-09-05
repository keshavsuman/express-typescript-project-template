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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pay = void 0;
const http_status_1 = __importDefault(require("http-status"));
const models_1 = require("../models");
const paymentOrder_model_1 = require("../models/paymentOrder.model");
const service_1 = require("../service");
function pay(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { payment_gateway, amount, access_key, access_secret, success_url, failure_url, invoice, } = req.body;
        const currency = req.body.currency.toUpperCase();
        try {
            switch (payment_gateway) {
                case paymentOrder_model_1.PaymentGatewayEnum.Stripe:
                    const stripeOrder = yield service_1.StripeService.createSession(invoice.name, amount, currency, access_secret, success_url, failure_url);
                    yield models_1.PaymentOrderModel.create({
                        invoice: invoice,
                        payment_gateway: paymentOrder_model_1.PaymentGatewayEnum.Stripe,
                        orderId: stripeOrder.id,
                        amount: stripeOrder.amount_total,
                        currency: stripeOrder.currency,
                        failure_url: failure_url,
                        success_url: success_url,
                        payment_url: stripeOrder.url,
                    });
                    // Serializing the data
                    const serializedData = {
                        id: stripeOrder.id,
                        amount: stripeOrder.amount_total,
                        currency: stripeOrder.currency,
                        success_url: stripeOrder.success_url,
                        failure_url: stripeOrder.cancel_url,
                        payment_url: stripeOrder.url,
                    };
                    res.status(http_status_1.default.OK).send({
                        status: http_status_1.default.OK,
                        message: `Order created successfully for ${payment_gateway}`,
                        data: serializedData,
                    });
                    break;
                case paymentOrder_model_1.PaymentGatewayEnum.Razorpay:
                    const razorpayOrder = yield service_1.RazorpayService.createOrder(amount, currency, access_key, access_secret);
                    yield models_1.PaymentOrderModel.create({
                        invoice: invoice,
                        payment_gateway: paymentOrder_model_1.PaymentGatewayEnum.Razorpay,
                        orderId: razorpayOrder.id,
                        amount: razorpayOrder.amount,
                        currency: razorpayOrder.currency,
                        success_url: success_url,
                        failure_url: failure_url,
                        payment_url: "http://localhost:4000/payment/",
                    });
                    const serializedRazorpayData = {
                        id: razorpayOrder.id,
                        amount: razorpayOrder.amount,
                        currency: razorpayOrder.currency,
                        success_url: success_url,
                        failure_url: failure_url,
                        payment_url: "http://localhost:4000/payment/",
                    };
                    res.status(http_status_1.default.OK).send({
                        status: http_status_1.default.OK,
                        message: `Order created successfully for ${payment_gateway}`,
                        data: serializedRazorpayData,
                    });
                    break;
                default:
                    res.status(http_status_1.default.NOT_ACCEPTABLE).send({
                        status: http_status_1.default.NOT_ACCEPTABLE,
                        message: "payment gateway not supported",
                    });
            }
        }
        catch (error) {
            res.status(http_status_1.default.INTERNAL_SERVER_ERROR).send({
                message: error.message,
                status: http_status_1.default.INTERNAL_SERVER_ERROR,
            });
        }
    });
}
exports.pay = pay;
