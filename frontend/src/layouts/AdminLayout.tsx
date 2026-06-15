import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Users, BookOpen, Settings, LogOut, Bell, Search } from 'lucide-react';

const AdminLayout: React.FC = () => {
    const location = useLocation();

    const navItems = [
        { name: 'Tổng quan', path: '/admin', icon: <LayoutDashboard size={20} /> },
        { name: 'Quản lý Đăng ký', path: '/admin/registrations', icon: <Users size={20} /> },
        { name: 'Khóa học', path: '/admin/courses', icon: <BookOpen size={20} /> },
        { name: 'Cài đặt', path: '/admin/settings', icon: <Settings size={20} /> },
    ];

    return (
        <div className="flex h-screen bg-gray-100 font-sans">
            {/* Sidebar */}
            <aside className="w-64 bg-slate-900 text-white flex flex-col hidden md:flex">
                <div className="p-6 border-b border-slate-800">
                    <Link to="/" className="text-2xl font-bold text-blue-400 tracking-wider">ACADEMY ADMIN</Link>
                </div>
                
                <nav className="flex-1 py-6 px-4 space-y-2">
                    {navItems.map((item) => {
                        const isActive = location.pathname === item.path || (item.path !== '/admin' && location.pathname.startsWith(item.path));
                        return (
                            <Link 
                                key={item.path} 
                                to={item.path}
                                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive ? 'bg-blue-600 text-white' : 'text-slate-300 hover:bg-slate-800 hover:text-white'}`}
                            >
                                {item.icon}
                                <span className="font-medium">{item.name}</span>
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-4 border-t border-slate-800">
                    <button className="flex items-center gap-3 px-4 py-3 w-full rounded-lg text-slate-300 hover:bg-red-500 hover:text-white transition-colors">
                        <LogOut size={20} />
                        <span className="font-medium">Đăng xuất</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Topbar */}
                <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 z-10">
                    {/* Search */}
                    <div className="flex items-center bg-gray-100 rounded-full px-4 py-2 w-96">
                        <Search size={18} className="text-gray-400" />
                        <input 
                            type="text" 
                            placeholder="Tìm kiếm nhanh..." 
                            className="bg-transparent border-none focus:outline-none ml-2 w-full text-sm text-gray-700"
                        />
                    </div>

                    {/* Right Menu */}
                    <div className="flex items-center gap-6">
                        <button className="relative text-gray-500 hover:text-blue-600 transition-colors">
                            <Bell size={20} />
                            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
                        </button>
                        <div className="flex items-center gap-3 border-l pl-6 border-gray-200">
                            <img 
                                src="https://ui-avatars.com/api/?name=Admin+User&background=0D8ABC&color=fff" 
                                alt="Admin Avatar" 
                                className="w-8 h-8 rounded-full"
                            />
                            <div className="hidden sm:block">
                                <p className="text-sm font-semibold text-gray-700">Admin User</p>
                                <p className="text-xs text-gray-500">Quản trị viên</p>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Main Scrollable Content */}
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
