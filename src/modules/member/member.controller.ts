import { Request, Response } from "express";
import { Member, MemberRoleEnum, MemberStatus } from "./member.model";
import { Types } from "mongoose";

import * as memberService from "./member.service";
import * as messageService from "../message/message.service";
import * as userService from "../user/user.service";
import * as shopService from "../shop/shop.service";
import * as roomService from "../room/room.service";
import HttpResponse from "../../utils/httpResponse";
import httpStatus from "http-status";
import { MessageTypeEnum } from "../message/message.model";
import { User } from "../user/user.model";
import { Shop } from "../shop/shop.model";
import { Room } from "../room/room.model";

export async function changeRole(req: Request, res: Response) {
  try {
    const role: string = req.params.role;
    const memberId: Types.ObjectId = new Types.ObjectId(req.params.memberId);
    const userId: Types.ObjectId = new Types.ObjectId(req.get("userId")!);
    const member: Member | null = await memberService.getMemberById(memberId);

    switch (role) {
      case MemberRoleEnum.Admin:
        if (member?.role === MemberRoleEnum.Admin) {
          new HttpResponse(
            res,
            httpStatus.BAD_REQUEST,
            "Admin can't change thier role"
          );
        }
      case MemberRoleEnum.Member:
        await memberService.updateMemberById(memberId, {
          role: MemberRoleEnum.Member,
        });
      case MemberRoleEnum.SubAdmin:
        await memberService.updateMemberById(memberId, {
          role: MemberRoleEnum.Member,
        });
      default:
      // return new HttpResponse(
      //   res,
      //   httpStatus.BAD_REQUEST,
      //   "Role is not supported"
      // );
    }

    //Create a message for this
    await messageService.createMessage({
      room: member?.room,
      user: userId,
      type: MessageTypeEnum.Text,
      text: `${userName} made ${user.name} sub admin.`,
    });
    // Emit Message Event
    // Emit Room Event

    // Send Notification to Selected user

    new HttpResponse(res, httpStatus.OK, "Member role changed successfully", {
      member,
    });
  } catch (error) {
    console.log(error);
  }
}

export async function changeStatus(req: Request, res: Response) {
  try {
  } catch (error) {}
}

export async function getShopMembers(req: Request, res: Response) {}

export async function removeMemberFromShop(req: Request, res: Response) {}

export async function addMemberToShop(req: Request, res: Response) {
  try {
    const shopId: Types.ObjectId = new Types.ObjectId(req.params.shopId);
    const userId: Types.ObjectId = new Types.ObjectId(req.body.userId);
    const user: User | null = await userService.getUserById(userId);
    const shop: Shop | null = await shopService.getShopById(shopId);

    if (!user) {
      return new HttpResponse(
        res,
        httpStatus.BAD_REQUEST,
        "User not found with this Id"
      );
    }

    if (shop?.isDeleted) {
      return new HttpResponse(res, httpStatus.BAD_REQUEST, "Shop is deleted");
    }
    if (user.isBlocked) {
      return new HttpResponse(res, httpStatus.BAD_REQUEST, "User is blocked");
    }
    const room: Room | null = await roomService.getGroupByShopId(shopId);
    const member = await memberService.getMemberByUserIdAndShopId(
      userId,
      shopId
    );

    const newMember = await memberService.createMember({
      room: room?._id,
      shop: shopId,
      user: userId,
      role: MemberRoleEnum.Member,
      status: MemberStatus.Joined,
    });

    // Create a amessage entry and emit the events or send. NOtification if needed
    return new HttpResponse(
      res,
      httpStatus.OK,
      "Member added to room successfully"
    );
  } catch (error) {
    console.log(error);
  }
}
