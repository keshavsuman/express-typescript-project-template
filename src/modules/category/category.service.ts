import { ObjectId, Types } from "mongoose";
import categoryModel, {
  Category,
  CategoryPositionEnum,
} from "./category.model";
import subCategoryModel, { SubCategory } from "./subCategory.model";

export async function getCategoryById(categoryId: ObjectId) {
  return await categoryModel.findById(categoryId);
}

export async function getCategories(
  limit: number,
  page: number,
  search?: string,
  position?: CategoryPositionEnum
): Promise<Array<Category>> {
  const matchObject: any = {};
  if (search) {
    matchObject.name = { $regex: search, $options: "i" };
  }
  if (position) {
    matchObject.position = position;
  }

  return await categoryModel
    .find(matchObject)
    .sort({ order: 1 })
    .limit(limit)
    .skip((page - 1) * limit);
}

export async function getSubcategories(
  category: Types.ObjectId,
  limit: number,
  page: number,
  search?: string
): Promise<Array<SubCategory>> {
  const matchObject: any = {
    category,
  };
  if (search) {
    matchObject.name = { $regex: search, $options: "i" };
  }
  return await subCategoryModel
    .find(matchObject)
    .limit(limit)
    .skip((page - 1) * limit);
}
