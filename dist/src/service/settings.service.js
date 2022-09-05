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
exports.updateSettings = exports.getSettings = exports.createSettings = void 0;
const models_1 = require("../models");
function createSettings(userId, settingObj = null) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield models_1.SettingsModel.create(Object.assign({ user: userId }, settingObj));
    });
}
exports.createSettings = createSettings;
function getSettings(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const settings = yield models_1.SettingsModel.find({
            user: userId,
        });
        return settings;
    });
}
exports.getSettings = getSettings;
function updateSettings(userId, updateObj) {
    return __awaiter(this, void 0, void 0, function* () {
        const settings = yield models_1.SettingsModel.findOneAndUpdate({
            user: userId,
        }, Object.assign({}, updateObj), {
            new: true,
        });
        return settings;
    });
}
exports.updateSettings = updateSettings;
