import { Response } from "express";
import { CookieOptions } from "express";
import { NODE_ENV } from "../constants/env";
import { fifteenMinutesFromNow, thirtyDaysFromNow } from "./date";

const secure = NODE_ENV !== "development"
const defaults: CookieOptions =  {
    sameSite : "strict",
    httpOnly : true,
    secure : true,
}

const getAccessTokenCookieOptions = (): CookieOptions =>({
    ...defaults,
    expires : fifteenMinutesFromNow(),
}) 

const getRefreshTokenCookeOptins = ():CookieOptions => ({
    ...defaults,
    expires : thirtyDaysFromNow(),
    path : "/auth/refresh"
})

type Params = {
    res: Response,
    accessToken: string,
    refreshToken: string,
}
export const setAuthCookies = ({ res, accessToken, refreshToken }: Params) => {
    res.cookie("accessToken", accessToken, getAccessTokenCookieOptions());
    res.cookie("refreshToken", refreshToken, getRefreshTokenCookeOptins());
}