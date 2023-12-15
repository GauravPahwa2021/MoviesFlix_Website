import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/user-routes";

dotenv.config();

const app = express();

// middlewares
app.use(express.json());
app.use("/user",userRouter);

const port = 5000;
mongoose
    .connect(
        `mongodb+srv://admin:${process.env.MONGODB_PASSWORD}@cluster0.alanjt4.mongodb.net/?retryWrites=true&w=majority`
    )
    .then(() =>
        app.listen(port, () => {
            console.log(`connected to the localhost port ${port}`);
        })
    )
    .catch((err) => console.log(err));

