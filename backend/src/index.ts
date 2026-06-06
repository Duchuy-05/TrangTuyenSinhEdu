import express from 'express';
import cors from 'cors';
import { AppDataSource } from './models/DataSource';
import userRouter from './routers/user.router';
import teacherRouter from './routers/teacher.router';
import courseRouter from './routers/course.router';
import syllabusRouter from './routers/syllabus.router';

const app = express();
const port = process.env.PORT || 3000;

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(express.static('public'))

app.set('view engine', 'ejs')

app.use("/api", userRouter)
app.use("/api", teacherRouter)
app.use("/api", courseRouter)
app.use("/api", syllabusRouter)

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