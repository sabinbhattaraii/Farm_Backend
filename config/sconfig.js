import { config } from "dotenv";

config()

export const port = process.env.PORT
export const clientBaseUrl = process.env.ENVIRONMENT === "DEVELOPMENT" ? process.env.BASE_URL_DEVELOPMENT : process.env.ENVIRONMENT === "staging" ? process.env.BASE_URL_STAGING : process.env.ENVIRONMENT === "production" ? process.env.BASE_URL_PRODUCTION :  process.env.BASE_URL_DEVELOPMENT
export const serverBaseUrl = process.env.SERVER_BASE_URL || "localhost:8080";
export const apiVersion = process.env.API_VERSION
export const staticFolder = "./public";

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