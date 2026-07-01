import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
   Search, Plus, BookOpen, Settings, List,
   FileText, X
} from 'lucide-react';

// --- MOCK DATA ---
const mockCoursesData = [
   {
      id: 'c1',
      title: 'ReactJS Từ Cơ Bản Đến Nâng Cao',
      thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=800',
      status: 'Published',
      studentsCount: 1540,
      chapters: [
         {
            id: 'ch1', title: 'Chương 1: Khởi đầu với React', lessons: [
               { id: 'l1', title: 'Cài đặt môi trường Node.js', type: 'video', duration: '12:05' },
               { id: 'l2', title: 'Tạo dự án React đầu tiên', type: 'video', duration: '20:15' },
               { id: 'q1', title: 'Quiz: Kiến thức cơ bản', type: 'quiz', duration: '10 Câu hỏi' }
            ]
         },
         {
            id: 'ch2', title: 'Chương 2: Hooks và State Management', lessons: [
               { id: 'l3', title: 'Hiểu sâu về useState', type: 'video', duration: '15:30' },
               { id: 'l4', title: 'useEffect và Lifecycle', type: 'video', duration: '25:00' }
            ]
         }
      ]
   },
   {
      id: 'c2',
      title: 'UI/UX Design Cơ Bản Cho Lập Trình Viên',
      thumbnail: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80&w=800',
      status: 'Draft',
      studentsCount: 0,
      chapters: [
         {
            id: 'ch3', title: 'Chương 1: Nguyên lý thiết kế', lessons: [
               { id: 'l5', title: 'Màu sắc và Typography', type: 'video', duration: '30:00' }
            ]
         }
      ]
   }
];

