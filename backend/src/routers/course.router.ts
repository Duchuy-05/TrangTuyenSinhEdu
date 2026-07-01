import { Router } from 'express';
import { CourseController } from '../controllers/CourseController';
import { upload } from '../middlewares/upload.middleware';


const courseRouter: Router = Router();

courseRouter.get('/courses', CourseController.getAllCourses);
courseRouter.get('/courses/pagination', CourseController.getAllCoursesPagination);
courseRouter.get('/courses/:id', CourseController.getCourseById);
courseRouter.post('/courses', upload.single('image'), CourseController.createCourse);
courseRouter.put('/courses/:id', upload.single('image'), CourseController.updateCourse);

export default courseRouter;