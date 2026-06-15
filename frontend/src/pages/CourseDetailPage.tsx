import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/NavBar';
import Footer from '../components/Footer';
import { courseApi, Course, registrationApi } from '../services/api';
import { Clock, Laptop } from 'lucide-react';
import { RegistrationForm } from '../services/api';

const CourseDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [course, setCourse] = useState<Course | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const [formData, setFormData] = useState<RegistrationForm>({
        courseId: Number(id),
        contactName: '',
        contactEmail: '',
        contactPhone: '',
        note: '',
    });
    

    const handleSubmit = async () => {
        if (!formData.contactName || !formData.contactPhone || !formData.contactEmail) {
            alert('Vui lòng điền đầy đủ thông tin!');
            return;
        }

        try {
            setIsLoading(true);
            await registrationApi.registerForCourse(formData);
            alert('Đăng ký thành công!');
        } catch (error) {
            alert('Đăng ký thất bại, vui lòng thử lại!');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        window.scrollTo(0, 0); // Cuộn lên đầu trang

        const fetchDetail = async () => {
            if (!id) return;
            try {
                setIsLoading(true);
                const data = await courseApi.getCourseById(id);
                setCourse(data);
            } catch (error) {
                console.error("Lỗi tải chi tiết khóa học:", error);
                setCourse(null);
            } finally {
                setIsLoading(false);
            }
        };

        fetchDetail();
    }, [id]);

    if (isLoading) {
        return (
            <div className="page-wrapper">
                <Navbar />
                <div className="container" style={{ paddingTop: '150px', textAlign: 'center', height: '100vh' }}>
                    <h2>Đang tải thông tin khóa học...</h2>
                </div>
            </div>
        );
    }

    if (!course) {
        return (
            <div className="page-wrapper">
                <Navbar />
                <div className="container" style={{ paddingTop: '150px', textAlign: 'center', height: '100vh' }}>
                    <h2>Không tìm thấy khóa học!</h2>
                    <Link to="/" className="btn btn-primary mt-1">Quay về trang chủ</Link>
                </div>
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

                        {/* Cột trái */}
                        <div className="course-main-content" style={{ background: 'white', padding: '40px', borderRadius: 'var(--radius)', boxShadow: 'var(--shadow-sm)' }}>
                            <img src={course.imageUrl} alt={course.title} style={{ width: '100%', borderRadius: 'var(--radius)', marginBottom: '30px' }} />

                            <h2 style={{ color: 'var(--primary-color)', marginBottom: '20px' }}>Nội dung chương trình</h2>
                            <ul className="course-syllabus" style={{ marginBottom: '40px' }}>
                                {/* Map qua bảng course_syllabus (sắp xếp theo order_index nếu cần) */}
                                {course.syllabus?.sort((a, b) => a.orderIndex - b.orderIndex).map((item) => (
                                    <li key={item.id} style={{ padding: '15px 0', borderBottom: '1px solid var(--border-color)' }}>
                                        <strong style={{ fontSize: '1.1rem' }}>{item.title}</strong>
                                        {item.description && <p style={{ marginTop: '5px', color: 'var(--text-light)' }}>{item.description}</p>}
                                    </li>
                                ))}
                            </ul>

                            <h2 style={{ color: 'var(--primary-color)', marginBottom: '20px' }}>Giảng viên hướng dẫn</h2>
                            {course.teacher && (
                                <div className="teacher-mini" style={{ display: 'flex', gap: '20px', alignItems: 'center', background: 'var(--bg-light)', padding: '20px', borderRadius: 'var(--radius)' }}>
                                    <img src={course.teacher.avatarUrl} alt={course.teacher.fullName} style={{ width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover' }} />
                                    <div>
                                        <h4 style={{ fontSize: '1.2rem' }}>{course.teacher.fullName}</h4>
                                        <p style={{ color: 'var(--text-light)' }}>{course.teacher.title} tại {course.teacher.company}</p>
                                        <p style={{ fontWeight: '500', marginTop: '5px' }}>{course.teacher.experience}</p>
                                        <p style={{ marginTop: '10px', fontSize: '0.9rem' }}>{course.teacher.bio}</p>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Cột phải: Form Đăng ký */}
                        <div className="course-sidebar">
                            <div className="registration-box" style={{ background: 'white', padding: '30px', borderRadius: 'var(--radius)', position: 'sticky', top: '100px', boxShadow: 'var(--shadow-lg)' }}>
                                <h3 style={{ fontSize: '1.8rem', color: 'var(--secondary-color)', marginBottom: '10px' }}>{course.price}</h3>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '30px', color: 'var(--text-light)' }}>
                                    <span><Clock size={13} height={11} color='#e15f41' /> Thời lượng: <strong>{course.duration}</strong></span>
                                    <span><Laptop size={13} height={11} color='#e15f41' /> Hình thức: <strong>{course.format}</strong></span>
                                </div>

                                <h4 style={{ marginBottom: '15px' }}>Đăng ký tư vấn khóa học</h4>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                                    <input
                                        type="text"
                                        placeholder="Họ tên phụ huynh/học sinh"
                                        value={formData.contactName}
                                        onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                                        style={{ padding: '12px', borderRadius: '4px', border: '1px solid var(--border-color)', outline: 'none' }}
                                    />
                                    <input
                                        type="text"
                                        placeholder="Số điện thoại liên hệ"
                                        value={formData.contactPhone}
                                        onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
                                        style={{ padding: '12px', borderRadius: '4px', border: '1px solid var(--border-color)', outline: 'none' }}
                                    />
                                    <input
                                        type="email"
                                        placeholder="Email"
                                        value={formData.contactEmail}
                                        onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                                        style={{ padding: '12px', borderRadius: '4px', border: '1px solid var(--border-color)', outline: 'none' }}
                                    />
                                    
                                    <button
                                        type="button"
                                        className="btn btn-primary"
                                        onClick={handleSubmit}
                                        disabled={isLoading}
                                        style={{ width: '100%', marginTop: '10px' }}
                                    >
                                        {isLoading ? 'Đang xử lý...' : 'Đăng ký ngay'}
                                    </button>
                                </div>
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