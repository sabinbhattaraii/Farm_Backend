import { HttpStatus } from "../constant/constant.js";
import successResponseData from "../helper/successResponseData.js";
import catchAsyncErrors from "../middleware/catchAsyncError.js";
import { throwError } from "../utils/throwError.js";
import { bookingService } from "../service/index.js";
import { sendErrResponseByMsg } from "../middleware/errorMiddleware.js";

export const createBooking = catchAsyncErrors(async (req, res) => {
    try {
        const { full_name, email, contact_number,address,quantity,productId } = req.body
        if (!full_name) {
            sendErrResponseByMsg(res, "Full Name is necessary", HttpStatus.BAD_REQUEST)
        }
        if (!email) {
            sendErrResponseByMsg(res, "Email is necessary", HttpStatus.BAD_REQUEST)
        }
        if (!contact_number) {
            sendErrResponseByMsg(res, "Contact Number is necessary", HttpStatus.BAD_REQUEST)
        }
        if (!address) {
            sendErrResponseByMsg(res, "Address is necessary", HttpStatus.BAD_REQUEST)
        }
        if (!quantity) {
            sendErrResponseByMsg(res, "Quantity is necessary", HttpStatus.BAD_REQUEST)
        }
        if (!productId) {
            sendErrResponseByMsg(res, "ProductId is necessary", HttpStatus.BAD_REQUEST)
        }

        let data = await bookingService.createBookingService(req.body)

        successResponseData({
            res: res,
            message: "Booking is created successfully",
            statusCode: HttpStatus.CREATED,
            data
        })
    } catch (error) {
        console.error("Error Creating Booking:", error);
        throw throwError({
            statusCode: HttpStatus.BAD_REQUEST,
            message: "Error Creating Booking:",
        });
    }
})

export const getSpecificBooking = catchAsyncErrors(async (req, res, next) => {
    try {
        let id = req.params.id;
        let data = await bookingService.getSpecifiedBookingService(id);
        if (!data) {
            return sendErrResponseByMsg(
                res,
                "Specific Booking details are not found:",
                HttpStatus.NOT_FOUND,
            );
        }
        return successResponseData({
            res: res,
            statusCode: HttpStatus.OK,
            message: "Specified Booking Details are found successfully:",
            data: data,
        });
    } catch (error) {
        console.error("Error Fetching Specified Booking Details:", error);
        throw throwError({
            statusCode: HttpStatus.BAD_REQUEST,
            message: "Error Fetching Specified Booking Details:",
        });
    }
});

export const getAllBooking = catchAsyncErrors(async (req, res, next) => {
    try {
        let find = {}
        req.find = find
        req.service = await bookingService.getAllBookingService;
        next()
    } catch (error) {
        console.log("Error Fetching all the Booking Details:", error);
        throw throwError({
            statusCode: HttpStatus.BAD_REQUEST,
            message: "Error Fetching all the Booking Details:",
        });
    }
})

export const updateSpecificBooking = catchAsyncErrors(async (req, res, next) => {
    try {
        let body = req.body;
        let id = req.params.id;
        let data = await bookingService.updateBookingService({
            id,
            body,
        });
        if (!data) {
            return sendErrResponseByMsg(
                res,
                HttpStatus.BAD_REQUEST,
                "Booking Details Can Not be Updated:",
            );
        }
        return successResponseData({
            res: res,
            message: `Booking Details with id ${id} is successfully updated:`,
            statusCode: HttpStatus.OK,
            data: data,
        });
    } catch (error) {
        console.log("Error While Updating the Booking Detail:", error);
        throw throwError({
            statusCode: HttpStatus.BAD_REQUEST,
            message: "Error While Updating the Booking Detail:",
        });
    }
});

export const deleteSpecificBooking = catchAsyncErrors(async (req, res, next) => {
    try {
        let id = req.params.id;
        let data = await bookingService.deleteBookingService(id);
        if (!data) {
            return sendErrResponseByMsg(
                res,
                HttpStatus.NOT_FOUND,
                "Booking detail can not be found to be deleted:",
            );
        }
        return successResponseData({
            res: res,
            message: `Booking Details with id ${id} Deleted Successfully:`,
            statusCode: HttpStatus.OK,
            data,
        });
    } catch (error) {
        console.log("Error Deleting Specified Booking :", error);
        throw throwError({
            statusCode: HttpStatus.BAD_REQUEST,
            message: "Error Deleting Specified Booking:",
        })
    }
});