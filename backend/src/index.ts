import express from 'express';
import cors from 'cors';
import { AppDataSource } from './models/DataSource';
import authRoutes from './routers/authRoutes';
import 'dotenv/config';
import cookieParser from 'cookie-parser';
import userRouter from './routers/user.router';
import teacherRouter from './routers/teacher.router';
import courseRouter from './routers/course.router';
import syllabusRouter from './routers/syllabus.router';
import registrationRouter from './routers/registration.router';

const app = express();
const port = process.env.PORT || 3000;

app.use(cors({
    origin: 'http://localhost:5173', 
    credentials: true // Bật tính năng cho phép trao đổi Cookie giữa FE và BE
}));
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use("/api/auth", authRoutes) // Đăng ký route cho auth
app.use(express.static('public'))
app.use(cookieParser());
app.set('view engine', 'ejs')

app.use("/api", userRouter)
app.use("/api", teacherRouter)
app.use("/api", courseRouter)
app.use("/api", syllabusRouter)
app.use("/api", registrationRouter)

try {
    AppDataSource.initialize().then(()=>{
        console.log("DataSource chay. !")
    }).catch((err)=>{
        console.error(err)
    })
} catch (error) { console.error("err:", error) }

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});