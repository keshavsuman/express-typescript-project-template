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
exports.failed = exports.success = exports.createPrice = exports.createProduct = exports.createCustomer = exports.createPaymentSession = exports.createPaymentIntent = void 0;
const http_status_1 = __importDefault(require("http-status"));
const service_1 = require("../service");
function createPaymentIntent(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { amount, currency } = req.body;
            // const access_secret =
            //   "sk_test_51LcA81SCGtvotFzJmkd9YS7clchQVR9BGehPsi8Q9Mxf6U5gYSLZp6fIis9emIq6Oxk1vwN4EHEUtIHCHxNKUh8I00qLkPoeqL";
            // const payment = await StripeService.createPaymentIntent(
            //   amount,
            //   currency,
            //   access_secret
            // );
            // res.status(httpStatus.OK).send({
            //   data: payment,
            // });
        }
        catch (error) {
            console.log(error);
            res.status(http_status_1.default.OK).send({
                status: http_status_1.default.INTERNAL_SERVER_ERROR,
                data: error,
            });
        }
    });
}
exports.createPaymentIntent = createPaymentIntent;
function createPaymentSession(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // const { productName, currency, amount } = req.body;
            // const session = await StripeService.createSession(
            //   productName,
            //   currency,
            //   amount
            // );
            // res.status(httpStatus.OK).send(session);
        }
        catch (error) {
            console.log(error);
            res.status(http_status_1.default.OK).send({
                status: http_status_1.default.INTERNAL_SERVER_ERROR,
                data: error,
            });
        }
    });
}
exports.createPaymentSession = createPaymentSession;
function createCustomer(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { email } = req.body;
            const customer = yield service_1.StripeService.createCustomer(email);
        }
        catch (error) {
            console.log(error);
        }
    });
}
exports.createCustomer = createCustomer;
function createProduct(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const product = yield service_1.StripeService.createProduct();
        }
        catch (error) {
            console.log(error);
        }
    });
}
exports.createProduct = createProduct;
function createPrice(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
        }
        catch (error) {
            console.log(error);
        }
    });
}
exports.createPrice = createPrice;
function success(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        res.send("Success");
    });
}
exports.success = success;
function failed(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        res.send("Failed");
    });
}
exports.failed = failed;
