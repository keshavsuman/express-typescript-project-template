import { Router } from "express";
import shopRouter from "./modules/shop/shop.routes";
import ratingRouter from "./modules/rating/rating.route";
import userRouter from "./modules/user/user.routes";
import categoryRouter from "./modules/category/category.routes";

const router: Router = Router();

const routes = [
  {
    route: "/shop",
    router: shopRouter,
  },
  {
    route: "/rating",
    router: ratingRouter,
  },
  {
    route: "/user",
    router: userRouter,
  },
  {
    route: "/categories",
    router: categoryRouter,
  },
];

routes.forEach((route) => {
  router.use(route.route, route.router);
});

export default router;
