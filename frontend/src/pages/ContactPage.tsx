// src/pages/ContactPage.tsx
import React, { useEffect } from 'react';
import Navbar from '../components/NavBar';
import Footer from '../components/Footer';
import { Bold, Mail, MapPin, Phone } from 'lucide-react';

const ContactPage: React.FC = () => {
    // Tự động cuộn lên đầu khi vào trang
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="page-wrapper">
            <Navbar />

            {/* Banner Liên hệ */}
            <section className="course-banner" style={{ background: 'var(--primary-color)', color: 'white', paddingTop: '150px', paddingBottom: '60px' }}>
                <div className="container" style={{ textAlign: 'center' }}>
                    <h1 style={{ fontSize: '3rem', margin: '20px 0' }}>Liên hệ với EduPro</h1>
                    <p style={{ fontSize: '1.2rem', maxWidth: '800px', margin: '0 auto', opacity: 0.9 }}>
                        Chúng tôi luôn sẵn sàng lắng nghe và giải đáp mọi thắc mắc của bạn về các khóa học lập trình.
                    </p>
                </div>
            </section>

            {/* Nội dung chính: Form + Map */}
            <section className="contact-section">
                <div className="container">
                    <div className="contact-grid">

                        {/* Cột trái: Form để lại thông tin */}
                        <div className="contact-form-card">
                            <h2 style={{ color: 'var(--primary-color)', marginBottom: '10px' }}>Gửi tin nhắn cho chúng tôi</h2>
                            <p style={{ color: 'var(--text-light)', marginBottom: '30px' }}>Vui lòng điền đầy đủ thông tin, bộ phận tư vấn sẽ liên hệ lại với bạn trong vòng 24h.</p>

                            <form onSubmit={(e) => e.preventDefault()}>
                                <div className="form-group">
                                    <label>Họ và tên *</label>
                                    <input type="text" className="form-control" placeholder="Nhập họ và tên của bạn" required />
                                </div>

                                <div className="form-grid-2">
                                    <div className="form-group">
                                        <label>Số điện thoại *</label>
                                        <input type="tel" className="form-control" placeholder="09xx xxx xxx" required />
                                    </div>
                                    <div className="form-group">
                                        <label>Email liên hệ</label>
                                        <input type="email" className="form-control" placeholder="email@example.com" />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label>Khóa học quan tâm</label>
                                    <select className="form-control">
                                        <option value="">-- Chọn khóa học --</option>
                                        <option value="scratch">Tư Duy Lập Trình Với Scratch (Lớp 6-7)</option>
                                        <option value="python">Lập Trình Python Ứng Dụng (Lớp 8-9)</option>
                                        <option value="web">Sáng Tạo Web HTML/CSS/JS (Lớp 10-12)</option>
                                        <option value="khac">Khác</option>
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label>Nội dung cần tư vấn *</label>
                                    <textarea className="form-control" rows={4} placeholder="Nhập nội dung câu hỏi của bạn..." required></textarea>
                                </div>

                                <button type="submit" className="btn btn-primary" style={{ width: '100%', fontSize: '1.1rem', padding: '15px' }}>
                                    Gửi thông tin liên hệ
                                </button>
                            </form>
                        </div>

                        {/* Cột phải: Thông tin & Google Map */}
                        <div className="contact-info-card">
                            <div className="info-blocks">
                                <h2 style={{ color: 'var(--primary-color)', marginBottom: '20px' }}>Thông tin liên hệ</h2>

                                <div className="info-item">
                                    <strong><MapPin size={13} /> Trụ sở chính (Học Offline):</strong>
                                    <p>Tòa nhà Tech Tower, Số 1 Đường Cầu Giấy, Láng Thượng, Đống Đa, Hà Nội.</p>
                                </div>
                                <div className="info-item">
                                    <strong><Phone size={13} /> Hotline hỗ trợ:</strong>
                                    <p className="highlight-text">1900 1234 - 0987 654 321</p>
                                </div>
                                <div className="info-item">
                                    <strong><Mail size={13} /> Email:</strong>
                                    <p>lienhe@edupro.vn</p>
                                </div>
                            </div>

                            {/* Gọi Google Map API bằng Iframe */}
                            <div className="map-container" style={{ marginTop: '30px' }}>
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3723.7288933998598!2d105.7819759750318!3d21.043530980609464!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab3370dcd95f%3A0x82cb3a49b52e9921!2zMTAwIE5nLiAxIFBo4bqhbSBUdeG6pW4gVMOgaS4sIE5naMSpYSDEkMO0LCBIw6AgTuG7mWksIFZp4buHdCBOYW0!5e0!3m2!1svi!2s!4v1780713694294!5m2!1svi!2s"
                                    width="100%"
                                    height="350"
                                    style={{ border: 0, borderRadius: 'var(--radius)' }}
                                    allowFullScreen={true}
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    title="Bản đồ vị trí học Offline"
                                ></iframe>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default ContactPage;