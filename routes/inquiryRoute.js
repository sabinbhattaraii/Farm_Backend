import { Router } from "express";
import { inquiryController } from "../controller/index.js";
import validation from "../middleware/validation.js";
import { isValidToken } from "../middleware/isValidToken.js";
import { sortFilterPagination } from "../middleware/sortSelectPage.js";
import { isAuthorized } from "../middleware/isAuthorized.js";
import { roleEnum } from "../constant/constant.js";
import inquiryValidationSchema from "../validation/inquiryValidation.js";
import updateInquiryValidationSchema from "../validation/updateInquiryValidation.js";

const inquiryRouter = Router();

inquiryRouter
    .route("/create")
    .post(validation(inquiryValidationSchema), isValidToken, isAuthorized([roleEnum.ADMIN]), inquiryController.createInquiry);

inquiryRouter
    .route("/all")
    .get(inquiryController.getAllInquiry, sortFilterPagination);

inquiryRouter
    .route("/:id")
    .get(inquiryController.getSpecificInquiry)
    .patch(
        validation(updateInquiryValidationSchema),
        isValidToken,
        isAuthorized([roleEnum.ADMIN]),
        inquiryController.updateSpecificInquiry
    )
    .delete(
        isValidToken,
        isAuthorized([roleEnum.ADMIN]),
        inquiryController.deleteSpecificInquiry
    );

export default inquiryRouter;