import { HttpStatus } from "../constant/constant.js";
import successResponseData from "../helper/successResponseData.js";
import catchAsyncErrors from "../middleware/catchAsyncError.js";
import { throwError } from "../utils/throwError.js";
import { aboutService } from "../service/index.js";
import { sendErrResponseByMsg } from "../middleware/errorMiddleware.js";

export const createAboutUs = catchAsyncErrors(async (req, res) => {
    try {
        const { title, description, image, } = req.body
        if (!title) {
            sendErrResponseByMsg(res, "Title is necessary", HttpStatus.BAD_REQUEST)
        }
        if (!description) {
            sendErrResponseByMsg(res, "Description is necessary", HttpStatus.BAD_REQUEST)
        }
        if (!image) {
            sendErrResponseByMsg(res, "Image is necessary", HttpStatus.BAD_REQUEST)
        }

        let data = await aboutService.createAboutUsService(req.body)

        successResponseData({
            res: res,
            message: "About Us is created successfully",
            statusCode: HttpStatus.CREATED,
            data
        })
    } catch (error) {
        console.error("Error Creating About Us:", error);
        throw throwError({
            statusCode: HttpStatus.BAD_REQUEST,
            message: "Error Creating About Us:",
        });
    }
})

export const getSpecificAboutUs = catchAsyncErrors(async (req, res, next) => {
    try {
        let id = req.params.id;
        let data = await aboutService.getSpecifiedAboutUsService(id);
        if (!data) {
            return sendErrResponseByMsg(
                res,
                "Specific About Us details are not found:",
                HttpStatus.NOT_FOUND,
            );
        }
        return successResponseData({
            res: res,
            statusCode: HttpStatus.OK,
            message: "Specified About Us Details are found successfully:",
            data: data,
        });
    } catch (error) {
        console.error("Error Fetching Specified About Us Details:", error);
        throw throwError({
            statusCode: HttpStatus.BAD_REQUEST,
            message: "Error Fetching Specified About Us Details:",
        });
    }
});

export const getAllAboutUs = catchAsyncErrors(async (req, res, next) => {
    try {
        let find = {}
        req.find = find
        req.service = await aboutService.getAllAboutUsService;
        next()
    } catch (error) {
        console.log("Error Fetching all the About Us Details:", error);
        throw throwError({
            statusCode: HttpStatus.BAD_REQUEST,
            message: "Error Fetching all the About Us Details:",
        });
    }
})

export const updateSpecificAboutUs = catchAsyncErrors(async (req, res, next) => {
    try {
        let body = req.body;
        let id = req.params.id;
        let data = await aboutService.updateAboutUsService({
            id,
            body,
        });
        if (!data) {
            return sendErrResponseByMsg(
                res,
                HttpStatus.BAD_REQUEST,
                "About Us Details Can Not be Updated:",
            );
        }
        return successResponseData({
            res: res,
            message: `About Us Details with id ${id} is successfully updated:`,
            statusCode: HttpStatus.OK,
            data: data,
        });
    } catch (error) {
        console.log("Error While Updating the About Us Detail:", error);
        throw throwError({
            statusCode: HttpStatus.BAD_REQUEST,
            message: "Error While Updating the About Us Detail:",
        });
    }
});

export const deleteSpecificAboutUs = catchAsyncErrors(async (req, res, next) => {
    try {
        let id = req.params.id;
        let data = await aboutService.deleteAboutUsService(id);
        if (!data) {
            return sendErrResponseByMsg(
                res,
                HttpStatus.NOT_FOUND,
                "About Us detail can not be found to be deleted:",
            );
        }
        return successResponseData({
            res: res,
            message: `About Us Details with id ${id} Deleted Successfully:`,
            statusCode: HttpStatus.OK,
            data,
        });
    } catch (error) {
        console.log("Error Deleting Specified About Us:", error);
        throw throwError({
            statusCode: HttpStatus.BAD_REQUEST,
            message: "Error Deleting Specified About Us:",
        })
    }
});