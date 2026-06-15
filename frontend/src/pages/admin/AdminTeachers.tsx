import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, X, Loader2, UploadCloud } from 'lucide-react';
import { teacherApi, uploadApi, Teacher } from '../../services/api';

const AdminTeachers: React.FC = () => {
    const [teachers, setTeachers] = useState<Teacher[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isUploading, setIsUploading] = useState(false);

    // Modal States
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState<Partial<Teacher>>({
        fullName: '', title: '', experience: '', company: '', bio: '', avatarUrl: ''
    });

    const fetchTeachers = async () => {
        setIsLoading(true);
        try {
            const data = await teacherApi.getAllTeachers();
            setTeachers(data);
        } catch (error) {
            console.error("Lỗi:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => { fetchTeachers(); }, []);

    // Mở Form Thêm Mới
    const handleAdd = () => {
        setIsEditing(false);
        setFormData({ fullName: '', title: '', experience: '', company: '', bio: '', avatarUrl: '' });
        setIsModalOpen(true);
    };

    // Mở Form Cập Nhật
    const handleEdit = (teacher: Teacher) => {
        setIsEditing(true);
        setFormData(teacher);
        setIsModalOpen(true);
    };

    // Lưu dữ liệu (Submit)
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (isEditing && formData.id) {
                await teacherApi.updateTeacher(formData.id, formData);
                alert("Cập nhật thành công!");
            } else {
                await teacherApi.createTeacher(formData);
                alert("Thêm mới thành công!");
            }
            setIsModalOpen(false);
            fetchTeachers(); // Tải lại danh sách
        } catch (error) {
            alert("Có lỗi xảy ra, vui lòng thử lại!");
        }
    };

    // Xóa dữ liệu
    const handleDelete = async (id: number) => {
        if (window.confirm("Bạn có chắc chắn muốn xóa giảng viên này không?")) {
            try {
                await teacherApi.deleteTeacher(id);
                alert("Đã xóa thành công!");
                fetchTeachers();
            } catch (error) {
                alert("Không thể xóa giảng viên này!");
            }
        }
    };

    // Hàm xử lý Upload File
    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        try {
            setIsUploading(true);
            const imageUrl = await uploadApi.uploadImage(file);
            setFormData({ ...formData, avatarUrl: imageUrl });
        } catch (error) {
            console.error("Lỗi upload:", error);
            alert("Tải ảnh lên thất bại. Vui lòng kiểm tra lại Backend!");
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <div>
            <div className="page-header-actions">
                <h2 className="admin-page-title">Quản lý Giảng viên</h2>
                <button className="btn btn-icon btn-add" onClick={handleAdd}>
                    <Plus size={18} /> Thêm Giảng viên
                </button>
            </div>

            <div className="table-card">
                <table className="admin-table">
                    <thead>
                        <tr><th>ID</th><th>Giảng viên</th><th>Chức danh & Công ty</th><th>Kinh nghiệm</th><th>Thao tác</th></tr>
                    </thead>
                    <tbody>
                        {isLoading ? <tr><td colSpan={5} style={{ textAlign: 'center' }}>Đang tải...</td></tr> :
                            teachers.map(teacher => (
                                <tr key={teacher.id}>
                                    <td>#{teacher.id}</td>
                                    <td>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                            <img src={teacher.avatarUrl || "https://via.placeholder.com/40"} alt="" className="table-img table-img-round" />
                                            <strong>{teacher.fullName}</strong>
                                        </div>
                                    </td>
                                    <td><div>{teacher.title}</div><div style={{ fontSize: '0.85rem', color: '#64748b' }}>{teacher.company}</div></td>
                                    <td>{teacher.experience}</td>
                                    <td>
                                        <div className="action-buttons">
                                            <button className="btn-edit" onClick={() => handleEdit(teacher)}><Edit size={16} /></button>
                                            <button className="btn-delete" onClick={() => handleDelete(teacher.id)}><Trash2 size={16} /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>

            {/* POPUP MODAL */}
            {isModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h3>{isEditing ? 'Cập nhật Giảng viên' : 'Thêm Giảng viên mới'}</h3>
                            <button className="btn-close" onClick={() => setIsModalOpen(false)}><X size={24} /></button>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="modal-body">
                                <div className="admin-form-group">
                                    <label>Họ và Tên *</label>
                                    <input type="text" className="admin-form-control" required value={formData.fullName} onChange={e => setFormData({ ...formData, fullName: e.target.value })} />
                                </div>
                                <div style={{ display: 'flex', gap: '16px' }}>
                                    <div className="admin-form-group" style={{ flex: 1 }}>
                                        <label>Chức danh (VD: Senior Developer)</label>
                                        <input type="text" className="admin-form-control" value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} />
                                    </div>
                                    <div className="admin-form-group" style={{ flex: 1 }}>
                                        <label>Công ty</label>
                                        <input type="text" className="admin-form-control" value={formData.company} onChange={e => setFormData({ ...formData, company: e.target.value })} />
                                    </div>
                                </div>
                                <div className="admin-form-group">
                                    <label>Số năm kinh nghiệm</label>
                                    <input type="text" className="admin-form-control" value={formData.experience} onChange={e => setFormData({ ...formData, experience: e.target.value })} />
                                </div>
                                <div className="admin-form-group">
                                    <label>Ảnh Avatar (Upload)</label>
                                    <div className="image-upload-wrapper">
                                        {/* Input File (bị ẩn đi để dùng làm vùng click/kéo thả) */}
                                        <input
                                            type="file"
                                            accept="image/*"
                                            className="image-upload-input"
                                            onChange={handleImageUpload}
                                            disabled={isUploading}
                                        />

                                        {/* Hiển thị Loading / Preview Ảnh / Placeholder */}
                                        {isUploading ? (
                                            <div className="upload-loading">
                                                <Loader2 size={32} className="spin-anim" />
                                                <span>Đang tải ảnh lên Cloudinary...</span>
                                            </div>
                                        ) : formData.avatarUrl ? (
                                            <img src={formData.avatarUrl} alt="Preview" className="image-upload-preview" />
                                        ) : (
                                            <div className="image-upload-placeholder">
                                                <UploadCloud size={32} />
                                                <span>Click hoặc kéo thả ảnh vào đây</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="admin-form-group">
                                    <label>Tiểu sử / Giới thiệu</label>
                                    <textarea className="admin-form-control" rows={3} value={formData.bio} onChange={e => setFormData({ ...formData, bio: e.target.value })}></textarea>
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

export default AdminTeachers;