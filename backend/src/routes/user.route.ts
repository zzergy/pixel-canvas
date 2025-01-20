import { Router } from "express";
import { login, logout, register } from "../controller/user.controller";
import { isAuthenticated } from "../middlewares/auth";

const userRouter = Router();

// register
userRouter.post("/register", register);

// login
userRouter.post("/login", login);

// logout
userRouter.post("/logout", isAuthenticated, logout);

export default userRouter;
