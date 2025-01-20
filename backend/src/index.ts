import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import userRouter from "./routes/user.route";
import connectDB from "./config/connectDB";
import session from "express-session";

dotenv.config();

const app = express();
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
};

// Session config
app.use(
  session({
    secret: process.env.SECRET as string,
    resave: false, // Dont resave sessions if they are not changed
    saveUninitialized: false, //Dont save uninitialized sessions
    cookie: {
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      maxAge: 1000 * 60 * 60, // 1 hour expiration for the cookie
    },
  })
);

app.use(express.json()); // for parsing json request payloads
app.use(express.urlencoded({ extended: true })); // for parsing url encoded data
app.use(cors(corsOptions)); // allows requests from other domains
app.use(morgan("dev")); //for logging the requests to the console

// Get the port from the env file
const PORT = process.env.PORT;

// Create a basic route
app.get("/", (req: Request, res: Response) => {
  try {
    return res.status(200).json({ message: "Am i really working :o ???" });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

// user routes
app.use("/api/user", userRouter);

// unknown route handler
app.use((req: Request, res: Response) => {
  return res.status(404).json({ message: "Route not found! :(" });
});

// Start the server
app.listen(PORT, async () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  await connectDB();
});
