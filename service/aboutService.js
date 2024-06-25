import { HttpStatus } from "../constant/constant.js";
import { sendErrResponseByMsg } from "../middleware/errorMiddleware.js";
import { AboutUs } from "../models/schema/aboutUs.js";

export async function createAboutUsService(data, res) {
    const existingAbout = await AboutUs.findOne({
        where: { title: data.title },
    });

    if (existingAbout) {
        sendErrResponseByMsg(
            res,
            "About Us with same title already exists",
            HttpStatus.CONFLICT
        );
    }

    try {
        const savedAbout = await AboutUs.create(data);
        return savedAbout;
    } catch (error) {
        console.error("Error creating About Us:", error);
        sendErrResponseByMsg(res, "Error creating About Us", HttpStatus.INTERNAL_SERVER_ERROR);
    }
}

export async function getSpecifiedAboutUsService(id, res) {
    try {
        const aboutUs = await AboutUs.findByPk(id);
        return aboutUs;
    } catch (error) {
        console.error("Error Fetching Specified About Us by ID:", error);
        sendErrResponseByMsg(res, "Error Fetching Specified About Us by ID", HttpStatus.BAD_REQUEST);
    }
}

export function getAllAboutUsService({
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

    return AboutUs.findAll(queryOptions);
}

export async function updateAboutUsService(id, data, res) {
    try {
        const [_, [updatedAbout]] = await AboutUs.update(data, {
            where: { id },
            returning: true,
        });

        return updatedAbout;
    } catch (error) {
        console.error("Error Updating About US:", error);
        sendErrResponseByMsg(res, "Error Updating About Us", HttpStatus.BAD_REQUEST);
    }
}

export async function deleteAboutUsService(id, res) {
    try {
        const recordToDelete = await AboutUs.findByPk(id);

        if (!recordToDelete) {
            return { success: false, message: "About US not found" };
        }

        const deletedRows = await AboutUs.destroy({
            where: { id },
        });

        return deletedRows;
    } catch (error) {
        console.error("Error Deleting About US:", error);
        sendErrResponseByMsg(res, "Error Deleting About Us", HttpStatus.BAD_REQUEST);
    }
}