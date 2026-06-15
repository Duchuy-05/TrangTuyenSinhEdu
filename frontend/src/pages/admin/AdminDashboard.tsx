import React from 'react';
import { Users, GraduationCap, DollarSign, Calendar } from 'lucide-react';

const AdminDashboard: React.FC = () => {
    return (
        <div>
            <h2 className="admin-page-title">Tổng quan hệ thống</h2>

            {/* 4 Thẻ Thống Kê */}
            <div className="stats-container">
                <div className="stat-card">
                    <div className="stat-icon"><Users size={24} /></div>
                    <div className="stat-info">
                        <h4>Tổng Học Viên</h4>
                        <div className="stat-value">1,248</div>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon"><GraduationCap size={24} /></div>
                    <div className="stat-info">
                        <h4>Khóa Học Đang Mở</h4>
                        <div className="stat-value">12</div>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon"><DollarSign size={24} /></div>
                    <div className="stat-info">
                        <h4>Doanh Thu Tháng Này</h4>
                        <div className="stat-value">145M</div>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon" style={{ backgroundColor: '#fef3c7', color: '#d97706' }}><Calendar size={24} /></div>
                    <div className="stat-info">
                        <h4>Đơn Đăng Ký Chờ Xử Lý</h4>
                        <div className="stat-value">8</div>
                    </div>
                </div>
            </div>

            {/* Bảng Dữ Liệu: Đơn đăng ký mới nhất */}
            <div className="table-card">
                <div className="table-header">
                    <h3>Đơn Đăng Ký Mới Nhất</h3>
                    <button className="btn btn-primary" style={{ padding: '8px 16px', fontSize: '0.9rem' }}>Xem tất cả</button>
                </div>

                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Họ và Tên</th>
                            <th>Số điện thoại</th>
                            <th>Khóa học quan tâm</th>
                            <th>Trạng thái</th>
                            <th>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>#1042</td>
                            <td>Nguyễn Văn A</td>
                            <td>0901234567</td>
                            <td>Sáng Tạo Web HTML/CSS/JS</td>
                            <td><span className="status-badge status-pending">Chờ tư vấn</span></td>
                            <td><a href="#" style={{ color: 'var(--admin-primary)' }}>Chi tiết</a></td>
                        </tr>
                        <tr>
                            <td>#1041</td>
                            <td>Trần Thị B</td>
                            <td>0987654321</td>
                            <td>Tư Duy Lập Trình Với Scratch</td>
                            <td><span className="status-badge status-paid">Đã thanh toán</span></td>
                            <td><a href="#" style={{ color: 'var(--admin-primary)' }}>Chi tiết</a></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminDashboard;
