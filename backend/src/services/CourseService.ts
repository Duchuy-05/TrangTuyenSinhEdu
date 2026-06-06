import { AppDataSource } from "../models/DataSource";
import { Course } from "../models/entities/Course";

export class CourseService {
    private static courseRepository = AppDataSource.getRepository(Course);

    static async getAllCourses() {
        return this.courseRepository.find({
            relations: {registrations: true, teacher: true, syllabus: true},
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
        const newCourse = new Course();
        newCourse.teacherId = courseData.teacherId;
        newCourse.category = courseData.category;
        newCourse.title = courseData.title;
        newCourse.shortDesc = courseData.shortDesc;
        newCourse.target = courseData.target;
        newCourse.imageUrl = courseData.imageUrl;
        newCourse.duration = courseData.duration;
        newCourse.format = courseData.format;
        newCourse.price = courseData.price;
        newCourse.status = courseData.status;
        return this.courseRepository.save(newCourse);
    }

    static async updateCourse(id: number, courseData: any) {
        const course = await this.courseRepository.findOneBy({ id });
        if (!course) {
            throw new Error('Course not found');
        }
        course.teacherId = courseData.teacherId ?? course.teacherId;
        course.category = courseData.category ?? course.category;
        course.title = courseData.title ?? course.title;
        course.shortDesc = courseData.shortDesc ?? course.shortDesc;
        course.target = courseData.target ?? course.target;
        course.imageUrl = courseData.imageUrl ?? course.imageUrl;
        course.duration = courseData.duration ?? course.duration;
        course.format = courseData.format ?? course.format;
        course.price = courseData.price ?? course.price;
        course.status = courseData.status ?? course.status;
        return this.courseRepository.save(course);
    }
}