import { serverBaseUrl } from '../config/sconfig.js'
import catchAsyncErrors from '../middleware/catchAsyncError.js'
import successResponseData from "../helper/successResponseData.js";
import { HttpStatus } from '../constant/constant.js';
import { throwError } from '../utils/throwError.js';

export const createFile = catchAsyncErrors(async (req, res, next) => {
    try {
        if (req.file) {
            let fileName = req.file.filename;
            let path = { path: `${serverBaseUrl}/${fileName}` }

            successResponseData({
                res,
                message: "File uploaded successfully.",
                statusCode: HttpStatus.CREATED,
                data: path,
            });
        } else {
            let paths = req.files.map((file) => {
                let fileName = file.filename;
                let path = `${serverBaseUrl}/ ${fileName}`
                return { path: path }
            });

            successResponseData({
                res,
                message: "Files uploaded successfully.",
                statusCode: HttpStatus.CREATED,
                data: paths
            })
        }
    } catch (error) {
        console.error("Error While File Uploading:", error);
        throw throwError({
            statusCode: HttpStatus.BAD_REQUEST,
            message: "Error While File Uploading:",
        });
    }
});