import { HttpStatus } from "../constant/constant.js";
import successResponseData from "../helper/successResponseData.js";
import catchAsyncErrors from "../middleware/catchAsyncError.js";
import { throwError } from "../utils/throwError.js";
import { contactService } from "../service/index.js";
import { sendErrResponseByMsg } from "../middleware/errorMiddleware.js";

export const createContactUs = catchAsyncErrors(async (req, res) => {
    try {
        const { email,address,contact_number, description, } = req.body
        if (!email) {
            sendErrResponseByMsg(res, "Email is necessary", HttpStatus.BAD_REQUEST)
        }
        if (!address) {
            sendErrResponseByMsg(res, "Address is necessary", HttpStatus.BAD_REQUEST)
        }
        if (!contact_number) {
            sendErrResponseByMsg(res, "Contact Number is necessary", HttpStatus.BAD_REQUEST)
        }
        if (!description) {
            sendErrResponseByMsg(res, "Description is necessary", HttpStatus.BAD_REQUEST)
        }

        let data = await contactService.createContactUsService(req.body)

        successResponseData({
            res: res,
            message: "Contact Us is created successfully",
            statusCode: HttpStatus.CREATED,
            data
        })
    } catch (error) {
        console.error("Error Creating Contact Us:", error);
        throw throwError({
            statusCode: HttpStatus.BAD_REQUEST,
            message: "Error Creating Contact Us:",
        });
    }
})

export const getSpecificContactUs = catchAsyncErrors(async (req, res, next) => {
    try {
        let id = req.params.id;
        let data = await contactService.getSpecifiedContactUsService(id);
        if (!data) {
            return sendErrResponseByMsg(
                res,
                "Specific Contact Us details are not found:",
                HttpStatus.NOT_FOUND,
            );
        }
        return successResponseData({
            res: res,
            statusCode: HttpStatus.OK,
            message: "Specified Contact Us Details are found successfully:",
            data: data,
        });
    } catch (error) {
        console.error("Error Fetching Specified Contact Us Details:", error);
        throw throwError({
            statusCode: HttpStatus.BAD_REQUEST,
            message: "Error Fetching Specified Contact Us Details:",
        });
    }
});

export const getAllContactUs = catchAsyncErrors(async (req, res, next) => {
    try {
        let find = {}
        req.find = find
        req.service = await contactService.getAllContactUsService;
        next()
    } catch (error) {
        console.log("Error Fetching all the Contact Us Details:", error);
        throw throwError({
            statusCode: HttpStatus.BAD_REQUEST,
            message: "Error Fetching all the Contact Us Details:",
        });
    }
})

export const updateSpecificContactUs = catchAsyncErrors(async (req, res, next) => {
    try {
        let body = req.body;
        let id = req.params.id;
        let data = await contactService.updateContactUsService({
            id,
            body,
        });
        if (!data) {
            return sendErrResponseByMsg(
                res,
                HttpStatus.BAD_REQUEST,
                "Contact Us Details Can Not be Updated:",
            );
        }
        return successResponseData({
            res: res,
            message: `Contact Us Details with id ${id} is successfully updated:`,
            statusCode: HttpStatus.OK,
            data: data,
        });
    } catch (error) {
        console.log("Error While Updating the Contact Us Detail:", error);
        throw throwError({
            statusCode: HttpStatus.BAD_REQUEST,
            message: "Error While Updating the Contact Us Detail:",
        });
    }
});

export const deleteSpecificContactUs = catchAsyncErrors(async (req, res, next) => {
    try {
        let id = req.params.id;
        let data = await contactService.deleteContactUsService(id);
        if (!data) {
            return sendErrResponseByMsg(
                res,
                HttpStatus.NOT_FOUND,
                "Contact Us detail can not be found to be deleted:",
            );
        }
        return successResponseData({
            res: res,
            message: `Contact Us Details with id ${id} Deleted Successfully:`,
            statusCode: HttpStatus.OK,
            data,
        });
    } catch (error) {
        console.log("Error Deleting Specified Contact Us:", error);
        throw throwError({
            statusCode: HttpStatus.BAD_REQUEST,
            message: "Error Deleting Specified Contact Us:",
        })
    }
});