import { Router } from "express";
import { SettingsController } from "../controllers";
import { jwtverify } from "../middlewares";

const router = Router();

router.use(jwtverify);
router.get("/", SettingsController.getSettings);
router.put("/updateSettings", SettingsController.updateSettings);
export default router;
