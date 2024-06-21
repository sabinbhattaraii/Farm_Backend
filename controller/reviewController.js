import { HttpStatus } from "../constant/constant.js";
import successResponseData from "../helper/successResponseData.js";
import catchAsyncErrors from "../middleware/catchAsyncError.js";
import { throwError } from "../utils/throwError.js";
import { reviewService } from "../service/index.js";
import { sendErrResponseByMsg } from "../middleware/errorMiddleware.js";

export const createReview = catchAsyncErrors(async (req, res) => {
    try {
        const { full_name, review_message } = req.body
        if (!full_name) {
            sendErrResponseByMsg(res, "Full Name is necessary", HttpStatus.BAD_REQUEST)
        }
        if (!review_message) {
            sendErrResponseByMsg(res, "Review message is necessary", HttpStatus.BAD_REQUEST)
        }

        let data = await reviewService.createReviewService(req.body)

        successResponseData({
            res: res,
            message: "Review is created successfully",
            statusCode: HttpStatus.CREATED,
            data
        })
    } catch (error) {
        console.error("Error Creating Review:", error);
        throw throwError({
            statusCode: HttpStatus.BAD_REQUEST,
            message: "Error Creating Review:",
        });
    }
})

export const getSpecificReview = catchAsyncErrors(async (req, res, next) => {
    try {
        let id = req.params.id;
        let data = await reviewService.getSpecifiedReviewService(id);
        if (!data) {
            return sendErrResponseByMsg(
                res,
                "Specific Review details are not found:",
                HttpStatus.NOT_FOUND,
            );
        }
        return successResponseData({
            res: res,
            statusCode: HttpStatus.OK,
            message: "Specified Review Details are found successfully:",
            data: data,
        });
    } catch (error) {
        console.error("Error Fetching Specified Review Details:", error);
        throw throwError({
            statusCode: HttpStatus.BAD_REQUEST,
            message: "Error Fetching Specified Review Details:",
        });
    }
});

export const getAllReview = catchAsyncErrors(async (req, res, next) => {
    try {
        let find = {}
        req.find = find
        req.service = await reviewService.getAllReviewService;
        next()
    } catch (error) {
        console.log("Error Fetching all the Review Details:", error);
        throw throwError({
            statusCode: HttpStatus.BAD_REQUEST,
            message: "Error Fetching all the Review Details:",
        });
    }
})

export const updateSpecificReview = catchAsyncErrors(async (req, res, next) => {
    try {
        let body = req.body;
        let id = req.params.id;
        let data = await reviewService.updateReviewService({
            id,
            body,
        });
        if (!data) {
            return sendErrResponseByMsg(
                res,
                HttpStatus.BAD_REQUEST,
                "Review Details Can Not be Updated:",
            );
        }
        return successResponseData({
            res: res,
            message: `Review Details with id ${id} is successfully updated:`,
            statusCode: HttpStatus.OK,
            data: data,
        });
    } catch (error) {
        console.log("Error While Updating the Review Detail:", error);
        throw throwError({
            statusCode: HttpStatus.BAD_REQUEST,
            message: "Error While Updating the Review Detail:",
        });
    }
});

export const deleteSpecificReview = catchAsyncErrors(async (req, res, next) => {
    try {
        let id = req.params.id;
        let data = await reviewService.deleteReviewService(id);
        if (!data) {
            return sendErrResponseByMsg(
                res,
                HttpStatus.NOT_FOUND,
                "Review detail can not be found to be deleted:",
            );
        }
        return successResponseData({
            res: res,
            message: `Review Details with id ${id} Deleted Successfully:`,
            statusCode: HttpStatus.OK,
            data,
        });
    } catch (error) {
        console.log("Error Deleting Specified Review:", error);
        throw throwError({
            statusCode: HttpStatus.BAD_REQUEST,
            message: "Error Deleting Specified Review:",
        })
    }
});