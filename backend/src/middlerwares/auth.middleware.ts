import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { errorHandler } from '../utils/responseHandler'; 

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    // 1. Tìm token từ Header (dành cho Postman) HOẶC từ Cookie (dành cho Browser)
    const authHeader = req.headers.authorization;
    const tokenFromHeader = authHeader && authHeader.split(' ')[1];
    
    // LƯU Ý: Thay 'access_token' bằng đúng tên Cookie mà bạn đã set ở hàm Login nhé
    const tokenFromCookie = req.cookies?.access_token; 

    // Lấy 1 trong 2
    const token = tokenFromHeader || tokenFromCookie;

    // Người dùng chưa đăng nhập (Không có token ở cả Header và Cookie)
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
        // Nếu Token bị sai lệch, bị sửa đổi hoặc hết hạn
        return res.status(403).json(errorHandler(403, 'Token không hợp lệ hoặc đã hết hạn!'));
    }
};