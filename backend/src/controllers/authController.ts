import { Request, Response } from "express";
import { users } from "../data/users";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyToken,
} from "../utils/jwt";

//Login
export const login = (req: Request, res: Response): void => {
  const { username, password } = req.body;

  const user = users.find(
    (u) => u.username === username && u.password === password
  );
  if (!user) {
    res.status(400).json({ message: "Invalid username or password" });
    return;
  }

  const accessToken = generateAccessToken({
    username: user.username,
    role: user.role,
  });
  const refreshToken = generateRefreshToken({ username: user.username });

  res.json({
    username: user.username,
    role: user.role,
    token: accessToken,
    refreshToken,
  });
};

//Refresh Token
export const refreshToken = (req: Request, res: Response): void => {
  const { refreshToken } = req.body;

  try {
    const payload = verifyToken(refreshToken);
    const newAccessToken = generateAccessToken({
      username: payload.username,
      role: payload.role,
    });
    const newRefreshToken = generateRefreshToken({
      username: payload.username,
    });

    res.json({ token: newAccessToken, refreshToken: newRefreshToken });
  } catch (error) {
    res.status(403).json({ message: "Invalid refresh token" });
  }
};
