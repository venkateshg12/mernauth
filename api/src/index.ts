import express, { Request, Response } from "express";
import mongoose from "mongoose";
import "dotenv/config";
import cors from "cors"
import cookieParser from "cookie-parser"
import ConnectToMongoDb from "./config/db";
import { APP_ORIGIN } from "./constants/env";
import errorHandler from "./utils/errorHandler";
import catchError from "./utils/catchError";
import { OK } from "./constants/http";
import authRoutes from "./routes/auth.route";
import authenticate from "./middleware/authenticate";
import userRoutes from "./routes/user.route";
import sessionRoutes from "./routes/session.route";

const app = express();

app.use(express.json()); // allows express server to parse json request bodies.

//  built-in middleware in Express that parses incoming form data and makes it available under req.body.
app.use(express.urlencoded({ extended: true }));

app.use(cors({

    // Only allow requests from this specific frontend origin.
    origin: APP_ORIGIN,

    // Allow the frontend to send cookies, authorization headers, or any credentials when making a request.
    credentials: true,
}))

// which lets your backend read cookies sent by the client (like the browser).
app.use(cookieParser());

app.get("/", catchError(
    async (req, res, next) => {
        res.status(OK).json({
            status: "Helathy",
        })
    }
))

app.use("/auth", authRoutes);

// protected Routes 
app.use("/user", authenticate, userRoutes);
app.use("/sessions", authenticate, sessionRoutes);

// Axios / fs / DB failures
// Accessing undefined
// Invalid input
app.use(errorHandler);

app.listen(3000, async () => {
    console.log('Server is running on port 3000');
    await ConnectToMongoDb();
});