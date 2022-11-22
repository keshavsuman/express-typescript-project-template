import { ObjectId } from "mongoose";
import ratingModel, { Rating } from "./rating.model";

/**
 * @description This function is used to get the rating on the basis of Id
 * @param {ObjectId} ratingId
 * @returns {Promise<Rating|null>}
 * @author Keshav suman
 */
export async function getRatingById(
  ratingId: ObjectId
): Promise<Rating | null> {
  return await ratingModel.findById(ratingId);
}
/**
 * @description This function is used to getRating by shopId and userId
 * @param {ObjectId} shopId
 * @param {ObjectId} userId
 * @returns {Promise<Rating|null>}
 * @author Keshav suman
 */
export async function getRatingByShopIdAndUserId(
  shopId: ObjectId,
  userId: ObjectId
): Promise<Rating | null> {
  return await ratingModel.findOne({ shop: shopId, user: userId });
}
/**
 * @description This function is used to create rating
 * @param {any} createRatingDto
 * @returns {Promise<Rating>}
 * @author Keshav suman
 */
export async function createRating(createRatingDto: any): Promise<Rating> {
  const rating: Rating = await ratingModel.create(createRatingDto);
  await updateShopRating(rating?.shop as ObjectId);
  return rating;
}
/**
 * @description This function is used to updateRating by Id
 * @param {ObjectId} ratingId
 * @param {any} updateRatingDto
 * @returns {Promise<Rating|null>}
 * @author Keshav suman
 */
export async function updateRatingById(
  ratingId: ObjectId,
  updateRatingDto: any
): Promise<Rating | null> {
  const rating = await ratingModel.findByIdAndUpdate(
    ratingId,
    updateRatingDto,
    {
      new: true,
    }
  );
  await updateShopRating(rating?.shop as ObjectId);
  return rating;
}
/**
 * @description This funciton is used to get the average rating of the shop
 * @param {ObjectId} shopId
 * @returns {Promise<Number>}
 * @author Keshav suman
 */
export async function getShopAverageRating(shopId: ObjectId): Promise<number> {
  const result = await ratingModel.aggregate([
    { $match: { shopId } },
    { $group: { _id: shopId, average: { $avg: "$rating" } } },
    {
      $project: {
        averageRating: { $ifNull: [{ $round: ["$average", 1] }, 0] },
      },
    },
  ]);
  console.log(result);
  return result.length > 0 ? result[0].averageRating : 0;
}

/**
 * @description This function is used to update the shop with new rating values
 * @param {ObjectId} shopId
 * @author Keshav suman
 */
export async function updateShopRating(shopId: ObjectId) {
  const averageRating = await getShopAverageRating(shopId);
  // await shopService.updateShopById(shopId, { totalRating, averageRating });
}
