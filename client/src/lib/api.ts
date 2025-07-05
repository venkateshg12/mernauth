import API from "../config/appClient"
import type { User } from "../constants/constant";

// Define interfaces for the expected data shape
export interface LoginData {
   email: string;
   password: string;
}

export interface RegisterData {
   email: string;
   password: string;
   confirmPassword: string
   // Add other fields as needed, e.g., name, username, etc.
}


export const login = async (data: LoginData) => {
   return API.post("/auth/login", data);
};

export const register = async (data: RegisterData) => {
   return API.post("/auth/register", data);
};

export type TypeVerificationCode = string;

export const verifyEmail = async (verificationCode: TypeVerificationCode) => {
   return API.get(`/auth/verify/email/${verificationCode}`);
}

export const sendPasswordResetEmail = async ({ email }: { email: string }) => {
   return API.post("/auth/password/forgot", { email });
};
type Params = {
   verificationCode: string,
   password: string,
}
export const resetPassword = async ({ verificationCode, password }: Params) => {
   API.post("/auth/password/reset", { verificationCode, password });
}

export const getUser = async (): Promise<User> => {
   return await API.get("/user");
}


export const logout = async () => {
   return API.get("/logout");
}

export const getSession = async () => {
   return API.get("/sessions");
}

export const deleteSessions = async ({ id }: { id: string }) => {
   return API.delete(`/sessions/${id}`);
}