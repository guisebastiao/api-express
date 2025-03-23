import dotenv from "dotenv";
dotenv.config();

export const nodeEnv = process.env.NODE_ENV as string;
export const tokenSecret = process.env.TOKEN_SECRET as string;
export const tokenExpirate = process.env.TOKEN_EXPIRATE as string;
export const serverPort = process.env.SERVER_PORT as string;
