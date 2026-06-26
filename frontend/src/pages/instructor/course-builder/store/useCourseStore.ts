import { create } from 'zustand';
import { instructorCourseApi } from '../../../../services/api';  
import Swal from 'sweetalert2';

export interface Lesson {
  id: string;
  title: string;
  isPreview: boolean;
  blocks?: any[]; 
}

export interface Unit {
  id: string;
  title: string;
  items: Lesson[];
}

export interface CourseDetails {
  title: string;
  shortDesc: string;
  price: number | string;
  imageUrl: string;
}

interface CourseState {
  courseDetails: CourseDetails;
  courseData: Unit[]; // Chứa Units và Lessons
  blocksByLesson: Record<string, any>; // Chứa nội dung (Video, text, quiz)
  activeLesson: Lesson | null;
  isLoading: boolean;
  
  fetchDraftData: (courseId: string) => Promise<void>;
  saveDraft: (courseId: string) => Promise<void>;
  setActiveLesson: (lesson: Lesson) => void;
}

export const useCourseStore = create<CourseState>((set, get) => ({
  courseDetails: { title: '', shortDesc: '', price: 0, imageUrl: '' },
  courseData: [],
  blocksByLesson: {},
  activeLesson: null,
  isLoading: false,

  fetchDraftData: async (courseId) => {
    set({ isLoading: true });
    try {
      const response = await instructorCourseApi.getDraft(courseId);
      const data = response.data.data;
      set({ 
        courseDetails: { title: data.title, shortDesc: data.shortDesc || '', price: data.price, imageUrl: data.imageUrl || '' },
        courseData: data.courseData || [],
        blocksByLesson: data.blocks || {},
      });
    } catch (error) {
      console.error(error);
    } finally {
      set({ isLoading: false });
    }
  },

  saveDraft: async (courseId) => {
    const state = get();
    Swal.fire({ title: 'Đang lưu...', didOpen: () => Swal.showLoading() });
    try {
      await instructorCourseApi.updateDraft(courseId, {
        ...state.courseDetails,
        courseData: state.courseData,
        blocks: state.blocksByLesson
      });
      Swal.fire('Thành công', 'Đã lưu bản nháp', 'success');
    } catch (error) {
      Swal.fire('Lỗi', 'Không thể lưu', 'error');
    }
  },
  
  setActiveLesson: (lesson) => set({ activeLesson: lesson })
}));