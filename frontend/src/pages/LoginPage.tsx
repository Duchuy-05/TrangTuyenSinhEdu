import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useGoogleLogin } from '@react-oauth/google';
import { apiClient } from '../services/apiClient';
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
    const userStr = localStorage.getItem('user');
    if (userStr) {
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
      const response = await apiClient.post('/auth/login', {
        email: formData.email,
        password: formData.password
      });
      localStorage.setItem('user', JSON.stringify(response.data.user)); // Lưu thông tin user vào localStorage
      alert(response.data.message || 'Đăng nhập thành công!');
      const userRole = response.data.user?.role;
      if (userRole === 'admin') navigate('/admin');
      else if (userRole === 'teacher') navigate('/instructor');
      else if (userRole === 'student') navigate('/my-courses');
      else navigate('/');
    } catch (error: any) {
      setErrorMessage(error.response?.data?.message || 'Lỗi kết nối server. Vui lòng thử lại sau.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSuccess = async (tokenResponse: any) => {
    setErrorMessage('');
    setIsLoading(true);

    try {
      // Bây giờ credentialResponse trả về access_token
      const response = await apiClient.post('/auth/google', {
        credential: tokenResponse.access_token
      });
      localStorage.setItem('user', JSON.stringify(response.data.user));
      alert(response.data.message || 'Đăng nhập thành công!');
      const userRole = response.data.user?.role;
      if (userRole === 'admin') navigate('/admin');
      else if (userRole === 'teacher') navigate('/instructor');
      else if (userRole === 'student') navigate('/my-courses');
      else navigate('/');
    } catch (error: any) {
      setErrorMessage(error.response?.data?.message || 'Lỗi đăng nhập Google. Vui lòng thử lại sau.');
    } finally {
      setIsLoading(false);
    }
  };

  const loginWithGoogle = useGoogleLogin({
    onSuccess: handleGoogleSuccess,
    onError: () => setErrorMessage('Đăng nhập Google thất bại!'),
  });

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

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">Hoặc tiếp tục với</span>
          </div>
        </div>

        <div className="flex justify-center w-full mt-4 mb-6">
          <button
            type="button"
            onClick={() => loginWithGoogle()}
            className="flex items-center justify-center gap-3 w-full h-[52px] rounded-[14px] bg-white border border-gray-200 text-gray-800 font-semibold transition-all duration-250 ease-in hover:-translate-y-[2px] hover:shadow-[0_10px_25px_rgba(0,0,0,0.08)] active:translate-y-0"
          >
            <svg viewBox="0 0 24 24" width="24" height="24" xmlns="http://www.w3.org/2000/svg">
              <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
                <path fill="#4285F4" d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z"/>
                <path fill="#34A853" d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z"/>
                <path fill="#FBBC05" d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z"/>
                <path fill="#EA4335" d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z"/>
              </g>
            </svg>
            Continue with Google
          </button>
        </div>

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
