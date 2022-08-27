import { Router } from "express";
import razorpayRoutes from "./razorpay.routes";
import authRoutes from "./auth.routes";

const routes = Router();

routes.use("/razorpay", razorpayRoutes);
routes.use("/auth", authRoutes);

export default routes;
