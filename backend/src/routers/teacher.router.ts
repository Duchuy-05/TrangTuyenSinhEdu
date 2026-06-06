import { Router } from 'express';
import { TeacherController } from '../controllers/TeacherController';

const teacherRouter: Router = Router();

teacherRouter.get('/teachers', TeacherController.getAllTeachers)
teacherRouter.get('/teachers/:id', TeacherController.getTeacherById)
teacherRouter.post('/teachers', TeacherController.createTeacher)
teacherRouter.put('/teachers/:id', TeacherController.updateTeacher)
teacherRouter.delete('/teachers/:id', TeacherController.deleteTeacher)

export default teacherRouter;
