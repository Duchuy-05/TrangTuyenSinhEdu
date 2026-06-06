import { Request, Response } from 'express';
import { CourseSyllabusService } from '../services/CourseSyllabusService';
import { successHandler, errorHandler } from '../utils/responseHandler';

export class CourseSyllabusController {
    static async getAllSyllabi(request: Request, response: Response) {
        try {
            const syllabi = await CourseSyllabusService.getAllSyllabi();
            return response.json(successHandler(200, 'Lấy danh sách chương trình khóa học thành công', syllabi));
        }
        catch (error) {
            return response.json(errorHandler(500, 'Lỗi khi lấy danh sách chương trình khóa học'));
        }
    }

    static async getSyllabusById(request: Request, response: Response) {
        const syllabusId = Number(request.params.id);
        try {
            const syllabus = await CourseSyllabusService.getSyllabusById(syllabusId);
            if (!syllabus) {
                return response.json(errorHandler(404, 'Chương trình khóa học không tồn tại'));
            }
            return response.json(successHandler(200, 'Lấy thông tin chương trình khóa học thành công', syllabus));
        }
        catch (error) {
            return response.json(errorHandler(500, 'Lỗi khi lấy thông tin chương trình khóa học'));
        }
    }

    static async getSyllabusByCourseId(request: Request, response: Response) {
        const courseId = Number(request.params.courseId);
        try {
            const syllabi = await CourseSyllabusService.getSyllabusByCourseId(courseId);
            return response.json(successHandler(200, 'Lấy danh sách chương trình theo khóa học thành công', syllabi));
        }
        catch (error) {
            return response.json(errorHandler(500, 'Lỗi khi lấy danh sách chương trình theo khóa học'));
        }
    }

    static async createSyllabus(request: Request, response: Response) {
        const syllabusData = request.body;
        try {
            const newSyllabus = await CourseSyllabusService.createSyllabus(syllabusData);
            return response.json(successHandler(201, 'Tạo chương trình khóa học thành công', newSyllabus));
        }
        catch (error) {
            return response.json(errorHandler(500, 'Lỗi khi tạo chương trình khóa học'));
        }
    }

    static async updateSyllabus(request: Request, response: Response) {
        const syllabusId = Number(request.params.id);
        const syllabusData = request.body;
        try {
            const updatedSyllabus = await CourseSyllabusService.updateSyllabus(syllabusId, syllabusData);
            return response.json(successHandler(200, 'Cập nhật chương trình khóa học thành công', updatedSyllabus));
        }
        catch (error) {
            return response.json(errorHandler(500, 'Lỗi khi cập nhật chương trình khóa học'));
        }
    }

    static async deleteSyllabus(request: Request, response: Response) {
        const syllabusId = Number(request.params.id);
        try {
            await CourseSyllabusService.deleteSyllabus(syllabusId);
            return response.json(successHandler(200, 'Xóa chương trình khóa học thành công'));
        }
        catch (error) {
            return response.json(errorHandler(500, 'Lỗi khi xóa chương trình khóa học'));
        }
    }
}
