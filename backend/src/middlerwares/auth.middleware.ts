import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { errorHandler } from '../utils/responseHandler'; 
import { UserRole } from '../models/entities/User';

export interface AuthRequest extends Request {
    user?: any;
}

export const verifyToken = (req: AuthRequest, res: Response, next: NextFunction) => {
    // 1. Lấy Token từ Header
    const authHeader = req.headers.authorization;
    let tokenFromHeader;
    if (authHeader && authHeader.startsWith('Bearer ')) {
        tokenFromHeader = authHeader.split(' ')[1];
    }

    // 2. Lấy Token từ Cookie
    const tokenFromCookie = req.cookies?.access_token; 

    // 3. Ưu tiên lấy từ Header, nếu không có thì lấy từ Cookie
    const token = tokenFromHeader || tokenFromCookie;

    if (!token) {
        return res.status(401).json(errorHandler(401, 'Không tìm thấy Token. Vui lòng đăng nhập!'));
    }

    try {
        // 4. Giải mã Token
        const secretKey = process.env.ACCESS_TOKEN_SECRET || 'YOUR_SECRET_KEY'; 
        const decoded = jwt.verify(token, secretKey);

        // 5. Gắn thông tin user vào request qua interface AuthRequest
        req.user = decoded;
        next();
    } catch (error: any) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json(errorHandler(401, 'TOKEN_EXPIRED'));
        }
        return res.status(403).json(errorHandler(403, 'Token không hợp lệ hoặc đã hết hạn!'));
    }
};

export const isAdmin = (req: AuthRequest, res: Response, next: NextFunction) => {
    if (req.user && req.user.role === UserRole.ADMIN) {
        next();
    } else {
        return res.status(403).json(errorHandler(403, 'Không có quyền truy cập. Yêu cầu quyền Admin.'));
    }
};