import API from "../config/appClient"

export const login = async (data: any) => {
   return  API.post("/auth/login", data);
}