import { AppDataSource } from "../models/DataSource";
import { Course } from "../models/entities/Course";

export class CourseService {
    private static courseRepository = AppDataSource.getRepository(Course);

    static async getAllCoursesPagination(page: number = 1, limit: number = 10) {
        const [courses, total] = await this.courseRepository.findAndCount({
            relations: { registrations: true, teacher: true, syllabus: true },
            order: { createdAt: 'DESC' },
            take: limit,
            skip: (page - 1) * limit,
        });

        return {
            data: courses,
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
        };
    }

    static async getAllCourses() {
        return this.courseRepository.find({
            relations: { teacher: true, syllabus: true },
            order: { createdAt: 'DESC' },
        });
    }

    static async getCourseById(id: number) {
        return this.courseRepository
            .createQueryBuilder('course')
            .leftJoinAndSelect('course.teacher', 'teacher')
            .leftJoinAndSelect('course.registrations', 'registrations')
            .leftJoinAndSelect('course.syllabus', 'syllabus')
            .where('course.id = :id', { id })
            .orderBy('syllabus.orderIndex', 'ASC')
            .getOne();
    }

    static async createCourse(courseData: any) {
        const newCourse = this.courseRepository.create(courseData);
        return this.courseRepository.save(newCourse);
    }

    static async updateCourse(id: number, courseData: any) {
        const course = await this.courseRepository.findOneBy({ id });
        if (!course) {
            throw new Error('Course not found');
        }
        Object.assign(course, courseData);
        return this.courseRepository.save(course);

    }
}