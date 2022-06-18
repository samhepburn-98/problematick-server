import dotenv from "dotenv";

dotenv.config({ path: ".env" });

export const uri = process.env.ATLAS_URI ?? "";
export const envPort = process.env.PORT ?? "";
