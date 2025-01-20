import { Request, Response, NextFunction } from "express";

import "express-session";
import { User } from "../types";

declare module "express-session" {
  interface SessionData {
    user: User;
  }
}
export const isAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.session && req.session.user) {
    return next();
  } else {
    return res.status(401).json({ message: "Unauthorized" });
  }
};
