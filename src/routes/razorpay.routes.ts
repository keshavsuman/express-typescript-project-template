import { Router } from "express";
import { RazorpayController } from "../controllers";
import { jwtverify } from "../middlewares";

const router = Router();

router.use(jwtverify);
router.post("/createOrder", RazorpayController.createOrder);
router.post(
  "/saveRazorpayCredentials",
  RazorpayController.saveRazorpayCredentials
);
export default router;
