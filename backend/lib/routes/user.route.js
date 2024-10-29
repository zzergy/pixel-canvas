"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controller/user.controller");
const userRouter = (0, express_1.Router)();
// register
userRouter.post("/register", user_controller_1.register);
// login
userRouter.post("/login", user_controller_1.login);
exports.default = userRouter;
//# sourceMappingURL=user.route.js.map