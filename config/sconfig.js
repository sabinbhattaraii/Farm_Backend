import { config } from "dotenv";

config()

export const port = process.env.PORT
export const base_url = process.env.SERVER_BASE_URL || "localhost:8080";
export const apiVersion = process.env.API_VERSION