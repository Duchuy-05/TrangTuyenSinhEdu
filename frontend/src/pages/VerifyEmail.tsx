import React, { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios, { AxiosError } from 'axios';
// @ts-ignore
import '../styles/VerifyEmail.css';

declare global {
  interface ImportMeta {
    env: Record<string, string>;
  }
}

const VerifyEmail = () => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const navigate = useNavigate();
  const location = useLocation();
  
  // Lấy email từ RegisterPage truyền sang. Nếu không có thì trả về trang Register.
  const email = location.state?.email;

  useEffect(() => {
    if (!email) {
      navigate('/register');
    }
  }, [email, navigate]);

  const handleOtpChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Kiểm tra xem ký tự nhập vào có phải là số không
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    // Tự động focus ô tiếp theo
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const otpString = otp.join('');
    if (otpString.length < 6) {
      return setErrorMessage('Vui lòng nhập đủ 6 số xác nhận.');
    }

    setIsLoading(true);
    setErrorMessage('');
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/verify-otp`, {
        email: email,
        otp: otpString
      });
      alert(response.data.message || 'Xác thực tài khoản thành công!');
      navigate('/login'); // Thành công thì về trang Đăng nhập
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      setErrorMessage(axiosError.response?.data?.message || 'Mã xác nhận không hợp lệ hoặc đã hết hạn.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="verify-container">
      <div className="verify-card">
        
        {/* Icon Lá thư màu cam */}
        <div className="verify-icon-wrapper">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
          </svg>
        </div>
        
        <h2 className="verify-title">Verify Your Email</h2>
        <p className="verify-subtitle">
          Chúng tôi đã gửi mã 6 chữ số đến email<br />
          <strong>{email}</strong>
        </p>

        {errorMessage && <div className="error-alert">{errorMessage}</div>}

        <form onSubmit={handleVerifyOtp}>
          <div className="otp-inputs-container">
            {otp.map((data, index) => (
              <input
                key={index}
                type="text"
                maxLength={1}
                className="otp-input-box"
                value={data}
                onChange={(e) => handleOtpChange(index, e)}
                onKeyDown={(e) => handleOtpKeyDown(index, e)}
                ref={(el) => { if (el) inputRefs.current[index] = el; }}
                autoFocus={index === 0} // Tự động trỏ chuột vào ô đầu tiên
              />
            ))}
          </div>

          <button type="submit" disabled={isLoading} className="verify-submit-btn">
            {isLoading ? 'Verifying...' : 'Verify Account'}
          </button>
        </form>

        <button type="button" onClick={() => navigate('/register')} className="verify-back-btn">
          &lt; Back to Sign Up
        </button>

      </div>
    </div>
  );
};

export default VerifyEmail;