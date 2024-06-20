import { HttpStatus } from "../constant/constant.js";
import { sendErrResponseByMsg } from "../middleware/errorMiddleware.js";
import { Inquiry } from "../models/schema/inquiry.js";

export async function createInquiryService(data, res) {
    const existingInquiry = await Inquiry.findOne({
        where: { email: data.email },
    });

    if (existingInquiry) {
        sendErrResponseByMsg(
            res,
            "Inquiry with same email already exists",
            HttpStatus.CONFLICT
        );
    }

    try {
        const savedInquiry = await Inquiry.create(data);
        return savedInquiry;
    } catch (error) {
        console.error("Error creating Inquiry:", error);
        sendErrResponseByMsg(res, "Error creating Inquiry", HttpStatus.INTERNAL_SERVER_ERROR);
    }
}

export async function getSpecifiedInquiryService(id, res) {
    try {
        const inquiry = await Inquiry.findByPk(id);
        return inquiry;
    } catch (error) {
        console.error("Error Fetching Specified Inquiry by ID:", error);
        sendErrResponseByMsg(res, "Error Fetching Specified Inquiry by ID", HttpStatus.BAD_REQUEST);
    }
}

export function getAllInquiryService({
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

    return Inquiry.findAll(queryOptions);
}

export async function updateInquiryService(id, data, res) {
    try {
        const [_, [updatedInquiry]] = await Inquiry.update(data, {
            where: { id },
            returning: true,
        });

        return updatedInquiry;
    } catch (error) {
        console.error("Error Updating Inquiry:", error);
        sendErrResponseByMsg(res, "Error Updating Inquiry", HttpStatus.BAD_REQUEST);
    }
}

export async function deleteInquiryService(id, res) {
    try {
        const recordToDelete = await Inquiry.findByPk(id);

        if (!recordToDelete) {
            return { success: false, message: "Inquiry not found" };
        }

        const deletedRows = await Inquiry.destroy({
            where: { id },
        });

        return deletedRows;
    } catch (error) {
        console.error("Error Deleting Inquiry :", error);
        sendErrResponseByMsg(res, "Error Deleting Inquiry", HttpStatus.BAD_REQUEST);
    }
}