import express from 'express';
import cors from 'cors';
import { AppDataSource } from './models/DataSource';

import 'dotenv/config';
import authRoutes from './routers/auth.router';
import cookieParser from 'cookie-parser';
import userRouter from './routers/user.router';
import teacherRouter from './routers/teacher.router';
import courseRouter from './routers/course.router';
import syllabusRouter from './routers/syllabus.router';
import registrationRouter from './routers/registration.router';
import postRouter from './routers/post.router';
import morgan from 'morgan';
import classRouter from './routers/class.router';
import scheduleRouter from './routers/schedule.router';
import classEnrollmentRouter from './routers/classenrollment.router';


const app = express();
const port = process.env.PORT || 3000;

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true // Bật tính năng cho phép trao đổi Cookie giữa FE và BE
}));
app.use(cookieParser());

app.use(morgan('dev'));
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use("/api/auth", authRoutes) // Đăng ký route cho auth
app.use(express.static('public'))
app.set('view engine', 'ejs')

app.use("/api", classRouter)
app.use("/api", scheduleRouter)
app.use("/api", classEnrollmentRouter)
app.use("/api", postRouter)
app.use("/api", userRouter)
app.use("/api", teacherRouter)
app.use("/api", courseRouter)
app.use("/api", syllabusRouter)
app.use("/api", registrationRouter)

try {
    AppDataSource.initialize().then(() => {
        console.log("DataSource chay. !")
    }).catch((err) => {
        console.error(err)
    })
} catch (error) { console.error("err:", error) }

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});