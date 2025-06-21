    import express from "express";
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import rateLimit from "express-rate-limit";
import { connectDB } from "./db";

dotenv.config();
const origin:string=process.env.ORIGIN||"http://localhost:3000" // Replace with your frontend URL
const app = express();

const corsOptions = {
  origin: origin,
  credentials: true,               //  need cookies/auth headers
};

// Middleware
app.use(cors(corsOptions));
app.use(morgan("dev"));                     // HTTP request logger
app.use(helmet());                          // Security headers
app.use(express.json());                    // Parse JSON body
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded data

// Rate Limiting (optional)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP
});
app.use(limiter);
connectDB();

// Sample route
app.get("/", (req, res) => {
  res.send("Hello from the TypeScript backend with middleware!");
});
export default app;