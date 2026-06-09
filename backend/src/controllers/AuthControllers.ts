import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { AppDataSource } from "../models/DataSource"; // Đường dẫn trỏ tới file DataSource của bạn
import { User } from "../models/entities/User";

export class AuthController {
  
  // ==============================
  // 1. API REGISTER
  // ==============================
  static async register(req: Request, res: Response) {
    try {
      const { name, email, password } = req.body;
      const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).{6,}$/; // Mật khẩu tối thiểu 6 ký tự, ít nhất 1 chữ hoa và 1 ký tự đặc biệt
    if (!passwordRegex.test(password)) {
      return res.status(400).json({ 
        message: "Mật khẩu phải tối thiểu 6 ký tự, gồm chữ hoa và ký tự đặc biệt!" 
      });
    }
      const userRepository = AppDataSource.getRepository(User);

      // Kiểm tra xem email đã tồn tại chưa
      const existingUser = await userRepository.findOneBy({ email });
      if (existingUser) {
        return res.status(400).json({ message: "Email này đã được đăng ký!" });
      }

      // Hash password với độ mặn (salt rounds) là 10
      const hashedPassword = await bcrypt.hash(password, 10);

      // Tạo user mới
      const newUser = new User();
      newUser.name = name;
      newUser.email = email;
      newUser.password = hashedPassword;
      newUser.role = "học sinh"; // mặc định

      // Lưu vào Database MySQL
      await userRepository.save(newUser);

      return res.status(201).json({ message: "Đăng ký tài khoản thành công!" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Lỗi Server!" });
    }
  }

  // ==============================
  // 2. API LOGIN
  // ==============================
  static async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const userRepository = AppDataSource.getRepository(User); // Đường dẫn trỏ tới file DataSource của bạn

      // Tìm user theo email
      const user = await userRepository.findOneBy({ email });
      if (!user) {
        return res.status(401).json({ message: "Email hoặc mật khẩu không đúng!" });
      }

      // So sánh mật khẩu người dùng nhập với mật khẩu đã hash trong DB
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: "Email hoặc mật khẩu không đúng!" });
      }

      // Tạo Access Token (15 phút)
      const accessToken = jwt.sign(
        { id: user.id, role: user.role }, 
        process.env.ACCESS_TOKEN_SECRET!, 
        { expiresIn: "15m" }
      );

      // Tạo Refresh Token (7 ngày)
      const refreshToken = jwt.sign(
        { id: user.id }, 
        process.env.REFRESH_TOKEN_SECRET!, 
        { expiresIn: "7d" }
      );

      // Lưu Refresh Token vào HTTP-only Cookie để bảo mật (chống XSS)
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: false, // Set thành 'true' nếu chạy trên HTTPS (production)
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 ngày
      });

      // Trả về Access Token và thông tin cơ bản cho Frontend
      return res.status(200).json({
        message: "Đăng nhập thành công!",
        accessToken,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role
        }
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Lỗi Server!" });
    }
  }
  // ==============================
  // 3. API REFRESH TOKEN (CẤP LẠI TOKEN)
  // ==============================
  static async refreshToken(req: Request, res: Response) {
    try {
      // 1. Lấy Refresh Token từ cookie (Yêu cầu phải có cookie-parser)
      const refreshToken = req.cookies.refreshToken;
      
      if (!refreshToken) {
        return res.status(401).json({ message: "Chưa xác thực. Vui lòng đăng nhập lại!" });
      }

      // 2. Xác thực chữ ký của Refresh Token
      jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET!, async (err: any, decoded: any) => {
        if (err) {
          return res.status(403).json({ message: "Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại!" });
        }

        // 3. Tìm User trong Database dựa vào ID giải mã được
        const userRepository = AppDataSource.getRepository(User);
        const user = await userRepository.findOneBy({ id: decoded.id });

        if (!user) {
          return res.status(403).json({ message: "Tài khoản không tồn tại!" });
        }

        // 4. Ký và Cấp phát Access Token mới (15 phút)
        const newAccessToken = jwt.sign(
          { id: user.id, role: user.role }, 
          process.env.ACCESS_TOKEN_SECRET!, 
          { expiresIn: "15m" }
        );

        // 5. Trả Token mới về cho FE
        return res.status(200).json({ 
            message: "Cấp lại Token thành công!",
            accessToken: newAccessToken 
        });
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Lỗi Server!" });
    }
  }
}