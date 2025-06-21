import mongoose from "mongoose";
import { string } from "zod";
import { compareValue, hashValue } from "../utils/bcrypt";

export interface UserDocument extends mongoose.Document {
    email: string,
    password: string;
    verified: boolean;
    createdAt: Date;
    updatedAt: Date;
    comparePassword(val: string): Promise<boolean>;
}

const userSchema = new mongoose.Schema<UserDocument>(
    {
        email: { type: String, required: true },
        password: { type: String, required: true },
        verified: { type: Boolean, required: true, default: true },
    },
    {
        timestamps: true,
    }
);

// .pre is a mongoose middleware which runs before storing the info in mongodb.
userSchema.pre("save", async function (next) {

    // It checks if password has been changed  if not changed it wents to next function.
    if (!this.isModified("password")) {
        return next();
    }
    this.password = await hashValue(this.password);
    next();
})

//  checks whether the entered password matches the stored one.
userSchema.methods.comparePassword = async function (val: string) {
    return compareValue(val, this.password);
}

// mongoose.model() is a function provided by Mongoose to create a model based on a schema.
// A model in Mongoose is the main way you interact with a MongoDB collection.

const userModel = mongoose.model<UserDocument>("Users", userSchema);
export default userModel;