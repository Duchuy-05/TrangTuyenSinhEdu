import { Router } from 'express';
import { UserController } from '../controllers/UserController';
import { verifyToken, isAdmin } from '../middlewares/auth.middleware';

const userRouter : Router = Router();

userRouter.get('/users', verifyToken, isAdmin, UserController.getAllUsers)
userRouter.get('/users/:id', verifyToken, isAdmin, UserController.getUserById)
userRouter.delete('/users/:id', verifyToken, isAdmin, UserController.deleteUser)

export default userRouter;
