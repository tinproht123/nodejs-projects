import express, { urlencoded } from "express";
import dotenv from "dotenv";
import "colors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import cors from "cors";
import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + Date.now());
  },
});

const upload = multer({ storage: storage });

//routes
import bookRouter from "./routes/book.js";
import authRouter from "./routes/auth.js";
import userRouter from "./routes/user.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;

app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(cors());

app.use("/api/v1/books", bookRouter);
app.use("/api/v1/auth/", authRouter);
app.use("/api/v1/user", userRouter);

app.listen(PORT, () =>
  console.log(`Server is listening on port ${PORT}...`.cyan.bold.underline)
);

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("MongoDb Connected!".bgRed))
  .catch((err) => console.log(err.bgRed));
