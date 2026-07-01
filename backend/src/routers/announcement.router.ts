import { Router } from 'express';
import { AnnouncementController } from '../controllers/AnnouncementController';

const announcementRouter: Router = Router();

announcementRouter.get('/announcements/my', AnnouncementController.getMyAnnouncements);
announcementRouter.get('/announcements', AnnouncementController.getByClassId);
announcementRouter.get('/announcements/:id', AnnouncementController.getById);

announcementRouter.post('/announcements', AnnouncementController.create);

announcementRouter.put('/announcements/:id', AnnouncementController.update);
announcementRouter.delete('/announcements/:id', AnnouncementController.remove);

export default announcementRouter;