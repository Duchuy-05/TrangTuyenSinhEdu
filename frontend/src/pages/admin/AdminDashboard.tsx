import React from 'react';
import { mockAdminData } from '../../data/mockAdminData';
import { Users, BookOpen, DollarSign, UserPlus, ArrowUpRight } from 'lucide-react';

const AdminDashboard: React.FC = () => {
    const { stats, registrations } = mockAdminData;

    const statCards = [
        { title: 'Tổng Học Viên', value: stats.totalStudents, icon: <Users size={24} className="text-blue-600" />, bg: 'bg-blue-100', trend: '+12%' },
        { title: 'Đăng Ký Mới', value: stats.newRegistrations, icon: <UserPlus size={24} className="text-green-600" />, bg: 'bg-green-100', trend: '+5%' },
        { title: 'Khóa Học Active', value: stats.activeCourses, icon: <BookOpen size={24} className="text-purple-600" />, bg: 'bg-purple-100', trend: '0%' },
        { title: 'Dự Kiến Doanh Thu', value: stats.estimatedRevenue, icon: <DollarSign size={24} className="text-yellow-600" />, bg: 'bg-yellow-100', trend: '+18%' },
    ];

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-gray-800">Tổng quan Dashboard</h1>
                <p className="text-gray-500 mt-1">Chào mừng trở lại! Dưới đây là thông tin mới nhất hôm nay.</p>
            </div>

            {/* Stat Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {statCards.map((card, idx) => (
                    <div key={idx} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-sm font-medium text-gray-500 mb-1">{card.title}</p>
                                <h3 className="text-2xl font-bold text-gray-800">{card.value}</h3>
                            </div>
                            <div className={`p-3 rounded-lg ${card.bg}`}>
                                {card.icon}
                            </div>
                        </div>
                        <div className="mt-4 flex items-center text-sm">
                            <span className="flex items-center text-green-500 font-medium">
                                <ArrowUpRight size={16} className="mr-1" />
                                {card.trend}
                            </span>
                            <span className="text-gray-400 ml-2">so với tháng trước</span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Recent Registrations Table Preview */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                    <h2 className="text-lg font-bold text-gray-800">Đăng ký tư vấn mới nhất</h2>
                    <a href="/admin/registrations" className="text-sm font-medium text-blue-600 hover:text-blue-800">Xem tất cả</a>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50 text-gray-500 text-sm uppercase tracking-wider">
                                <th className="py-4 px-6 font-medium">Họ tên PH / Học viên</th>
                                <th className="py-4 px-6 font-medium">Số điện thoại</th>
                                <th className="py-4 px-6 font-medium">Khóa học quan tâm</th>
                                <th className="py-4 px-6 font-medium">Ngày đăng ký</th>
                                <th className="py-4 px-6 font-medium">Trạng thái</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {registrations.slice(0, 4).map((reg) => (
                                <tr key={reg.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="py-4 px-6">
                                        <p className="font-semibold text-gray-800">{reg.parentName}</p>
                                        <p className="text-sm text-gray-500">{reg.studentName}</p>
                                    </td>
                                    <td className="py-4 px-6 text-gray-700">{reg.phone}</td>
                                    <td className="py-4 px-6 text-gray-700">{reg.course}</td>
                                    <td className="py-4 px-6 text-gray-500">{reg.date}</td>
                                    <td className="py-4 px-6">
                                        {reg.status === 'pending' && <span className="px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700">Chờ xử lý</span>}
                                        {reg.status === 'contacted' && <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">Đã gọi điện</span>}
                                        {reg.status === 'success' && <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">Thành công</span>}
                                        {reg.status === 'rejected' && <span className="px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700">Từ chối</span>}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
