import { Router } from "express";
import { loginHandler, logoutHandler, registerHandler } from "../controller/auth.controller";

const authRoutes = Router(); // Router() is a method provided by Express to create modular, mini versions of your app just for routing.
// prefix /auth.
authRoutes.post("/register", registerHandler);
authRoutes.post("/login", loginHandler);
authRoutes.post("/logout", logoutHandler);

export default authRoutes;