import * as express from "express";
import Mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import { errorHandler } from "./src/utils/errorHandler";
import router from "./src/routes";

const app = express.default();

dotenv.config({
  path: ".env",
});

Mongoose.connect(process.env.MONGODB_URL!);
Mongoose.connection.on("connected", () => {
  console.log("database connected");
});

app.use(express.json());
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "src/views"));
app.use(router);
app.use(errorHandler);

app.listen(process.env.PORT, () => {
  console.log(`Server started at ${process.env.PORT}`);
});
