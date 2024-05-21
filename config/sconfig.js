import { config } from "dotenv";

config()

export const port = process.env.PORT
export const base_url = process.env.SERVER_BASE_URL || "localhost:8080";
export const apiVersion = process.env.API_VERSION

export const secretKey = process.env.SECRET_KEY;
export const expiryIn = process.env.EXPIRY_IN;
export const reset_expiry_in = process.env.RESET_EXPIRE_IN;

export const tokenTypes = {
    ACCESS: "access",
    RESET_PASSWORD: "resetPassword",
    VERIFY_EMAIL: "verifEmail"
};

export const fromEmail = process.env.SMTP_MAIL
export const fromPassword = process.env.SMTP_PASSWORD
export const emailHost = process.env.SMTP_HOST;
export const smtpPort = process.env.SMTP_PORT;
export const verifEmailExpiryIn = process.env.VERIFY_EMAIL_EXPIRY_IN || "1d"
export const emailName = process.env.EMAIL_NAME;