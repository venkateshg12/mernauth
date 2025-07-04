import { Router } from "express";
import { loginHandler, logoutHandler, refreshHandler, registerHandler, resetPasswordHandler, sendPasswordResetHandler, verifyEmailHandler } from "../controller/auth.controller";

const authRoutes = Router(); // Router() is a method provided by Express to create modular, mini versions of your app just for routing.

// prefix /auth.
authRoutes.post("/register", registerHandler);
authRoutes.post("/login", loginHandler); 
authRoutes.get("/logout", logoutHandler);
authRoutes.get("/refresh", refreshHandler);
authRoutes.get("/verify/email/:code", verifyEmailHandler);
authRoutes.post("/password/forgot", sendPasswordResetHandler);
authRoutes.post("/password/reset", resetPasswordHandler);

export default authRoutes;