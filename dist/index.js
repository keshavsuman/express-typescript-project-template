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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
const express = __importStar(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const routes_1 = __importDefault(require("./src/routes"));
const path_1 = __importDefault(require("path"));
const exceptionhandler_1 = __importDefault(require("./src/utils/exceptionhandler"));
const app = express.default();
dotenv_1.default.config({
    path: ".env",
});
mongoose_1.default.connect((_a = process.env.DB_URL) !== null && _a !== void 0 ? _a : "mongodb+srv://keshavsuman:8F4aPQhXD6Td6dn@chat-application.pqjjm.mongodb.net/weather_api");
mongoose_1.default.connection.on("connected", () => {
    console.log("database connected");
});
app.use(express.json());
app.set("view engine", "ejs");
app.set("views", path_1.default.join(__dirname, "src/views"));
app.use("/", routes_1.default);
app.use(exceptionhandler_1.default);
app.use((req, res, next) => {
    res.status(404).json({
        message: "Not found error",
    });
});
app.listen((_b = process.env.PORT) !== null && _b !== void 0 ? _b : 5000, () => {
    console.log(`Server started at ${process.env.PORT}`);
});
