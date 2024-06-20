import { HttpStatus } from "../constant/constant.js";
import successResponseData from "../helper/successResponseData.js";
import catchAsyncErrors from "../middleware/catchAsyncError.js";
import { throwError } from "../utils/throwError.js";
import { inquiryService } from "../service/index.js";
import { sendErrResponseByMsg } from "../middleware/errorMiddleware.js";

export const createInquiry = catchAsyncErrors(async (req, res) => {
    try {
        const { name, email, phone_number,message } = req.body
        if (!name) {
            sendErrResponseByMsg(res, "Name is necessary", HttpStatus.BAD_REQUEST)
        }
        if (!email) {
            sendErrResponseByMsg(res, "Email is necessary", HttpStatus.BAD_REQUEST)
        }
        if (!phone_number) {
            sendErrResponseByMsg(res, "Phone Number is necessary", HttpStatus.BAD_REQUEST)
        }
        if (!message) {
            sendErrResponseByMsg(res, "Message is necessary", HttpStatus.BAD_REQUEST)
        }

        let data = await inquiryService.createInquiryService(req.body)

        successResponseData({
            res: res,
            message: "Inquiry Detail is created successfully",
            statusCode: HttpStatus.CREATED,
            data
        })
    } catch (error) {
        console.error("Error Creating Inquiry Details :", error);
        throw throwError({
            statusCode: HttpStatus.BAD_REQUEST,
            message: "Error Creating Inquiry Details :",
        });
    }
})

export const getSpecificInquiry = catchAsyncErrors(async (req, res, next) => {
    try {
        let id = req.params.id;
        let data = await inquiryService.getSpecifiedInquiryService(id);
        if (!data) {
            return sendErrResponseByMsg(
                res,
                "Specific Inquiry details are not found:",
                HttpStatus.NOT_FOUND,
            );
        }
        return successResponseData({
            res: res,
            statusCode: HttpStatus.OK,
            message: "Specified Inquiry Details are found successfully:",
            data: data,
        });
    } catch (error) {
        console.error("Error Fetching Specified Inquiry Details:", error);
        throw throwError({
            statusCode: HttpStatus.BAD_REQUEST,
            message: "Error Fetching Specified Inquiry Details:",
        });
    }
});

export const getAllInquiry = catchAsyncErrors(async (req, res, next) => {
    try {
        let find = {}
        req.find = find
        req.service = await inquiryService.getAllInquiryService;
        next()
    } catch (error) {
        console.log("Error Fetching all the Inquiry Details:", error);
        throw throwError({
            statusCode: HttpStatus.BAD_REQUEST,
            message: "Error Fetching all the Inquiry Details:",
        });
    }
})

export const updateSpecificInquiry = catchAsyncErrors(async (req, res, next) => {
    try {
        let body = req.body;
        let id = req.params.id;
        let data = await inquiryService.updateInquiryService({
            id,
            body,
        });
        if (!data) {
            return sendErrResponseByMsg(
                res,
                HttpStatus.BAD_REQUEST,
                "Inquiry Details Can Not be Updated:",
            );
        }
        return successResponseData({
            res: res,
            message: `Inquiry Details with id ${id} is successfully updated:`,
            statusCode: HttpStatus.OK,
            data: data,
        });
    } catch (error) {
        console.log("Error While Updating the Inquiry Detail:", error);
        throw throwError({
            statusCode: HttpStatus.BAD_REQUEST,
            message: "Error While Updating the Inquiry Detail:",
        });
    }
});

export const deleteSpecificInquiry = catchAsyncErrors(async (req, res, next) => {
    try {
        let id = req.params.id;
        let data = await inquiryService.deleteInquiryService(id);
        if (!data) {
            return sendErrResponseByMsg(
                res,
                HttpStatus.NOT_FOUND,
                "Inquiry detail can not be found to be deleted:",
            );
        }
        return successResponseData({
            res: res,
            message: `Inquiry Details with id ${id} Deleted Successfully:`,
            statusCode: HttpStatus.OK,
            data,
        });
    } catch (error) {
        console.log("Error Deleting Specified Inquiry :", error);
        throw throwError({
            statusCode: HttpStatus.BAD_REQUEST,
            message: "Error Deleting Specified Inquiry :",
        })
    }
});