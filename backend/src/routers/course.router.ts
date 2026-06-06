import { Router } from 'express';
import { CourseController } from '../controllers/CourseController';

const courseRouter : Router = Router();

courseRouter.get('/courses', CourseController.getAllCourses)
courseRouter.get('/courses/:id', CourseController.getCourseById)
courseRouter.post('/courses', CourseController.createCourse)
courseRouter.put('/courses/:id', CourseController.updateCourse)

export default courseRouter;