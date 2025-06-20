const getEnv = (key: string, defaultValue?: string): string => {
    const value = process.env[key] || defaultValue;

    if (value == undefined) {
        throw new Error(`Missing environment variable ${key}`);
    }
    return value;
}

export default getEnv;

export const MONGO_URI = getEnv("MONGO_URI");
export const APP_ORIGIN = getEnv("APP_ORIGIN")
export const JWT_REFRESH_SECRET = getEnv("JWT_REFRESH_SECRET");
export const JWT_SECRET = getEnv("JWT_SECRET")
export const NODE_ENV = getEnv("NODE_ENV");