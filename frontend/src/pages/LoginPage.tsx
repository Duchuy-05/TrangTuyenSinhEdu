import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/LoginPage.css'; 

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate(); // khai bao bien navigate
  // kiem tra neu da co token thi chuyen huong ve trang chu
  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    const userStr = localStorage.getItem('user');
    if (token && userStr) {
      try {
        const user = JSON.parse(userStr);
        if (user.role === 'admin') navigate('/admin');
        else if (user.role === 'teacher') navigate('/instructor');
        else if (user.role === 'student') navigate('/my-courses');
        else navigate('/');
      } catch {
        navigate('/');
      }
    }
  }, [navigate]);

  const handleChange = (e : React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage('');
    setIsLoading(true);

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
        email: formData.email,
        password: formData.password
      },
        {
          withCredentials: true // Cho phép gửi cookie từ server về client
        }
      );
      localStorage.setItem('accessToken', response.data.accessToken); // Lưu token vào localStorage
      localStorage.setItem('user', JSON.stringify(response.data.user)); // Lưu thông tin user vào localStorage
      alert(response.data.message || 'Đăng nhập thành công!');
      const userRole = response.data.user?.role;
      if (userRole === 'admin') navigate('/admin');
      else if (userRole === 'teacher') navigate('/instructor');
      else if (userRole === 'student') navigate('/my-courses');
      else navigate('/');
    } catch (error : any) {
      setErrorMessage(error.response?.data?.message || 'Lỗi kết nối server. Vui lòng thử lại sau.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        
        <div className="login-header">
          <h2 className="login-title">Welcome Back!</h2>
          <p className="login-subtitle">Please sign in to continue</p>
        </div>

        {errorMessage && (
           <div style={{ color: 'red', textAlign: 'center', marginBottom: '1rem', fontSize: '0.875rem' }}>
             {errorMessage}
           </div>
        )}

        <form className="login-form" onSubmit={handleSubmit}>
          
          <div>
            <label htmlFor="email" className="form-label">Email</label>
            <div className="input-wrapper">
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="form-input"
                placeholder="Your email"
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="form-label">Password</label>
            <div className="input-wrapper has-icon">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="form-input"
                placeholder="Password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="toggle-password-btn"
              >
                {showPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          <div className="form-actions">
            <div className="checkbox-wrapper">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="checkbox-input"
              />
              <label htmlFor="remember-me" className="checkbox-label">
                Remember me
              </label>
            </div>
            <Link to="#" className="forgot-password-link">
              Forgot your password?
            </Link>
          </div>

          <div className="submit-btn-wrapper">
            <button
              type="submit"
              disabled={isLoading}
              className="submit-btn"
            >
              {isLoading ? 'Signing In...' : 'Sign In'}
            </button>
          </div>
        </form>

        <p className="login-footer">
          Don't have an account?{' '}
          <Link to="/register" className="nav-link">
            Sign up now
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;