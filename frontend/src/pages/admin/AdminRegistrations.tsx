import React, { useState, useEffect } from 'react';
import { Edit, Trash2, Mail, Phone, Calendar, Search } from 'lucide-react';
import { registrationApi, Registration } from '../../services/api';

const AdminRegistrations: React.FC = () => {
    const [registrations, setRegistrations] = useState<Registration[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [total, setTotal] = useState(0);
    const LIMIT = 10;

    useEffect(() => {
        fetchRegistrations(currentPage);
    }, [currentPage]);

    const fetchRegistrations = async (page: number) => {
        setIsLoading(true);
        try {
            const result = await registrationApi.getAllRegistrations(page, LIMIT);
            setRegistrations(result.data);
            setTotalPages(result.totalPages);
            setTotal(result.total);
        } catch (error) {
            console.error('Lỗi API:', error);
        } finally {
            setIsLoading(false);
        }
    };

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
            case 'confirmed':
                return <span className="status-badge status-paid">Đã chốt</span>;
            default:
                return <span className="status-badge" style={{ background: '#f1f5f9', color: '#475569' }}>Đã hủy</span>;
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
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px', borderTop: '1px solid var(--admin-border)' }}>
                    <span style={{ fontSize: '0.85rem', color: '#64748b' }}>
                        Tổng {total} đơn đăng ký
                    </span>
                    <div style={{ display: 'flex', gap: '6px' }}>
                        <button
                            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                            disabled={currentPage === 1}
                            style={{ padding: '6px 12px', border: '1px solid var(--admin-border)', borderRadius: '6px', background: currentPage === 1 ? '#f1f5f9' : '#fff', cursor: currentPage === 1 ? 'not-allowed' : 'pointer' }}
                        >
                            ← Trước
                        </button>

                        {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                            <button
                                key={page}
                                onClick={() => setCurrentPage(page)}
                                style={{ padding: '6px 12px', border: '1px solid var(--admin-border)', borderRadius: '6px', background: currentPage === page ? 'var(--admin-primary)' : '#fff', color: currentPage === page ? '#fff' : 'inherit', cursor: 'pointer' }}
                            >
                                {page}
                            </button>
                        ))}

                        <button
                            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                            disabled={currentPage === totalPages}
                            style={{ padding: '6px 12px', border: '1px solid var(--admin-border)', borderRadius: '6px', background: currentPage === totalPages ? '#f1f5f9' : '#fff', cursor: currentPage === totalPages ? 'not-allowed' : 'pointer' }}
                        >
                            Tiếp →
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminRegistrations;
