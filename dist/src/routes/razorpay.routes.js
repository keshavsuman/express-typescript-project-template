"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("../controllers");
const middlewares_1 = require("../middlewares");
const router = (0, express_1.Router)();
router.get("/payment/:orderId", controllers_1.RazorpayController.pay);
router.use(middlewares_1.jwtverify);
router.post("/createOrder", controllers_1.RazorpayController.createOrder);
router.post("/saveRazorpayCredentials", controllers_1.RazorpayController.saveRazorpayCredentials);
router.get("/callback", (req, res) => {
    console.log(req);
});
exports.default = router;
