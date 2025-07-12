import express from "express";
import cors from "cors";

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routers
import userRouter from "./router/user.router.js";  // 👈 Replaces bookRouter
app.use("/api/users", userRouter);                 // 👈 All user-related routes

import authRouter from "./router/auth.router.js";  // 👈 Keep if admin auth/login is needed
app.use("/api/auth", authRouter);                  // 👈 For login/register

export default app;
