import { HttpStatus } from "../constant/constant.js";
import { sendErrResponseByMsg } from "../middleware/errorMiddleware.js";
import { Booking } from "../models/schema/booking.js";

export async function createBookingService(data, res) {
    const existingBooking = await Booking.findOne({
        where: { id: data.id },
    });

    if (existingBooking) {
        sendErrResponseByMsg(
            res,
            "Booking with same id already exists",
            HttpStatus.CONFLICT
        );
    }

    try {
        const savedBooking = await Booking.create(data);
        return savedBooking;
    } catch (error) {
        console.error("Error creating Booking:", error);
        sendErrResponseByMsg(res, "Error creating Booking", HttpStatus.INTERNAL_SERVER_ERROR);
    }
}

export async function getSpecifiedBookingService(id, res) {
    try {
        const booking = await Booking.findByPk(id);
        return booking;
    } catch (error) {
        console.error("Error Fetching Specified Booking by ID:", error);
        sendErrResponseByMsg(res, "Error Fetching Specified Booking by ID", HttpStatus.BAD_REQUEST);
    }
}

export function getAllBookingService({
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

    return Booking.findAll(queryOptions);
}

export async function updateBookingService(id, data, res) {
    try {
        const [_, [updatedBooking]] = await Booking.update(data, {
            where: { id },
            returning: true,
        });

        return updatedBooking;
    } catch (error) {
        console.error("Error Updating Booking :", error);
        sendErrResponseByMsg(res, "Error Updating Booking", HttpStatus.BAD_REQUEST);
    }
}

export async function deleteBookingService(id, res) {
    try {
        const recordToDelete = await Booking.findByPk(id);

        if (!recordToDelete) {
            return { success: false, message: "Booking not found" };
        }

        const deletedRows = await Booking.destroy({
            where: { id },
        });

        return deletedRows;
    } catch (error) {
        console.error("Error Deleting Booking:", error);
        sendErrResponseByMsg(res, "Error Deleting Booking", HttpStatus.BAD_REQUEST);
    }
}