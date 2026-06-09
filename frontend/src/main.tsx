import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import CourseDetailPage from './pages/CourseDetailPage'; // Import trang mới
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ContactPage from './pages/ContactPage';
import './styles/LandingPage.css';
import './index.css';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Đường dẫn trang chủ */}
        <Route path="/" element={<LandingPage />} />

        {/* Đường dẫn trang chi tiết khóa học */}
        <Route path="/khoa-hoc/:id" element={<CourseDetailPage />} />

        {/* Đường dẫn trang đăng nhập */}
        <Route path="/login" element={<LoginPage />} />

        {/* Đường dẫn trang đăng ký */}
        <Route path="/register" element={<RegisterPage />} />
        {/* Trang liên hệ */}
        <Route path="/lien-he" element={<ContactPage />} />
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