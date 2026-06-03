import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import CourseDetailPage from './pages/CourseDetailPage'; // Import trang mới
import './styles/LandingPage.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Đường dẫn trang chủ */}
        <Route path="/" element={<LandingPage />} />

        {/* Đường dẫn trang chi tiết khóa học */}
        <Route path="/khoa-hoc/:id" element={<CourseDetailPage />} />
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