import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/user-routes";
import adminRouter from "./routes/admin-routes";
import movieRouter from "./routes/movie-routes";
import bookingRouter from "./routes/booking-routes";

dotenv.config();

const app = express();

// middlewares
app.use(express.json());
app.use("/user", userRouter);
app.use("/admin", adminRouter);
app.use("/movie", movieRouter);
app.use("/booking",bookingRouter);

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

