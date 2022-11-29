import { Request, Response } from "express";
import httpStatus from "http-status";
import { Types } from "mongoose";
import HttpResponse from "../../utils/httpResponse";
import { CategoryPositionEnum } from "./category.model";
import * as categoryService from "./category.service";

export async function getCategories(req: Request, res: Response) {
  try {
    const { search, position, limit, page } = req.query;
    const categories = await categoryService.getCategories(
      parseInt((limit as string) ?? "20"),
      parseInt((page as string) ?? "1"),
      search as string,
      position as CategoryPositionEnum
    );
    return new HttpResponse(
      res,
      httpStatus.OK,
      "Categories fetched successfully",
      categories
    );
  } catch (error) {
    console.log(error);
    // new
  }
}

export async function getSubCategories(req: Request, res: Response) {
  const { search, limit, page } = req.query;
  const { category } = req.params;

  const categories = await categoryService.getSubcategories(
    new Types.ObjectId(category as string),
    parseInt((limit as string) ?? "20"),
    parseInt((page as string) ?? "1"),
    search as string
  );
  return new HttpResponse(
    res,
    httpStatus.OK,
    "Subcategories fetched successfully",
    categories
  );
}

export async function createCategory(req: Request, res: Response) {}
