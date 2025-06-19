import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

// Configure dotenv FIRST before accessing any environment variables
dotenv.config();

const MONGO_URI: string = process.env.MONGO_URI as string;

if (!MONGO_URI) {
    console.error('MONGO_URI is not defined in environment variables');
    console.error('Make sure you have a .env file in your project root with MONGO_URI=your_connection_string');
    console.error('Current working directory:', process.cwd());
    console.error('Available env vars:', Object.keys(process.env).filter(key => key.includes('MONGO')));
    process.exit(1);
}

mongoose.connect(MONGO_URI)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.error('MongoDB connection error:', err);
        process.exit(1);
    });

const app = express();

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});