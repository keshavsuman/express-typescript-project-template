import { Request, Response } from "express";
import * as shopService from "./shop.service";
import * as categoryService from "../category/category.service";
import { SchemaTypes, Types } from "mongoose";
import * as roomService from "../room/room.service";
import { Room } from "../room/room.model";
import { Shop } from "./shop.model";
import * as memberService from "../member/member.service";
import { Member, MemberRoleEnum, MemberStatus } from "../member/member.model";
import HttpResponse from "../../utils/httpResponse";
import httpStatus from "http-status";

const ObjectId = SchemaTypes.ObjectId;

export async function getShops(req: Request, res: Response) {
  const { search, limit, page, latitude, longitude, sortDirection, sortBy } =
    req.query;
  // shopService.getShops();
}

export async function getShopDetails(req: Request, res: Response) {
  try {
    const { shopId } = req.params;
    const shop = shopService.getShopById(new Types.ObjectId(shopId));
    return new HttpResponse(
      res,
      httpStatus.OK,
      "Shop details fetched successfully",
      shop
    );
  } catch (error) {
    console.log(error);
  }
}

export async function createShop(req: Request, res: Response) {
  const { id: userId, name: userName } = req.body;
  const createShopDto: any = {
    location: {
      type: "point",
      coordinates: [req.body.latitude, req.body.longitude],
    },
  };

  delete req.body.latitude;
  delete req.body.longitude;

  try {
    const category = await categoryService.getCategoryById(req.body.category);
    createShopDto.subcategory = req.body.subcategory
      .split(",")
      .map((subCat: string) => new ObjectId(subCat));

    //Creating shop
    const shop: Shop = await shopService.createShop(createShopDto);
    const createRoomDto: any = {
      shop: shop._id,
      user: res.get("userId"),
      openToAll: false,
      isGroup: true,
    };

    // Creating Room
    const room: Room = await roomService.createRoom(createRoomDto);
    const createMemberDto: any = {
      room: room._id,
      shop: shop._id,
      user: userId,
      role: MemberRoleEnum.Admin,
    };

    // Creating Member
    await memberService.createMember(createMemberDto);

    // await messageService.createWelcomeMessage(
    //   roomId,
    //   userId,
    //   shopName,
    //   userName
    // );

    return new HttpResponse(
      res,
      httpStatus.CREATED,
      "Your online shop created in My Groups. Add catalogue now.",
      {
        shop,
        room,
      }
    );
  } catch (error) {
    console.log(error);
  }
}

export async function getOffers(req: Request, res: Response) {
  try {
    const { shopId } = req.params;
    const offers = await shopService.getShopOffers(new Types.ObjectId(shopId));
    return new HttpResponse(
      res,
      httpStatus.OK,
      "Shop offers fetched succesfully",
      offers
    );
  } catch (error) {
    console.log(error);
  }
}

export async function joinShop(req: Request, res: Response) {
  try {
    const shopId: Types.ObjectId = new Types.ObjectId(req.params.shopId);
    const userId: Types.ObjectId = new Types.ObjectId(req.get("userId")!);
    const room: Room | null = await roomService.getGroupOfShop(
      new Types.ObjectId(shopId)
    );
    let member: Member | null = await memberService.getMemberByUserIdAndShopId(
      userId,
      shopId
    );
    if (member?.status === MemberStatus.Blocked) {
      return new HttpResponse(
        res,
        httpStatus.BAD_REQUEST,
        "You can't join shop, you are blocked"
      );
    } else if (member?.status === MemberStatus.Joined) {
      return new HttpResponse(
        res,
        httpStatus.BAD_REQUEST,
        "You are already joined"
      );
    } else if (member?.status === MemberStatus.Left) {
      member = await memberService.updateMemberById(member._id, {
        room: room?._id,
        user: userId,
        shop: shopId,
        role: MemberRoleEnum.Member,
        status: MemberStatus.Joined,
      });
    } else {
      member = await memberService.createMember({
        room: room?._id,
        user: userId,
        shop: shopId,
        role: MemberRoleEnum.Member,
        status: MemberStatus.Joined,
      });
    }
    return new HttpResponse(
      res,
      httpStatus.OK,
      "Shop joined successfully",
      member
    );
  } catch (error) {
    console.log(error);
  }
}

export async function leaveShop(req: Request, res: Response) {
  try {
    const shopId: Types.ObjectId = new Types.ObjectId(req.params.shopId);
    const userId: Types.ObjectId = new Types.ObjectId(req.get("userId")!);
    if (shopId.equals(userId)) {
      return new HttpResponse(
        res,
        httpStatus.BAD_REQUEST,
        "You are an admin, you can't left shop "
      );
    }
    const room: Room | null = await roomService.getGroupOfShop(shopId);
    const member: Member | null =
      await memberService.getMemberByUserIdRoomIdShopId(
        userId,
        room?._id,
        shopId
      );
    if (member?.status === MemberStatus.Joined) {
      await memberService.updateMemberById(member?._id, {
        status: MemberStatus.Left,
      });
    } else if (member?.status === MemberStatus.Blocked) {
      return new HttpResponse(res, httpStatus.OK, "You are blocked ");
    }

    // create message
    // emit events
    // update shop member count
  } catch (error) {
    console.log(error);
  }
}
