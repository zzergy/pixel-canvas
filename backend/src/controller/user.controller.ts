import { Request, Response } from "express";
import { pool } from "../config/connectDB";
import bcrypt from "bcryptjs";

export const register = async (req: Request, res: Response) => {
  try {
    //get the email and pass from the req body
    const { email, password, username } = req.body;

    //check if the data is filled out
    if (!email || !password || !username) {
      return res
        .status(400)
        .json({ message: "Please fill in all of the fields" });
    }

    //get the row which matches the email that is provided
    const user = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    if (user.rowCount !== 0) {
      return res
        .status(409)
        .json({ message: "User with this email already exists" });
    }

    // hash the pass
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(password, salt);

    // add the user to the database
    const query =
      "INSERT INTO users (email, password, username) values ($1, $2, $3)";
    await pool.query(query, [email, hashedPass, username]);

    return res.status(200).json({ message: "User registered successfully!" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    //check if the fields are filled
    if (!email || !password) {
      return res.status(400).json({
        message: "Please enter email and password",
      });
    }

    //check if the user exists in the db
    const response = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    if (response.rowCount === 0) {
      return res.status(400).json({ message: "User does not exist" });
    }

    //compare passwords
    const user = response.rows[0];
    const validPass = await bcrypt.compare(password, user.password);

    if (!validPass) {
      return res.status(400).json({ message: "Invalid password" });
    }

    // if everything is ok
    return res.status(200).json({
      message: "You're logged in!",
      user: {
        id: user.rows[0].id,
        email: user.rows[0].email,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
