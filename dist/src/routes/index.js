"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const razorpay_routes_1 = __importDefault(require("./razorpay.routes"));
const auth_routes_1 = __importDefault(require("./auth.routes"));
const stripe_routes_1 = __importDefault(require("./stripe.routes"));
const settings_routes_1 = __importDefault(require("./settings.routes"));
const payment_routes_1 = __importDefault(require("./payment.routes"));
const routes = (0, express_1.Router)();
routes.use("/auth", auth_routes_1.default);
routes.use("/razorpay", razorpay_routes_1.default);
routes.use("/stripe", stripe_routes_1.default);
routes.use("/settings", settings_routes_1.default);
routes.use("/payment", payment_routes_1.default);
exports.default = routes;
