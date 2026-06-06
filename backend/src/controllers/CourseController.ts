import { Request, Response } from 'express';
import { CourseService } from '../services/CourseService';
import { successHandler, errorHandler } from '../utils/responseHandler';

export class CourseController {
    static async getAllCourses( request: Request, response: Response) {
        try {
            const courses = await CourseService.getAllCourses();
            return response.json(successHandler(200, 'Lấy danh sách khóa học thành công', courses));
        }
        catch (error) {
            return response.json(errorHandler(500, 'Lỗi khi lấy danh sách khóa học'));
        }
    }

    static async getCourseById( request: Request, response: Response) {
        const courseId = Number(request.params.id);
        try {
            const course = await CourseService.getCourseById(courseId);
            if (!course) {
                return response.json(errorHandler(404, 'Khóa học không tồn tại'));
            }
            return response.json(successHandler(200, 'Lấy thông tin khóa học thành công', course));
        }
        catch (error) {
            return response.json(errorHandler(500, 'Lỗi khi lấy thông tin khóa học'));
        }
    }

    static async createCourse( request: Request, response: Response) {
        const courseData = request.body;
        try {
            const newCourse = await CourseService.createCourse(courseData);
            return response.json(successHandler(201, 'Tạo khóa học thành công', newCourse));
        }
        catch (error) {
            return response.json(errorHandler(500, 'Lỗi khi tạo khóa học'));
        }
    }

    static async updateCourse( request: Request, response: Response) {
        const courseId = Number(request.params.id);
        const courseData = request.body;
        try {
            const updatedCourse = await CourseService.updateCourse(courseId, courseData);
            return response.json(successHandler(200, 'Cập nhật khóa học thành công', updatedCourse));
        }
        catch (error) {
            return response.json(errorHandler(500, 'Lỗi khi cập nhật khóa học'));
        }
    }

    // static async deleteCourse( request: Request, response: Response) {
    //     const courseId = Number(request.params.id);
    //     try {
    //         await CourseService.deleteCourse(courseId);
    //         return response.json(successHandler(200, 'Xóa khóa học thành công'));
    //     }
    //     catch (error) {
    //         return response.json(errorHandler(500, 'Lỗi khi xóa khóa học'));
    //     }
    // }
}