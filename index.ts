import * as express from "express";
import Mongoose from "mongoose";
import dotenv from "dotenv";
import router from "./src/routes";
import path from "path";

const app = express.default();

dotenv.config({
  path: ".env",
});

Mongoose.connect(process.env.DB_URL!);
Mongoose.connection.on("connected", () => {
  console.log("database connected");
});

app.use(express.json());
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "src/views"));

app.use("/", router);

app.listen(process.env.PORT, () => {
  console.log(`Server started at ${process.env.PORT}`);
});
