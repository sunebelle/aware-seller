import express from "express";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user";
const app = express();

app.use(cors());
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));

app.use(cookieParser());
// 3. routes
app.use("/api/v1/users", userRouter);
export default app;
