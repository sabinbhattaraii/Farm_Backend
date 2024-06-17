import { Router } from "express";
import { userController } from "../controller/index.js";
import validation from "../middleware/validation.js";
import userValidationSchema from "../validation/userValidation.js";
import loginvalidationSchem from "../validation/loginValidation.js";
import verifyValidationSchema from "../validation/verifyValidation.js";
import logoutValidationSchema from "../validation/logoutValidation.js";
import { isValidToken } from "../middleware/isValidToken.js";
import { sortFilterPagination } from "../middleware/sortSelectPage.js";
import { isAuthorized } from "../middleware/isAuthorized.js";
import { roleEnum } from "../constant/constant.js";
import resetPasswordValidationSchema from "../validation/resetPasswordValidation.js";
import forgetPasswordValidationSchema from "../validation/forgetPasswordValidation.js";
import updateUserByAdminValidationSchema from "../validation/updateUserByAdminValidation.js";
import updatePasswordValidationSchema from "../validation/updatePasswordValidation.js";
import updateProfileValidationSchema from "../validation/updateProfileValidation.js";

const userRouter = Router();

userRouter
    .route("/register")
    .post(validation(userValidationSchema), userController.createAuthUser);

authRouter
    .route("/verify-email")
    .patch(validation(verifyValidationSchema), isValidToken, userController.verifyEmail);

authRouter
    .route("/login")
    .post(validation(loginvalidationSchem), userController.loginUser);

authRouter
    .route("/logout")
    .post(validation(logoutValidationSchema), isValidToken, userController.logoutUser)

authRouter
    .route('/')
    .get(isValidToken, userController.getAllUser, sortFilterPagination)

authRouter
    .route("/my-profile")
    .get(isValidToken, userController.userMyProfile)

authRouter
    .route("/update-profile")
    .patch(validation(updateProfileValidationSchema), isValidToken, userController.updateUserProfile("myProfile"));

authRouter
    .route("/update-password")
    .patch(validation(updatePasswordValidationSchema), isValidToken, userController.updatePassword)


authRouter
    .route("/forget-password")
    .post(validation(forgetPasswordValidationSchema), userController.forgetUserPassword);

authRouter
    .route("/reset-password")
    .post(validation(resetPasswordValidationSchema), isValidToken, userController.resetUserPassword);

authRouter
    .route("/delete/:id")
    .post(isValidToken, userController.deleteSpecifiedUser);

authRouter
    .route("/update/:id")
    .patch(
        validation(updateUserByAdminValidationSchema),
        isValidToken,
        isAuthorized([roleEnum.ADMIN]),
        userController.updateUserProfile()
    );

authRouter
    .route('/:id')
    .get(isValidToken, isAuthorized([roleEnum.ADMIN]), userController.getSpecificUser)

export default userRouter;