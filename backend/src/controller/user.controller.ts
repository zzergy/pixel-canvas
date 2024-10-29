import { Request, Response } from "express";

export const register = (req: Request, res: Response) => {
  try {
    return res.status(200).json({
      message: "User registered successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const login = (req: Request, res: Response) => {
  try {
    return res.status(200).json({
      message: "User logged in successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
