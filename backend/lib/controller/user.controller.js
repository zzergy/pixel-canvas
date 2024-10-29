"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const register = (req, res) => {
    try {
        return res.status(200).json({
            message: "User registered successfully",
        });
    }
    catch (error) {
        return res.status(500).json({
            message: "Internal Server Error",
        });
    }
};
exports.register = register;
const login = (req, res) => {
    try {
        return res.status(200).json({
            message: "User logged in successfully",
        });
    }
    catch (error) {
        return res.status(500).json({
            message: "Internal Server Error",
        });
    }
};
exports.login = login;
//# sourceMappingURL=user.controller.js.map