import { Router } from 'express';
import { ClassController } from '../controllers/ClassController';

const classRouter: Router = Router();

classRouter.get('/classes', ClassController.getAllClasses);
classRouter.get('/classes/:id', ClassController.getClassById);
classRouter.post('/classes', ClassController.createClass);
classRouter.put('/classes/:id', ClassController.updateClass);

export default classRouter;