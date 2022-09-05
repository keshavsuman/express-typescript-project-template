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
exports.saveClientCredentials = exports.createOrder = void 0;
const razorpay_1 = __importDefault(require("razorpay"));
const models_1 = require("../models");
/**
 * @description this function is used to create a payment using razorpay
 * @param {Number} amount
 * @param {Number} currency
 * @author Keshav suman
 * @returns {Promise<Array>}
 */
function createOrder(amount, currency, access_key, access_secret) {
    return __awaiter(this, void 0, void 0, function* () {
        const razorpay = new razorpay_1.default({
            key_id: access_key,
            key_secret: access_secret,
        });
        return yield razorpay.orders.create({
            amount: amount,
            currency: currency,
        });
    });
}
exports.createOrder = createOrder;
/**
 * @description This function is used to saveRazorpay credentials in database
 * @param {ObjectId} userId
 * @param {String} keyId
 * @param {String} keySecret
 * @returns {Promise<Object>}
 * @author keshav suman
 */
function saveClientCredentials(userId, keyId, keySecret) {
    return __awaiter(this, void 0, void 0, function* () {
        // const encryptedKeyId = CryptoJS.AES.encrypt(
        //   keyId,
        //   process.env.razorpayEncryptonKey!
        // );
        // const encryptedKeySecret = CryptoJS.AES.encrypt(
        //   keySecret,
        //   process.env.RazorpayEncryptionKey!
        // );
        return yield models_1.UserModel.findByIdAndUpdate(userId, {
            razorpayKeyId: keyId,
            razorpayKeySecret: keySecret,
        }, { new: true });
    });
}
exports.saveClientCredentials = saveClientCredentials;
