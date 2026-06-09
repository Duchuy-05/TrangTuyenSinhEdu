import { AppDataSource } from "../models/DataSource";
import { CourseSyllabus } from "../models/entities/CourseSyllabus";

export class CourseSyllabusService {
    private static courseSyllabusRepository = AppDataSource.getRepository(CourseSyllabus);

    static async getAllSyllabi() {
        return this.courseSyllabusRepository.find({
            relations: { course: true },
        });
    }

    static async getSyllabusById(id: number) {
        return this.courseSyllabusRepository.findOne({
            where: { id },
            relations: { course: true },
        });
    }

    static async getSyllabusByCourseId(courseId: number) {
        return this.courseSyllabusRepository.find({
            where: { courseId },
            relations: { course: true },
            order: { orderIndex: 'ASC' },
        });
    }

    static async createSyllabus(syllabusData: any) {
        const newSyllabus = new CourseSyllabus();
        newSyllabus.courseId = syllabusData.courseId;
        newSyllabus.orderIndex = syllabusData.orderIndex ?? 0;
        newSyllabus.title = syllabusData.title;
        newSyllabus.description = syllabusData.description;
        return this.courseSyllabusRepository.save(newSyllabus);
    }

    static async updateSyllabus(id: number, syllabusData: any) {
        const syllabus = await this.courseSyllabusRepository.findOneBy({ id });
        if (!syllabus) {
            throw new Error('Course syllabus not found');
        }
        syllabus.courseId = syllabusData.courseId ?? syllabus.courseId;
        syllabus.orderIndex = syllabusData.orderIndex ?? syllabus.orderIndex;
        syllabus.title = syllabusData.title ?? syllabus.title;
        syllabus.description = syllabusData.description ?? syllabus.description;
        return this.courseSyllabusRepository.save(syllabus);
    }

    static async deleteSyllabus(id: number) {
        const syllabus = await this.courseSyllabusRepository.findOneBy({ id });
        if (!syllabus) {
            throw new Error('Course syllabus not found');
        }
        return this.courseSyllabusRepository.remove(syllabus);
    }
}
