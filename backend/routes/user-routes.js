import express from 'express';
import {getAllUsers} from '../controllers/user-controller';

const userRouter = express.Router();

userRouter.get("/",getAllUsers);
userRouter.post("/",)

export default userRouter;