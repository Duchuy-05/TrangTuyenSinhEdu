import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { courseApi, Course } from '../services/api';
import { Clock, Laptop, Book } from 'lucide-react';

const CourseAccordion: React.FC = () => {
    const [courses, setCourses] = useState<Course[]>([]);
    const [activeId, setActiveId] = useState<number | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // Gọi API lấy dữ liệu khi component mount
    useEffect(() => {
        const fetchCourses = async () => {
            try {
                setIsLoading(true);
                const data = await courseApi.getAllCourses();
                //console.log("Dữ liệu thật từ API trả về là:", data);
                // Chỉ lấy những khóa học đang "active" (nếu có trường status)
                const activeCourses = data.filter(c => c.status !== 'hidden');
                setCourses(activeCourses);
                if (activeCourses.length > 0) {
                    setActiveId(activeCourses[0].id); // Mở sẵn khóa học đầu tiên
                }
            } catch (err) {
                console.error("Lỗi khi tải khóa học:", err);
                setError("Không thể tải dữ liệu khóa học lúc này.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchCourses();
    }, []);

    const toggleAccordion = (id: number) => {
        setActiveId(activeId === id ? null : id);
    };

    if (isLoading) return <div className="container" style={{ padding: '50px 0', textAlign: 'center' }}>Đang tải danh sách khóa học...</div>;
    if (error) return <div className="container" style={{ padding: '50px 0', textAlign: 'center', color: 'red' }}>{error}</div>;

    return (
        <section className="courses" id="courses">
            <div className="container">
                <h2 className="section-title">Chương Trình Đào Tạo</h2>
                <p className="section-subtitle">Khám phá các khóa học thực chiến được thiết kế riêng cho bạn</p>

                <div className="accordion-wrapper">
                    {courses.map((course) => (
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
                                            {/* LƯU Ý: Sửa lại tên biến cho khớp DB (image_url, full_name...) */}
                                            <img src={course.imageUrl} alt={course.title} />
                                            <div className="teacher-mini" style={{ marginTop: '20px' }}>
                                                <div>
                                                    <h5>Giảng viên: {course.teacher?.fullName}</h5>
                                                    <p>{course.teacher?.title} tại {course.teacher?.company}</p>
                                                    <p>Kinh nghiệm: {course.teacher?.experience}</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="course-info">
                                            <h4>Tổng quan khóa học</h4>
                                            <p className="desc">{course.shortDesc}</p>

                                            <div className="course-meta">
                                                <span className="meta-badge"><Clock size={10} height={10} />  {course.duration}</span>
                                                <span className="meta-badge"><Laptop size={10} height={10} /> {course.format}</span>
                                                <span className="meta-badge" style={{ background: '#fef3c7', color: '#b45309' }}><Book size={10} height={10} /> {course.target}</span>
                                            </div>

                                            <div className="course-price-cta" style={{ marginTop: '30px' }}>
                                                <div className="price">{course.price}</div>
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