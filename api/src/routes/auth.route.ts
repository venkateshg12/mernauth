import { Router } from "express";
import { registerHandler } from "../controller/auth.controller";

const authRoutes = Router(); // Router() is a method provided by Express to create modular, mini versions of your app just for routing.
// prefix /auth.
authRoutes.post("/register", registerHandler);

export default authRoutes;