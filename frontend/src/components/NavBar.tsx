import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { courseApi } from '../services/api';
import { Course } from '../services/api';
import { ArrowLeftRight, LogOut } from 'lucide-react';

const Navbar: React.FC = () => {
    const [scrolled, setScrolled] = useState(false);
    const [courses, setCourses] = useState<Course[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // quản lý trạng thái người dùng
    const [user, setUser] = useState<any>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);

        // 2. Lấy thông tin user từ localStorage khi trang vừa tải
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                setIsLoading(true);
                const data = await courseApi.getAllCourses();

                const activeCourses = data.filter(c => c.status !== 'hidden');
                setCourses(activeCourses);

            } catch (err) {
                console.error("Lỗi khi tải khóa học:", err);
                setError("Không thể tải dữ liệu khóa học lúc này.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchCourses();
    }, []);

    // xử lý đăng xuất
    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('user');
        setUser(null);
        navigate('/login');
    };

    // Hàm lấy chữ cái đầu tiên của tên để làm Avatar
    const getInitial = (full_name: string) => {
        if (!full_name) return 'U';
        // Tách lấy từ cuối cùng (Tên) và lấy chữ cái đầu
        const nameArray = full_name.trim().split(' ');
        const lastName = nameArray[nameArray.length - 1];
        return lastName.charAt(0).toUpperCase();
    };

    // Gom nhóm khóa học theo danh mục (Category)
    const coursesByCategory = courses?.reduce((acc: { [key: string]: any[] }, course) => {
        if (!acc[course.category]) {
            acc[course.category] = [];
        }
        acc[course.category].push(course);
        return acc;
    }, {}) || {};

    return (
        <nav className={`navbar ${scrolled ? 'shadow-md bg-white' : ''}`}>
            <div className="container nav-content flex justify-between items-center">
                <Link to="/" className="logo">Trí Anh<span> Education</span></Link>

                <ul className="nav-links">
                    <li><Link to="/">Trang chủ</Link></li>
                    {/* <li><a href="/#about">Giới thiệu</a></li> */}

                    {/* Dropdown Cấp 1: Hover vào "Khóa học" */}
                    {/* Dropdown Menu Khóa Học */}
                    <li className="nav-dropdown">
                        <span className="dropdown-trigger">
                            Khóa học
                            <svg className="dropdown-arrow" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </span>

                        {/* Dropdown Cặp 1: Danh sách các Category */}
                        <ul className="dropdown-menu-c1">

                            {/* Cầu nối tàng hình giữ hover giữa nav và dropdown */}
                            <div className="invisible-bridge"></div>

                            {Object.keys(coursesByCategory).map((category) => (
                                <li key={category} className="category-item">
                                    <div className="category-content">
                                        {category}
                                    </div>
                                    <span className="category-chevron">
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </span>

                                    {/* Dropdown Cấp 2: Danh sách Khóa học con */}
                                    <ul className="dropdown-menu-c2">
                                        {coursesByCategory[category].map((course) => (
                                            <li key={course.id}>
                                                <Link to={`/khoa-hoc/${course.id}`} className="course-link-item">
                                                    <span className="course-arrow-indicator">▸</span>
                                                    <span className="course-title">{course.title}</span>
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </li>
                            ))}
                        </ul>
                    </li>
                    <li><Link to="/posts">Tin tức</Link></li>
                    <li><Link to="/lien-he">Liên hệ</Link></li>
                </ul>

                <div className="nav-actions flex items-center gap-4">
                    <button className="btn btn-primary">Đăng ký học ngay</button>

                    {/* KHU VỰC HIỂN THỊ TÀI KHOẢN */}
                    {user ? (
                        <div className="relative group cursor-pointer ml-2">
                            {/* Nút Avatar tròn */}
                            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-orange-400 to-orange-600 flex items-center justify-center text-white font-bold text-lg shadow-md border-2 border-white hover:shadow-lg transition-shadow">
                                {getInitial(user.name || user.fullName)}
                            </div>

                            {/* Dropdown Menu của User (Hiển thị khi Hover) */}
                            <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-orange-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 overflow-hidden z-50">

                                {/* Thông tin cá nhân */}
                                <div className="p-4 border-b border-gray-100 bg-orange-50/50">
                                    <p className="font-bold text-gray-800 truncate">
                                        {user.name || user.fullName}
                                    </p>
                                    <p className="text-xs text-gray-500 truncate mt-0.5">
                                        {user.email}
                                    </p>
                                </div>

                                {/* Các menu chức năng */}
                                <div className="p-2">
                                    <Link
                                        to="/my-courses"
                                        className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600 rounded-xl transition-colors font-medium"
                                    >
                                        📚 Khóa học của tôi
                                    </Link>
                                    <button
                                            onClick={handleLogout}
                                            className="w-full flex items-center gap-2 text-left px-4 py-2.5 text-sm text-orange-600 hover:bg-red-50 rounded-xl transition-colors font-bold mt-1 cursor-pointer"
                                        >
                                            <LogOut size={16} />
                                            Đăng xuất
                                    </button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="auth-group">
                            <Link to="/login" className="btn btn-outline btn-auth">Đăng nhập</Link>
                            <Link to="/register" className="btn btn-primary btn-auth">Đăng ký</Link>
                        </div>
                    )}
                </div>

            </div>
        </nav>
    );
};

export default Navbar;
