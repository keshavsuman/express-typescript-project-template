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
exports.signup = exports.login = void 0;
const http_status_1 = __importDefault(require("http-status"));
const service_1 = require("../service");
function login(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { email, password } = req.body;
            const user = yield service_1.AuthenticationService.findUserByEmail(email);
            if (user) {
                if (service_1.AuthenticationService.comparePassword(password, user.password)) {
                    res.status(http_status_1.default.OK).send({
                        statusCode: http_status_1.default.OK,
                        message: "User login successfully",
                        data: {
                            user,
                            token: service_1.AuthenticationService.generateToken(user.toObject()),
                        },
                    });
                }
                else {
                    res.status(http_status_1.default.BAD_REQUEST).send({
                        statusCode: http_status_1.default.BAD_REQUEST,
                        message: "Password doesn't matched",
                    });
                }
            }
            else {
                res.status(http_status_1.default.BAD_REQUEST).send({
                    statusCode: http_status_1.default.BAD_REQUEST,
                    message: "User doesn't Exists",
                });
            }
        }
        catch (error) {
            console.log(error);
            res.status(http_status_1.default.INTERNAL_SERVER_ERROR).send({
                statusCode: http_status_1.default.INTERNAL_SERVER_ERROR,
                message: error,
            });
        }
    });
}
exports.login = login;
function signup(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { name, email, password } = req.body;
            if (yield service_1.AuthenticationService.findUserByEmail(email)) {
                res.status(http_status_1.default.PARTIAL_CONTENT).send({
                    statusCode: http_status_1.default.PARTIAL_CONTENT,
                    message: "User with this email already exists",
                });
            }
            else {
                let names = name.split(" ");
                const user = {
                    email,
                    firstName: names[0],
                    lastName: names.splice(1).join(" "),
                    password: service_1.AuthenticationService.hashPassword(password),
                };
                const createdUser = yield service_1.AuthenticationService.createUser(user);
                yield service_1.SettingsService.createSettings(createdUser._id);
                res.status(http_status_1.default.OK).send({
                    statusCode: http_status_1.default.OK,
                    message: "User created successfully",
                    data: {
                        user: createdUser,
                        token: service_1.AuthenticationService.generateToken(createdUser.toObject()),
                    },
                });
            }
        }
        catch (error) {
            console.log(error);
            res.status(http_status_1.default.INTERNAL_SERVER_ERROR).send({
                statusCode: http_status_1.default.INTERNAL_SERVER_ERROR,
                message: error,
            });
        }
    });
}
exports.signup = signup;
