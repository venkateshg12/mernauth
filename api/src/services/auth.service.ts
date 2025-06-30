import { APP_ORIGIN, JWT_REFRESH_SECRET, JWT_SECRET } from "../constants/env";
import { CONFLICT, INTERNAL_SERVER_ERROR, NOT_FOUND, TOO_MANY_REQUESTS, UNAUTHORIZED } from "../constants/http";
import VerificationCodeType from "../constants/VerificationCodeTypes";
import SessionModel from "../models/session.model";
import userModel from "../models/user.model"
import VerificationCodeModel from "../models/verification.model";
import appAssert from "../utils/appAssert";
import { fiveMinuteAgo, ONE_DAY_MS, oneHourFromNow, oneYearFromNow, thirtyDaysFromNow } from "../utils/date";
import jwt from "jsonwebtoken";
import { RefreshTokenPayload, refreshTokenSignOptions, signToken, verifyToken } from "../utils/jwt";
import { sendMail } from "../utils/sendMail";
import { getPasswordResetTemplate, getVerifyEmailTemplate } from "../utils/emailTemplates";
import { hashValue } from "../utils/bcrypt";


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

    const url = `${APP_ORIGIN}/verify/email/${verficationCode._id}`
    // send verification email
    try {
        await sendMail({
            to: user.email, ...getVerifyEmailTemplate(url)
        });
    } catch (error) {
        console.log(error);
    }
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

export const refreshUserAccessToken = async (refreshToken: string) => {
    const {
        payload
    } = verifyToken<RefreshTokenPayload>(refreshToken, {
        secret: refreshTokenSignOptions.secret,
    })
    appAssert(payload, UNAUTHORIZED, "Invalid refresh Token");

    const session = await SessionModel.findById(payload.sessionId);
    const now = Date.now();
    appAssert(session && session.expiresAt.getTime() > now, UNAUTHORIZED, "Session Expired");

    // refresh sessions if it expires it in 24 hours.
    const sessionNeedsRefresh = session.expiresAt.getTime() - now <= ONE_DAY_MS;

    if (sessionNeedsRefresh) {
        session.expiresAt = thirtyDaysFromNow();
        await session.save();
    }

    const newRefreshToken = sessionNeedsRefresh ? signToken({
        sessionId: session._id,
    },
        refreshTokenSignOptions
    ) : undefined;

    const accessToken = signToken({
        userId: session.userId,
        sessionId: session._id,
    })

    return {
        accessToken,
        newRefreshToken,
    }
}

export const verifyEmail = async (code: string) => {
    // get the verfication code
    const validCode = await VerificationCodeModel.findOne({
        _id: code,
        type: VerificationCodeType.EmailVerification,
        expiresAt: { $gt: new Date() },
    })
    appAssert(validCode, NOT_FOUND, "Invalid or expired verification code");

    // update user to verified true
    const updateUser = await userModel.findByIdAndUpdate(
        validCode.userId, {
        verified: true,
    },
        { new: true }
    );
    appAssert(updateUser, INTERNAL_SERVER_ERROR, "Failed to verify email");

    // delete verfication code.
    await validCode.deleteOne();

    return {
        user: updateUser.omitPassword(),
    }
}

export const sendPasswordResetEmail = async (email: string) => {
    // get the user by email
    const user = await userModel.findOne({ email });
    appAssert(user, NOT_FOUND, "User not found");

    // check email rate limit
    const fiveMinAgo = fiveMinuteAgo();
    const count = await VerificationCodeModel.countDocuments({
        userId: user._id,
        type: VerificationCodeType.PasswordReset,
        createdAt: { $gt: fiveMinAgo },
    })
    appAssert(count <= 1, TOO_MANY_REQUESTS, "Too many requests, please try again")

    // create verification code
    const expiresAt = oneHourFromNow()
    const verificationCode = await VerificationCodeModel.create({
        userId: user._id,
        type: VerificationCodeType.PasswordReset,
        expiresAt,
    })

    // send verification email
    const url = `${APP_ORIGIN}/password/reset?code=${verificationCode._id}&exp=${expiresAt.getTime()}`;

    const { data, error } = await sendMail({
        to: user.email,
        ...getPasswordResetTemplate(url)
    });
    appAssert(
        data?.id,
        INTERNAL_SERVER_ERROR,
        `${error?.name} - ${error?.message}`
    )
    // return success
    return {
        url,
        emailId: data ? data.id : undefined,
    }

}

type ResetPasswordParams = {
    password: string,
    verificationCode: string,
}
export const    resetPassword = async ({ password, verificationCode }: ResetPasswordParams) => {
    // get the verification code
    const validCode = await VerificationCodeModel.findOne({
        _id: verificationCode,
        type: VerificationCodeType.PasswordReset,
        expiresAt: { $gt: new Date() },
    });
    appAssert(validCode, NOT_FOUND, "Invalid or expired verification code");
    //update the users password
    const updateUser = await userModel.findByIdAndUpdate(
        validCode.userId,
        {
            password: await hashValue(password)
        }
    )
    appAssert(updateUser, INTERNAL_SERVER_ERROR, "Failed to reset password");

    //delete the verification code
    await validCode.deleteOne();
    //delete all sessions
    await SessionModel.deleteMany({
        userId: updateUser._id,
    });

    return {
        user: updateUser.omitPassword(),
    }
}