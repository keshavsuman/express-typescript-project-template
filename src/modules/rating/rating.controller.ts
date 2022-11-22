import { Request, Response } from "express";
import httpStatus from "http-status";
import HttpResponse from "../../utils/httpResponse";
import { Shop } from "../shop/shop.model";
import * as shopService from "../shop/shop.service";
import { Rating } from "./rating.model";
import * as ratingService from "./rating.service";

export async function manageRating(req: Request, res: Response) {
  const shop: Shop | null = await shopService.getShopById(req.body.shop);
  if (!shop) {
    throw new HttpResponse(res, httpStatus.BAD_REQUEST, "Shop is Deleted");
  }

  const { _id: shopId, isDeleted } = shop;
  let { totalRating } = shop;
  const { _id: userId } = req.get("user") as any;

  if (isDeleted) {
    throw new HttpResponse(res, httpStatus.BAD_REQUEST, "Shop is Deleted");
  }

  // check if rating is already provided by user
  let rating: Rating | null = await ratingService.getRatingByShopIdAndUserId(
    shopId,
    userId
  );
  if (rating) {
    rating = await ratingService.updateRatingById(rating._id, req.body);
    new HttpResponse(
      res,
      httpStatus.OK,
      "Rating has been successfully updated",
      { rating }
    );
  } else {
    req.body.user = userId;
    rating = await ratingService.createRating(req.body);
    totalRating++;
    {
      rating;
    }
    new HttpResponse(res, httpStatus.OK, "Rating has been successfully added", {
      rating,
    });
  }
}

export async function shopRating(req: Request, res: Response) {}
