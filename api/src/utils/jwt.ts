import { JWT_REFRESH_SECRET, JWT_SECRET } from "../constants/env";
import { SessionDocument } from "../models/session.model";
import { UserDocument } from "../models/user.model";
import jwt, { SignOptions, VerifyOptions } from "jsonwebtoken";

export type RefreshTokenPayload = {
    sessionId: SessionDocument["_id"];
}

export type AccessTokenPayload = {
    userId: UserDocument["_id"];
    sessionId: SessionDocument["_id"];
}


type SignOptionsAndSecret = SignOptions & {
    secret: string;
}

const defaults: SignOptions = {
    audience: ["user"],
}

const accessTokenSignOptions: SignOptionsAndSecret = {
    expiresIn: "15m",
    secret: JWT_SECRET,
}

export const refreshTokenSignOptions: SignOptionsAndSecret = {
    expiresIn: "15m",
    secret: JWT_REFRESH_SECRET,
}

export const signToken = (
    payload: AccessTokenPayload | RefreshTokenPayload,
    options?: SignOptionsAndSecret,
) => {
    const { secret, ...signOpts } = options || accessTokenSignOptions
    return jwt.sign(payload, secret, {
        ...defaults,
        ...signOpts
    })
}

interface CustomVerifyOptions extends Omit<VerifyOptions, 'audience'> {
    secret: string;
    audience?: string | RegExp | string[];
}

export const verifyToken = (token: string, options ?:  ) => {
    const { secret = JWT_SECRET, ...verifyOpts } = options || {}
    try {
        const payload = jwt.verify(token, secret, { ...defaults, ...verifyOpts })
        return {
            payload
        }
    } catch (error: any) {
        return {
            error: error.message,
        }
    }
}