import axios from 'axios';

export interface Teacher {
    id: number,
    fullName: string,
    title: string,
    experience: string;
    company: string;
    bio: string;
    avatarUrl: string;
}

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
    format: string;
    price: string;
    status: string;
    // Các field được JOIN từ bảng khác: 
    teacher: Teacher;
    syllabus: Syllabus[];
}

export interface Registration {
    id: number;
    userId: number;
    courseId: number;
    contactName: string;
    contactEmail: string;
    contactPhone: string;
    note: string;
    status: string; // 'pending', 'contacted', 'paid', 'cancelled'...
    handledBy: number | null;
    registeredAt: string;
    contactedAt: string | null;
    // Nested Objects
    course: {
        id: number;
        title: string;
        price: string;
        imageUrl: string;
    };
    user?: { // Có thể null nếu khách vãng lai đăng ký
        id: number;
        fullName: string;
        email: string;
    };
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

    createCourse: async (data: any) => {
        return await apiClient.post('/courses', data);
    },
    updateCourse: async (id: number, data: any) => {
        return await apiClient.put(`/courses/${id}`, data);
    },
    deleteCourse: async (id: number) => {
        return await apiClient.delete(`/courses/${id}`);
    }

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

    createTeacher: async (data: Partial<Teacher>) => {
        return await apiClient.post('/teachers', data);
    },
    updateTeacher: async (id: number, data: Partial<Teacher>) => {
        return await apiClient.put(`/teachers/${id}`, data);
    },
    deleteTeacher: async (id: number) => {
        return await apiClient.delete(`/teachers/${id}`);
    }
};

export const registrationApi = {
    getAllRegistrations: async (): Promise<Registration[]> => {
        const response = await apiClient.get('/registrations');
        return response.data.data;
    }
    
    registerForCourse: async (userData: RegistrationForm): Promise<void> => {
        await apiClient.post(`/registrations`, userData );
    }
};

export const uploadApi = {
    uploadImage: async (file: File): Promise<string> => {
        const formData = new FormData();
        formData.append('image', file);

        const response = await apiClient.post('/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        return response.data.url;
    }
};
