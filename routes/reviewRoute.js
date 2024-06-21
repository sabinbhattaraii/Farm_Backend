import { Router } from "express";
import { reviewController } from "../controller/index.js";
import validation from "../middleware/validation.js";
import { isValidToken } from "../middleware/isValidToken.js";
import { sortFilterPagination } from "../middleware/sortSelectPage.js";
import { isAuthorized } from "../middleware/isAuthorized.js";
import { roleEnum } from "../constant/constant.js";
import reviewValidationSchema from "../validation/reviewValidation.js";
import updateReviewValidationSchema from "../validation/updateReviewValidation.js";

const reviewRouter = Router();

reviewRouter
    .route("/create")
    .post(validation(reviewValidationSchema), isValidToken, isAuthorized([roleEnum.ADMIN]), reviewController.createReview);

reviewRouter
    .route("/all")
    .get(reviewController.getAllReview, sortFilterPagination);

reviewRouter
    .route("/:id")
    .get(reviewController.getSpecificReview)
    .patch(
        validation(updateReviewValidationSchema),
        isValidToken,
        isAuthorized([roleEnum.ADMIN]),
        reviewController.updateSpecificReview
    )
    .delete(
        isValidToken,
        isAuthorized([roleEnum.ADMIN]),
        reviewController.deleteSpecificReview
    );

export default reviewRouter;