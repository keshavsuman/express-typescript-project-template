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
exports.updateSettings = exports.getSettings = void 0;
const http_status_1 = __importDefault(require("http-status"));
const mongoose_1 = __importDefault(require("mongoose"));
const service_1 = require("../service");
function getSettings(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = res.get("userId");
        const settings = yield service_1.SettingsService.getSettings(new mongoose_1.default.Types.ObjectId(userId));
        res.status(http_status_1.default.OK).send({
            status: http_status_1.default.OK,
            message: "Settings fetched Successfully",
            data: settings,
        });
    });
}
exports.getSettings = getSettings;
function updateSettings(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = res.get("userId");
        const updateObj = req.body;
        const settings = yield service_1.SettingsService.updateSettings(new mongoose_1.default.Types.ObjectId(userId), updateObj);
        res.status(http_status_1.default.OK).send({
            status: http_status_1.default.OK,
            message: "Settings updated Successfully",
            data: settings,
        });
    });
}
exports.updateSettings = updateSettings;
