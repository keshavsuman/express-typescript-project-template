import { Router } from "express";
import { AuthenticationController } from "../controllers";
import { jwtverify } from "../middlewares";

const router = Router();

router.use(jwtverify);
router.post("/signup", AuthenticationController.signup);
router.post("/login", AuthenticationController.login);

export default router;
