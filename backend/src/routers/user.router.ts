import { Router } from 'express';
import { UserController } from '../controllers/UserController';

const userRouter : Router = Router();

userRouter.get('/users', UserController.getAllUsers)
userRouter.get('/users/:id', UserController.getUserById)
userRouter.delete('/users/:id', UserController.deleteUser)

export default userRouter;