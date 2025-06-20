import mongoose from "mongoose"
import { date, string } from "zod"
import { thirtyDaysFromNow } from "../utils/date";

interface sessionDocument extends mongoose.Document {
    userId: mongoose.Types.ObjectId;
    userAgent?: string;
    createdAt: Date;
    expiresAt: Date;
}

const sessionSchema = new mongoose.Schema<sessionDocument>({
    userId : {
        ref : "User",
        type : mongoose.Schema.Types.ObjectId,
        index : true,
    },
    userAgent : {type : String},
    createdAt : {type : Date, required : true, default : Date.now},
    expiresAt : {type : Date, default : thirtyDaysFromNow},
})

const SessionModel = mongoose.model<sessionDocument>("Session", sessionSchema);
export default SessionModel;