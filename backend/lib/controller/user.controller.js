"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const connectDB_1 = require("../config/connectDB");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const register = async (req, res) => {
    try {
        //get the email and pass from the req body
        const { email, password } = req.body;
        //check if the data is filled out
        if (!email || !password) {
            return res
                .status(400)
                .json({ message: "Please fill in all of the fields" });
        }
        //get the row which matches the email that is provided
        const user = await connectDB_1.pool.query("SELECT * FROM users WHERE email = $1", [
            email,
        ]);
        if (user.rowCount !== 0) {
            return res
                .status(400)
                .json({ message: "User with this email already exists" });
        }
        // hash the pass
        const salt = await bcryptjs_1.default.genSalt(10);
        const hashedPass = await bcryptjs_1.default.hash(password, salt);
        // add the user to the database
        const query = "INSERT INTO users (email, password) values ($1 $2)";
        await connectDB_1.pool.query(query, [email, hashedPass]);
        return res.status(200).json({ message: "User registered successfully!" });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal Server Error",
        });
    }
};
exports.register = register;
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        //check if the fields are filled
        if (!email || !password) {
            return res.status(400).json({
                message: "Please enter email and password",
            });
        }
        //check if the user exists in the db
        const response = await connectDB_1.pool.query("SELECT * FROM users WHERE email = $1", [
            email,
        ]);
        const user = response.rows[0];
        if (user.rowCount === 0) {
            return res.status(400).json({ message: "User does not exist" });
        }
        //compare passwords
        const validPass = await bcryptjs_1.default.compare(password, user.password);
        if (!validPass) {
            return res.status(400).json({ message: "Invalid password" });
        }
        // if everything is ok
        return res.status(200).json({
            message: "User logged in successfully",
            user: {
                id: user.rows[0].id,
                email: user.rows[0].email,
            },
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