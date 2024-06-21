import { HttpStatus } from "../constant/constant.js";
import successResponseData from "../helper/successResponseData.js";
import catchAsyncErrors from "../middleware/catchAsyncError.js";
import { throwError } from "../utils/throwError.js";
import { productService } from "../service/index.js";
import { sendErrResponseByMsg } from "../middleware/errorMiddleware.js";

export const createProduct = catchAsyncErrors(async (req, res) => {
    try {
        const { product_title, description, image,price,quantity,categoryId } = req.body
        if (!product_title) {
            sendErrResponseByMsg(res, "Product_title is necessary", HttpStatus.BAD_REQUEST)
        }
        if (!description) {
            sendErrResponseByMsg(res, "Description is necessary", HttpStatus.BAD_REQUEST)
        }
        if (!image) {
            sendErrResponseByMsg(res, "Image is necessary", HttpStatus.BAD_REQUEST)
        }
        if (!price) {
            sendErrResponseByMsg(res, "Price is necessary", HttpStatus.BAD_REQUEST)
        }
        if (!quantity) {
            sendErrResponseByMsg(res, "Quantity is necessary", HttpStatus.BAD_REQUEST)
        }
        if (!categoryId) {
            sendErrResponseByMsg(res, "Category Id is necessary", HttpStatus.BAD_REQUEST)
        }

        let data = await productService.createProductService(req.body)

        successResponseData({
            res: res,
            message: "Product is created successfully",
            statusCode: HttpStatus.CREATED,
            data
        })
    } catch (error) {
        console.error("Error Creating Product :", error);
        throw throwError({
            statusCode: HttpStatus.BAD_REQUEST,
            message: "Error Creating Product :",
        });
    }
})

export const getSpecificProduct = catchAsyncErrors(async (req, res, next) => {
    try {
        let id = req.params.id;
        let data = await productService.getSpecifiedProductService(id);
        if (!data) {
            return sendErrResponseByMsg(
                res,
                "Specific Product details are not found:",
                HttpStatus.NOT_FOUND,
            );
        }
        return successResponseData({
            res: res,
            statusCode: HttpStatus.OK,
            message: "Specified Product Details are found successfully:",
            data: data,
        });
    } catch (error) {
        console.error("Error Fetching Specified Product Details:", error);
        throw throwError({
            statusCode: HttpStatus.BAD_REQUEST,
            message: "Error Fetching Specified Product Details:",
        });
    }
});

export const getAllProduct = catchAsyncErrors(async (req, res, next) => {
    try {
        let find = {}
        req.find = find
        req.service = await productService.getAllProductService;
        next()
    } catch (error) {
        console.log("Error Fetching all the Product Details:", error);
        throw throwError({
            statusCode: HttpStatus.BAD_REQUEST,
            message: "Error Fetching all the Product Details:",
        });
    }
})

export const updateSpecificProduct = catchAsyncErrors(async (req, res, next) => {
    try {
        let body = req.body;
        let id = req.params.id;
        let data = await productService.updateProductService({
            id,
            body,
        });
        if (!data) {
            return sendErrResponseByMsg(
                res,
                HttpStatus.BAD_REQUEST,
                "Product Details Can Not be Updated:",
            );
        }
        return successResponseData({
            res: res,
            message: `Product Details with id ${id} is successfully updated:`,
            statusCode: HttpStatus.OK,
            data: data,
        });
    } catch (error) {
        console.log("Error While Updating the Product Detail:", error);
        throw throwError({
            statusCode: HttpStatus.BAD_REQUEST,
            message: "Error While Updating the Product Detail:",
        });
    }
});

export const deleteSpecificProduct = catchAsyncErrors(async (req, res, next) => {
    try {
        let id = req.params.id;
        let data = await productService.deleteProductService(id);
        if (!data) {
            return sendErrResponseByMsg(
                res,
                HttpStatus.NOT_FOUND,
                "Product detail can not be found to be deleted:",
            );
        }
        return successResponseData({
            res: res,
            message: `Product Details with id ${id} Deleted Successfully:`,
            statusCode: HttpStatus.OK,
            data,
        });
    } catch (error) {
        console.log("Error Deleting Specified Product:", error);
        throw throwError({
            statusCode: HttpStatus.BAD_REQUEST,
            message: "Error Deleting Specified Product:",
        })
    }
});