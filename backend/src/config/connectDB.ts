import { Pool } from "pg";
import path from "path";
import fs from "fs";
import chalk from "chalk";

export const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "pixelCraft",
  password: "postgres",
});

// read the content of the database schema
const schemeFilePath = path.resolve(__dirname, "../schemas/user.schema.sql");
const schemaSQL = fs.readFileSync(schemeFilePath, "utf-8");

// generate the tables based on the provided schema
const createTables = async () => {
  try {
    // check if the table already exists
    const result = await pool.query(`
        SELECT EXISTS (
            SELECT 1
            FROM information_schema.tables
            WHERE table_schema = 'public' 
            AND table_name = 'users'
        )`);

    const tableExists = result.rows[0].exists;

    if (!tableExists) {
      // create the table if it doesn't exist already
      await pool.query(schemaSQL);
      console.log(chalk.greenBright("Tables created successfully!"));
    } else {
      console.log(chalk.yellow("Users table already exists"));
    }
  } catch (error) {
    console.error(chalk.red("Error creating tables:"), error);
  }
};

// configure the database connection
const connectDB = async () => {
  try {
    // connect to the db
    await pool.connect();
    console.log(chalk.greenBright("Database connected successfully!"));

    await createTables();
  } catch (error) {
    console.error(chalk.red("Error connecting to database:"), error);
  }
};

export default connectDB;
