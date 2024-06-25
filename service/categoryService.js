import { HttpStatus } from "../constant/constant.js";
import { sendErrResponseByMsg } from "../middleware/errorMiddleware.js";
import { Category } from "../models/schema/category.js";

export async function createCategoryService(data, res) {
    const existingCategory = await Category.findOne({
        where: { title: data.title },
    });

    if (existingCategory) {
        sendErrResponseByMsg(
            res,
            "Category with same title already exists",
            HttpStatus.CONFLICT
        );
    }

    try {
        const savedCategory = await Category.create(data);
        return savedCategory;
    } catch (error) {
        console.error("Error creating Category:", error);
        sendErrResponseByMsg(res, "Error creating Category", HttpStatus.INTERNAL_SERVER_ERROR);
    }
}

export async function getSpecifiedCategoryService(id, res) {
    try {
        const category = await Category.findByPk(id);
        return category;
    } catch (error) {
        console.error("Error Fetching Specified Category by ID:", error);
        sendErrResponseByMsg(res, "Error Fetching Specified Category by ID", HttpStatus.BAD_REQUEST);
    }
}

export function getAllCategoryService({
    find = {},
    sort = "createdAt",
    limit = "",
    skip = "",
    select = "",
}) {
    const queryOptions = {
        where: find,
    };

    if (select) {
        queryOptions.select = select;
    }

    if (sort) {
        queryOptions.order = [[sort]];
    }

    if (limit) {
        queryOptions.limit = parseInt(limit);
    }

    if (skip) {
        queryOptions.offset = parseInt(skip);
    }

    return Category.findAll(queryOptions);
}

export async function updateCategoryService(id, data, res) {
    try {
        const [_, [updatedCategory]] = await Category.update(data, {
            where: { id },
            returning: true,
        });

        return updatedCategory;
    } catch (error) {
        console.error("Error Updating Category:", error);
        sendErrResponseByMsg(res, "Error Updating Category", HttpStatus.BAD_REQUEST);
    }
}

export async function deleteCategoryService(id, res) {
    try {
        const recordToDelete = await Category.findByPk(id);

        if (!recordToDelete) {
            return { success: false, message: "Category not found" };
        }

        const deletedRows = await Category.destroy({
            where: { id },
        });

        return deletedRows;
    } catch (error) {
        console.error("Error Deleting Category:", error);
        sendErrResponseByMsg(res, "Error Deleting Category", HttpStatus.BAD_REQUEST);
    }
}