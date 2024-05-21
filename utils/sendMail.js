import nodemailer from "nodemailer";
import { emailHost, fromEmail, fromPassword, smtpPort } from "../config/sconfig.js";
import { HttpStatus } from "../constant/constant.js";
import { throwError } from "./throwError.js";

let transporterInfo = {
    host: emailHost,
    port: smtpPort,
    secure: false,
    auth: {
        user: fromEmail,
        pass: fromPassword
    }
}

export const sendMail = async (mailInfo) => {

    try {
        let transporter = nodemailer.createTransport(transporterInfo);
        let info = await transporter.sendMail(mailInfo)
        return info
    } catch (error) {
        console.log("Error while sending Mail:",error.message)
        throw throwError({
            statusCode : HttpStatus.SERVICE_UNAVAILABLE,
            message : "Server Error" + error.message,
        })
    }
}