"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const SettingsSchema = new mongoose_1.default.Schema({
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
    },
    razorpay: {
        keyId: {
            type: String,
        },
        keySecret: {
            type: String,
        },
    },
    stripe: {
        keyId: {
            type: String,
        },
        keySecret: {
            type: String,
        },
    },
});
exports.default = mongoose_1.default.model("settings", SettingsSchema);
