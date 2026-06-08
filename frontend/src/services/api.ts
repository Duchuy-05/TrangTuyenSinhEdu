import axios from 'axios';

export interface Teacher {
    id: number,
    full_name: string,
    title: string,
    experience: string;
    company: string;
    bio: string;
    avatar_url: string;
}

export interface Syllabus {
    id: number;
    order_index: number;
    title: string;
    description: string;
}

export interface Course {
    id: number;
    category: string;
    title: string;
    short_desc: string;
    target: string;
    image_url: string;
    duration: string;
    format: string;
    price: string;
    status: string;
    // Các field được JOIN từ bảng khác: 
    teacher: Teacher;
    syllabus: Syllabus[];
}

// cau hinh axios
const apiClient = axios.create({
    baseURL: 'http://localhost:3000/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

export const courseApi = {
    // Lấy danh sách tất cả khóa học (cho trang chủ)
    getAllCourses: async (): Promise<Course[]> => {
        const response = await apiClient.get('/courses');
        return response.data.data;
    },

    // Lấy chi tiết 1 khóa học (cho trang chi tiết)
    getCourseById: async (id: string | number): Promise<Course> => {
        const response = await apiClient.get(`/courses/${id}`);
        return response.data.data;
    },

};

export const teacherApi = {
    getAllTeachers: async (): Promise<Teacher[]> => {
        const response = await apiClient.get('/teachers');
        return response.data.data
    },

    getTeacherById: async (id: string | number): Promise<Teacher> => {
        const response = await apiClient.get(`/teachers/${id}`);
        return response.data.data;
    },
}