//https://electerious.medium.com/from-commonjs-to-es-modules-how-to-modernize-your-node-js-app-ad8cdd4fb662
import express from "express";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import cors from "cors";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";
import xss from "xss-clean";
import userRouter from "./routes/user.js";
import productRouter from "./routes/product.js";
import categoryRouter from "./routes/category.js";
import reviewRouter from "./routes/review.js";
import cartRouter from "./routes/cart.js";
import AppError from "./utils/appError.js";
import globalErrorHandler from "./controllers/error.js";

const app = express();

// allow cors requests from any origin and with credentials
app.use(cors({ origin: true, credentials: true }));
// app.set("view engine", "pug");
app.set("view engine", "ejs");
app.use(express.static("public"));

//https://stackoverflow.com/questions/14463972/how-to-set-secure-cookie-using-heroku-node-js-express#:~:text=You%20are%20correct%20that%20Heroku%20terminates%20SSL%20before,sets%20a%20X-Forwarded-Proto%20header%20with%20the%20original%20protocol.
//https://stackoverflow.com/questions/23413401/what-does-trust-proxy-actually-do-in-express-js-and-do-i-need-to-use-it
// Set the ip-address of your trusted reverse proxy server such as
// haproxy or Apache mod proxy or nginx configured as proxy or others.
// The proxy server should insert the ip address of the remote client
// through request header 'X-Forwarded-For' as
// 'X-Forwarded-For: some.client.ip.address'
// Insertion of the forward header is an option on most proxy software
app.set("trust proxy"); //ID address client site

// Body parser, reading data from body into req.body, limit the http request size (Controls the maximum request body size. )
app.use(express.json({ limit: "10kb" }));
// Read urlencoded from Form submiting with action & method specified
app.use(express.urlencoded({ extended: true, limit: "10kb" }));
//middleware which parses cookies attached to the client request object.
app.use(cookieParser());

// Development logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

//http://expressjs.com/en/advanced/best-practice-security.html
//https://blog.risingstack.com/node-js-security-checklist/
app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);

const limiter = rateLimit({
  // 100 requests in 15 mins
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again in 15 mins",
});
app.use("/api/", limiter);

// Data sanitization against NoSQL query injection  {email: {$gt: ""}}
app.use(mongoSanitize());

// Data sanitization against XSS : removed all the malicious code attached with html
app.use(xss());

// Test middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  //   console.log("Hello from the middleware 👋");
  next();
});

// 3. routes

app.use("/api/v1/user", userRouter);
app.use("/api/v1/categories", categoryRouter);
app.use("/api/v1/products", productRouter);
app.use("/api/v1/reviews", reviewRouter);
app.use("/api/v1/cart", cartRouter);
//app.use("/api/v1/sellers")

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// ERROR handling middleware
app.use(globalErrorHandler);

export default app;
