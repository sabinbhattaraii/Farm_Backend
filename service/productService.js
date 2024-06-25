import { HttpStatus } from "../constant/constant.js";
import { sendErrResponseByMsg } from "../middleware/errorMiddleware.js";
import { Product } from "../models/schema/product.js";

export async function createProductService(data, res) {
    const existingProduct = await Product.findOne({
        where: { product_title: data.product_title },
    });

    if (existingProduct) {
        sendErrResponseByMsg(
            res,
            "Product with same Product_title already exists",
            HttpStatus.CONFLICT
        );
    }

    try {
        const savedProduct = await Product.create(data);
        return savedProduct;
    } catch (error) {
        console.error("Error creating Product:", error);
        sendErrResponseByMsg(res, "Error creating Product", HttpStatus.INTERNAL_SERVER_ERROR);
    }
}

export async function getSpecifiedProductService(id, res) {
    try {
        const product = await Product.findByPk(id);
        return product;
    } catch (error) {
        console.error("Error Fetching Specified Product by ID:", error);
        sendErrResponseByMsg(res, "Error Fetching Specified Product by ID", HttpStatus.BAD_REQUEST);
    }
}

export function getAllProductService({
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
        queryOptions.attributes = select.split(',').map(attr => attr.trim());
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

    return Product.findAll(queryOptions);
}

export async function updateProductService(id, data, res) {
    try {
        const [_, [updatedProduct]] = await Product.update(data, {
            where: { id },
            returning: true,
        });

        return updatedProduct;
    } catch (error) {
        console.error("Error Updating Product:", error);
        sendErrResponseByMsg(res, "Error Updating Product", HttpStatus.BAD_REQUEST);
    }
}

export async function deleteProductService(id, res) {
    try {
        const recordToDelete = await Product.findByPk(id);

        if (!recordToDelete) {
            return { success: false, message: "Product not found" };
        }

        const deletedRows = await Product.destroy({
            where: { id },
        });

        return deletedRows;
    } catch (error) {
        console.error("Error Deleting Product:", error);
        sendErrResponseByMsg(res, "Error Deleting Product", HttpStatus.BAD_REQUEST);
    }
}