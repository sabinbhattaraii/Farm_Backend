import { Router } from "express";
import { productController } from "../controller/index.js";
import validation from "../middleware/validation.js";
import { isValidToken } from "../middleware/isValidToken.js";
import { sortFilterPagination } from "../middleware/sortSelectPage.js";
import { isAuthorized } from "../middleware/isAuthorized.js";
import { roleEnum } from "../constant/constant.js";
import productValidationSchema from "../validation/productValidation.js";
import updateProductValidationSchema from "../validation/updateProductValidation.js";

const productRouter = Router();

productRouter
    .route("/create")
    .post(validation(productValidationSchema), isValidToken, isAuthorized([roleEnum.ADMIN]), productController.createProduct);

productRouter
    .route("/all")
    .get(productController.getAllProduct, sortFilterPagination);

productRouter
    .route("/:id")
    .get(productController.getSpecificProduct)
    .patch(
        validation(updateProductValidationSchema),
        isValidToken,
        isAuthorized([roleEnum.ADMIN]),
        productController.updateSpecificProduct
    )
    .delete(
        isValidToken,
        isAuthorized([roleEnum.ADMIN]),
        productController.deleteSpecificProduct
    );

export default productRouter;