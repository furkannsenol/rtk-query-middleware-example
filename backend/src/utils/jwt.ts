import jwt from "jsonwebtoken";

const JWT_SECRET = "your_jwt_secret";
const ACCESS_TOKEN_EXPIRATION = "15s"; //15 sec
const REFRESH_TOKEN_EXPIRATION = "1m"; //1 min

export const generateAccessToken = (payload: object): string => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: ACCESS_TOKEN_EXPIRATION });
};

export const generateRefreshToken = (payload: object): string => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: REFRESH_TOKEN_EXPIRATION });
};

export const verifyToken = (token: string): any => {
  return jwt.verify(token, JWT_SECRET);
};
