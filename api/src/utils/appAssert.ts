import AppError from "./appError";
import assert from "node:assert";
import { HttpStatusCode } from "../constants/http";
import AppErrorCode from "../constants/appErrorCode";

// Asserts a condition and throws an AppError if the condition is falsy.
type AppAssert = (
    condition: any,
    httpStatusCode: HttpStatusCode,
    message: string,
    appErrorCode?: AppErrorCode,
) => asserts condition
const appAssert: AppAssert = (
    condition: any,
    httpStatusCode,
    message,
    appErrorCode
) =>{
    assert(condition, new AppError(httpStatusCode, message, appErrorCode));
}


export default appAssert; 