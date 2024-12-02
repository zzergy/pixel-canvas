"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pool = void 0;
const pg_1 = require("pg");
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const chalk_1 = __importDefault(require("chalk"));
exports.pool = new pg_1.Pool({
    user: "postgres",
    host: "localhost",
    database: "pixelCraft",
    password: "postgres",
});
// read the content of the database schema
const schemeFilePath = path_1.default.resolve(__dirname, "../schemas/user.schema.sql");
const schemaSQL = fs_1.default.readFileSync(schemeFilePath, "utf-8");
// generate the tables based on the provided schema
const createTables = async () => {
    try {
        // check if the table already exists
        const result = await exports.pool.query(`
        SELECT EXISTS (
            SELECT 1
            FROM information_schema.tables
            WHERE table_schema = 'public' 
            AND table_name = 'users'
        )`);
        const tableExists = result.rows[0].exists;
        if (!tableExists) {
            // create the table if it doesn't exist already
            await exports.pool.query(schemaSQL);
            console.log(chalk_1.default.greenBright("Tables created successfully!"));
        }
        else {
            console.log(chalk_1.default.yellow("Users table already exists"));
        }
    }
    catch (error) {
        console.error(chalk_1.default.red("Error creating tables:"), error);
    }
};
// configure the database connection
const connectDB = async () => {
    try {
        // connect to the db
        await exports.pool.connect();
        console.log(chalk_1.default.greenBright("Database connected successfully!"));
        await createTables();
    }
    catch (error) {
        console.error(chalk_1.default.red("Error connecting to database:"), error);
    }
};
exports.default = connectDB;
//# sourceMappingURL=connectDB.js.map