import React from 'react';

const Hero: React.FC = () => {
    return (
        <section className="hero" id="home">
            <div className="container hero-content">
                <div className="hero-text">
                    <h1>Nâng Tầm Sự Nghiệp Với Các Khóa Học Chất Lượng Cao</h1>
                    <p>Hệ thống đào tạo CNTT thực chiến hàng đầu. Đồng hành cùng bạn trên con đường trở thành chuyên gia công nghệ với giáo trình chuẩn doanh nghiệp.</p>
                    <div className="hero-buttons">
                        <button className="btn btn-secondary">Xem khóa học</button>
                        <button className="btn btn-outline">Tư vấn miễn phí</button>
                    </div>
                </div>
                <div className="hero-image">
                    <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80" alt="Học tập" />
                </div>
            </div>
        </section>
    );
};

export default Hero;