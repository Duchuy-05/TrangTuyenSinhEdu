import { apiClient } from './apiClient';
import type { Teacher } from './teacher.api';

export interface Syllabus {
    id: number;
    orderIndex: number;
    title: string;
    description: string;
}

export interface Course {
    id: number;
    category: string;
    title: string;
    shortDesc: string;
    target: string;
    imageUrl: string;
    duration: string;
    sessionCount?: number;
    frequency?: string;
    lessonDuration?: string;
    classSize?: string;
    format: string;
    price: string;
    status: string;
    teacher: Teacher;
    syllabus: Syllabus[];
}

export const courseApi = {
    getAllCourses: async (): Promise<Course[]> => {
        const response = await apiClient.get('/courses');
        return response.data.data;
    },

    getCoursesPaginated: async (page = 1, limit = 10) => {
        const response = await apiClient.get('/courses/pagination', {
            params: { page, limit }
        });
        return response.data.data;
    },

    getCourseById: async (id: string | number): Promise<Course> => {
        const response = await apiClient.get(`/courses/${id}`);
        return response.data.data;
    },

    createCourse: async (data: unknown) => {
        return apiClient.post('/courses', data);
    },

    updateCourse: async (id: number, data: unknown) => {
        return apiClient.put(`/courses/${id}`, data);
    },

    deleteCourse: async (id: number) => {
        return apiClient.delete(`/courses/${id}`);
    },

    updateCourseSyllabus: async (courseId: number, data: { syllabus: unknown[] }) => {
        return apiClient.put(`/courses/${courseId}/syllabus`, data);
    },

    createCourseSyllabus: async (courseId: number, data: { syllabus: unknown[] }) => {
        return apiClient.post(`/courses/${courseId}/syllabi/bulk`, data);
    },
};
