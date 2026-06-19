import { AppDataSource } from "../models/DataSource";
import { Teacher } from "../models/entities/Teacher";

export class TeacherService {
    private static teacherRepository = AppDataSource.getRepository(Teacher);

    static async getAllTeachers() {
        return this.teacherRepository.find({
            relations: { courses: true },
        });
    }

    static async getTeacherById(id: number) {
        return this.teacherRepository.findOne({
            where: { id },
            relations: { courses: true },
        });
    }

    static async createTeacher(teacherData: any) {
        const newTeacher = new Teacher();
        newTeacher.fullName = teacherData.fullName;
        newTeacher.email = teacherData.email;
        newTeacher.phone = teacherData.phone;
        newTeacher.specialization = teacherData.specialization;
        newTeacher.bio = teacherData.bio;
        newTeacher.avatarUrl = teacherData.avatarUrl;
        return this.teacherRepository.save(newTeacher);
    }

    static async updateTeacher(id: number, teacherData: any) {
        const teacher = await this.teacherRepository.findOneBy({ id });
        if (!teacher) {
            throw new Error('Teacher not found');
        }
        teacher.fullName = teacherData.fullName ?? teacher.fullName;
        teacher.email = teacherData.email ?? teacher.email;
        teacher.phone = teacherData.phone ?? teacher.phone;
        teacher.specialization = teacherData.specialization ?? teacher.specialization;
        teacher.bio = teacherData.bio ?? teacher.bio;
        teacher.avatarUrl = teacherData.avatarUrl ?? teacher.avatarUrl;
        return this.teacherRepository.save(teacher);
    }

    static async deleteTeacher(id: number) {
        const teacher = await this.teacherRepository.findOneBy({ id });
        if (!teacher) {
            throw new Error('Teacher not found');
        }
        return this.teacherRepository.remove(teacher);
    }
}
