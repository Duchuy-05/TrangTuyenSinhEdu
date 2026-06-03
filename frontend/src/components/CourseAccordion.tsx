import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Thêm Link của React Router
import { coursesData } from '../data/mockData';
import { Clock, Laptop, Book } from 'lucide-react';

const CourseAccordion: React.FC = () => {
    const [activeId, setActiveId] = useState<string | null>(coursesData[0]?.id || null);

    const toggleAccordion = (id: string) => {
        setActiveId(activeId === id ? null : id);
    };

    return (
        <section className="courses" id="courses">
            <div className="container">
                <h2 className="section-title">Chương Trình Đào Tạo</h2>
                <p className="section-subtitle">Khám phá các khóa học thực chiến được thiết kế riêng cho bạn</p>

                <div className="accordion-wrapper">
                    {coursesData.map((course) => (
                        <div className={`accordion-item ${activeId === course.id ? 'active' : ''}`} key={course.id}>
                            {/* Header */}
                            <div className="accordion-header" onClick={() => toggleAccordion(course.id)}>
                                <span>{course.title}</span>
                                <span className="icon">▼</span>
                            </div>

                            {/* Nội dung khi xổ xuống */}
                            <div className="accordion-content-grid">
                                <div className="accordion-content-inner">
                                    <div className="course-detail">
                                        <div className="course-image">
                                            <img src={course.image} alt={course.title} />
                                            <div className="teacher-mini" style={{ marginTop: '20px' }}>
                                                <div>
                                                    <h5>Giảng viên: {course.teacher.name}</h5>
                                                    <p>{course.teacher.title} tại {course.teacher.company}</p>
                                                    <p>Kinh nghiệm: {course.teacher.experience}</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="course-info">
                                            <h4>Tổng quan khóa học</h4>
                                            <p className="desc">{course.shortDesc}</p>

                                            <div className="course-meta">
                                                <span className="meta-badge"><Clock size={13} height={10} /> {course.duration}</span>
                                                <span className="meta-badge"><Laptop size={13} height={10} /> {course.format}</span>
                                                <span className="meta-badge" style={{ background: '#fef3c7', color: '#b45309' }}><Book size={13} height={10} /> {course.target}</span>
                                            </div>

                                            <div className="course-price-cta" style={{ marginTop: '30px' }}>
                                                <div className="price">{course.price}</div>
                                                {/* NÚT BẤM CHUYỂN SANG TRANG CHI TIẾT */}
                                                <Link to={`/khoa-hoc/${course.id}`} className="btn btn-primary">
                                                    Xem chi tiết & Đăng ký
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CourseAccordion;