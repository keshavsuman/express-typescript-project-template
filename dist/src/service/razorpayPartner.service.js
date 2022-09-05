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
exports.createAuthorizationURL = void 0;
/**
 * @description this function is used to create a redirection URL for partner integration
 * @author Keshav suman
 * @retruns
 */
function createAuthorizationURL(client_id) {
    return __awaiter(this, void 0, void 0, function* () {
        return `https://auth.razorpay.com/authorize?client_id=${client_id}&response_type=code&redirect_uri=${process.env.Razorpay_redirect_url}&scope=read_only&state=NOBYtv8r6c75ex6WZ`;
    });
}
exports.createAuthorizationURL = createAuthorizationURL;
