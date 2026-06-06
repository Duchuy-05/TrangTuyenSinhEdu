import { Router } from 'express';
import { CourseSyllabusController } from '../controllers/CourseSyllabusController';

const syllabusRouter: Router = Router();

syllabusRouter.get('/syllabi', CourseSyllabusController.getAllSyllabi)
syllabusRouter.get('/syllabi/:id', CourseSyllabusController.getSyllabusById)
syllabusRouter.get('/courses/:courseId/syllabi', CourseSyllabusController.getSyllabusByCourseId)
syllabusRouter.post('/syllabi', CourseSyllabusController.createSyllabus)
syllabusRouter.put('/syllabi/:id', CourseSyllabusController.updateSyllabus)
syllabusRouter.delete('/syllabi/:id', CourseSyllabusController.deleteSyllabus)

export default syllabusRouter;
