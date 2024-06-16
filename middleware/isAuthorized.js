import catchAsyncErrors from "./catchAsyncError.js";

export const isAuthorized = (roleArray) => catchAsyncErrors(async (req, res, next) => {
    let { roles } = req.info;

    let isAuthorizedUser = roles.some((role, i) => {
        if (roleArray.includes(role))
            return true;
        else
            return false;
    });
    if (isAuthorizedUser)
        next()
    else {
        let error = new Error("User is not Authorized")
        error.statusCode = 403;
        throw error
    }
})