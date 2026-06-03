// src/pages/CourseDetailPage.tsx
import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Clock, Laptop, Book } from 'lucide-react';
import { coursesData } from '../data/mockData';
import Navbar from '../components/NavBar';
import Footer from '../components/Footer';

const CourseDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>(); // Lấy ID từ URL
    const course = coursesData.find((c) => c.id === id);

    // Cuộn lên đầu trang khi vào trang mới
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    if (!course) {
        return (
            <div className="container" style={{ paddingTop: '120px', textAlign: 'center', height: '100vh' }}>
                <h2>Không tìm thấy khóa học!</h2>
                <Link to="/" className="btn btn-primary mt-1">Quay về trang chủ</Link>
            </div>
        );
    }

    return (
        <div className="page-wrapper">
            <Navbar />

            {/* Course Header Banner */}
            <section className="course-banner" style={{ background: 'var(--primary-color)', color: 'white', paddingTop: '150px', paddingBottom: '60px' }}>
                <div className="container" style={{ textAlign: 'center' }}>
                    <span className="meta-badge" style={{ color: '#000', background: '#fbbf24', border: 'none', fontWeight: 'bold' }}>
                        {course.target}
                    </span>
                    <h1 style={{ fontSize: '3rem', margin: '20px 0' }}>{course.title}</h1>
                    <p style={{ fontSize: '1.2rem', maxWidth: '800px', margin: '0 auto', opacity: 0.9 }}>{course.shortDesc}</p>
                </div>
            </section>

            {/* Course Info & Form Container */}
            <section className="course-detail-section" style={{ padding: '80px 0', background: 'var(--bg-light)' }}>
                <div className="container">
                    <div className="course-detail-grid" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '40px' }}>

                        {/* Cột trái: Thông tin chi tiết */}
                        <div className="course-main-content" style={{ background: 'white', padding: '40px', borderRadius: 'var(--radius)', boxShadow: 'var(--shadow-sm)' }}>
                            <img src={course.image} alt={course.title} style={{ width: '100%', borderRadius: 'var(--radius)', marginBottom: '30px' }} />

                            <h2 style={{ color: 'var(--primary-color)', marginBottom: '20px' }}>Nội dung chương trình</h2>
                            <ul className="course-syllabus" style={{ marginBottom: '40px' }}>
                                {course.syllabus.map((item, idx) => (
                                    <li key={idx} style={{ padding: '15px 0', borderBottom: '1px solid var(--border-color)', fontSize: '1.1rem' }}>
                                        {item}
                                    </li>
                                ))}
                            </ul>

                            <h2 style={{ color: 'var(--primary-color)', marginBottom: '20px' }}>Giảng viên hướng dẫn</h2>
                            <div className="teacher-mini" style={{ display: 'flex', gap: '20px', alignItems: 'center', background: 'var(--bg-light)', padding: '20px', borderRadius: 'var(--radius)' }}>
                                <div>
                                    <h4 style={{ fontSize: '1.2rem' }}>{course.teacher.name}</h4>
                                    <p style={{ color: 'var(--text-light)' }}>{course.teacher.title} tại {course.teacher.company}</p>
                                    <p style={{ fontWeight: '500', marginTop: '5px' }}>{course.teacher.experience}</p>
                                </div>
                            </div>
                        </div>

                        {/* Cột phải: Form Đăng ký */}
                        <div className="course-sidebar">
                            <div className="registration-box" style={{ background: 'white', padding: '30px', borderRadius: 'var(--radius)', position: 'sticky', top: '100px', boxShadow: 'var(--shadow-lg)' }}>
                                <h3 style={{ fontSize: '1.8rem', color: 'var(--secondary-color)', marginBottom: '10px' }}>{course.price}</h3>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '30px', color: 'var(--text-light)' }}>
                                    <span><Clock size={15} height={11} color='#dc582b' /> Thời lượng: <strong>{course.duration}</strong></span>
                                    <span><Laptop size={15} height={11} color='#dc582b' /> Hình thức: <strong>{course.format}</strong></span>
                                </div>

                                <h4 style={{ marginBottom: '15px' }}>Đăng ký tư vấn khóa học</h4>
                                <form style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                                    <input type="text" placeholder="Họ tên phụ huynh/học sinh" style={{ padding: '12px', borderRadius: '4px', border: '1px solid var(--border-color)', outline: 'none' }} />
                                    <input type="text" placeholder="Số điện thoại liên hệ" style={{ padding: '12px', borderRadius: '4px', border: '1px solid var(--border-color)', outline: 'none' }} />
                                    <input type="email" placeholder="Email" style={{ padding: '12px', borderRadius: '4px', border: '1px solid var(--border-color)', outline: 'none' }} />
                                    <button type="button" className="btn btn-primary" style={{ width: '100%', marginTop: '10px' }}>Đăng ký ngay</button>
                                </form>
                                <p style={{ fontSize: '0.85rem', color: 'var(--text-light)', textAlign: 'center', marginTop: '15px' }}>
                                    Hoặc liên hệ Hotline: <strong style={{ color: 'var(--primary-color)' }}>1900 1234</strong>
                                </p>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default CourseDetailPage;