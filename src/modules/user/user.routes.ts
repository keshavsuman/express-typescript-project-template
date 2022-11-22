import { Router } from "express";
import * as userController from "./user.controller";

const router: Router = Router();

router.route("/sendOtp").post(userController.sendOTP);
router.route("/verifyOtp").post(userController.verifyOTP);

export default router;
