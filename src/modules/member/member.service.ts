import { Types } from "mongoose";
import memberModel, { Member, MemberRoleEnum } from "./member.model";

export async function createMember(createMemberDto: any): Promise<Member> {
  return await memberModel.create(createMemberDto);
}

export async function getShopMembers(shopId: Types.ObjectId) {
  memberModel.aggregate([
    {
      $match: {
        shop: shopId,
      },
    },
  ]);
}

export async function getMemberById(memberId: Types.ObjectId) {
  return await memberModel.findById(memberId);
}

export async function updateMemberById(
  memberId: Types.ObjectId,
  updateMemberDto: any
) {
  return await memberModel.findByIdAndUpdate(memberId, updateMemberDto, {
    new: true,
  });
}

export async function getMemberByUserIdAndShopId(
  userId: Types.ObjectId,
  shopId: Types.ObjectId
): Promise<Member | null> {
  return await memberModel.findOne({
    user: userId,
    shop: shopId,
    status: MemberRoleEnum.Member,
    isGroup: true,
  });
}

export async function getMemberByUserIdRoomIdShopId(
  userId: Types.ObjectId,
  roomId: Types.ObjectId,
  shopId: Types.ObjectId
) {
  return await memberModel.findOne({
    user: userId,
    room: roomId,
    shop: shopId,
  });
}
