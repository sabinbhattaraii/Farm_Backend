import { HttpStatus } from "../constant/constant.js";
import successResponseData from "../helper/successResponseData.js";
import catchAsyncErrors from "../middleware/catchAsyncError.js";
import { throwError } from "../utils/throwError.js";
import { categoryService } from "../service/index.js";
import { sendErrResponseByMsg } from "../middleware/errorMiddleware.js";

export const createCategory = catchAsyncErrors(async (req, res) => {
    try {
        const { title, image } = req.body
        if (!title) {
            sendErrResponseByMsg(res, "Title is necessary", HttpStatus.BAD_REQUEST)
        }
        if (!image) {
            sendErrResponseByMsg(res, "Image is necessary", HttpStatus.BAD_REQUEST)
        }

        let data = await categoryService.createCategoryService(req.body)

        successResponseData({
            res: res,
            message: "Category is created successfully",
            statusCode: HttpStatus.CREATED,
            data
        })
    } catch (error) {
        console.error("Error Creating Category:", error);
        throw throwError({
            statusCode: HttpStatus.BAD_REQUEST,
            message: "Error Creating Category:",
        });
    }
})

export const getSpecificCategory = catchAsyncErrors(async (req, res, next) => {
    try {
        let id = req.params.id;
        let data = await categoryService.getSpecifiedCategoryService(id);
        if (!data) {
            return sendErrResponseByMsg(
                res,
                "Specific Category details are not found:",
                HttpStatus.NOT_FOUND,
            );
        }
        return successResponseData({
            res: res,
            statusCode: HttpStatus.OK,
            message: "Specified Category Details are found successfully:",
            data: data,
        });
    } catch (error) {
        console.error("Error Fetching Specified Category Details:", error);
        throw throwError({
            statusCode: HttpStatus.BAD_REQUEST,
            message: "Error Fetching Specified Category Details:",
        });
    }
});

export const getAllCategory = catchAsyncErrors(async (req, res, next) => {
    try {
        let find = {}
        req.find = find
        req.service = await categoryService.getAllCategoryService;
        next()
    } catch (error) {
        console.log("Error Fetching all the Category Details:", error);
        throw throwError({
            statusCode: HttpStatus.BAD_REQUEST,
            message: "Error Fetching all the Category Details:",
        });
    }
})

export const updateSpecificCategory = catchAsyncErrors(async (req, res, next) => {
    try {
        let body = req.body;
        let id = req.params.id;
        let data = await categoryService.updateCategoryService({
            id,
            body,
        });
        if (!data) {
            return sendErrResponseByMsg(
                res,
                HttpStatus.BAD_REQUEST,
                "Category Details Can Not be Updated:",
            );
        }
        return successResponseData({
            res: res,
            message: `Category Details with id ${id} is successfully updated:`,
            statusCode: HttpStatus.OK,
            data: data,
        });
    } catch (error) {
        console.log("Error While Updating the Category Detail:", error);
        throw throwError({
            statusCode: HttpStatus.BAD_REQUEST,
            message: "Error While Updating the Category Detail:",
        });
    }
});

export const deleteSpecificCategory = catchAsyncErrors(async (req, res, next) => {
    try {
        let id = req.params.id;
        let data = await categoryService.deleteCategoryService(id);
        if (!data) {
            return sendErrResponseByMsg(
                res,
                HttpStatus.NOT_FOUND,
                "Category detail can not be found to be deleted:",
            );
        }
        return successResponseData({
            res: res,
            message: `Category Details with id ${id} Deleted Successfully:`,
            statusCode: HttpStatus.OK,
            data,
        });
    } catch (error) {
        console.log("Error Deleting Specified Category:", error);
        throw throwError({
            statusCode: HttpStatus.BAD_REQUEST,
            message: "Error Deleting Specified Category:",
        })
    }
});