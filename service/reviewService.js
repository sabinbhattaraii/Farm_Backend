import { HttpStatus } from "../constant/constant.js";
import { sendErrResponseByMsg } from "../middleware/errorMiddleware.js";
import { Review } from "../models/schema/review.js";

export async function createReviewService(data, res) {
    const existingReview = await Review.findOne({
        where: { full_name: data.full_name },
    });

    if (existingReview) {
        sendErrResponseByMsg(
            res,
            "Review with same Full_name already exists",
            HttpStatus.CONFLICT
        );
    }

    try {
        const savedReview = await Review.create(data);
        return savedReview;
    } catch (error) {
        console.error("Error creating Review:", error);
        sendErrResponseByMsg(res, "Error creating Review", HttpStatus.INTERNAL_SERVER_ERROR);
    }
}

export async function getSpecifiedReviewService(id, res) {
    try {
        const review = await Review.findByPk(id);
        return review;
    } catch (error) {
        console.error("Error Fetching Specified Review by ID:", error);
        sendErrResponseByMsg(res, "Error Fetching Specified Review by ID", HttpStatus.BAD_REQUEST);
    }
}

export function getAllReviewService({
    find = {},
    sort = "createdAt",
    limit = "",
    skip = "",
    select = "",
}) {
    const queryOptions = {
        attributes: select,
        where: find,
    };

    if (sort) {
        queryOptions.order = [[sort]];
    }

    if (limit) {
        queryOptions.limit = parseInt(limit);
    }

    if (skip) {
        queryOptions.offset = parseInt(skip);
    }

    return Review.findAll(queryOptions);
}

export async function updateReviewService(id, data, res) {
    try {
        const [_, [updatedReview]] = await Review.update(data, {
            where: { id },
            returning: true,
        });

        return updatedReview;
    } catch (error) {
        console.error("Error Updating Review:", error);
        sendErrResponseByMsg(res, "Error Updating Review", HttpStatus.BAD_REQUEST);
    }
}

export async function deleteReviewService(id, res) {
    try {
        const recordToDelete = await Review.findByPk(id);

        if (!recordToDelete) {
            return { success: false, message: "Review not found" };
        }

        const deletedRows = await Review.destroy({
            where: { id },
        });

        return deletedRows;
    } catch (error) {
        console.error("Error Deleting Review:", error);
        sendErrResponseByMsg(res, "Error Deleting Review", HttpStatus.BAD_REQUEST);
    }
}