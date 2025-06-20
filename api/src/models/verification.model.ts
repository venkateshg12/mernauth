import mongoose from "mongoose";
import VerificationCodeType from "../constants/VerificationCodeTypes";

/* interface inherits from Mongoose's built-in Document type. mongoose.Document adds default fields and methods like:
_id (document ID createdAt, updatedAt (if timestamps are used) methods like .save(), .remove(),*/

export interface VerificationCodeDocument extends mongoose.Document {
    userId: mongoose.Types.ObjectId;
    type: VerificationCodeType;
    expiresAt: Date;
    createdAt: Date;
}

const verificationCodeSchema = new mongoose.Schema<VerificationCodeDocument>({

        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User",  required: true , index: true },
        type : {type : String, required : true},
        createdAt : {type :Date , required : true, default : Date.now},
        expiresAt : {type : Date, required : true},
    
})

const VerificationCodeModel = mongoose.model<VerificationCodeDocument> (
    "VerificationCode",
    verificationCodeSchema,
    "verfication_codes"
)

export default VerificationCodeModel;