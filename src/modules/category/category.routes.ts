import { Router } from "express";
import * as categoryController from "./category.controller";

const router: Router = Router();

router.get("/", categoryController.getCategories);
router.get("/:categoryId", categoryController.getSubCategories);
export default router;
