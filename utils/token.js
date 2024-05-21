import jwt from "jsonwebtoken";
import { HttpStatus } from "../constant/constant.js";

//generate token
export const generateToken = async (
    infoObj = {},
    secretKey = "",
    expiresIn = "365d"
) => {

    //send expiresInfo like
    let expiresInfo = {
        expiresIn: expiresIn,
    }

    //generate token
    //at infoObj we mostly use _id property and roles
    try {
        let token = await jwt.sign(infoObj, secretKey, expiresInfo);
        return token

    } catch (error) {
        let err = new Error(error.message);
        error.statusCode = "400";
        throw err;
    }
}

//verify token
export const verifyToken = async (token = "", secretKey = "") => {
    try {
        let infoObj = await jwt.verify(token, secretKey)
        return infoObj;
    } catch (error) {
        let err = new Error(error.message);
        error.statusCode = HttpStatus.UNAUTHORIZED
        throw err;
    }
}