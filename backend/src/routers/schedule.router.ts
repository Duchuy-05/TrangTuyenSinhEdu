import { Router } from 'express';
import { ScheduleController } from '../controllers/ScheduleController';

const scheduleRouter: Router = Router();

scheduleRouter.get('/schedules/my-upcoming', ScheduleController.getMyUpcoming);
scheduleRouter.get('/schedules', ScheduleController.getByClassId);
scheduleRouter.get('/schedules/:id', ScheduleController.getById);

scheduleRouter.post('/schedules', ScheduleController.create);
scheduleRouter.post('/schedules/bulk', ScheduleController.bulkCreate);

scheduleRouter.put('/schedules/:id', ScheduleController.update);
scheduleRouter.delete('/schedules/:id', ScheduleController.remove);

export default scheduleRouter;