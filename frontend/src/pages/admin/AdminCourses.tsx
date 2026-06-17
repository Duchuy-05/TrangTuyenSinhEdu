import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, X, UploadCloud, Loader2, ArrowRight, ArrowLeft, Check } from 'lucide-react';
import { courseApi, teacherApi, uploadApi, Course, Teacher } from '../../services/api';

const AdminCourses: React.FC = () => {
    const [courses, setCourses] = useState<Course[]>([]);
    const [teachers, setTeachers] = useState<Teacher[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [isUploading, setIsUploading] = useState(false);

    const [step, setStep] = useState<1 | 2>(1);

    const [formData, setFormData] = useState<any>({
        id: null, // Lưu ID sau khi tạo thành công ở Bước 1
        teacherId: '', category: '', title: '', shortDesc: '', target: '',
        imageUrl: '', duration: '', format: 'online', price: '', status: 'published',
        syllabus: []
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
        } catch (error) {
            console.error("Lỗi:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => { fetchData(); }, []);

    const handleAdd = () => {
        setIsEditing(false);
        setStep(1); // Luôn bắt đầu từ bước 1
        setFormData({
            id: null, teacherId: '', category: '', title: '', shortDesc: '', target: '',
            imageUrl: '', duration: '', format: 'online', price: '', status: 'published',
            syllabus: []
        });
        setIsModalOpen(true);
    };

    const handleEdit = (course: any) => {
        setIsEditing(true);
        setStep(1); // Cho phép xem lại thông tin cơ bản trước
        setFormData({
            ...course,
            teacherId: course.teacher?.id || course.teacherId || '',
            syllabus: course.syllabus || []
        });
        setIsModalOpen(true);
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        try {
            setIsUploading(true);
            const uploadedUrl = await uploadApi.uploadImage(file);
            setFormData((prev: any) => ({ ...prev, imageUrl: uploadedUrl }));
        } catch (error) {
            alert("Tải ảnh lên thất bại!");
        } finally {
            setIsUploading(false);
        }
    };

    // --- XỬ LÝ LỘ TRÌNH (STEP 2) ---
    const handleAddSyllabus = () => {
        setFormData((prev: any) => ({
            ...prev,
            syllabus: [...prev.syllabus, { title: '', description: '', orderIndex: prev.syllabus.length + 1 }]
        }));
    };

    const handleRemoveSyllabus = (indexToRemove: number) => {
        setFormData((prev: any) => ({
            ...prev,
            syllabus: prev.syllabus.filter((_: any, idx: number) => idx !== indexToRemove)
        }));
    };

    const handleSyllabusChange = (index: number, field: string, value: string) => {
        setFormData((prev: any) => {
            const newSyllabus = [...prev.syllabus];
            newSyllabus[index] = { ...newSyllabus[index], [field]: value };
            return { ...prev, syllabus: newSyllabus };
        });
    };

    const handleNextStep = async (e: React.FormEvent) => {
        e.preventDefault(); // Ngăn load lại trang, kích hoạt HTML5 Validation

        try {
            const courseInfo = {
                teacherId: formData.teacherId,
                category: formData.category,
                title: formData.title,
                shortDesc: formData.shortDesc,
                target: formData.target,
                imageUrl: formData.imageUrl,
                duration: formData.duration,
                format: formData.format,
                price: formData.price,
                status: formData.status
            };

            if (isEditing && formData.id) {
                await courseApi.updateCourse(formData.id, courseInfo);
                setStep(2);
            } else {
                const response = await courseApi.createCourse(courseInfo);
                const newCourseId = response.data.data?.id ?? response.data?.id

                setFormData((prev: any) => ({ ...prev, id: newCourseId }));
                setStep(2); // Thành công dữ liệu hợp lệ -> Chuyển sang Bước 2 nhập Lộ trình
            }
        } catch (error) {
            alert("Không thể lưu thông tin khóa học cơ bản. Vui lòng kiểm tra lại!");
        }
    };

    // Khi bấm "Hoàn tất & Lưu lộ trình" ở Bước 2
    const handleSaveSyllabus = async () => {
        try {
            // 1. Chuẩn bị dữ liệu gửi lên
            const payload = {
                syllabus: formData.syllabus.map((item: any, idx: number) => ({
                    title: item.title,
                    description: item.description,
                    orderIndex: idx + 1 // Tự động đánh số thứ tự từ 1
                }))
            };

            // 2. Gọi thẳng vào API cập nhật Syllabus vừa tạo
            // (formData.id lúc này đã có sẵn vì đã tạo/chọn khóa học ở Bước 1)
            if (isEditing) {
                await courseApi.updateCourseSyllabus(formData.id, payload);
            } else {
                await courseApi.createCourseSyllabus(formData.id, payload);
            }

            alert(isEditing ? "Cập nhật khóa học và lộ trình thành công!" : "Thêm khóa học và lộ trình thành công!");

            setIsModalOpen(false); // Đóng form
            fetchData(); // Reset lại bảng
        } catch (error) {
            alert("Lỗi khi lưu lộ trình học!");
            console.error(error);
        }
    };

    const handleDelete = async (id: number) => {
        if (window.confirm("Bạn có chắc chắn muốn xóa khóa học này?")) {
            try {
                await courseApi.deleteCourse(id);
                alert("Xóa thành công!");
                fetchData();
            } catch (error) {
                alert("Không thể xóa khóa học này!");
            }
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
                {/* Bảng danh sách khóa học */}
                <table className="admin-table">
                    <thead>
                        <tr><th>ID</th><th>Khóa học</th><th>Giảng viên</th><th>Học phí</th><th>Trạng thái</th><th>Thao tác</th></tr>
                    </thead>
                    <tbody>
                        {isLoading ? <tr><td colSpan={6} style={{ textAlign: 'center' }}>Đang tải...</td></tr> :
                            courses.map((course: any) => (
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
                                    <td>{course.teacher?.fullName || course.teacher?.full_name || 'Chưa phân công'}</td>
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

            {/* POPUP MODAL MULTI-STEP WIZARD */}
            {isModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content" style={{ width: '700px' }}>
                        <div className="modal-header">
                            <h3>{isEditing ? 'Cập nhật Khóa học' : 'Thêm Khóa học mới'}</h3>
                            <button className="btn-close" type="button" onClick={() => setIsModalOpen(false)}><X size={24} /></button>
                        </div>

                        {/* Thanh hiển thị tiến trình các bước nhập liệu */}
                        <div style={{ display: 'flex', gap: '15px', padding: '15px 24px 0 24px', fontSize: '0.9rem', borderBottom: '1px solid #f1f5f9', paddingBottom: '10px' }}>
                            <span style={{ fontWeight: step === 1 ? 'bold' : 'normal', color: step === 1 ? 'var(--admin-primary)' : '#64748b' }}>
                                1. Thông tin cơ bản {step === 2 && '✓'}
                            </span>
                            <span style={{ color: '#cbd5e1' }}>➔</span>
                            <span style={{ fontWeight: step === 2 ? 'bold' : 'normal', color: step === 2 ? 'var(--admin-primary)' : '#64748b' }}>
                                2. Lộ trình học (Syllabus)
                            </span>
                        </div>

                        {/* BƯỚC 1: FORM THÔNG TIN CƠ BẢN */}
                        {step === 1 && (
                            <form onSubmit={handleNextStep}>
                                <div className="modal-body">
                                    <div className="admin-form-group">
                                        <label>Tên Khóa Học *</label>
                                        <input type="text" className="admin-form-control" required value={formData.title} onChange={e => setFormData((prev: any) => ({ ...prev, title: e.target.value }))} />
                                    </div>

                                    <div style={{ display: 'flex', gap: '16px' }}>
                                        <div className="admin-form-group" style={{ flex: 1 }}>
                                            <label>Danh mục (Category) *</label>
                                            <input type="text" className="admin-form-control" required placeholder="VD: Web Development" value={formData.category} onChange={e => setFormData((prev: any) => ({ ...prev, category: e.target.value }))} />
                                        </div>
                                        <div className="admin-form-group" style={{ flex: 1 }}>
                                            <label>Đối tượng (Target)</label>
                                            <input type="text" className="admin-form-control" placeholder="VD: Sinh viên, Người đi làm..." value={formData.target} onChange={e => setFormData((prev: any) => ({ ...prev, target: e.target.value }))} />
                                        </div>
                                    </div>

                                    <div style={{ display: 'flex', gap: '16px' }}>
                                        <div className="admin-form-group" style={{ flex: 1 }}>
                                            <label>Thời lượng</label>
                                            <input type="text" className="admin-form-control" value={formData.duration} onChange={e => setFormData((prev: any) => ({ ...prev, duration: e.target.value }))} />
                                        </div>
                                        <div className="admin-form-group" style={{ flex: 1 }}>
                                            <label>Hình thức</label>
                                            <select className="admin-form-control" value={formData.format} onChange={e => setFormData((prev: any) => ({ ...prev, format: e.target.value }))}>
                                                <option value="online">Online</option>
                                                <option value="offline">Offline</option>
                                                <option value="hybrid">Hybrid</option>
                                            </select>
                                        </div>
                                        <div className="admin-form-group" style={{ flex: 1 }}>
                                            <label>Học phí *</label>
                                            <input type="text" className="admin-form-control" required placeholder="VD: 2500000" value={formData.price} onChange={e => setFormData((prev: any) => ({ ...prev, price: e.target.value }))} />
                                        </div>
                                    </div>

                                    <div style={{ display: 'flex', gap: '16px' }}>
                                        <div className="admin-form-group" style={{ flex: 1 }}>
                                            <label>Chọn Giảng viên *</label>
                                            <select className="admin-form-control" required value={formData.teacherId} onChange={e => setFormData((prev: any) => ({ ...prev, teacherId: e.target.value }))}>
                                                <option value="">-- Chọn giảng viên --</option>
                                                {teachers.map((t: any) => <option key={t.id} value={t.id}>{t.fullName || t.full_name}</option>)}
                                            </select>
                                        </div>
                                        <div className="admin-form-group" style={{ flex: 1 }}>
                                            <label>Trạng thái</label>
                                            <select className="admin-form-control" value={formData.status} onChange={e => setFormData((prev: any) => ({ ...prev, status: e.target.value }))}>
                                                <option value="published">Hiển thị (Published)</option>
                                                <option value="hidden">Đang ẩn (Hidden)</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="admin-form-group">
                                        <label>Mô tả ngắn</label>
                                        <textarea className="admin-form-control" rows={2} value={formData.shortDesc} onChange={e => setFormData((prev: any) => ({ ...prev, shortDesc: e.target.value }))}></textarea>
                                    </div>

                                    <div className="admin-form-group">
                                        <label>Ảnh Khóa Học</label>
                                        <div className="image-upload-wrapper">
                                            <input type="file" accept="image/*" className="image-upload-input" onChange={handleImageUpload} disabled={isUploading} />
                                            {isUploading ? (
                                                <div className="upload-loading"><Loader2 size={32} className="spin-anim" /><span>Đang tải...</span></div>
                                            ) : formData.imageUrl ? (
                                                <img src={formData.imageUrl} alt="Preview" className="image-upload-preview" />
                                            ) : (
                                                <div className="image-upload-placeholder"><UploadCloud size={32} /><span>Click hoặc kéo thả ảnh</span></div>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="modal-footer">
                                    <button type="button" className="btn btn-outline" style={{ borderColor: '#cbd5e1', color: '#475569', padding: '8px 16px', borderRadius: '6px', background: 'white' }} onClick={() => setIsModalOpen(false)}>Hủy</button>
                                    <button type="submit" className="btn btn-primary" style={{ padding: '8px 16px', borderRadius: '6px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        Tiếp theo <ArrowRight size={16} />
                                    </button>
                                </div>
                            </form>
                        )}

                        {/* BƯỚC 2: GIAO DIỆN NHẬP LỘ TRÌNH (SYLLABUS) */}
                        {step === 2 && (
                            <div style={{ display: 'flex', flexDirection: 'column', flex: 1, overflow: 'hidden' }}>
                                <div className="modal-body">
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                                        <div>
                                            <h4 style={{ margin: 0, color: 'var(--admin-primary)', fontSize: '1.05rem' }}>Lộ trình khóa học (Syllabus)</h4>
                                            <p style={{ margin: '4px 0 0 0', fontSize: '0.8rem', color: '#64748b' }}>Khóa học ID: #{formData.id} đã được khởi tạo</p>
                                        </div>
                                        <button type="button" onClick={handleAddSyllabus} style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '6px 12px', borderRadius: '6px', border: '1px solid var(--admin-primary)', color: 'var(--admin-primary)', background: '#eff6ff', cursor: 'pointer', fontWeight: 500 }}>
                                            <Plus size={16} /> Thêm bài học
                                        </button>
                                    </div>

                                    {formData.syllabus.length === 0 ? (
                                        <div style={{ textAlign: 'center', padding: '40px 20px', background: '#f8fafc', borderRadius: '8px', color: '#64748b', border: '1px dashed #cbd5e1' }}>
                                            Chưa có lộ trình nào. Hãy bấm "Thêm bài học" để cập nhật giáo trình môn học!
                                        </div>
                                    ) : (
                                        formData.syllabus.map((item: any, index: number) => (
                                            <div key={index} style={{ backgroundColor: '#f8fafc', padding: '16px', borderRadius: '8px', marginBottom: '16px', border: '1px solid var(--admin-border)', position: 'relative' }}>
                                                <button type="button" onClick={() => handleRemoveSyllabus(index)} style={{ position: 'absolute', top: '15px', right: '15px', background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer' }}>
                                                    <Trash2 size={16} />
                                                </button>

                                                <div className="admin-form-group">
                                                    <label>Chương / Bài {index + 1}: Tiêu đề *</label>
                                                    <input type="text" className="admin-form-control" required placeholder="VD: Khởi tạo dự án và cấu hình biến" value={item.title} onChange={e => handleSyllabusChange(index, 'title', e.target.value)} />
                                                </div>
                                                <div className="admin-form-group" style={{ marginBottom: 0 }}>
                                                    <label>Nội dung chi tiết chương</label>
                                                    <textarea className="admin-form-control" rows={2} placeholder="Mô tả nội dung..." value={item.description} onChange={e => handleSyllabusChange(index, 'description', e.target.value)}></textarea>
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>

                                <div className="modal-footer" style={{ justifyContent: 'space-between' }}>
                                    {/* Nút quay lại bước 1 chỉnh sửa thông tin cũ nếu cần */}
                                    <button type="button" className="btn" style={{ borderColor: '#cbd5e1', color: '#475569', padding: '8px 16px', borderRadius: '6px', background: 'white', display: 'flex', alignItems: 'center', gap: '8px', border: '1px solid #cbd5e1' }} onClick={() => setStep(1)}>
                                        <ArrowLeft size={16} /> Sửa thông tin cơ bản
                                    </button>

                                    <button type="button" className="btn btn-primary" onClick={handleSaveSyllabus} style={{ padding: '8px 16px', borderRadius: '6px', display: 'flex', alignItems: 'center', gap: '8px', backgroundColor: '#16a34a' }}>
                                        <Check size={16} /> Hoàn tất & Lưu lộ trình
                                    </button>
                                </div>
                            </div>
                        )}

                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminCourses;