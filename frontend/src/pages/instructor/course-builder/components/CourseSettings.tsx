import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { instructorCourseApi } from '../../../../services/api'; 
import { useCourseStore } from '../store/useCourseStore'; 

export default function CourseSettings() {
  const navigate = useNavigate();
  const params = useParams<any>();
  
  const courseId = params.id || params.courseId;

  const [formData, setFormData] = useState({
    title: '',
    short_desc: '',
    target: '',
    image_url: '',
    format: '',
    price: 0
  });

  // 1. Tự động lấy dữ liệu cũ lên Form Chỉnh Sửa bằng ID Số
  useEffect(() => {
    const fetchCourseData = async () => {
      if (courseId) {
        try {
          // backend hiện tại đã chấp nhận tìm theo ID số
          const response = await instructorCourseApi.getDraft(courseId);
          const course = response?.data || response;
          
          if (course) {
            setFormData({
              title: course.title || '',
              short_desc: course.shortDesc || course.short_desc || '',
              target: course.target || '',
              image_url: course.imageUrl || course.image_url || '',
              format: course.format || 'online',
              price: Number(course.price) || 0
            });
          }
        } catch (error) {
          console.error("Lỗi khi tải dữ liệu khóa học:", error);
        }
      }
    };
    fetchCourseData();
  }, [courseId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: name === 'price' ? Number(value) : value }));
  };

  // 2. Xử lý lưu thông tin & cập nhật lập tức lên CourseCard ngoài danh sách
  const handleSave = async () => {
    if (!courseId) {
      alert("Không tìm thấy ID số của khóa học để thực hiện lưu!");
      return;
    }

    try {
      // Gọi API PUT cập nhật lên DB Backend
      await instructorCourseApi.updateDraft(courseId, formData);
      
      // ĐỒNG BỘ DỮ LIỆU LÊN UI (COURSE CARD):
      useCourseStore.setState((state: any) => ({
        courseDetails: {
          ...state.courseDetails,
          title: formData.title,
          price: formData.price,
          description: formData.short_desc,
          thumbnail: formData.image_url
        }
      }));

      alert("Đã cập nhật thông tin khóa học thành công!");
      
      // Quay trở lại màn hình quản lý khóa học của giảng viên
      navigate('/instructor/courses');
      
    } catch (error) {
      console.error("Lỗi hệ thống khi lưu cài đặt:", error);
      alert("Không thể lưu thông tin. Vui lòng thử lại!");
    }
  };

  return (
    <div className="flex flex-col h-full bg-white border-l border-blue-100">
      <div className="p-4 border-b border-gray-200">
        <h3 className="text-lg font-bold text-blue-900">Thiết lập khóa học</h3>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-5">
        <div>
          <label className="block mb-2 text-sm font-bold text-slate-600">Tên khóa học</label>
          <input 
            type="text" name="title" value={formData.title} onChange={handleChange}
            className="w-full p-2 text-sm border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-orange-500 transition-all" 
          />
        </div>

        <div>
          <label className="block mb-2 text-sm font-bold text-slate-600">Mô tả ngắn</label>
          <textarea 
            name="short_desc" value={formData.short_desc} onChange={handleChange} rows={1}
            className="w-full p-2 text-sm border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-orange-500 transition-all" 
          />
        </div>

        <div>
          <label className="block mb-2 text-sm font-bold text-slate-600">URL Hình ảnh bìa</label>
          <input 
            type="text" name="image_url" value={formData.image_url} onChange={handleChange}
            className="w-full p-2 text-sm border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-orange-500 transition-all" 
          />
        </div>

        <div>
          <label className="block mb-2 text-sm font-bold text-slate-600">Mục tiêu khóa học</label>
          <textarea 
            name="target" value={formData.target} onChange={handleChange} rows={1}
            className="w-full p-2 text-sm border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-orange-500 transition-all" 
          />
        </div>

        <div>
          <label className="block mb-2 text-sm font-bold text-slate-600">Định dạng học</label>
          <select 
            name="format" value={formData.format} onChange={handleChange}
            className="w-full p-2 text-sm border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-orange-500 transition-all"
          >
            <option value="online">Online</option>
            <option value="offline">Offline</option>
            <option value="hybrid">Hybrid</option>
          </select>
        </div>

        <div>
          <label className="block mb-1 text-sm font-bold text-slate-600">Giá (VNĐ)</label>
          <input
            type="number" name="price" value={formData.price} onChange={handleChange}
            className="w-full p-2.5 text-sm border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-orange-500 transition-all"
          />
        </div>
      </div>

      <div className="p-4 border-t border-gray-200 bg-gray-50">
        <button 
          onClick={handleSave} 
          className="w-full bg-[#E5664B] hover:bg-[#d4553b] text-white font-bold py-3 px-4 rounded-xl transition-colors shadow-sm cursor-pointer"
        >
          Lưu thông tin
        </button>
      </div>
    </div>
  );
}