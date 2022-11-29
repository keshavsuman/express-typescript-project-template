import { Router } from "express";
import * as memberController from "./member.controller";

const router = Router();

router.route("/change-role/:role/:memberId").get(memberController.changeRole);
router
  .route("/change-stauts/:status/:memberId")
  .get(memberController.changeStatus);
router
  .route("/")
  .get(memberController.getShopMembers)
  .post(memberController.addMemberFromShop)
  .delete(memberController.removeMemberFromShop);

export default router;
