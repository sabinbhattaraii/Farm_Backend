import { Router } from "express";
import { bookingController } from "../controller/index.js";
import validation from "../middleware/validation.js";
import { isValidToken } from "../middleware/isValidToken.js";
import { sortFilterPagination } from "../middleware/sortSelectPage.js";
import { isAuthorized } from "../middleware/isAuthorized.js";
import { roleEnum } from "../constant/constant.js";
import bookingValidationsSchema from "../validation/bookingValidation.js";
import updateBookingValidationsSchema from "../validation/updateBookingValidation.js";

const bookingRouter = Router();

bookingRouter
    .route("/create")
    .post(validation(bookingValidationsSchema), isValidToken, isAuthorized([roleEnum.ADMIN]), bookingController.createBooking);

bookingRouter
    .route("/all")
    .get(bookingController.getAllBooking, sortFilterPagination);

bookingRouter
    .route("/:id")
    .get(bookingController.getSpecificBooking)
    .patch(
        validation(updateBookingValidationsSchema),
        isValidToken,
        isAuthorized([roleEnum.ADMIN]),
        bookingController.updateSpecificBooking
    )
    .delete(
        isValidToken,
        isAuthorized([roleEnum.ADMIN]),
        bookingController.deleteSpecificBooking
    );

export default bookingRouter;