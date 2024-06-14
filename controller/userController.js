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
            message: "Error Registering User:",
        });
    }
});

//Verify Email
export const verifyEmail = catchAsyncErrors(async (req, res, next) => {
    try {
        const id = req.info.userId;
        const tokenId = req.token.tokenId;

        const passHashedPassword = await hashPassword(req.body.password);

        const data = await userService.updateUserService({
            id,
            body: {
                isVerified: true,
                password: passHashedPassword,
            },
        });
        delete data._doc.password;
        await tokenService.deleteSpecifiedTokenService({ id: tokenId });
        successResponseData({
            res,
            message: "Email verified successfully.",
            statusCode: HttpStatus.CREATED,
            data,
        })
    } catch (error) {
        console.log("Error Verifying Users Email:", error)
        throw throwError({
            statusCode: HttpStatus.BAD_REQUEST,
            message: "Error Verifying Users Email:",
        })
    }
});

//Login User
export const loginUser = catchAsyncErrors(async (req, res) => {
    try {
        let email = req.body.email;
        let password = req.body.password;
        let user = await userService.getSpecificUserByAny({ email });

        if (user === null) {
            throw throwError({
                message: "Please enter valid email or password.",
                statusCode: HttpStatus.UNAUTHORIZED,
            });
        } else {
            let isValidPassword = await comparePassword(password, user.password);
            if (isValidPassword) {
                let infoObj = { userId: user._id, role: user.role };
                let token = await generateToken(infoObj, secretKey, expiryIn);

                let data = {
                    token: token,
                    userId: user._id,
                    type: tokenTypes.ACCESS,
                    expiration: getTokenExpiryTime(token).toLocaleString(),
                };
                console.log(data)
                await tokenService.createTokenService({ data });

                successResponseData({
                    res,
                    message: "Login Successfully.",
                    statusCode: HttpStatus.OK,
                    data: {
                        token: token,
                        user: user,
                    },
                });
            } else {
                throw throwError({
                    message: "Please enter valid email or password.",
                    statusCode: HttpStatus.UNAUTHORIZED,
                });
            }
        }
    } catch (error) {
        console.log("Error Logging Users:", error)
        throw throwError({
            statusCode: HttpStatus.BAD_REQUEST,
            message: "Error Logging Users:",
        });
    }
});

//LogOut User
export const logoutUser = catchAsyncErrors(async (req, res, next) => {
    try {
        console.log(req)
        await tokenService.deleteSpecifiedTokenService({ id: req.token.tokenId })

        successResponseData({
            res,
            message: "Logout successfully.",
            statusCode: HttpStatus.OK
        });
    } catch (error) {
        console.log("Error while Logging Out Users:", error)
        throw throwError({
            statusCode: HttpStatus.BAD_REQUEST,
            message: "Error while Logging Out Users:",
        });
    }
});


//Update User Profile
export let updateUserProfile = (profile) =>
    catchAsyncErrors(async (req, res) => {
        try {
            const body = { ...req.body };

            //if user is other than admin lets not allow him to change the role
            if (!req.info.roles.includes("admin")) {
                delete body.roles;
            }

            const id = profile === "myProfile" ? req.info.userId : req.params.id;
            const user = await userService.getSpecifiedUserService({ id });
            if (user) {
                const data = await userService.updateUserService({ id, body });
                delete data._doc.password;
                delete data._doc.email;
                successResponseData({
                    res,
                    message: "User updated successfully.",
                    statusCode: HttpStatus.CREATED,
                    data,
                });
            } else {
                throw throwError({
                    message: "Could not found user.",
                    statusCode: HttpStatus.NOT_FOUND,
                });
            }
        } catch (error) {
            console.log("Error while Updating the user profile:", error)
            throw throwError({
                statusCode: HttpStatus.BAD_REQUEST,
                message: "Error while Updating the user profile",
            });
        }

    });


//Update Password
export const updatePassword = catchAsyncErrors(async (req, res, next) => {
    try {
        //don't allow to update if previous and present password are same 
        const id = req.info.userId;
        const oldPassword = req.body.oldPassword;
        const password = req.body.password;

        const user = await userService.getSpecifiedUserService({ id });

        const isOldPasswordMatches = await comparePassword(oldPassword, user.password)

        if (!isOldPasswordMatches) {
            throw throwError({ message: "Password doesn't match", statusCode: HttpStatus.UNAUTHORIZED })
        }

        const isPreviousCurrentPasswordSame = await comparePassword(password, user.password)
        if (isPreviousCurrentPasswordSame) {
            throw throwError({
                message: 'Previous and Current Password are same', statusCode: HttpStatus.BAD_REQUEST
            });

        }

        const body = { password: await hashPassword(password) };
        const data = await userService.updateUserService({ id, body });
        delete data._doc.password;

        await tokenService.deleteAllTokenUser({ data: id })

        successResponseData({
            res,
            message: "User password updated successfully.",
            statusCode: HttpStatus.CREATED,
            data,
        })
    } catch (error) {
        console.log("Error while Updating the user's Password:", error)
        throw throwError({
            statusCode: HttpStatus.BAD_REQUEST,
            message: "Error while Updating the user's Password:",
        });
    }
});

