import API from "../config/appClient"

export const login = async (data: any) => {
    API.post("/auth/login", data);
}