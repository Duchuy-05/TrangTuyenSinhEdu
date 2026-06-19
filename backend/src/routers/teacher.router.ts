import { Router } from 'express';
import { TeacherController } from '../controllers/TeacherController';
import { upload } from '../middlerwares/upload.middleware';
import { verifyToken, isAdmin } from '../middlerwares/auth.middleware';
const teacherRouter: Router = Router();

teacherRouter.get('/teachers', TeacherController.getAllTeachers);
teacherRouter.get('/teachers/:id', TeacherController.getTeacherById);

teacherRouter.post('/teachers', verifyToken, isAdmin, TeacherController.createTeacher);
teacherRouter.delete('/teachers/:id', verifyToken, isAdmin, TeacherController.deleteTeacher);
teacherRouter.put('/teachers/:id', verifyToken, isAdmin, TeacherController.updateTeacher);
teacherRouter.post('/upload', verifyToken, isAdmin, upload.single('image'), TeacherController.uploadImage);

export default teacherRouter;
