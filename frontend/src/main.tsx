import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import CourseDetailPage from './pages/CourseDetailPage'; // Import trang mới
import ScratchCoursePage from './pages/ScratchCoursePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ContactPage from './pages/ContactPage';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminLayout from './pages/admin/AdminLayout';
import AdminTeachers from './pages/admin/AdminTeachers';
import AdminCourses from './pages/admin/AdminCourses';
import AdminRegistrations from './pages/admin/AdminRegistrations';
import AdminPosts from './pages/admin/AdminPost';
import VerifyEmail from './pages/VerifyEmail';
import StudentLayout from './layouts/StudentLayout';
import MyCoursesPage from './pages/student/MyCoursesPage';
import InstructorLayout from './layouts/InstructorLayout';
import InstructorClassesPage from './pages/instructor/InstructorClassesPage';
import InstructorCreateClassPage from './pages/instructor/InstructorCreateClassPage';
import InstructorDashboardPage from './pages/instructor/InstructorDashboardPage';
import InstructorStudentsPage from './pages/instructor/InstructorStudentsPage';
import PostList from './pages/Post/PostList';
import PostDetail from './pages/Post/PostDetail';
import './styles/LandingPage.css';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Đường dẫn trang chủ */}
        <Route path="/" element={<LandingPage />} />

        {/* Trang khóa học Scratch (đặt trước route động để ưu tiên match) */}
        <Route path="/khoa-hoc/scratch-tu-duy" element={<ScratchCoursePage />} />

        {/* Đường dẫn trang chi tiết khóa học chung */}
        <Route path="/khoa-hoc/:id" element={<CourseDetailPage />} />

        {/* Đường dẫn trang đăng nhập */}
        <Route path="/login" element={<LoginPage />} />

        {/* Đường dẫn trang đăng ký */}
        <Route path="/register" element={<RegisterPage />} />
        {/* Trang liên hệ */}
        <Route path="/lien-he" element={<ContactPage />} />

        <Route path="/posts" element={<PostList />} />
        <Route path="/posts/:slug" element={<PostDetail />} />

        <Route path="/admin" element={<AdminLayout />}>
          {/* Tự động điều hướng /admin sang /admin/dashboard (Tùy chọn) */}
          <Route index element={<AdminDashboard />} />

          {/* Các trang con nằm trong khung Layout */}
          <Route path="dashboard" element={<AdminDashboard />} />

          <Route path="teachers" element={<AdminTeachers />} />

          <Route path="courses" element={<AdminCourses />} />

          <Route path="registrations" element={<AdminRegistrations />} />

          <Route path="posts" element={<AdminPosts />} />

        </Route>
        {/* Trang xác thực email */}
        <Route path="/verify-email" element={<VerifyEmail />} />

        {/* Các route dành cho Admin */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="registrations" element={<AdminRegistrations />} />
        </Route>

        {/* Các route dành cho Học viên (Student Dashboard) */}
        <Route element={<StudentLayout />}>
          {/* Dashboard học viên / My Courses */}
          <Route path="/my-courses" element={<MyCoursesPage />} />
          {/* Các trang sau sẽ được phát triển sau */}
        </Route>

        {/* Các route dành cho Giảng viên (Instructor Dashboard) */}
        <Route element={<InstructorLayout />}>
          <Route path="/instructor" element={<InstructorDashboardPage />} />
          <Route path="/instructor/my-class" element={<InstructorClassesPage />} />
          <Route path="/my-class/create" element={<InstructorCreateClassPage />} />
          <Route path="/instructor/students" element={<InstructorStudentsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

export default App;