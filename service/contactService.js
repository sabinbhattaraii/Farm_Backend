import { HttpStatus } from "../constant/constant.js";
import { sendErrResponseByMsg } from "../middleware/errorMiddleware.js";
import { Contact } from "../models/schema/contactUs.js";

export async function createContactUsService(data, res) {
    const existingcontact = await Contact.findOne({
        where: { email: data.email },
    });

    if (existingcontact) {
        sendErrResponseByMsg(
            res,
            "Contact Us with same email already exists",
            HttpStatus.CONFLICT
        );
    }

    try {
        const savedContact = await Contact.create(data);
        return savedContact;
    } catch (error) {
        console.error("Error creating Contact Us:", error);
        sendErrResponseByMsg(res, "Error creating Contact Us", HttpStatus.INTERNAL_SERVER_ERROR);
    }
}

export async function getSpecifiedContactUsService(id, res) {
    try {
        const contactUs = await Contact.findByPk(id);
        return contactUs;
    } catch (error) {
        console.error("Error Fetching Specified Contact Us by ID:", error);
        sendErrResponseByMsg(res, "Error Fetching Specified Contact Us by ID", HttpStatus.BAD_REQUEST);
    }
}

export function getAllContactUsService({
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

    return Contact.findAll(queryOptions);
}

export async function updateContactUsService(id, data, res) {
    try {
        const [_, [updatedContact]] = await Contact.update(data, {
            where: { id },
            returning: true,
        });

        return updatedContact;
    } catch (error) {
        console.error("Error Updating Contact US:", error);
        sendErrResponseByMsg(res, "Error Updating Contact Us", HttpStatus.BAD_REQUEST);
    }
}

export async function deleteContactUsService(id, res) {
    try {
        const recordToDelete = await Contact.findByPk(id);

        if (!recordToDelete) {
            return { success: false, message: "Contact US not found" };
        }

        const deletedRows = await Contact.destroy({
            where: { id },
        });

        return deletedRows;
    } catch (error) {
        console.error("Error Deleting Contact US:", error);
        sendErrResponseByMsg(res, "Error Deleting Contact Us", HttpStatus.BAD_REQUEST);
    }
}