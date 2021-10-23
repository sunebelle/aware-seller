import mongoose from "mongoose";
import app from "./app.js";
import dotenv from "dotenv";
dotenv.config();

const DB = process.env.DB_URL;
mongoose.connect(DB).then(() => console.log("DB connect successfully"));

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`server is listening on port ${port}`));
