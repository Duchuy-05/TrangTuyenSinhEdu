import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Eye, X } from 'lucide-react';
import { courseApi, teacherApi, Course, Teacher } from '../../services/api';

const AdminCourses: React.FC = () => {
    const [courses, setCourses] = useState<Course[]>([]);
    const [teachers, setTeachers] = useState<Teacher[]>([]); // Dùng để chọn GV
    const [isLoading, setIsLoading] = useState(true);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState<any>({
        title: '', category: '', target: '', shortDesc: '',
        price: '', format: 'online', duration: '', status: 'published', teacherId: '', imageUrl: ''
    });

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const [courseData, teacherData] = await Promise.all([
                courseApi.getAllCourses(),
                teacherApi.getAllTeachers()
            ]);
            setCourses(courseData);
            setTeachers(teacherData);
        } catch (error) { console.error("Lỗi:", error); }
        finally { setIsLoading(false); }
    };

    useEffect(() => { fetchData(); }, []);

    const handleAdd = () => {
        setIsEditing(false);
        setFormData({ title: '', category: '', target: '', shortDesc: '', price: '', format: 'online', duration: '', status: 'published', teacherId: '', imageUrl: '' });
        setIsModalOpen(true);
    };

    const handleEdit = (course: Course) => {
        setIsEditing(true);
        // Ánh xạ id giảng viên để hiển thị lên the select
        setFormData({ ...course, teacherId: course.teacher?.id || '' });
        setIsModalOpen(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (isEditing && formData.id) {
                await courseApi.updateCourse(formData.id, formData);
                alert("Cập nhật thành công!");
            } else {
                await courseApi.createCourse(formData);
                alert("Thêm mới thành công!");
            }
            setIsModalOpen(false);
            fetchData();
        } catch (error) { alert("Có lỗi xảy ra!"); }
    };

    const handleDelete = async (id: number) => {
        if (window.confirm("Bạn có chắc chắn muốn xóa khóa học này? Hành động này không thể hoàn tác.")) {
            try {
                await courseApi.deleteCourse(id);
                alert("Xóa thành công!");
                fetchData();
            } catch (error) { alert("Không thể xóa khóa học này!"); }
        }
    };

    return (
        <div>
            <div className="page-header-actions">
                <h2 className="admin-page-title">Quản lý Khóa học</h2>
                <button className="btn btn-icon btn-add" onClick={handleAdd}>
                    <Plus size={18} /> Thêm Khóa học
                </button>
            </div>

            <div className="table-card">
                <table className="admin-table">
                    <thead>
                        <tr><th>ID</th><th>Khóa học</th><th>Giảng viên</th><th>Học phí</th><th>Trạng thái</th><th>Thao tác</th></tr>
                    </thead>
                    <tbody>
                        {isLoading ? <tr><td colSpan={6} style={{ textAlign: 'center' }}>Đang tải...</td></tr> :
                            courses.map(course => (
                                <tr key={course.id}>
                                    <td>#{course.id}</td>
                                    <td>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                            <img src={course.imageUrl || "https://via.placeholder.com/40"} alt="" className="table-img" />
                                            <div>
                                                <strong>{course.title}</strong>
                                                <div style={{ fontSize: '0.85rem', color: '#64748b' }}>{course.target}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>{course.teacher?.fullName || 'Chưa phân công'}</td>
                                    <td style={{ fontWeight: '600', color: 'var(--admin-primary)' }}>{course.price}</td>
                                    <td>
                                        {course.status === 'published' ? <span className="status-badge status-paid">Hiển thị</span> : <span className="status-badge" style={{ background: '#f1f5f9', color: '#475569' }}>Đang ẩn</span>}
                                    </td>
                                    <td>
                                        <div className="action-buttons">
                                            <button className="btn-edit" onClick={() => handleEdit(course)}><Edit size={16} /></button>
                                            <button className="btn-delete" onClick={() => handleDelete(course.id)}><Trash2 size={16} /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>

            {/* POPUP MODAL KHÓA HỌC */}
            {isModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content" style={{ width: '650px' }}>
                        <div className="modal-header">
                            <h3>{isEditing ? 'Cập nhật Khóa học' : 'Thêm Khóa học mới'}</h3>
                            <button className="btn-close" onClick={() => setIsModalOpen(false)}><X size={24} /></button>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="modal-body">
                                <div className="admin-form-group">
                                    <label>Tên Khóa Học *</label>
                                    <input type="text" className="admin-form-control" required value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} />
                                </div>

                                <div style={{ display: 'flex', gap: '16px' }}>
                                    <div className="admin-form-group" style={{ flex: 1 }}>
                                        <label>Danh mục (Category)</label>
                                        <input type="text" className="admin-form-control" value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value })} />
                                    </div>
                                    <div className="admin-form-group" style={{ flex: 1 }}>
                                        <label>Học phí (VD: 2.500.000 VNĐ)</label>
                                        <input type="text" className="admin-form-control" value={formData.price} onChange={e => setFormData({ ...formData, price: e.target.value })} />
                                    </div>
                                </div>

                                <div style={{ display: 'flex', gap: '16px' }}>
                                    <div className="admin-form-group" style={{ flex: 1 }}>
                                        <label>Chọn Giảng viên</label>
                                        <select className="admin-form-control" required value={formData.teacherId} onChange={e => setFormData({ ...formData, teacherId: e.target.value })}>
                                            <option value="">-- Chọn giảng viên --</option>
                                            {teachers.map(t => <option key={t.id} value={t.id}>{t.fullName}</option>)}
                                        </select>
                                    </div>
                                    <div className="admin-form-group" style={{ flex: 1 }}>
                                        <label>Trạng thái</label>
                                        <select className="admin-form-control" value={formData.status} onChange={e => setFormData({ ...formData, status: e.target.value })}>
                                            <option value="published">Hiển thị (Published)</option>
                                            <option value="hidden">Đang ẩn (Hidden)</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="admin-form-group">
                                    <label>Mô tả ngắn</label>
                                    <textarea className="admin-form-control" rows={2} value={formData.short_desc} onChange={e => setFormData({ ...formData, short_desc: e.target.value })}></textarea>
                                </div>
                                <div className="admin-form-group">
                                    <label>Link Ảnh Khóa học (URL)</label>
                                    <input type="text" className="admin-form-control" value={formData.image_url} onChange={e => setFormData({ ...formData, image_url: e.target.value })} />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-outline" style={{ borderColor: '#cbd5e1', color: '#475569' }} onClick={() => setIsModalOpen(false)}>Hủy</button>
                                <button type="submit" className="btn btn-primary">{isEditing ? 'Lưu thay đổi' : 'Thêm mới'}</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminCourses;