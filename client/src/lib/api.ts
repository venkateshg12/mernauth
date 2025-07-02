import API from "../config/appClient"

// Define interfaces for the expected data shape
export interface LoginData {
   email: string;
   password: string;
}

export interface RegisterData {
   email: string;
   password: string;
   confirmPassword : string
   // Add other fields as needed, e.g., name, username, etc.
}

export const login = async (data: LoginData) => {
   return API.post("/auth/login", data);
};

export const register = async (data: RegisterData) => {
   return API.post("/auth/register", data);
};