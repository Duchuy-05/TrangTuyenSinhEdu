import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { UserRole } from '../models/entities/User';

export interface AuthRequest extends Request {
    user?: any;
}

export const verifyToken = (req: AuthRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ status: 401, message: 'Chưa xác thực. Vui lòng đăng nhập.' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(403).json({ status: 403, message: 'Token không hợp lệ hoặc đã hết hạn.' });
    }
};

export const isAdmin = (req: AuthRequest, res: Response, next: NextFunction) => {
    if (req.user && req.user.role === UserRole.ADMIN) {
        next();
    } else {
        return res.status(403).json({ status: 403, message: 'Không có quyền truy cập. Yêu cầu quyền Admin.' });
    }
};
