import { ObjectId } from "mongoose";
import shopModel, { Shop } from "./shop.model";

/**
 * @description This function is used to get the SHop by Id
 * @param {ObjectId} shopId
 * @returns {Promise<Shop>}
 * @author Keshav suman
 */
export async function getShopById(shopId: ObjectId): Promise<Shop | null> {
  return await shopModel.findById(shopId);
}
