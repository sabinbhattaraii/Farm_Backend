import { Router } from "express";
import { categoryController } from "../controller/index.js";
import validation from "../middleware/validation.js";
import { isValidToken } from "../middleware/isValidToken.js";
import { sortFilterPagination } from "../middleware/sortSelectPage.js";
import { isAuthorized } from "../middleware/isAuthorized.js";
import { roleEnum } from "../constant/constant.js";
import categoryValidationsSchema from "../validation/categoryValidation.js";
import updateCategoryValidationsSchema from "../validation/updateCategoryValidation.js";

const categoryRouter = Router()

categoryRouter
    .route("/create")
    .post(validation(categoryValidationsSchema), isValidToken, isAuthorized([roleEnum.ADMIN]), categoryController.createCategory);

categoryRouter
    .route("/all")
    .get(categoryController.getAllCategory, sortFilterPagination);

categoryRouter
    .route("/:id")
    .get(categoryController.getSpecificCategory)
    .patch(
        validation(updateCategoryValidationsSchema),
        isValidToken,
        isAuthorized([roleEnum.ADMIN]),
        categoryController.updateSpecificCategory
    )
    .delete(
        isValidToken,
        isAuthorized([roleEnum.ADMIN]),
        categoryController.deleteSpecificCategory
    );

export default categoryRouter;