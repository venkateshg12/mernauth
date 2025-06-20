import { JWT_REFRESH_SECRET, JWT_SECRET } from "../constants/env";
import VerificationCodeType from "../constants/VerificationCodeTypes";
import SessionModel from "../models/session.model";
import userModel from "../models/user.model"
import VerificationCodeModel from "../models/verification.model";
import { oneYearFromNow } from "../utils/date";
import jwt from "jsonwebtoken";


type createAccountParams = {
    email: string;
    password: string;
    userAgent?: string;
}
export const createAccount = async (data: createAccountParams) => {
    // verifying existing user doesn't exist
    const existingUser = await userModel.exists({
        email: data.email,
    })
    if (existingUser) {
        throw new Error("User already exists!");
    }
    //create user
    const user = await userModel.create({
        email: data.email,
        password: data.password,
    })
    // create verification code
    const verficationCode = await VerificationCodeModel.create({
        userId: user._id,
        type: VerificationCodeType.EmailVerification,
        expiresAt: oneYearFromNow(),
    })
    // send verification email
    // create session
    const session = await SessionModel.create({
        userId: user._id,
        userAgent: data.userAgent,
    })
    // sign access token & refresh token
    const refreshToken = jwt.sign(
        { sessionId: session._id },
        JWT_REFRESH_SECRET,
        { audience: ["user"], expiresIn: "30d" }
    );

    const accessToken = jwt.sign(
        { userId: user._id, sessionId: session._id },
        JWT_SECRET,
        { audience: ["user"], expiresIn: "15m" }
    );
    // return user & tokens
    return {
        user,
        refreshToken,
        accessToken,
    };
}