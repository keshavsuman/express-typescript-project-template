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
exports.generateToken = exports.comparePassword = exports.hashPassword = exports.createUser = exports.findUserByEmail = void 0;
const models_1 = require("../models");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
/**
 * @description This function is used to find a user by email
 * @param {String} email
 * @author Keshav suman
 * @returns {Promise<User|null>}
 */
function findUserByEmail(email) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield models_1.UserModel.findOne({ email });
    });
}
exports.findUserByEmail = findUserByEmail;
/**
 * @description this function creates a user in database
 * @param {User} user
 * @author Keshav suman
 * @returns {Promise<User>}
 */
function createUser(user) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield models_1.UserModel.create(user);
    });
}
exports.createUser = createUser;
/**
 * @description this function is used to hash password
 * @param {String} password
 * @author Keshav suman
 * @returns {String}
 */
function hashPassword(password) {
    return bcryptjs_1.default.hashSync(password);
}
exports.hashPassword = hashPassword;
/**
 * @description this function is used to compare password
 * @param {String} password
 * @param {String} hashpassword
 * @author Keshav suman
 * @returns {Boolean}
 */
function comparePassword(password, hashpassword) {
    return bcryptjs_1.default.compareSync(password, hashpassword);
}
exports.comparePassword = comparePassword;
/**
 * @description This function is used to generate authenticaton token
 * @param {User} user
 * @author Keshav suman
 * @returns {String}
 */
function generateToken(user) {
    return jsonwebtoken_1.default.sign(user, process.env.JWT_Token);
}
exports.generateToken = generateToken;
