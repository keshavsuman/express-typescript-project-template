import { Router } from "express";
import * as shopController from "./shop.controller";

const router = Router();

router.route("/").post(shopController.getShops).get(shopController.createShop);
router
  .route("/popularSearches")
  .post(shopController.getShops)
  .get(shopController.createShop);
router.route("/offer/:shopId");
router.route("/join/:shopId");
router.route("/leave/:shopId");
router.route("/catalouges/:shopId");
router.route("/delete/:shopId");
router.route("/:shopId");

export default router;
