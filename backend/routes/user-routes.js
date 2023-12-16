import express from 'express';
import { getAllUsers, signUp, updateUser, deleteUser, login } from '../controllers/user-controller';

const userRouter = express.Router();

userRouter.get("/", getAllUsers);
userRouter.post("/signup", signUp);
userRouter.put("/:id", updateUser);
userRouter.delete("/:id", deleteUser);
userRouter.post("/login", login);

export default userRouter;