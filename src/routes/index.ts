import { Router } from "express";
import razorpayRoutes from "./razorpay.routes";
import authRoutes from "./auth.routes";
import stripeRoutes from "./stripe.routes";
import settingsRoutes from "./settings.routes";

const routes = Router();

routes.use("/auth", authRoutes);
routes.use("/razorpay", razorpayRoutes);
routes.use("/stripe", stripeRoutes);
routes.use("/settings", settingsRoutes);

export default routes;
