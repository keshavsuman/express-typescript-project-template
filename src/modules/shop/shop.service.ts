import { Types } from "mongoose";
import shopModel, { Shop } from "./shop.model";

/**
 * @description This function is used to get the SHop by Id
 * @param {ObjectId} shopId
 * @returns {Promise<Shop>}
 * @author Keshav suman
 */
export async function getShopById(
  shopId: Types.ObjectId
): Promise<Shop | null> {
  return await shopModel.findById(shopId);
}

export async function createShop(createShopDto: any): Promise<Shop> {
  const shop: Shop = await shopModel.create(createShopDto);
  return shop;
}

export async function getShopOffers(
  shopId: Types.ObjectId
): Promise<Shop | null> {
  const shop: Shop | null = await shopModel.findById(shopId, {
    offerFlat: 1,
    offerType: 1,
    offerPrice: 1,
  });
  return shop;
}
