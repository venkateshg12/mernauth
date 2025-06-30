/* import { Types } from "mongoose";

declare global {
    namespace Express {
        interface Request {
            userId: Types.ObjectId;
            sessionId: Types.ObjectId;
        }
    }
}

export {}; */

import { Types } from "mongoose";

declare module "express-serve-static-core" {
    interface Request {
        userId: Types.ObjectId;
        sessionId: Types.ObjectId;
    }
}