//My Profile
export let userMyProfile = catchAsyncErrors(async (req, res) => {
    try {
        let id = req.info.userId;
        let data = await userService.getMyProfile({ id });

        successResponseData({
            res,
            message: "Profile read successfully.",
            statusCode: HttpStatus.OK,
            data,
        });
    } catch (error) {
        console.log("Error while reading the profile of the user:", error);
        throw throwError({
            statusCode: HttpStatus.BAD_REQUEST,
            message: "Error while reading the profile of the user:",
        })
    }
});

//Forget Password
export const forgetUserPassword = catchAsyncErrors(async (req, res, next) => {
    try {
        //check email exist or not in database
        let email = req.body.email;
        let user = await userService.getSpecificUserByAny({ email })

        if (!user) {
            throw throwError({
                message: "Email doesnot exists",
                statusCode: HttpStatus.UNAUTHORIZED,
            })
        }

        let infoObj = {
            userId: user._id,
        };
        let token = await generateToken(infoObj, secretKey, reset_expiry_in)
        console.log(token)

        let tokenData = {
            token: token,
            userId: user._id,
            type: tokenTypes.RESET_PASSWORD,
            expiration: getTokenExpiryTime(token).toLocaleString()
        };
        await tokenService.createTokenService({ data: tokenData })

        //to send email write code here
        await sendEmailToForgotPassword({
            email,
            token,
            firstName: user.firstName,
            lastName: user.lastName
        })

        successResponseData({
            res,
            message: "Email sent successfully.",
            statusCode: HttpStatus.OK,
        });
    } catch (error) {
        console.log("Error while Sending Forget Password Email:", error);
        throw throwError({
            statusCode: HttpStatus.BAD_REQUEST,
            message: "Error while Sending Forget Password Email:",
        })
    }
});

//Reset User Password
export const resetUserPassword = catchAsyncErrors(async (req, res, next) => {
    try {
        //validate the request
        let id = req.info.userId;
        let password = req.body.password;

        let user = await userService.getSpecifiedUserService({ id });

        // checking the user
        if (!user) {
            throw throwError({
                message: "User does not exist",
                statuscode: HttpStatus.UNAUTHORIZED,
            })
        }

        let isPreviousCurrentPasswordSame = await comparePassword(password, user.password)
        if (isPreviousCurrentPasswordSame) {
            throw throwError({
                message: "Previous and Current password are same.",
                statusCode: HttpStatus.UNAUTHORIZED,
            });
        }

        let body = { password: await hashPassword(password) }
        await userService.updateUserService({ id, body })
        await tokenService.deleteAllTokenUser({ userId: id })

        successResponseData({
            res,
            message: "Password reset successfully.",
            statusCode: HttpStatus.OK,
        });
    } catch (error) {
        console.log("Error During the Password Reset Of User:", error);
        throw throwError({
            statusCode: HttpStatus.BAD_REQUEST,
            message: "Error During the Password Reset Of User:",
        });
    }
})

//Get All User
export const getAllUser = catchAsyncErrors(async (req, res, next) => {
    try {
        const find = {}

        if (req.query.userId) {
            find.userId = req.query.userId
        }
        if (req.query.email) {
            find.email = { $regex: req.query.email, $options: "i" }
        }
        if (req.query.roles) {
            find.roles = { $in: req.query.roles.split(",") }
        }
        req.find = find;
        req.service = userService.getAllUserService;
        req.myOwnSelect = "-password"
        next();
    } catch (error) {
        console.log("Error Fetching all the users:", error);
        throw throwError({
            statusCode: HttpStatus.BAD_REQUEST,
            message: "Error Fetching all the users:",
        });
    }
})

//Get Specified User
export const getSpecificUser = catchAsyncErrors(async (req, res, next) => {
    try {
        let id = req.params.id;
        let data = await userService.getSpecifiedUserService({ id });
        if (data) {

            delete data._doc.password;
            successResponseData({
                res,
                message: "Read user successfully.",
                statusCode: HttpStatus.OK,
                data,
            })
        } else {
            throw throwError({
                message: "Could'nt found user.",
                statusCode: HttpStatus.NOT_FOUND,
            });
        }
    } catch (error) {
        console.log("Error fetching Specified User:", error);
        throw throwError({
            statusCode: HttpStatus.BAD_REQUEST,
            message: "Error fetching Specified User:",
        });
    }
});

//Delete User
export const deleteSpecifiedUser = catchAsyncErrors(async (req, res, next) => {
    try {
        let id = req.params.id;
        if (id === req.info.userId) {
            throw throwError({
                message: "User can not delete himself/herself.",
                statusCode: HttpStatus.UNAUTHORIZED,
            });
        }

        let user = await userService.getSpecifiedUserService({ id });

        if (user) {
            let data = await userService.deleteUserService({ id });
            delete data?._doc?.password
            successResponseData({
                res,
                message: "User deleted successfully.",
                statusCode: HttpStatus.OK,
                data,
            });
        } else {
            throw throwError({
                message: "Couldn't found user.",
                statusCode: HttpStatus.NOT_FOUND,
            });
        }
    } catch (error) {
        console.log("Error Deleting Specified User:", error);
        throw throwError({
            statusCode: HttpStatus.BAD_REQUEST,
            message: "Error Deleting Specified User:",
        })
    }
});