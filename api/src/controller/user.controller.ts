import { Types } from "mongoose";
import { OK, NOT_FOUND } from "../constants/http";
import userModel from "../models/user.model";
import appAssert from "../utils/appAssert";
import catchError from "../utils/catchError";
import { Response } from "express";

interface AuthenticatedRequest extends Request {
    userId: Types.ObjectId;
    sessionId: Types.ObjectId;
}

export const getUserHandler = catchError(async (req, res) => {
    const userId = (req as any).userId as Types.ObjectId;
    const user = await userModel.findById(userId);
    appAssert(user, NOT_FOUND, "User not found");
    return res.status(OK).json(user.omitPassword());
})