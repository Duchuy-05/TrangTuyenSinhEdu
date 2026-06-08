-- ========================================
-- SAMPLE DATA FOR TRANG TUYỂN SINH
-- ========================================

-- ========================================
-- INSERT DATA INTO users TABLE
-- ========================================
INSERT INTO users (full_name, email, phone, password_hash, avatar_url, role, created_at, updated_at) VALUES
('Nguyễn Văn A', 'nguyena@gmail.com', '0912345678', '$2a$10$K7L9m.transactionhistory', NULL, 'student', NOW(), NOW()),
('Trần Thị B', 'tranthib@gmail.com', '0923456789', '$2a$10$K7L9m.transactionhistory', NULL, 'student', NOW(), NOW()),
('Lê Văn C', 'levanc@gmail.com', '0934567890', '$2a$10$K7L9m.transactionhistory', NULL, 'student', NOW(), NOW()),
('Phạm Thị D', 'phamthid@gmail.com', '0945678901', '$2a$10$K7L9m.transactionhistory', NULL, 'admin', NOW(), NOW());

-- ========================================
-- INSERT DATA INTO teachers TABLE
-- ========================================
INSERT INTO teachers (full_name, email, phone, title, experience, company, bio, avatar_url, created_at, updated_at) VALUES
('Dr. Hoàng Minh Tuấn', 'hoang.tuan@company.com', '0912111111', 'Ph.D', '10 years', 'Tech Company A', 'Chuyên gia về lập trình web và mobile', 'https://res.cloudinary.com/dirjsggep/image/upload/v1780888833/main-sample.png', NOW(), NOW()),
('Assoc. Prof. Đỗ Hồng Quân', 'do.quan@company.com', '0912222222', 'Tiến sĩ', '8 years', 'University B', 'Giảng viên về cơ sở dữ liệu', 'https://res.cloudinary.com/dirjsggep/image/upload/v1780888833/main-sample.png', NOW(), NOW()),
('Ths. Võ Thị Thanh Hương', 'vo.huong@company.com', '0912333333', 'Thạc sĩ', '5 years', 'Tech Company C', 'Chuyên gia UX/UI Design', 'https://res.cloudinary.com/dirjsggep/image/upload/v1780888833/main-sample.png', NOW(), NOW()),
('Mr. Nguyễn Đức Anh', 'nguyen.anh@company.com', '0912444444', 'Kỹ sư', '6 years', 'Tech Company D', 'Chuyên gia DevOps và Cloud', 'https://res.cloudinary.com/dirjsggep/image/upload/v1780888833/main-sample.png', NOW(), NOW());

-- ========================================
-- INSERT DATA INTO courses TABLE
-- ========================================
INSERT INTO courses (teacher_id, category, title, short_desc, target, image_url, duration, format, price, status, created_at, updated_at) VALUES
(1, 'Web Development', 'Advanced ReactJS & TypeScript', 'Học React cấp nâng cao với TypeScript', 'Sinh viên CNTT, lập trình viên', 'https://res.cloudinary.com/dirjsggep/image/upload/v1780888831/cld-sample-2.jpg', '8 weeks', 'online', 2999000, 'published', NOW(), NOW()),
(2, 'Database', 'SQL Optimization & Performance Tuning', 'Tối ưu hóa truy vấn SQL', 'DBA, Database Developer', 'https://res.cloudinary.com/dirjsggep/image/upload/v1780888831/cld-sample-2.jpg', '6 weeks', 'hybrid', 1999000, 'published', NOW(), NOW()),
(3, 'Design', 'UI/UX Design Masterclass', 'Thiết kế giao diện người dùng chuyên nghiệp', 'Designer, Product Manager', 'https://res.cloudinary.com/dirjsggep/image/upload/v1780888831/cld-sample-2.jpg', '10 weeks', 'offline', 3500000, 'published', NOW(), NOW()),
(4, 'DevOps', 'Kubernetes & Docker Essentials', 'Container orchestration và deployment', 'DevOps Engineer, Backend Developer', 'https://res.cloudinary.com/dirjsggep/image/upload/v1780888831/cld-sample-2.jpg', '8 weeks', 'online', 2500000, 'draft', NOW(), NOW()),
(1, 'Web Development', 'Node.js Backend Development', 'Xây dựng backend với Node.js', 'Lập trình viên JavaScript', 'https://res.cloudinary.com/dirjsggep/image/upload/v1780888831/cld-sample-2.jpg', '12 weeks', 'hybrid', 3999000, 'published', NOW(), NOW());

-- ========================================
-- INSERT DATA INTO course_syllabus TABLE
-- ========================================
INSERT INTO course_syllabus (course_id, order_index, title, description) VALUES
(1, 1, 'React Basics & Components', 'Giới thiệu React, JSX, Components, Props, State'),
(1, 2, 'Hooks & State Management', 'useState, useEffect, useContext, Custom Hooks'),
(1, 3, 'TypeScript Advanced', 'Generic types, Interfaces, Decorators'),
(1, 4, 'Project Building', 'Xây dựng dự án thực tế'),

(2, 1, 'SQL Query Fundamentals', 'SELECT, WHERE, JOIN, GROUP BY'),
(2, 2, 'Indexing Strategy', 'Tạo index, Query Plan, Performance Monitoring'),
(2, 3, 'Advanced Query Optimization', 'Subqueries, CTEs, Window Functions'),

(3, 1, 'Design Principles', 'Color Theory, Typography, Layout'),
(3, 2, 'Prototyping Tools', 'Figma, Adobe XD, Sketch'),
(3, 3, 'User Research & Testing', 'Usability Testing, A/B Testing'),
(3, 4, 'Real Project', 'Design cho dự án thực tế'),

(4, 1, 'Docker Basics', 'Containerization, Dockerfile, Images'),
(4, 2, 'Kubernetes Introduction', 'Pods, Services, Deployments'),
(4, 3, 'CI/CD Pipeline', 'GitHub Actions, GitLab CI'),

(5, 1, 'Node.js Fundamentals', 'Event Loop, Modules, NPM'),
(5, 2, 'Express.js Framework', 'Routing, Middleware, Error Handling'),
(5, 3, 'Database Integration', 'MongoDB, PostgreSQL connection'),
(5, 4, 'Authentication & Security', 'JWT, OAuth, Security Best Practices'),
(5, 5, 'API Development', 'RESTful API, GraphQL basics');


-- ========================================
-- NOTES:
-- ========================================
-- 1. Thay thế password_hash bằng hash thực tế (sử dụng bcrypt)
-- 2. Thay thế NOW() bằng timestamp cụ thể nếu cần
-- 3. Kiểm tra lại các khóa ngoài (foreign keys) trước khi INSERT
-- 4. Thực hiện các câu lệnh tuần tự theo thứ tự phụ thuộc
