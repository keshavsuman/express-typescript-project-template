import { Types } from "mongoose";
import roomModel, { Room } from "./room.model";

export async function createRoom(createRoomDto: any): Promise<Room> {
  return await roomModel.create(createRoomDto);
}

export async function getGroupOfShop(
  shopId: Types.ObjectId
): Promise<Room | null> {
  return await roomModel.findOne({
    shop: shopId,
    isGroup: true,
  });
}
