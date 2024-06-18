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

userRouter
    .route("/verify-email")
    .patch(validation(verifyValidationSchema), isValidToken, userController.verifyEmail);

userRouter
    .route("/login")
    .post(validation(loginvalidationSchem), userController.loginUser);

userRouter
    .route("/logout")
    .post(validation(logoutValidationSchema), isValidToken, userController.logoutUser)

userRouter
    .route('/')
    .get(isValidToken, userController.getAllUser, sortFilterPagination)

userRouter
    .route("/my-profile")
    .get(isValidToken, userController.userMyProfile)

userRouter
    .route("/update-profile")
    .patch(validation(updateProfileValidationSchema), isValidToken, userController.updateUserProfile("myProfile"));

userRouter
    .route("/update-password")
    .patch(validation(updatePasswordValidationSchema), isValidToken, userController.updatePassword)


userRouter
    .route("/forget-password")
    .post(validation(forgetPasswordValidationSchema), userController.forgetUserPassword);

userRouter
    .route("/reset-password")
    .post(validation(resetPasswordValidationSchema), isValidToken, userController.resetUserPassword);

userRouter
    .route("/delete/:id")
    .post(isValidToken, userController.deleteSpecifiedUser);

userRouter
    .route("/update/:id")
    .patch(
        validation(updateUserByAdminValidationSchema),
        isValidToken,
        isAuthorized([roleEnum.ADMIN]),
        userController.updateUserProfile()
    );

userRouter
    .route('/:id')
    .get(isValidToken, isAuthorized([roleEnum.ADMIN]), userController.getSpecificUser)

export default userRouter;