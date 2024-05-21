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