import { secretKey } from "../config/sconfig.js";
import { HttpStatus } from "../constant/constant.js";
import { TokenDatas } from "../models/schema/token.js";
import { userService } from "../service/index.js";
import { verifyToken } from "../utils/token.js";
import catchAsyncErrors from "./catchAsyncError.js";

export let isValidToken = catchAsyncErrors(async (req, res, next) => {
    let { authorization = "" } = req.headers;

    let arr = authorization.split(" ");
    let token = arr[1] || "";

    // check if token starts with Bearear and check if token exist
    if (arr[0] === "Bearer" && token) {
        //verify weather the token is valid or not using jwt
        //it check weather the token is made from secretkey and check weather the expiry time reach
        let info = await verifyToken(token, secretKey);

        let user = await userService.getSpecifiedUserService({
            id: info.userId,
        });
        let tok = await TokenDatas.findOne({ token: token });

        // check if the given token is in our database
        if (tok === null) {
            let error = new Error("Please enter valid token");
            error.statusCode = HttpStatus.UNAUTHORIZED;
            throw error;
        } else {
            req.token = {
                token: token,
                tokenId: tok._id,
            };
            req.info = {
                ...info,
                roles: user.roles,
            };
            next();
        }
    } else {
        console.log("------------else-------------------")
        let error = new Error("Token is not valid");
        error.statusCode = 401;
        throw error;
    }
});