// src/components/Navbar.tsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { coursesData } from '../data/mockData';

const Navbar: React.FC = () => {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`navbar ${scrolled ? 'shadow-md' : ''}`}>
            <div className="container nav-content">
                <Link to="/" className="logo">Trí Anh<span> Education</span></Link>
                <ul className="nav-links">
                    <li><Link to="/">Trang chủ</Link></li>
                    <li><a href="/#about">Giới thiệu</a></li>

                    {/* Dropdown Menu */}
                    <li className="nav-dropdown">
                        <span className="dropdown-trigger">Khóa học ▾</span>
                        <ul className="dropdown-menu">
                            {coursesData.map((course) => (
                                <li key={course.id}>
                                    <Link to={`/khoa-hoc/${course.id}`}>{course.title}</Link>
                                </li>
                            ))}
                        </ul>
                    </li>

                    <li><a href="/#blog">Blog</a></li>
                    <li><a href="/#contact">Liên hệ</a></li>
                </ul>
                <button className="btn btn-primary">Đăng ký học ngay</button>
            </div>
        </nav>
    );
};

export default Navbar;