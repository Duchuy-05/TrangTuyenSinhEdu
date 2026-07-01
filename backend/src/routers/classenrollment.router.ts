import { Router } from 'express';
import { ClassEnrollmentController } from '../controllers/ClassEnrollmentController';

const classEnrollmentRouter: Router = Router();

classEnrollmentRouter.get('/class-enrollments/myclasses', ClassEnrollmentController.getMyClasses);
classEnrollmentRouter.get('/class-enrollments', ClassEnrollmentController.getByClassId);

classEnrollmentRouter.post('/class-enrollments', ClassEnrollmentController.create);
classEnrollmentRouter.post('/class-enrollments/bulk', ClassEnrollmentController.bulkCreate);

classEnrollmentRouter.put('/class-enrollments/:id', ClassEnrollmentController.updateStatus);
classEnrollmentRouter.delete('/class-enrollments/:id', ClassEnrollmentController.remove);

export default classEnrollmentRouter;