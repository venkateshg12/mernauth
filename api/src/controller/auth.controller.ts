import catchError from "../utils/catchError";
import { createAccount, loginUser } from "../services/auth.service";
import { setAuthCookies } from "../utils/cookies";
import { CREATED, OK } from "../constants/http";
import { loginSchema, registerSchema } from "./auth.schema";


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
})