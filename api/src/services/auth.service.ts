import { JWT_REFRESH_SECRET, JWT_SECRET } from "../constants/env";
import { CONFLICT, UNAUTHORIZED } from "../constants/http";
import VerificationCodeType from "../constants/VerificationCodeTypes";
import SessionModel from "../models/session.model";
import userModel from "../models/user.model"
import VerificationCodeModel from "../models/verification.model";
import appAssert from "../utils/appAssert";
import { oneYearFromNow } from "../utils/date";
import jwt from "jsonwebtoken";
import { refreshTokenSignOptions, signToken } from "../utils/jwt";


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
    appAssert(!existingUser, CONFLICT, "Email is already in use");

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
    const refreshToken = signToken({ sessionId: session._id }, refreshTokenSignOptions)
    const accessToken = signToken({ userId: user._id, sessionId: session._id });
    // return user & tokens
    return {
        user: user.omitPassword(),
        refreshToken,
        accessToken,
    };
}

type LoginParams = {
    email: string,
    password: string,
    userAgent?: string,
}

export const loginUser = async ({ email, password, userAgent }: LoginParams) => {
    // get the user by email
    const user = await userModel.findOne({ email });
    appAssert(user, UNAUTHORIZED, "Invalid email or password")

    // validate password from the request
    const isValid = user.comparePassword(password);
    appAssert(isValid, UNAUTHORIZED, "Invalid email or password")
    // create a session

    const session = await SessionModel.create({
        userId: user._id,
        userAgent,
    });

    const sessionInfo = { sessionId: session._id, }
    //sign accessToken & refreshToken

    const accessToken = signToken({
        ...sessionInfo,
        userId: user._id,
    })
    const refreshToken = signToken(sessionInfo, refreshTokenSignOptions)

    // return user & Tokens
    return {
        user: user.omitPassword(),
        accessToken,
        refreshToken,
    }
}