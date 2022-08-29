import { Router } from "express";
import { RazorpayController } from "../controllers";
import { jwtverify } from "../middlewares";

const router = Router();

router.get("/payment/:orderId", RazorpayController.pay);
router.use(jwtverify);
router.post("/createOrder", RazorpayController.createOrder);
router.post(
  "/saveRazorpayCredentials",
  RazorpayController.saveRazorpayCredentials
);
router.get("/callback", (req, res) => {
  console.log(req);
});
export default router;
