import { Router } from 'express';
import { TeacherController } from '../controllers/TeacherController';
import { upload } from '../middlerwares/upload.middleware';

const teacherRouter: Router = Router();

teacherRouter.get('/teachers', TeacherController.getAllTeachers)
teacherRouter.get('/teachers/:id', TeacherController.getTeacherById)
teacherRouter.post('/teachers', TeacherController.createTeacher)
teacherRouter.delete('/teachers/:id', TeacherController.deleteTeacher)
teacherRouter.put('/teachers/:id', TeacherController.updateTeacher);
teacherRouter.post('/upload', upload.single('image'), TeacherController.uploadImage);

export default teacherRouter;
