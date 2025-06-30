import { RequestHandler, Request, Response, NextFunction } from "express";
import appAssert from "../utils/appAssert";
import { UNAUTHORIZED } from "../constants/http";
import AppErrorCode from "../constants/appErrorCode";
import { verifyToken } from "../utils/jwt";
import { Types } from "mongoose";

interface AuthenticatedRequest extends Request {
    userId: Types.ObjectId;
    sessionId: Types.ObjectId;
}

const authenticate: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
    const accessToken = req.cookies.accessToken as string | undefined;
    appAssert(accessToken, UNAUTHORIZED, "Not Autherized", AppErrorCode.InvalidAccessToken);
    const { error, payload } = verifyToken(accessToken);
    appAssert(payload, UNAUTHORIZED, error === "jwt expired" ? "Token expired" : "Invalid Token", AppErrorCode.InvalidAccessToken);

    (req as AuthenticatedRequest).userId = payload.userId as Types.ObjectId;
    (req as AuthenticatedRequest).sessionId = payload.sessionId as Types.ObjectId;
    next();
}

export default authenticate;