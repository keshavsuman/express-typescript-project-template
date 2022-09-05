import { Router } from "express";
import { PaymentController } from "../controllers";
const routes = Router();

routes.post("/pay", PaymentController.pay);

export default routes;
