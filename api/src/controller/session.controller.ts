import { Types } from "mongoose";
import { NOT_FOUND, OK } from "../constants/http";
import SessionModel from "../models/session.model";
import catchError from "../utils/catchError";
import { z } from "zod";
import appAssert from "../utils/appAssert";

export const getSessionHandler = catchError(async (req, res) => {
    const userId = (req as any).userId as Types.ObjectId;
    const sessionId = (req as any).sessionId as Types.ObjectId;
    const sessions = await SessionModel.find({
        userId: userId,
        expiresAt: { $gt: new Date() }
    },
        { _id: 1, userAgent: 1, createdAt: 1 },
        {
            sort: { createdAt: -1 },
        }
    );

    return res.status(OK).json(sessions.map((session) => ({
        ...session.toObject(),
        ...(session.id === sessionId && { isCurrent: true })
    }),
    ))
})

export const deleteSessionHandler = catchError(async (req, res) => {
    const userId = (req as any).userId as Types.ObjectId;
    const sessionId = z.string().parse(req.params.id);
    const deleted = await SessionModel.findOneAndDelete({ _id: sessionId, userId:userId })
    appAssert(deleted, NOT_FOUND, "Session not found");
    return res.status(OK).json({ message: "Session removed" });
})