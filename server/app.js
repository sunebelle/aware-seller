import express from "express";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import userRouter from "./routes/user.js";
import AppError from "./utils/appError.js";
import globalErrorHandler from "./controllers/error.js";
import cors from "cors";
const app = express();

// allow cors requests from any origin and with credentials
app.use(cors({ origin: true, credentials: true }));
app.set("view engine", "ejs");
app.use(express.static("public"));

// Body parser, reading data from body into req.body
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));
app.use(cookieParser());

// Development logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Test middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  // console.log(req.cookies);
  next();
});

// 3. routes
app.use("/api/v1/user", userRouter);
// app.use("/api/v1/products")
//app.use("/api/v1/sellers")

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

export default app;
