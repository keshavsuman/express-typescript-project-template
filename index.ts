import * as express from "express";
import Mongoose from "mongoose";
import dotenv from "dotenv";
import router from "./src/routes";

const app = express.default();

dotenv.config({
  path: ".env",
});
app.use(express.json());

Mongoose.connect(process.env.DB_URL!);
Mongoose.connection.on("connected", () => {
  console.log("database connected");
});

app.use("/", router);

app.listen(process.env.PORT, () => {
  console.log(`Server started at ${process.env.PORT}`);
});
