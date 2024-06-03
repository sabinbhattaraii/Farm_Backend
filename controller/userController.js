import { expiryIn, reset_expiry_in, secretKey, tokenTypes } from "../config/sconfig.js";
import { HttpStatus } from "../constant/constant.js";
import successResponseData from "../helper/successResponseData.js";
import catchAsyncErrors from "../middleware/catchAsyncError.js";
import { Users } from "../models/schema/user.js";
import { sendEmailToForgotPassword, sendEmailToVerify } from "../service/emailService.js";
import { userService, tokenService } from "../service/index.js";
import getTokenExpiryTime from "../utils/getTokenExpiryTime.js";
import { comparePassword, hashPassword } from "../utils/hashFunction.js";
import { throwError } from "../utils/throwError.js";
import { generateToken } from "../utils/token.js";

//Register
export const createAuthUser = catchAsyncErrors(async (req, res) => {
    try {
        const body = { ...req.body };
        body.isVerified = false;

        const email = body.email;
        const user = await userService.getSpecificUserByAny({ email });
        const getAllUser = await Users.countDocuments();
        body.userId = (getAllUser || 0) + 1;

        // Check and Set default role if not provided
        if (!body.roles || body.roles.some((role) => role.trim() === '')) {
            body.roles = ["customer"];
        }

        if (user) {
            throw throwError({
                message: "Email already exists.",
                statusCode: HttpStatus.UNAUTHORIZED,
            });
        } else {
            const data = await userService.createUserService({ body });
            delete data._doc.password;

            const infoObj = { userId: data._id };
            const token = await generateToken(infoObj, secretKey, expiryIn);

            const tokenData = {
                token,
                userId: data._id,
                type: tokenTypes.VERIFY_EMAIL,
                expiration: getTokenExpiryTime(token).toLocaleString(),
            };

            await tokenService.createTokenService({ data: tokenData });

            await sendEmailToVerify({
                email,
                token,
                firstName: body.firstName,
                lastName: body.lastName
            });

            successResponseData({
                res,
                message: "Verification mail has been sent.",
                statusCode: HttpStatus.CREATED,
                data,
            });
        }
    } catch (error) {
        console.error("Error Registering User:", error);
        throw throwError({
            statusCode: HttpStatus.BAD_REQUEST,
            message: "Server Error",
        });
    }
});