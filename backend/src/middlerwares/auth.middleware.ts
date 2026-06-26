import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { errorHandler } from '../utils/responseHandler'; 

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    const tokenFromHeader = authHeader && authHeader.split(' ')[1];
    // sua loi
    const tokenFromCookie = req.cookies?.access_token; 

    // Lấy 1 trong 2
    const token = tokenFromHeader || tokenFromCookie;

    if (!token) {
        return res.status(401).json(errorHandler(401, 'Không tìm thấy Token. Vui lòng đăng nhập!'));
    }

    try {
        // 2. Dùng chìa khóa bí mật để giải mã Token
        const secretKey = process.env.JWT_SECRET || 'YOUR_SECRET_KEY'; 
        const decoded = jwt.verify(token, secretKey);

        // 3. Gắn thông tin user vừa giải mã được vào request
        (req as any).user = decoded;

        // 4. Đóng dấu hợp lệ, cho phép request đi tiếp vào Controller
        next();
    } catch (error) {
        return res.status(403).json(errorHandler(403, 'Token không hợp lệ hoặc đã hết hạn!'));
    }
};