import React, { useState, useEffect } from 'react';
import { User, Lock, Camera, Save, ShieldAlert, Mail, Phone, FileText } from 'lucide-react';

const StudentSetting: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'profile' | 'security'>('profile');
    
    // State cho Profile Form
    const [profileData, setProfileData] = useState({
        name: '',
        email: '',
        phone: '0901234567',
        bio: 'Tôi là một người đam mê học hỏi, luôn muốn nâng cao kỹ năng lập trình và thiết kế.',
        avatar: 'https://ui-avatars.com/api/?name=User&background=E5664B&color=fff'
    });

    // State cho Security Form
    const [passwords, setPasswords] = useState({
        current: '',
        new: '',
        confirm: ''
    });

    // Lấy dữ liệu user thực tế khi component mount
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            setProfileData(prev => ({
                ...prev,
                name: parsedUser.fullName || parsedUser.name || 'Học viên',
                email: parsedUser.email || 'hocvien@example.com',
                avatar: `https://ui-avatars.com/api/?name=${parsedUser.fullName || 'User'}&background=E5664B&color=fff`
            }));
        }
    }, []);

    const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setProfileData(prev => ({ ...prev, [name]: value }));
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setPasswords(prev => ({ ...prev, [name]: value }));
    };

    const handleSaveProfile = (e: React.FormEvent) => {
        e.preventDefault();
        alert('Đã cập nhật hồ sơ cá nhân thành công! (Mô phỏng)');
    };

    const handleSavePassword = (e: React.FormEvent) => {
        e.preventDefault();
        if (passwords.new !== passwords.confirm) {
            alert('Mật khẩu xác nhận không khớp!');
            return;
        }
        alert('Đã đổi mật khẩu thành công! (Mô phỏng)');
        setPasswords({ current: '', new: '', confirm: '' }); // reset
    };

    return (
        <div className="p-4 lg:p-8 max-w-4xl mx-auto space-y-8 bg-[#F5F7FA] min-h-screen">
            
            {/* Header */}
            <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-[#1F2937]">Cài đặt tài khoản</h1>
                <p className="text-gray-500 mt-2 text-sm lg:text-base">Quản lý thông tin cá nhân và bảo mật của bạn.</p>
            </div>

            {/* Main Content Card */}
            <div className="bg-white rounded-3xl shadow-sm border border-[#E5E7EB] overflow-hidden flex flex-col md:flex-row">
                
                {/* Left Sidebar (Tabs) */}
                <div className="w-full md:w-64 bg-gray-50 border-r border-gray-100 flex-shrink-0">
                    <div className="p-4 md:p-6 space-y-2 flex md:flex-col overflow-x-auto scrollbar-hide">
                        <button 
                            onClick={() => setActiveTab('profile')}
                            className={`flex-shrink-0 flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-colors w-full ${
                                activeTab === 'profile' 
                                    ? 'bg-white text-[#E5664B] shadow-sm border border-gray-100' 
                                    : 'text-gray-500 hover:bg-gray-200/50 hover:text-gray-700'
                            }`}
                        >
                            <User size={18} />
                            Hồ sơ cá nhân
                        </button>
                        <button 
                            onClick={() => setActiveTab('security')}
                            className={`flex-shrink-0 flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-colors w-full ${
                                activeTab === 'security' 
                                    ? 'bg-white text-[#E5664B] shadow-sm border border-gray-100' 
                                    : 'text-gray-500 hover:bg-gray-200/50 hover:text-gray-700'
                            }`}
                        >
                            <Lock size={18} />
                            Bảo mật
                        </button>
                    </div>
                </div>

                {/* Right Content Area */}
                <div className="flex-1 p-6 md:p-10">
                    
                    {/* TAB: HỒ SƠ CÁ NHÂN */}
                    {activeTab === 'profile' && (
                        <div className="animate-in fade-in duration-300">
                            <h2 className="text-xl font-bold text-gray-800 mb-6">Thông tin cá nhân</h2>
                            
                            {/* Avatar Section */}
                            <div className="flex flex-col sm:flex-row items-center gap-6 mb-8 pb-8 border-b border-gray-100">
                                <div className="relative group">
                                    <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-md">
                                        <img src={profileData.avatar} alt="Avatar" className="w-full h-full object-cover" />
                                    </div>
                                    <button className="absolute bottom-0 right-0 bg-[#E5664B] text-white p-2 rounded-full shadow-lg hover:bg-[#d6553a] transition-colors">
                                        <Camera size={16} />
                                    </button>
                                </div>
                                <div className="text-center sm:text-left">
                                    <h3 className="font-bold text-gray-800 text-lg">{profileData.name}</h3>
                                    <p className="text-sm text-gray-500 mt-1">Ảnh định dạng JPG, GIF hoặc PNG. Tối đa 2MB.</p>
                                </div>
                            </div>

                            {/* Form Fields */}
                            <form onSubmit={handleSaveProfile} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Name */}
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                                            <User size={16} className="text-gray-400" /> Họ và tên
                                        </label>
                                        <input 
                                            type="text" 
                                            name="name"
                                            value={profileData.name}
                                            onChange={handleProfileChange}
                                            className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:border-[#E5664B] focus:ring-2 focus:ring-[#E5664B]/20 transition-all font-medium text-gray-800"
                                            required
                                        />
                                    </div>
                                    
                                    {/* Email (Disabled) */}
                                    <div className="space-y-2 relative">
                                        <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                                            <Mail size={16} className="text-gray-400" /> Email đăng nhập
                                        </label>
                                        <input 
                                            type="email" 
                                            value={profileData.email}
                                            className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-100 text-gray-500 cursor-not-allowed font-medium"
                                            disabled
                                        />
                                        <Lock size={14} className="absolute right-4 top-10 text-gray-400" />
                                        <p className="text-xs text-gray-400 mt-1">Email không thể thay đổi.</p>
                                    </div>

                                    {/* Phone */}
                                    <div className="space-y-2 md:col-span-2">
                                        <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                                            <Phone size={16} className="text-gray-400" /> Số điện thoại
                                        </label>
                                        <input 
                                            type="tel" 
                                            name="phone"
                                            value={profileData.phone}
                                            onChange={handleProfileChange}
                                            className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:border-[#E5664B] focus:ring-2 focus:ring-[#E5664B]/20 transition-all font-medium text-gray-800"
                                        />
                                    </div>

                                    {/* Bio */}
                                    <div className="space-y-2 md:col-span-2">
                                        <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                                            <FileText size={16} className="text-gray-400" /> Giới thiệu bản thân
                                        </label>
                                        <textarea 
                                            name="bio"
                                            value={profileData.bio}
                                            onChange={handleProfileChange}
                                            rows={4}
                                            className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:border-[#E5664B] focus:ring-2 focus:ring-[#E5664B]/20 transition-all font-medium text-gray-800 resize-none"
                                        ></textarea>
                                    </div>
                                </div>

                                <div className="pt-4 flex justify-end">
                                    <button 
                                        type="submit"
                                        className="bg-[#E5664B] hover:bg-[#d6553a] text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 shadow-md hover:shadow-lg transition-all hover:-translate-y-0.5"
                                    >
                                        <Save size={18} /> Cập nhật hồ sơ
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}

                    {/* TAB: BẢO MẬT */}
                    {activeTab === 'security' && (
                        <div className="animate-in fade-in duration-300">
                            <h2 className="text-xl font-bold text-gray-800 mb-2">Đổi mật khẩu</h2>
                            <p className="text-sm text-gray-500 mb-8">Để bảo vệ tài khoản, vui lòng không chia sẻ mật khẩu cho người khác.</p>
                            
                            <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl mb-8 flex items-start gap-3">
                                <ShieldAlert className="text-amber-500 flex-shrink-0 mt-0.5" size={20} />
                                <div>
                                    <h4 className="font-bold text-amber-800 text-sm">Lời khuyên bảo mật</h4>
                                    <p className="text-xs text-amber-700 mt-1">Sử dụng mật khẩu dài ít nhất 8 ký tự, bao gồm cả chữ hoa, chữ thường, số và ký tự đặc biệt để tài khoản an toàn nhất.</p>
                                </div>
                            </div>

                            <form onSubmit={handleSavePassword} className="space-y-6 max-w-md">
                                
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-700">Mật khẩu hiện tại</label>
                                    <input 
                                        type="password" 
                                        name="current"
                                        value={passwords.current}
                                        onChange={handlePasswordChange}
                                        className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:border-[#E5664B] focus:ring-2 focus:ring-[#E5664B]/20 transition-all font-medium"
                                        placeholder="••••••••"
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-700">Mật khẩu mới</label>
                                    <input 
                                        type="password" 
                                        name="new"
                                        value={passwords.new}
                                        onChange={handlePasswordChange}
                                        className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:border-[#E5664B] focus:ring-2 focus:ring-[#E5664B]/20 transition-all font-medium"
                                        placeholder="Nhập mật khẩu mới"
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-700">Xác nhận mật khẩu mới</label>
                                    <input 
                                        type="password" 
                                        name="confirm"
                                        value={passwords.confirm}
                                        onChange={handlePasswordChange}
                                        className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:border-[#E5664B] focus:ring-2 focus:ring-[#E5664B]/20 transition-all font-medium"
                                        placeholder="Nhập lại mật khẩu mới"
                                        required
                                    />
                                </div>

                                <div className="pt-4">
                                    <button 
                                        type="submit"
                                        className="bg-[#E5664B] hover:bg-[#d6553a] text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 shadow-md hover:shadow-lg transition-all hover:-translate-y-0.5"
                                    >
                                        <Lock size={18} /> Cập nhật mật khẩu
                                    </button>
                                </div>

                            </form>
                        </div>
                    )}

                </div>
            </div>

        </div>
    );
};

export default StudentSetting;
