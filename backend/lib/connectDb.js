"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const connectDB = async () => {
    const pool = new pg_1.Pool({
        user: "users",
        host: "localhost",
        database: "users_auth",
        password: "133729",
    });
    // test the connection
    pool.query("SELECT NOW()", (err, res) => {
        if (err) {
            console.log(err);
        }
        else {
            console.log("Database connected successfully");
        }
    });
};
exports.default = connectDB;
//# sourceMappingURL=connectDb.js.map