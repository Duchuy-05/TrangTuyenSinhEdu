import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, BookOpen, Layers, ChevronRight, User, LogOut, Code, Award, GraduationCap, BookOpenCheck, Loader2 } from 'lucide-react';
// Gọi API từ file dịch vụ thực tế của bạn
import { courseApi } from '../services/course.api';
import type { Course } from '../services/course.api';

// ==========================================
// ĐỊNH NGHĨA CẤU TRÚC DANH MỤC CỦA BẠN
// ==========================================
interface SubCategory {
    name: string;
    slug: string;
}

interface MainCategory {
    id: string;
    name: string;
    icon: React.ReactNode;
    subCategories: SubCategory[];
}

const CATEGORY_DATA: MainCategory[] = [
    {
        id: 'cpp',
        name: 'Lập trình C/C++',
        icon: <Code className="w-4 h-4" />,
        subCategories: [{ name: 'Nền tảng C++', slug: 'cpp-basic' }, { name: 'C++ Nâng cao & Thuật toán', slug: 'cpp-advance' }]
    },
    {
        id: 'python',
        name: 'Lập trình Python',
        icon: <Code className="w-4 h-4" />,
        subCategories: [{ name: 'Python Cơ bản', slug: 'py-basic' }, { name: 'Python Nâng Cao', slug: 'py-advance' }, { name: 'Khoa học dữ liệu', slug: 'py-data' }]
    },
    {
        id: 'tinhockhe',
        name: 'Ôn thi Tin học trẻ',
        icon: <Award className="w-4 h-4" />,
        subCategories: [{ name: 'Tiểu Học (Bảng A)', slug: 'thk-a' }, { name: 'THCS (Bảng B)', slug: 'thk-b' }, { name: 'THPT (Bảng C)', slug: 'thk-c' }]
    },
    {
        id: 'daihoc',
        name: 'Ôn thi đại học',
        icon: <GraduationCap className="w-4 h-4" />,
        subCategories: [
            { name: 'Luyện thi TSA (Bách Khoa)', slug: 'tsa' },
            { name: 'Luyện thi HSA (ĐHQG)', slug: 'hsa' },
            { name: 'Thi Tốt nghiệp THPT', slug: 'graduation' },
            { name: 'Khóa học Nền tảng', slug: 'foundation' }
        ]
    },
    {
        id: 'thcs',
        name: 'Lớp 6 - Lớp 9',
        icon: <BookOpen className="w-4 h-4" />,
        subCategories: [
            { name: 'Toán', slug: 'm69-toan' }, { name: 'Ngữ Văn', slug: 'm69-van' },
            { name: 'Tiếng Anh', slug: 'm69-anh' }, { name: 'Vật Lý', slug: 'm69-ly' },
            { name: 'Hóa Học', slug: 'm69-hoa' }, { name: 'Sinh Học', slug: 'm69-sinh' }
        ]
    },
    {
        id: 'thpt',
        name: 'Lớp 10 - Lớp 12',
        icon: <BookOpenCheck className="w-4 h-4" />,
        subCategories: [
            { name: 'Toán', slug: 'm1012-toan' }, { name: 'Ngữ Văn', slug: 'm1012-van' },
            { name: 'Tiếng Anh', slug: 'm1012-anh' }, { name: 'Vật Lý', slug: 'm1012-ly' },
            { name: 'Hóa Học', slug: 'm1012-hoa' }, { name: 'Sinh Học', slug: 'm1012-sinh' }
        ]
    }
];

