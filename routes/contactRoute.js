import { Router } from "express";
import { contactController } from "../controller/index.js";
import validation from "../middleware/validation.js";
import { isValidToken } from "../middleware/isValidToken.js";
import { sortFilterPagination } from "../middleware/sortSelectPage.js";
import { isAuthorized } from "../middleware/isAuthorized.js";
import { roleEnum } from "../constant/constant.js";
import contactValidationSchema from "../validation/contactUsValidation.js";
import updatecontactValidationSchema from "../validation/updateContactValidation.js";

const contactRouter = Router();

contactRouter
    .route("/create")
    .post(validation(contactValidationSchema), isValidToken, isAuthorized([roleEnum.ADMIN]), contactController.createContactUs);

contactRouter
    .route("/all")
    .get(contactController.getAllContactUs, sortFilterPagination);

contactRouter
    .route("/:id")
    .get(contactController.getSpecificContactUs)
    .patch(
        validation(updatecontactValidationSchema),
        isValidToken,
        isAuthorized([roleEnum.ADMIN]),
        contactController.updateSpecificContactUs
    )
    .delete(
        isValidToken,
        isAuthorized([roleEnum.ADMIN]),
        contactController.deleteSpecificContactUs
    );

export default contactRouter;