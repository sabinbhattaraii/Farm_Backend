import { Router } from "express";
import { aboutController } from "../controller/index.js";
import validation from "../middleware/validation.js";
import { isValidToken } from "../middleware/isValidToken.js";
import { sortFilterPagination } from "../middleware/sortSelectPage.js";
import { isAuthorized } from "../middleware/isAuthorized.js";
import { roleEnum } from "../constant/constant.js";
import aboutUsValidationsSchema from "../validation/aboutUsValidation.js";
import updateAboutUsValidationsSchema from "../validation/updateAboutUsValidation.js";

const aboutUsRouter = Router();

aboutUsRouter
    .route("/create")
    .post(validation(aboutUsValidationsSchema), isValidToken, isAuthorized([roleEnum.ADMIN]), aboutController.createAboutUs);

aboutUsRouter
    .route("/all")
    .get(aboutController.getAllAboutUs, sortFilterPagination);

aboutUsRouter
    .route("/:id")
    .get(aboutController.getSpecificAboutUs)
    .patch(
        validation(updateAboutUsValidationsSchema),
        isValidToken,
        isAuthorized([roleEnum.ADMIN]),
        aboutController.updateSpecificAboutUs
    )
    .delete(
        isValidToken,
        isAuthorized([roleEnum.ADMIN]),
        aboutController.deleteSpecificAboutUs
    );

export default aboutUsRouter;