const CourseCatalogPage: React.FC = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState<any>(null);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    
    // Các State kết nối Database thật
    const [courses, setCourses] = useState<Course[] | any[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // Trạng thái Hover UI
    const [isCategoryHovered, setIsCategoryHovered] = useState<boolean>(false);
    const [activeHoverCategory, setActiveHoverCategory] = useState<MainCategory | null>(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }

        // Thực hiện gọi API lấy khóa học thật từ DB
        const fetchCourses = async () => {
            try {
                setIsLoading(true);
                const data = await courseApi.getAllCourses();
                // LỌC CHỈ LẤY CÁC KHÓA HỌC ĐÃ ĐƯỢC XUẤT BẢN (PUBLISHED)
                const activeCourses = data.filter((c: any) => c.status === 'published');
                setCourses(activeCourses);
            } catch (err) {
                console.error("Lỗi gọi DB:", err);
                setError("Không thể tải danh sách khóa học thực tế từ máy chủ.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchCourses();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('user');
        setUser(null);
        navigate('/login');
    };

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
    };

    // Hàm thực hiện tìm kiếm và lọc danh mục dữ liệu từ Database
    const filteredCourses = courses.filter(course => {
        const textToSearch = `${course.title || ''} ${course.short_desc || course.description || ''}`.toLowerCase();
        const matchesSearch = textToSearch.includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === 'all' || course.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <div className="min-h-screen bg-gray-50 text-gray-800 font-sans relative transition-all duration-300">
            
            {/* HIỆU ỨNG OVERLAY: Làm tối vùng xung quanh khi rà chuột vào Navbar */}
            <div className={`fixed inset-0 bg-black/40 z-40 transition-opacity duration-300 pointer-events-none ${isCategoryHovered ? 'opacity-100' : 'opacity-0'}`} />

            {/* ========================================================
                NAV BAR CAO CẤP: LOGO -> DANH MỤC -> THANH TÌM KIẾM
               ======================================================== */}
            <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-20 gap-6">
                        
                        {/* 1. LOGO TRÍ ANH EDUCATION */}
                        <div className="flex-shrink-0">
                            <Link to="/" className="flex items-center gap-2">
                                <span className="text-2xl font-black tracking-wider text-[#e15f41]">
                                    Trí Anh <span className="text-[#596275] font-bold">Education</span>
                                </span>
                            </Link>
                        </div>

                        {/* 2. HOVER MENU DANH MỤC 2 CẤP */}
                        <div className="flex-1 flex justify-center">
                            <div 
                                className="relative py-4"
                                onMouseEnter={() => setIsCategoryHovered(true)}
                                onMouseLeave={() => {
                                    setIsCategoryHovered(false);
                                    setActiveHoverCategory(null);
                                }}
                            >
                                <button className="uppercase flex items-center gap-1.5 font-bold text-gray-700 hover:text-[#e15f41] transition-colors cursor-pointer text-sm">
                                    <Layers className="w-4 h-4 text-[#e15f41]" /> Bộ lọc chương trình học
                                </button>

                                {/* BOX MENU THẢ XUỐNG 2 CẤP */}
                                {isCategoryHovered && (
                                    <div className="absolute left-1/2 -translate-x-1/2 top-full mt-0.5 w-72 bg-white border border-gray-200 shadow-2xl rounded-xl flex overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                                        
                                        {/* CẤP 1: Danh mục cha */}
                                        <div className="w-full bg-white py-2 border-r border-gray-100">
                                            {CATEGORY_DATA.map((cat) => (
                                                <div
                                                    key={cat.id}
                                                    className="flex items-center justify-between px-4 py-3 hover:bg-orange-50 text-gray-700 hover:text-[#e15f41] font-medium transition-colors cursor-pointer text-sm"
                                                    onMouseEnter={() => setActiveHoverCategory(cat)}
                                                >
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-[#e15f41]">{cat.icon}</span>
                                                        <span>{cat.name}</span>
                                                    </div>
                                                    <ChevronRight className="w-4 h-4 opacity-50" />
                                                </div>
                                            ))}
                                        </div>

                                        {/* CẤP 2: Khóa học con hiển thị bên cạnh */}
                                        {activeHoverCategory && (
                                            <div className="absolute left-72 top-0 w-64 h-full bg-gray-50 py-2 shadow-inner border-l border-gray-200 animate-in fade-in slide-in-from-left-2 duration-150">
                                                <div className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-gray-400">
                                                    Chi tiết phân loại
                                                </div>
                                                {activeHoverCategory.subCategories.map((sub, idx) => (
                                                    <div
                                                        key={idx}
                                                        onClick={() => {
                                                            setSelectedCategory(activeHoverCategory.name);
                                                            setIsCategoryHovered(false);
                                                        }}
                                                        className="px-4 py-2.5 hover:bg-orange-50 text-gray-600 hover:text-[#e15f41] text-sm transition-colors cursor-pointer font-normal"
                                                    >
                                                        {sub.name}
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* 3. THANH TÌM KIẾM + AVATAR USER (Phải) */}
                        <div className="flex-shrink-0 flex items-center gap-6">
                            <div className="relative w-64 md:w-80 hidden md:block">
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                    <Search className="w-5 h-5 text-gray-400" />
                                </span>
                                <input
                                    type="text"
                                    placeholder="Tìm kiếm khóa học..."
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#e15f41] focus:border-transparent text-sm transition-all"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                        </div>

                    </div>
                </div>
            </nav>

            {/* LAYOUT CHÍNH: SIDEBAR (TRÁI) & DỮ LIỆU THẬT TỪ DATABASE (PHẢI) */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-col lg:flex-row gap-8 items-start">
                    
                    {/* ========================================================
                        SIDEBAR DANH MỤC DỌC CAO CẤP (LUÔN CỐ ĐỊNH BÊN TRÁI)
                       ======================================================== */}
                    <aside className="w-full lg:w-72 flex-shrink-0 sticky top-24 z-30">
                        <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm">
                            <div className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-4 px-2">
                                Bộ lọc chương trình học
                            </div>
                            
                            <div className="space-y-1.5">
                                {/* Nút Tất cả khóa học */}
                                <button 
                                    onClick={() => setSelectedCategory('all')}
                                    className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl border text-sm font-bold transition-all cursor-pointer ${
                                        selectedCategory === 'all' 
                                        ? 'bg-orange-50 border-[#e15f41] text-[#e15f41] shadow-sm' 
                                        : 'bg-gray-50/50 border-gray-100 text-gray-700 hover:bg-gray-50 hover:border-gray-300'
                                    }`}
                                >
                                    <div className="flex items-center gap-2.5">
                                        <div className={`w-2 h-2 rounded-full ${selectedCategory === 'all' ? 'bg-[#e15f41]' : 'bg-gray-400'}`} />
                                        <span>Tất cả khóa học</span>
                                    </div>
                                </button>

                                {/* Map danh mục cha & hiệu ứng xổ chéo */}
                                {CATEGORY_DATA.map((cat) => {
                                    const isCurrentActive = selectedCategory === cat.name;
                                    return (
                                        <div key={cat.id} className="relative group">
                                            <div className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl border text-sm font-semibold transition-all duration-200 ${
                                                isCurrentActive 
                                                ? 'bg-orange-50 border-[#e15f41] text-[#e15f41] shadow-sm' 
                                                : 'bg-white border-gray-100 text-gray-700 hover:bg-orange-50/30 hover:border-gray-200'
                                            }`}>
                                                <div onClick={() => setSelectedCategory(cat.name)} className="flex items-center gap-2.5 flex-1 cursor-pointer select-none">
                                                    <div className={isCurrentActive ? 'text-[#e15f41]' : 'text-gray-400'}>{cat.icon}</div>
                                                    <span className="truncate">{cat.name}</span>
                                                </div>
                                                <div className="w-6 h-6 rounded-md bg-gray-50 flex items-center justify-center border border-gray-100 group-hover:bg-[#e15f41] group-hover:border-[#e15f41] transition-all duration-200 ml-2">
                                                    <ChevronRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-white group-hover:rotate-90 transition-transform duration-200" />
                                                </div>
                                            </div>

                                            {/* Menu cấp 2 xổ chéo từ mũi tên */}
                                            <div className="absolute left-full top-0 ml-1.5 w-64 bg-white border border-gray-200 rounded-2xl shadow-xl p-3 z-40 transform scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-100 origin-top-left transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]">
                                                <div className="text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-2 pb-1 border-b border-gray-100">
                                                    Lộ trình chi tiết
                                                </div>
                                                <div className="space-y-1">
                                                    {cat.subCategories.map((sub, idx) => (
                                                        <div
                                                            key={idx}
                                                            onClick={() => setSelectedCategory(cat.name)}
                                                            className="w-full text-left px-3 py-2 rounded-lg text-xs font-medium text-gray-600 hover:bg-orange-50 hover:text-[#e15f41] transition-colors cursor-pointer"
                                                        >
                                                            {sub.name}
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </aside>

                    {/* ========================================================
                        KHU VỰC CHỈ ĐỔ KHÓA HỌC PUBLIC (THAY THẾ MOCK DATA)
                       ======================================================== */}
                    <div className="flex-1 w-full">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-gray-200/60">
                            <div>
                                <h1 className="text-xl font-extrabold text-gray-900 tracking-tight">
                                    {selectedCategory === 'all' ? 'Tất Cả Chương Trình Học' : `${selectedCategory}`}
                                </h1>
                            </div>
                            <div className="text-[11px] font-bold text-gray-500 bg-gray-100 px-3 py-1.5 rounded-lg">
                                Kết quả: {isLoading ? '...' : filteredCourses.length} khóa học
                            </div>
                        </div>

                        {/* HIỂN THỊ LỖI NẾU CONNECT BACKEND SẬP */}
                        {error && (
                            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl mb-6 text-sm font-medium">
                                {error}
                            </div>
                        )}

                        {/* TRẠNG THÁI LOADING CHỈ CHẠY RIÊNG TRONG KHU VỰC NÀY */}
                        {isLoading ? (
                            <div className="py-24 flex flex-col items-center justify-center bg-white border border-gray-200/60 rounded-2xl shadow-sm">
                                <Loader2 className="w-10 h-10 animate-spin text-[#e15f41] mb-3" />
                                <h3 className="text-sm font-bold text-gray-700">Đang đồng bộ dữ liệu khóa học thật...</h3>
                                <p className="text-xs text-gray-400 mt-0.5">Hệ thống đang quét các lớp public từ database.</p>
                            </div>
                        ) : filteredCourses.length > 0 ? (
                            /* LƯỚI KHÓA HỌC THẬT TỪ DATABASE */
                            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                                {filteredCourses.map((course) => (
                                    <div 
                                        key={course.id || course.course_group_id} 
                                        className="bg-white rounded-2xl border border-gray-200/70 shadow-sm hover:shadow-xl hover:border-orange-200/50 transition-all duration-300 overflow-hidden flex flex-col group"
                                    >
                                        {/* Ảnh Banner lấy từ DB */}
                                        <div className="relative aspect-video w-full bg-gray-50 overflow-hidden">
                                            <img 
                                                src={course.image_url || course.imageUrl || 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=500'} 
                                                alt={course.title}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                loading="lazy"
                                            />
                                            <div className="absolute top-3 left-3">
                                                <span className="bg-white/90 backdrop-blur-sm text-[#e15f41] text-[10px] font-extrabold px-2.5 py-1 rounded-lg border border-orange-100 shadow-sm uppercase tracking-wider">
                                                    {/* hiển thị tên danh mục, nếu không có danh mục thì hiển thị 'Khóa học' */}
                                                    {course.category || 'Khóa học'}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Thông tin Chi tiết */}
                                        <div className="p-5 flex-1 flex flex-col justify-between gap-4">
                                            <div className="space-y-1.5">
                                                <h3 className="font-bold text-gray-900 text-sm md:text-base line-clamp-2 group-hover:text-[#e15f41] transition-colors leading-snug">
                                                    {course.title}
                                                </h3>
                                                <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed">
                                                    {course.shortDesc || 'Chưa cập nhật mô tả ngắn.'}
                                                </p>
                                            </div>

                                            {/* Giá & Giảng viên kết nối DB */}
                                            <div className="pt-3.5 border-t border-gray-100 flex items-center justify-between">
                                                <div>
                                                    <div className="text-[9px] text-gray-400 font-bold uppercase tracking-wider">Giảng viên</div>
                                                    <div className="text-xs font-bold text-gray-600 mt-0.5">{course.teacher?.fullName || course.teacherId || 'Chưa cập nhật'}</div>
                                                </div>
                                                <div className="text-right">
                                                    {course.discount_price ? (
                                                        <div className="flex flex-col">
                                                            <span className="text-[10px] text-gray-400 line-through">{formatPrice(course.price)}</span>
                                                            <span className="text-base font-black text-[#e15f41]">{formatPrice(course.discount_price)}</span>
                                                        </div>
                                                    ) : (
                                                        <span className="text-base font-black text-[#e15f41]">{formatPrice(course.price)}</span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            /* Trạng thái không tìm thấy kết quả */
                            <div className="bg-white border border-gray-200 rounded-2xl p-12 text-center max-w-sm mx-auto mt-12 shadow-sm">
                                <BookOpen className="w-10 h-10 text-gray-300 mx-auto mb-3" />
                                <h3 className="font-bold text-gray-800 text-base">Chưa có lớp học nào</h3>
                                <p className="text-xs text-gray-400 mt-1 leading-relaxed">Hiện tại chưa có khóa học public nào thuộc danh mục này.</p>
                            </div>
                        )}
                    </div>

                </div>
            </main>
        </div>
    );
};

export default CourseCatalogPage;