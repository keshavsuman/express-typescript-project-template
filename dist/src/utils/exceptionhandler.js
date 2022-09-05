"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_1 = __importDefault(require("http-status"));
const Exceptionhandler = (err, req, res, next) => {
    let { name, message } = err;
    // if (config.env === 'production' && !err.isOperational) {
    //   statusCode = httpStatus.INTERNAL_SERVER_ERROR;
    //   message = httpStatus[httpStatus.INTERNAL_SERVER_ERROR];
    // }
    // res.locals.errorMessage = err.message;
    // const response = {
    //   code: statusCode,
    //   message,
    //   ...(config.env === 'development' && { stack: err.stack }),
    // };
    // if (config.env === 'development') {
    //   logger.error(err);
    // }
    res.statusMessage = message;
    res.status(http_status_1.default.INTERNAL_SERVER_ERROR).send({
        message,
    });
};
exports.default = Exceptionhandler;
