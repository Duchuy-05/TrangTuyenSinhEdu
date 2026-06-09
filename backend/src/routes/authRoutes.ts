import { Router }   from "express";
import { AuthController } from "../controllers/AuthControllers";

const router = Router();

// Đăng ký tài khoản
router.post("/register", AuthController.register);
// Đăng nhập
router.post("/login", AuthController.login);
// Làm mới token
router.get('/refresh', AuthController.refreshToken);
export default router;