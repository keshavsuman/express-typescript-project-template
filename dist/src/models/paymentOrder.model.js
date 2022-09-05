"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentStatus = exports.PaymentGatewayEnum = void 0;
const mongoose_1 = __importStar(require("mongoose"));
var PaymentGatewayEnum;
(function (PaymentGatewayEnum) {
    PaymentGatewayEnum["Stripe"] = "stripe";
    PaymentGatewayEnum["Razorpay"] = "razorpay";
})(PaymentGatewayEnum = exports.PaymentGatewayEnum || (exports.PaymentGatewayEnum = {}));
var PaymentStatus;
(function (PaymentStatus) {
    PaymentStatus["Pending"] = "pending";
    PaymentStatus["Completed"] = "completed";
    PaymentStatus["Cancelled"] = "cancelled";
    PaymentStatus["Failed"] = "failed";
    PaymentStatus["default"] = "default";
})(PaymentStatus = exports.PaymentStatus || (exports.PaymentStatus = {}));
const paymentOrderSchema = new mongoose_1.Schema({
    invoice: {
        type: Object,
        required: true,
    },
    orderId: {
        type: String,
        required: true,
    },
    payment_gateway: {
        type: String,
        enum: PaymentGatewayEnum,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    entity: {
        type: String,
    },
    amount_paid: {
        type: Number,
    },
    currency: {
        type: String,
        required: true,
    },
    reciept: {
        type: String,
    },
    offer_id: {
        type: String,
    },
    status: {
        type: String,
        enum: PaymentStatus,
        default: PaymentStatus.Pending,
    },
    success_url: {
        type: String,
    },
    failure_url: {
        type: String,
    },
    payment_url: {
        type: String,
        required: true,
    },
    attempts: {
        type: Number,
    },
    notes: {
        type: [],
    },
    orderCreatedAt: {
        type: Number,
        default: Date.now(),
    },
}, {
    timestamps: true,
});
exports.default = mongoose_1.default.model("paymentOrder", paymentOrderSchema);
