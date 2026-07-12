import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { courseApi } from '../services/course.api';
import type { Course } from '../services/course.api';

const CourseGrid: React.FC = () => {
    const [courses, setCourses] = useState<Course[]>([]);
    // Hiển thị mặc định 6 khóa học (2 dòng x 3 cột)
    const [visibleCount, setVisibleCount] = useState<number>(6);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

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

    // Xử lý khi ấn nút "Xem thêm"
    const handleLoadMore = () => {
        setVisibleCount(prevCount => prevCount + 6);
    };

    if (isLoading) return <div className="container" style={{ padding: '50px 0', textAlign: 'center' }}>Đang tải danh sách khóa học...</div>;
    if (error) return <div className="container" style={{ padding: '50px 0', textAlign: 'center', color: 'red' }}>{error}</div>;

    return (
        <section className="courses-section" id="courses">
            <div className="container">
                <h2 className="section-title" style={{ textAlign: 'center' }}>KHAI PHÁ TIỀM NĂNG</h2>
                <p className="section-subtitle" style={{ textAlign: 'center', marginBottom: '40px' }}>
                    Khám phá các khóa học thực chiến được thiết kế riêng cho bạn
                </p>

                {/* Khung Grid chứa khóa học */}
                <div className="courses-grid">
                    {courses.slice(0, visibleCount).map((course) => (
                        /* Biến toàn bộ Card thành Link, chuyển key lên đây */
                        <Link to={`/khoa-hoc/${course.id}`} className="course-card" key={course.id}>

                            <div className="course-card-image">
                                <img src={course.imageUrl || 'https://unsplash.com/photos/photo-of-turn-off-macbook-air-on-table-tAKXap853rY'} alt={course.title} />
                            </div>

                            <div className="course-card-content">
                                <h3 className="course-card-title">{course.title}</h3>

                                {/* Phần hiển thị nút xem chi tiết (chỉ là giao diện, không cần thẻ Link nữa) */}
                                <div className="course-card-action">
                                    <div className="icon-circle">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M5 12h14"></path>
                                            <path d="m12 5 7 7-7 7"></path>
                                        </svg>
                                    </div>
                                    <span className="action-text">Xem chi tiết</span>
                                </div>
                            </div>

                        </Link>
                    ))}
                </div>

                {/* Nút Xem thêm (Chỉ hiện khi số lượng khóa học trong DB lớn hơn số đang hiển thị) */}
                {visibleCount < courses.length && (
                    <div className="courses-load-more">
                        <button onClick={handleLoadMore}>
                            Xem thêm khóa học
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
};

export default CourseGrid;
