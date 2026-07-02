import { count } from "node:console";
import { AppDataSource } from "../models/DataSource";
import { Course, CourseStatus } from "../models/entities/Course";
import { v4 as uuidv4 } from 'uuid'; // Thư viện tạo chuỗi ID ngẫu nhiên
import { Teacher } from "../models/entities/Teacher";

export class CourseServiceGV {
    private static courseRepository = AppDataSource.getRepository(Course);
    private static teacherRepository = AppDataSource.getRepository(Teacher);

    // =========================================================
    // HỌC VIÊN
    // =========================================================
    // Lấy chi tiết khóa học cho học viên
    
    static async getCourseById(courseGroupId: string) {
        return this.courseRepository
            .createQueryBuilder('course')
            .leftJoinAndSelect('course.teacher', 'teacher')
            .leftJoinAndSelect('course.registrations', 'registrations')
            .leftJoinAndSelect('course.syllabus', 'syllabus')
            .where('course.course_group_id = :courseGroupId', { courseGroupId })
            .andWhere('course.status = :status', { status: CourseStatus.PUBLISHED })
            .orderBy('syllabus.orderIndex', 'ASC')
            .getOne();
    }

    // =========================================================
    // GIẢNG VIÊN
    // =========================================================

    // lấy danh sách khóa học
    static async getLecturerCourses(teacherId: number) {
        const allCourses = await this.courseRepository.find({
            where: { teacherId },
            order: { createdAt: 'DESC' }
        });
        // BE có thể trả về hết, FE sẽ tự gộp, hoặc BE gộp luôn tại đây cho nhẹ tải
        return allCourses; 
    }
    static async getOrCreateTeacherProfile(userId: number, fullName?: string): Promise<Teacher> {
        let teacherProfile = await this.teacherRepository.findOneBy({ id: userId });

        if (!teacherProfile) {
            console.log(`[Auto-Fix Service] Đang tự động tạo hồ sơ Giảng viên cho User ID: ${userId}`);
            
            const newTeacherData: Partial<Teacher> = {
                id: userId,
                fullName: fullName || 'Giảng viên mới',
                bio: 'Thông tin đang cập nhật...'
            };

            const newTeacher = this.teacherRepository.create(newTeacherData);
            teacherProfile = await this.teacherRepository.save(newTeacher);
        }

        return teacherProfile;
    }

    // tạo bản nháp mới
    static async createDraft(title: string, teacherId: number) {
        const newDraft = this.courseRepository.create({
            courseGroupId: uuidv4(), // Cấp 1 thẻ ID chung cho cả gia đình khóa học này
            title: title,
            teacherId: teacherId,
            status: CourseStatus.DRAFT,
            courseData: [], // Khởi tạo mảng rỗng cho lộ trình
            blocks: {},     // Khởi tạo object rỗng cho nội dung bài học
            price: 0        // Mặc định là miễn phí
        });
        return await this.courseRepository.save(newDraft);
    }

    // 3. Lấy dữ liệu Bản nháp để đổ vào giao diện Builder (Kéo thả)
    static async getDraft(courseGroupId: string, teacherId: number) {
        const draft = await this.courseRepository.findOne({
            where: { courseGroupId, status: CourseStatus.DRAFT, teacherId }
        });

        if (!draft) throw new Error('Không tìm thấy bản nháp hoặc bạn không có quyền!');
        return draft;
    }

    // Lưu Bản nháp
    static async updateDraft(courseGroupId: string, teacherId: number, courseDataInput: any) {
        const draft = await this.getDraft(courseGroupId, teacherId);
        // cap nhat 
        draft.title = courseDataInput.title ?? draft.title;
        draft.shortDesc = courseDataInput.shortDesc ?? draft.shortDesc;
        draft.target = courseDataInput.target ?? draft.target;
        draft.imageUrl = courseDataInput.thumbnail ?? draft.imageUrl; // Thumbnail
        draft.category = courseDataInput.category ?? draft.category;
        draft.price = courseDataInput.price ?? draft.price;
        // Cập nhật cấu trúc Kéo thả Builder
        draft.courseData = courseDataInput.courseData ?? draft.courseData;
        draft.blocks = courseDataInput.blocks ?? draft.blocks;
        
        return this.courseRepository.save(draft);
    }

// xuất bản khóa học
    static async publishCourse(courseGroupId: string, teacherId: number) {
        const draft = await this.getDraft(courseGroupId, teacherId);

        await this.courseRepository.update(
            { courseGroupId, status: CourseStatus.PUBLISHED, teacherId },
            { status: CourseStatus.ARCHIVED }
        );
        // bóc tách loại bỏ 'id', 'createdAt', 'updatedAt' cũ ra khỏi object draft
        const { id, createdAt, updatedAt, ...draftData } = draft;
        // tạo một đối tượng mới tinh chứa toàn bộ data còn lại và ghi đè status
        const publishedCourse = this.courseRepository.create({
            ...draftData,
            status: CourseStatus.PUBLISHED
        });

        return this.courseRepository.save(publishedCourse);
    }
}