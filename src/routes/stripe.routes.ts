import { Router } from "express";
import { StripeController } from "../controllers";
import { jwtverify } from "../middlewares";

const router = Router();

router.use(jwtverify);
router.get("/createCustomer", StripeController.createCustomer);
router.post("/createProduct", StripeController.createProduct);
router.post("/createPrice", StripeController.createPrice);
router.post("/createPayment", StripeController.createPaymentIntent);
router.post("/createPaymentSession", StripeController.createPaymentSession);
router.get("/success", StripeController.success);
router.get("/failed", StripeController.failed);

export default router;
