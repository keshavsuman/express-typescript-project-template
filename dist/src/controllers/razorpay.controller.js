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
exports.pay = exports.saveRazorpayCredentials = exports.createOrder = void 0;
const http_status_1 = __importDefault(require("http-status"));
const mongoose_1 = __importDefault(require("mongoose"));
const models_1 = require("../models");
const service_1 = require("../service");
function createOrder(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // const { amount, currency } = req.body;
            // const order = await RazorpayService.createOrder(
            //   // new mongoose.Types.ObjectId(res.get("userId")),
            //   amount,
            //   currency,
            // );
            // await RazorpayOrderModel.create({ ...order, orderId: order.id });
            // res.status(httpStatus.CREATED).send({
            //   message: "Order created successfully",
            //   data: { ...order, paymentURL: "" },
            //   status: httpStatus.CREATED,
            // });
        }
        catch (error) {
            console.log(error);
            res
                .status(http_status_1.default.INTERNAL_SERVER_ERROR)
                .send({ status: http_status_1.default.INTERNAL_SERVER_ERROR, error });
        }
    });
}
exports.createOrder = createOrder;
function saveRazorpayCredentials(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { keyId, keySecret } = req.body;
            const userId = res.get("userId");
            const data = yield service_1.RazorpayService.saveClientCredentials(new mongoose_1.default.Types.ObjectId(userId), keyId, keySecret);
            res.status(http_status_1.default.OK).send({
                status: http_status_1.default.OK,
                message: "Razorpay credentials saved successfully",
                data: data,
            });
        }
        catch (error) {
            console.log(error);
            res.status(http_status_1.default.INTERNAL_SERVER_ERROR).send(error);
        }
    });
}
exports.saveRazorpayCredentials = saveRazorpayCredentials;
function pay(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { orderId } = req.params;
            const order = yield models_1.RazorpayOrderModel.findOne({
                orderId: orderId,
            });
            const user = yield models_1.UserModel.findById(new mongoose_1.default.Types.ObjectId(res.get("userId")));
            res.render("razorpay_payment", {
                orderId: order === null || order === void 0 ? void 0 : order.orderId,
                razorpay_key_id: "rzp_test_GuMhJXL2MIpzKm",
                amount: order === null || order === void 0 ? void 0 : order.amount,
                currency: order === null || order === void 0 ? void 0 : order.currency,
                name: `keshav suman`,
                description: "asdgasd",
                logo_image: "",
            });
        }
        catch (error) {
            console.log(error);
            res.status(http_status_1.default.INTERNAL_SERVER_ERROR).send(error);
        }
    });
}
exports.pay = pay;
