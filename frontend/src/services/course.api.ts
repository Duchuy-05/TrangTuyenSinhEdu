import { apiClient } from './apiClient';
import type { Teacher } from './teacher.api';
import axios from 'axios';

// cau hinh axios để xử lý token hết hạn và refresh token của giảng viên
apiClient.defaults.baseURL = 'http://localhost:3000/api';
apiClient.defaults.withCredentials = true;
apiClient.defaults.headers.common['Content-Type'] = 'application/json';

apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    }, 
    (error) =>  Promise.reject(error)
);

apiClient.interceptors.response.use(
    (response) =>  response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && error.response?.data?.message === 'TOKEN_EXPIRED' && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const refreshResponse = await axios.get(
                    'http://localhost:3000/api/auth/refresh', 
                    {
                        withCredentials: true
                    }
                );
                const newAccessToken = refreshResponse.data.accessToken;
                localStorage.setItem('accessToken', newAccessToken);
                originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                return apiClient(originalRequest);
            }
            catch (refreshError) {
                console.error('Phiên đăng nhập đã hết hạn.');
                localStorage.removeItem('accessToken');
                localStorage.removeItem('user');
                window.location.href = '/login';
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
);

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

// gọi api khóa học của giảng viên
export const instructorCourseApi = {  
    getLecturerCourses: async () => {
        return await apiClient.get('/courses/lecturer');
    },
    createDraft: async (title: string) => {
        return await apiClient.post('/courses/draft', { title });
    },
    getDraft: async (courseGroupId: string) => {
        return await apiClient.get(`/courses/draft/${courseGroupId}`);
    },
    updateDraft: async (courseGroupId: string, data: any) => {
        return await apiClient.put(`/courses/draft/${courseGroupId}`, data);
    },
    publishCourse: async (courseGroupId: string) => {
        return await apiClient.post(`/courses/${courseGroupId}/publish`);
    },
};
