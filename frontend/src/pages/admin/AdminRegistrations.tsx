import React, { useState, useEffect } from 'react';
import { Edit, Trash2, Mail, Phone, Calendar, Search } from 'lucide-react';
import { registrationApi, Registration } from '../../services/api';

const AdminRegistrations: React.FC = () => {
    const [registrations, setRegistrations] = useState<Registration[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchRegistrations = async () => {
            try {
                const data = await registrationApi.getAllRegistrations();
                setRegistrations(data);
                console.log(data);
            } catch (error) {
                console.error("Lỗi API:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchRegistrations();
    }, []);

    // Hàm phụ trợ: Format ngày tháng
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('vi-VN', {
            day: '2-digit', month: '2-digit', year: 'numeric',
            hour: '2-digit', minute: '2-digit'
        });
    };

    // Hàm phụ trợ: Hiển thị trạng thái
    const renderStatusBadge = (status: string) => {
        switch (status) {
            case 'pending':
                return <span className="status-badge" style={{ background: '#fef3c7', color: '#d97706' }}>Chờ xử lý</span>;
            case 'contacted':
                return <span className="status-badge" style={{ background: '#e0f2fe', color: '#0284c7' }}>Đã tư vấn</span>;
            case 'paid':
                return <span className="status-badge status-paid">Đã thanh toán</span>;
            default:
                return <span className="status-badge" style={{ background: '#f1f5f9', color: '#475569' }}>{status}</span>;
        }
    };

    return (
        <div>
            <div className="page-header-actions">
                <h2 className="admin-page-title">Quản lý Đơn đăng ký & Liên hệ</h2>

                {/* Bộ lọc / Tìm kiếm */}
                <div style={{ display: 'flex', gap: '10px' }}>
                    <div className="header-search" style={{ position: 'relative' }}>
                        <Search size={18} style={{ position: 'absolute', left: '10px', top: '10px', color: '#94a3b8' }} />
                        <input type="text" placeholder="Tìm tên, SĐT..." style={{ paddingLeft: '35px' }} />
                    </div>
                    <select style={{ padding: '8px 16px', border: '1px solid var(--admin-border)', borderRadius: '6px', outline: 'none' }}>
                        <option value="all">Tất cả trạng thái</option>
                        <option value="pending">Chờ xử lý</option>
                        <option value="paid">Đã thanh toán</option>
                    </select>
                </div>
            </div>

            <div className="table-card">
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Thông tin khách hàng</th>
                            <th>Khóa học quan tâm</th>
                            <th>Ngày đăng ký</th>
                            <th>Trạng thái</th>
                            <th>Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        {isLoading ? (
                            <tr><td colSpan={6} style={{ textAlign: 'center' }}>Đang tải dữ liệu...</td></tr>
                        ) : registrations.length === 0 ? (
                            <tr><td colSpan={6} style={{ textAlign: 'center' }}>Chưa có đơn đăng ký nào.</td></tr>
                        ) : (
                            registrations.map((reg) => (
                                <tr key={reg.id}>
                                    <td>#{reg.id}</td>

                                    {/* Cột thông tin khách hàng */}
                                    <td>
                                        <div style={{ fontWeight: '600', color: '#0f172a', marginBottom: '4px' }}>
                                            {reg.contactName}
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.85rem', color: '#64748b' }}>
                                            <Phone size={14} /> {reg.contactPhone}
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.85rem', color: '#64748b', marginTop: '2px' }}>
                                            <Mail size={14} /> {reg.contactEmail}
                                        </div>
                                    </td>

                                    {/* Cột thông tin Khóa học */}
                                    <td>
                                        <div style={{ fontWeight: '500', color: 'var(--admin-primary)' }}>
                                            {reg.course.title}
                                        </div>
                                        {reg.note && (
                                            <div style={{ fontSize: '0.85rem', color: '#64748b', marginTop: '4px', fontStyle: 'italic' }}>
                                                " {reg.note} "
                                            </div>
                                        )}
                                    </td>

                                    {/* Cột thời gian */}
                                    <td>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#475569' }}>
                                            <Calendar size={16} /> {formatDate(reg.registeredAt)}
                                        </div>
                                    </td>

                                    {/* Cột Trạng thái */}
                                    <td>
                                        {renderStatusBadge(reg.status)}
                                    </td>

                                    {/* Cột thao tác */}
                                    <td>
                                        <div className="action-buttons">
                                            <button className="btn-edit" title="Cập nhật trạng thái"><Edit size={16} /></button>
                                            <button className="btn-delete" title="Xóa đơn"><Trash2 size={16} /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminRegistrations;
