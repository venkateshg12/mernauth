import { register } from "module";
import catchError from "../utils/catchError";
import { z } from "zod";
import { createAccount } from "../services/auth.service";
import { setAuthCookies } from "../utils/cookies";
import { CREATED } from "../constants/http";

const registerSchema = z.object({
    email: z.string().email().min(1).max(255),
    password: z.string().min(6).max(255),
    confirmPassword: z.string().min(6).max(255),
    userAgent: z.string().optional(),
}).refine((data) => data.password === data.confirmPassword, {
    "message": "messages do not match",
    path: ["confirmPassword"],
})

export const registerHandler = catchError(async (req, res) => {
    // validate request.
    const request = registerSchema.parse({   //  parse() method is used to validate that object using Zod’s schema.
        ...req.body,
        userAgent: req.headers["user-agent"],
    })
    
    // call service 
    const { user, refreshToken, accessToken } = await createAccount(request);

    // return response 
    setAuthCookies({res, accessToken, refreshToken});
    return res.status(CREATED).json(user);
})