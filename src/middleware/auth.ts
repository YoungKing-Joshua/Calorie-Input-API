import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const { TOKEN_SECRET } = process.env;

export interface CustomRequest extends Request {
    token: string | jwt.JwtPayload;
};

export const verifyAuthToken = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];

        if(!token) {
            throw new Error();
        }

        const decoded = jwt.verify(token, String(TOKEN_SECRET));
        (req as CustomRequest).token = decoded;

        next();
    } catch (err) {
        res.status(401).send("Please authenticate");
    }
};