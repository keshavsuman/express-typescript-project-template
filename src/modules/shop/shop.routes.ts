import { Router } from "express";
import * as shopController from "./shop.controller";

const router = Router();

router.route("/").post(shopController.createShop).get(shopController.getShops);
router
  .route("/popularSearches")
  .post(shopController.getShops)
  .get(shopController.createShop);
router.route("/offer/:shopId").get(shopController.getOffers);
router.route("/join/:shopId").get(shopController.joinShop);
router.route("/leave/:shopId");
router.route("/catalouges/:shopId");
router.route("/delete/:shopId");
router.route("/:shopId");

export default router;
