import { Router } from "express";
import * as ratingController from "./rating.controller";

const router: Router = Router();
router.post("/", ratingController.manageRating);
router.post("/shopId", ratingController.shopRating);
export default router;
