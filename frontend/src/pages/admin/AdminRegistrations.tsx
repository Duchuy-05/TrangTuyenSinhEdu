import React, { useState } from 'react';
import { mockAdminData } from '../../data/mockAdminData';
import { Search, Filter, MoreVertical, Edit, Trash2 } from 'lucide-react';

const AdminRegistrations: React.FC = () => {
    // Trong thực tế, dữ liệu này sẽ được fetch từ API
    const [registrations] = useState(mockAdminData.registrations);

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Quản lý Đăng ký Tư vấn</h1>
                    <p className="text-gray-500 mt-1">Danh sách phụ huynh / học viên quan tâm khóa học.</p>
                </div>
                <div className="flex gap-2">
                    <button className="flex items-center gap-2 bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors font-medium">
                        <Filter size={18} /> Lọc
                    </button>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                        Xuất Excel
                    </button>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                {/* Table Toolbar */}
                <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                    <div className="relative w-72">
                        <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input 
                            type="text" 
                            placeholder="Tìm kiếm theo tên, SĐT..." 
                            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                        />
                    </div>
                    <div className="text-sm text-gray-500">
                        Hiển thị <span className="font-semibold text-gray-800">{registrations.length}</span> kết quả
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50 text-gray-500 text-sm uppercase tracking-wider">
                                <th className="py-4 px-6 font-medium">Mã ĐK</th>
                                <th className="py-4 px-6 font-medium">Người Đăng Ký</th>
                                <th className="py-4 px-6 font-medium">Liên Hệ</th>
                                <th className="py-4 px-6 font-medium">Khóa Học Quan Tâm</th>
                                <th className="py-4 px-6 font-medium">Trạng Thái</th>
                                <th className="py-4 px-6 font-medium text-right">Hành động</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {registrations.map((reg) => (
                                <tr key={reg.id} className="hover:bg-blue-50/50 transition-colors group">
                                    <td className="py-4 px-6 text-sm font-medium text-gray-900">{reg.id}</td>
                                    <td className="py-4 px-6">
                                        <div className="font-semibold text-gray-800">{reg.parentName}</div>
                                        <div className="text-sm text-gray-500">HV: {reg.studentName}</div>
                                    </td>
                                    <td className="py-4 px-6">
                                        <div className="text-gray-800">{reg.phone}</div>
                                        <div className="text-sm text-gray-500">{reg.email}</div>
                                    </td>
                                    <td className="py-4 px-6">
                                        <span className="text-gray-700 bg-gray-100 px-2 py-1 rounded text-sm">{reg.course}</span>
                                    </td>
                                    <td className="py-4 px-6">
                                        <select 
                                            className={`text-xs font-medium rounded-full px-3 py-1 border-0 focus:ring-2 focus:ring-blue-500 cursor-pointer outline-none appearance-none
                                                ${reg.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : ''}
                                                ${reg.status === 'contacted' ? 'bg-blue-100 text-blue-800' : ''}
                                                ${reg.status === 'success' ? 'bg-green-100 text-green-800' : ''}
                                                ${reg.status === 'rejected' ? 'bg-red-100 text-red-800' : ''}
                                            `}
                                            defaultValue={reg.status}
                                        >
                                            <option value="pending" className="text-black bg-white">Chờ xử lý</option>
                                            <option value="contacted" className="text-black bg-white">Đã gọi điện</option>
                                            <option value="success" className="text-black bg-white">Thành công</option>
                                            <option value="rejected" className="text-black bg-white">Từ chối</option>
                                        </select>
                                    </td>
                                    <td className="py-4 px-6 text-right">
                                        <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button className="p-1.5 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded" title="Chỉnh sửa">
                                                <Edit size={18} />
                                            </button>
                                            <button className="p-1.5 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded" title="Xóa">
                                                <Trash2 size={18} />
                                            </button>
                                            <button className="p-1.5 text-gray-500 hover:text-gray-800 hover:bg-gray-100 rounded">
                                                <MoreVertical size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination (Mock) */}
                <div className="p-4 border-t border-gray-100 flex items-center justify-between bg-gray-50/30">
                    <div className="text-sm text-gray-500">
                        Đang xem <span className="font-medium text-gray-700">1</span> đến <span className="font-medium text-gray-700">5</span> trong tổng số <span className="font-medium text-gray-700">5</span> mục
                    </div>
                    <div className="flex gap-1">
                        <button className="px-3 py-1 border border-gray-300 rounded text-gray-500 bg-gray-100 cursor-not-allowed" disabled>Trước</button>
                        <button className="px-3 py-1 border border-blue-600 rounded text-white bg-blue-600">1</button>
                        <button className="px-3 py-1 border border-gray-300 rounded text-gray-500 bg-white hover:bg-gray-50">Tiếp</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminRegistrations;
