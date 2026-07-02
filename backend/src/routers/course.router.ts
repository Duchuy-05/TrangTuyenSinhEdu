import { Router } from 'express';
import { CourseController } from '../controllers/CourseController';
import { upload } from '../middlerwares/upload.middleware';
import { verifyToken } from '../middlerwares/auth.middleware';
const courseRouter: Router = Router();

// =======================================================================
// NHÓM 1 CÁC API ĐẶC THÙ ĐẶT LÊN TRÊN
// =======================================================================

// 1. API lấy danh sách khóa học của riêng giảng viên đó
courseRouter.get('/courses/lecturer', verifyToken, CourseController.getLecturerCourses);

// 2. Nhóm API Quản lý Khóa học đa phương tiện
courseRouter.post('/courses/draft', verifyToken, CourseController.createDraft);
courseRouter.get('/courses/draft/:courseGroupId', verifyToken, CourseController.getDraft);
courseRouter.put('/courses/draft/:courseGroupId', verifyToken, CourseController.updateDraft);
courseRouter.post('/courses/:courseGroupId/publish', verifyToken, CourseController.publishCourse);


// =======================================================================
// NHÓM 2: CÁC API CÓ THAM SỐ ĐỘNG (:id) - BẮT BUỘC PHẢI ĐẶT XUỐNG DƯỚI
// =======================================================================

courseRouter.get('/courses', CourseController.getAllCourses);
courseRouter.post('/courses', upload.single('image'), CourseController.createCourse);
// API lấy chi tiết 1 khóa học bằng ID 
courseRouter.get('/courses/:id', CourseController.getCourseById);
courseRouter.put('/courses/:id', upload.single('image'), CourseController.updateCourse);

export default courseRouter;