import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { LayoutDashboard, BookOpen, Users, Phone, LogOut, Bell } from 'lucide-react';
import '../../styles/Admin.css'

const AdminLayout: React.FC = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('user');
        navigate('/login');
    };

    return (
        <div className="admin-layout">
            {/* Cột trái: Sidebar */}
            <aside className="admin-sidebar">
                <div className="admin-logo">Edu<span>Admin</span></div>
                <nav className="admin-nav">
                    <NavLink to="/admin/dashboard" className={({ isActive }) => isActive ? "admin-nav-item active" : "admin-nav-item"}>
                        <LayoutDashboard size={20} /> Tổng quan
                    </NavLink>
                    <NavLink to="/admin/courses" className={({ isActive }) => isActive ? "admin-nav-item active" : "admin-nav-item"}>
                        <BookOpen size={20} /> Quản lý Khóa học
                    </NavLink>
                    <NavLink to="/admin/teachers" className={({ isActive }) => isActive ? "admin-nav-item active" : "admin-nav-item"}>
                        <Users size={20} /> Quản lý Giảng viên
                    </NavLink>
                    <NavLink to="/admin/registrations" className={({ isActive }) => isActive ? "admin-nav-item active" : "admin-nav-item"}>
                        <Phone size={20} /> Đơn đăng ký / Liên hệ
                    </NavLink>
                    <NavLink to="/admin/posts" className={({ isActive }) => isActive ? "admin-nav-item active" : "admin-nav-item"}>
                        <BookOpen size={20} /> Quản lý Bài viết
                    </NavLink>
                </nav>
                <div className="admin-sidebar-footer">
                    <button onClick={handleLogout} className="admin-logout-btn">
                        <LogOut size={20} /> Đăng xuất
                    </button>
                </div>
            </aside>

            {/* Cột phải: Khung nội dung */}
            <div className="admin-main">
                {/* Header trên cùng */}
                <header className="admin-header">
                    <div className="header-search">
                        <input type="text" placeholder="Tìm kiếm nhanh..." />
                    </div>
                    <div className="header-user">
                        <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b' }}>
                            <Bell size={20} />
                        </button>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginLeft: '15px', borderLeft: '1px solid #e2e8f0', paddingLeft: '15px' }}>
                            <img src="https://i.pravatar.cc/150?img=11" alt="Admin Avatar" />
                            <span>Admin Đào Tạo</span>
                        </div>
                    </div>
                </header>

                {/* Nội dung thay đổi theo Router */}
                <main className="admin-content">
                    <Outlet /> {/* Nơi các trang con (Dashboard, Course) sẽ hiện ra */}
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;