const InstructorCoursesPage: React.FC = () => {
   // --- STATES ---
   const [courses, setCourses] = useState(mockCoursesData);
   const [searchTerm, setSearchTerm] = useState('');
   const [isCreateCourseModalOpen, setIsCreateCourseModalOpen] = useState(false);
   const [newCourseData, setNewCourseData] = useState({ title: '', thumbnail: '' });
   const navigate = useNavigate();

   const handleCreateCourse = (e: React.FormEvent) => {
      e.preventDefault();
      if (!newCourseData.title.trim()) return;

      const newCourse = {
         id: `c_${Date.now()}`,
         title: newCourseData.title,
         thumbnail: newCourseData.thumbnail || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800',
         status: 'Draft',
         studentsCount: 0,
         chapters: []
      };

      setCourses([newCourse, ...courses]);
      setNewCourseData({ title: '', thumbnail: '' });
      setIsCreateCourseModalOpen(false);
   };

   // --- COMPUTED ---
   const filteredCourses = courses.filter(c => c.title.toLowerCase().includes(searchTerm.toLowerCase()));
   return (
      <div className="p-4 lg:p-8 mx-auto min-h-[calc(100vh-72px)] bg-[#F5F7FA] relative">

         {/* Header & Toolbar */}
         <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
               <h1 className="text-2xl lg:text-3xl font-bold text-[#1F2937]">Khóa học của tôi</h1>
               <p className="text-gray-500 mt-2 text-sm lg:text-base">Quản lý nội dung, bài giảng và bài tập của các khóa học bạn giảng dạy.</p>
            </div>
            <div className="flex items-center gap-3">
               <div className="relative group">
                  <input
                     type="text"
                     placeholder="Tìm kiếm khóa học..."
                     value={searchTerm}
                     onChange={(e) => setSearchTerm(e.target.value)}
                     className="w-full md:w-64 pl-10 pr-4 py-2.5 bg-white border border-[#E5E7EB] rounded-xl text-sm focus:outline-none focus:border-[#E5664B] focus:ring-2 focus:ring-[#E5664B]/20 transition-all"
                  />
                  <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-[#E5664B]" />
               </div>
               <button 
                  onClick={() => setIsCreateCourseModalOpen(true)}
                  className="bg-[#E5664B] hover:bg-[#d6553a] text-white font-medium py-2.5 px-4 rounded-xl text-sm transition-all shadow-sm hover:shadow-md flex items-center gap-2 whitespace-nowrap"
               >
                  <Plus size={18} /> Tạo khóa học
               </button>
            </div>
         </div>

         {/* Course Table */}
         <div className="bg-white rounded-[20px] shadow-sm border border-[#E5E7EB] overflow-hidden">
            <div className="overflow-x-auto">
               <table className="w-full text-left border-collapse">
                  <thead>
                     <tr className="bg-gray-50/50 border-b border-[#E5E7EB]">
                        <th className="px-6 py-4 text-sm font-bold text-gray-700 whitespace-nowrap">Khóa học</th>
                        <th className="px-6 py-4 text-sm font-bold text-gray-700 whitespace-nowrap">Trạng thái</th>
                        <th className="px-6 py-4 text-sm font-bold text-gray-700 whitespace-nowrap">Học viên</th>
                        <th className="px-6 py-4 text-sm font-bold text-gray-700 whitespace-nowrap">Nội dung</th>
                        <th className="px-6 py-4 text-sm font-bold text-gray-700 whitespace-nowrap text-right">Thao tác</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E5E7EB]">
                     {filteredCourses.map(course => {
                        const totalLessons = course.chapters.reduce((acc, ch) => acc + ch.lessons.length, 0);
                        return (
                           <tr key={course.id} className="hover:bg-gray-50/50 transition-colors group">
                              {/* Cột 1: Thông tin khóa học */}
                              <td className="px-6 py-4">
                                 <div className="flex items-center gap-4">
                                    <div className="w-24 h-16 rounded-lg overflow-hidden flex-shrink-0 border border-gray-100">
                                       <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover" />
                                    </div>
                                    <div className="max-w-[250px]">
                                       <h3 className="font-bold text-[#1F2937] text-base mb-1 line-clamp-2 group-hover:text-[#E5664B] transition-colors">
                                          {course.title}
                                       </h3>
                                    </div>
                                 </div>
                              </td>

                              {/* Cột 2: Trạng thái */}
                              <td className="px-6 py-4">
                                 <span className={`inline-flex px-3 py-1 rounded-full text-xs font-bold ${
                                    course.status === 'Published' 
                                       ? 'bg-emerald-100 text-emerald-700' 
                                       : 'bg-gray-100 text-gray-700'
                                 }`}>
                                    {course.status === 'Published' ? 'Đã xuất bản' : 'Bản nháp'}
                                 </span>
                              </td>

                              {/* Cột 3: Học viên */}
                              <td className="px-6 py-4 text-sm text-gray-600 font-medium">
                                 {course.studentsCount.toLocaleString('vi-VN')}
                              </td>

                              {/* Cột 4: Nội dung */}
                              <td className="px-6 py-4">
                                 <div className="flex flex-col gap-1 text-sm text-gray-600">
                                    <span className="flex items-center gap-1.5"><FileText size={16} className="text-gray-400" /> {course.chapters.length} Chương</span>
                                    <span className="flex items-center gap-1.5"><BookOpen size={16} className="text-gray-400" /> {totalLessons} Bài học</span>
                                 </div>
                              </td>

                              {/* Cột 5: Thao tác */}
                              <td className="px-6 py-4 text-right">
                                 <div className="flex items-center justify-end gap-2">
                                    <button 
                                       onClick={() => navigate(`/instructor/courses/${course.id}`)}
                                       className="bg-orange-50 hover:bg-[#E5664B] text-[#E5664B] hover:text-white font-bold py-2 px-3 rounded-lg text-sm transition-all border border-orange-100 hover:border-transparent flex items-center gap-2"
                                    >
                                       <List size={16} /> Chi tiết
                                    </button>
                                    <button className="p-2 text-gray-500 hover:text-[#1F2937] hover:bg-gray-100 rounded-lg transition-colors border border-[#E5E7EB]">
                                       <Settings size={18} />
                                    </button>
                                 </div>
                              </td>
                           </tr>
                        );
                     })}
                  </tbody>
               </table>
               {filteredCourses.length === 0 && (
                  <div className="p-8 text-center text-gray-500">
                     Không tìm thấy khóa học nào.
                  </div>
               )}
            </div>
         </div>

         {/* Modal Tạo khóa học */}
         {isCreateCourseModalOpen && (
            <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
               <div className="bg-white rounded-3xl p-6 w-full max-w-md shadow-2xl animate-in fade-in zoom-in-95 duration-200">
                  <div className="flex justify-between items-center mb-6">
                     <h2 className="text-xl font-bold text-gray-800">Tạo khóa học mới</h2>
                     <button onClick={() => setIsCreateCourseModalOpen(false)} className="p-2 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-600 transition-colors"><X size={18} /></button>
                  </div>
                  <form onSubmit={handleCreateCourse} className="space-y-5">
                     <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Tên khóa học</label>
                        <input
                           type="text"
                           autoFocus
                           placeholder="Ví dụ: ReactJS Cơ bản..."
                           value={newCourseData.title}
                           onChange={(e) => setNewCourseData({ ...newCourseData, title: e.target.value })}
                           className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#E5664B] focus:ring-2 focus:ring-[#E5664B]/20 transition-all font-medium"
                        />
                     </div>
                     <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Ảnh bìa (URL) - Tuỳ chọn</label>
                        <input
                           type="url"
                           placeholder="https://..."
                           value={newCourseData.thumbnail}
                           onChange={(e) => setNewCourseData({ ...newCourseData, thumbnail: e.target.value })}
                           className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#E5664B] focus:ring-2 focus:ring-[#E5664B]/20 transition-all text-sm"
                        />
                     </div>

                     <div className="flex gap-3 pt-4">
                        <button type="button" onClick={() => setIsCreateCourseModalOpen(false)} className="flex-1 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-xl transition-colors">Hủy</button>
                        <button type="submit" disabled={!newCourseData.title.trim()} className="flex-1 py-3 bg-[#E5664B] hover:bg-[#d6553a] text-white font-bold rounded-xl transition-colors disabled:opacity-50">Tạo Khóa Học</button>
                     </div>
                  </form>
               </div>
            </div>
         )}
      </div>
   );
};

export default InstructorCoursesPage;
