import { Router } from "express";
import { login, register } from "../controller/user.controller";

const userRouter = Router();

// register
userRouter.post("/register", register);

// login
userRouter.post("/login", login);

export default userRouter;
