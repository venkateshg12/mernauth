import catchError from "../utils/catchError";
import { createAccount, loginUser, refreshUserAccessToken, sendPasswordResetEmail, verifyEmail } from "../services/auth.service";
import { clearAuthCookies, getAccessTokenCookieOptions, getRefreshTokenCookeOptins, setAuthCookies } from "../utils/cookies";
import { CREATED, NOT_FOUND, OK, UNAUTHORIZED } from "../constants/http";
import { emailSchema, loginSchema, registerSchema, verificationCodeSchema } from "./auth.schema";
import { verifyToken } from "../utils/jwt";
import SessionModel from "../models/session.model";
import appAssert from "../utils/appAssert";


export const registerHandler = catchError(async (req, res) => {
    // validate request.
    const request = registerSchema.parse({   //  parse() method is used to validate that object using Zod’s schema.
        ...req.body,
        userAgent: req.headers["user-agent"],
    })

    // call service 
    const { user, refreshToken, accessToken } = await createAccount(request);

    // return response 
    setAuthCookies({ res, accessToken, refreshToken });
    return res.status(CREATED).json(user);
})

export const loginHandler = catchError(async (req, res) => {
    const request = loginSchema.parse({
        ...req.body,
        userAgent: req.headers["user-agent"],
    });

    const { accessToken, refreshToken } = await loginUser(request);
    setAuthCookies({ res, accessToken, refreshToken })
    return res.status(OK).json({ message: "Login successfull" })
})

export const logoutHandler = catchError(async (req, res) => {
    const accessToken = req.cookies.accessToken;
    const { payload } = verifyToken(accessToken || "");
    if (payload) {
        await SessionModel.findByIdAndDelete(payload.sessionId);
    }
    clearAuthCookies(res);
    return res.status(OK).json({
        message: "Logout Successful",
    })
})

export const refreshHandler = catchError(async (req, res) => {
    const refreshToken = req.cookies.refreshToken as string | undefined;
    appAssert(refreshToken, UNAUTHORIZED, "Missing refresh token");

    const { accessToken, newRefreshToken } = await refreshUserAccessToken(refreshToken);

    if (newRefreshToken) {
        res.cookie("refreshToken", newRefreshToken, getRefreshTokenCookeOptins());
    }
    return res.status(OK).cookie("accessToken", accessToken, getAccessTokenCookieOptions()).json({
        message: "Acces token refreshed",
    })
})

export const verifyEmailHandler = catchError(async (req, res) => {
    const verficationCode = verificationCodeSchema.parse(req.params.code);

    await verifyEmail(verficationCode);

    return res.status(OK).json({
        message : "Email was successfully verified",
    })
})

export const sendPasswordResetHandler = catchError(async(req, res) =>{
    const email = emailSchema.parse(req.body.email);

    // call service
   
      await sendPasswordResetEmail(email);
    return res.status(OK).json({message : "Password reset email user!"})
})