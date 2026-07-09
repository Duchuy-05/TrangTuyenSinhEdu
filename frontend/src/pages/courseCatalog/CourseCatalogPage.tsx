import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Code, Award, GraduationCap, BookOpenCheck, Loader2 } from 'lucide-react';

// Import các Module con vừa bẻ tách ra
import { MainCategory, Course } from '../../services/course.api';
import { CatalogNavbar } from './CatalogNavbar';
import { CatalogSidebar } from './CatalogSidebar';
import { CourseCard } from './CourseCard';
import { courseApi } from '../../services/course.api';

// Mảng tĩnh phục vụ dựng giao diện NavBar & Sidebar
const SIDEBAR_CATEGORIES: MainCategory[] = [
    { id: 'cpp', name: 'Lập trình C/C++', icon: <Code className="w-4 h-4" />, subCategories: [{ name: 'Nền tảng C++', slug: 'cpp-basic' }, { name: 'C++ Nâng cao & Thuật toán', slug: 'cpp-advance' }] },
    { id: 'python', name: 'Lập trình Python', icon: <Code className="w-4 h-4" />, subCategories: [{ name: 'Python Cơ bản', slug: 'py-basic' }, { name: 'Python Nâng Cao', slug: 'py-advance' }] },
    { id: 'tinhockhe', name: 'Ôn thi Tin học trẻ', icon: <Award className="w-4 h-4" />, subCategories: [{ name: 'Bảng A (Tiểu học)', slug: 'thk-a' }, { name: 'Bảng B (THCS)', slug: 'thk-b' }] },
    { id: 'daihoc', name: 'Ôn thi đại học', icon: <GraduationCap className="w-4 h-4" />, subCategories: [{ name: 'Luyện thi TSA', slug: 'tsa' }, { name: 'Luyện thi HSA', slug: 'hsa' }] },
    { id: 'thcs', name: 'Lớp 6 - Lớp 9', icon: <BookOpen className="w-4 h-4" />, subCategories: [{ name: 'Toán', slug: 'm69-toan' }, { name: 'Ngữ Văn', slug: 'm69-van' }, { name: 'Tiếng Anh', slug: 'm69-anh' }, { name: 'Vật Lý', slug: 'm1012-ly' },
            { name: 'Hóa Học', slug: 'm1012-hoa' }, { name: 'Sinh Học', slug: 'm1012-sinh' }] },
    { id: 'thpt', name: 'Lớp 10 - Lớp 12', icon: <BookOpenCheck className="w-4 h-4" />, subCategories: [{ name: 'Toán', slug: 'm1012-toan' }, { name: 'Ngữ Văn', slug: 'm1012-van' }, { name: 'Tiếng Anh', slug: 'm1012-anh' }, { name: 'Vật Lý', slug: 'm1012-ly' },
            { name: 'Hóa Học', slug: 'm1012-hoa' }, { name: 'Sinh Học', slug: 'm1012-sinh' }] }
];

// hàm lọc thanh tìm kiếm
const removeVietnameseAccents = (str: string) => {
    if (!str) return '';
    return str
        .normalize('NFD') // Tách chữ và dấu
        .replace(/[\u0300-\u036f]/g, '') // Xóa các dấu
        .replace(/đ/g, 'd').replace(/Đ/g, 'D') // Xử lý chữ Đ
        .toLowerCase()
        .trim();
};

const CourseCatalogPage: React.FC = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState<any>(null);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    
    // State quản lý kết nối DB
    const [courses, setCourses] = useState<Course[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // Trạng thái điều khiển UI Hover và Responsive Drawer
    const [isCategoryHovered, setIsCategoryHovered] = useState<boolean>(false);
    const [activeHoverCategory, setActiveHoverCategory] = useState<MainCategory | null>(null);
    const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState<boolean>(false);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) setUser(JSON.parse(storedUser));

        const fetchCourses = async () => {
            try {
                setIsLoading(true);
                const data = await courseApi.getAllCourses();
                // Chỉ lấy khóa học public
                const activeCourses = data.filter((c: any) => c.status === 'published');
                setCourses(activeCourses);
            } catch (err) {
                setError("Không thể tải danh sách khóa học thực tế.");
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

    // logic thanh tìm kiếm và lọc danh mục
    const filteredCourses = courses.filter(course => {
        // Xóa dấu câu, in thường
        const normalizedQuery = removeVietnameseAccents(searchQuery);

        // Nếu không nhập gì, bỏ qua bước tìm kiếm text
        let matchesSearch = true;

        if (normalizedQuery !== '') {
            // lấy tên giảng viên
            const lecturerName = course.user?.fullName || course.teacher?.fullName || '';
            
            // giá tiền và giảm giảm
            const priceStr = course.price?.toString() || '';
            const discountStr = course.discountPrice?.toString() || '';

            // Gộp tất cả dữ liệu muốn cho phép tìm kiếm vào một chuỗi khổng lồ
            const searchableText = `
                ${course.title || ''} 
                ${course.shortDesc || ''} 
                ${course.category || ''} 
                ${lecturerName} 
                ${priceStr} 
                ${discountStr}
            `;

            // Chuẩn hóa chuỗi khổng lồ đó (Xóa dấu, in thường)
            const normalizedCourseData = removeVietnameseAccents(searchableText);

            // Kiểm tra xem từ khóa có nằm trong chuỗi khổng lồ không
            matchesSearch = normalizedCourseData.includes(normalizedQuery);
        }

        // 2. Logic kiểm tra theo Danh mục (Sidebar)
        const matchesCategory = selectedCategory === 'all' || course.category === selectedCategory;

        // Trả về khóa học thỏa mãn cả 2 điều kiện: Đúng từ khóa VÀ đúng danh mục
        return matchesSearch && matchesCategory;
    });

    return (
        <div className="min-h-screen bg-gray-50 text-gray-800 font-sans relative">
            
            {/* OVERLAY NỀN TỐI KHI HOVER NAVBAR DESKTOP */}
            <div className={`fixed inset-0 bg-black/40 z-40 transition-opacity duration-300 pointer-events-none ${isCategoryHovered ? 'opacity-100' : 'opacity-0'}`} />

            {/* 1. THANH NAVBAR (HEADER) COMPONENT CHUYÊN BIỆT */}
            <CatalogNavbar 
                user={user}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                handleLogout={handleLogout}
                categoryData={SIDEBAR_CATEGORIES}
                setSelectedCategory={setSelectedCategory}
                isCategoryHovered={isCategoryHovered}
                setIsCategoryHovered={setIsCategoryHovered}
                activeHoverCategory={activeHoverCategory}
                setActiveHoverCategory={setActiveHoverCategory}
                onToggleMobileSidebar={() => setIsMobileSidebarOpen(true)}
            />

            {/* BỐ CỤC CHÍNH */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-col lg:flex-row gap-8 items-start">
                    
                    {/* 2. SIDEBAR COMPONENT (TỰ ĐỘNG RESPONSIVE THEO KÍCH THƯỚC MÀN HÌNH) */}
                    <CatalogSidebar 
                        categoryData={SIDEBAR_CATEGORIES}
                        selectedCategory={selectedCategory}
                        setSelectedCategory={setSelectedCategory}
                        isOpenMobile={isMobileSidebarOpen}
                        onCloseMobile={() => setIsMobileSidebarOpen(false)}
                    />

                    {/* KHU VỰC KHÓA HỌC BÊN PHẢI */}
                    <div className="flex-1 w-full">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6 pb-4 border-b border-gray-200/60">
                            <div>
                                <h1 className="text-lg sm:text-xl font-extrabold text-gray-900 tracking-tight">
                                    {selectedCategory === 'all' ? 'Tất Cả Chương Trình Học' : selectedCategory}
                                </h1>
                                <p className="text-xs text-gray-400 mt-0.5">Học tập bài bản, đột phá tư duy cùng Trí Anh Education.</p>
                            </div>
                            <div className="text-[11px] font-bold text-gray-500 bg-gray-100 px-3 py-1.5 rounded-lg self-start sm:self-auto">
                                Kết quả: {isLoading ? '...' : filteredCourses.length} khóa học
                            </div>
                        </div>

                        {error && <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl mb-6 text-xs font-medium">{error}</div>}

                        {isLoading ? (
                            <div className="py-24 flex flex-col items-center justify-center bg-white border border-gray-200/60 rounded-2xl shadow-sm">
                                <Loader2 className="w-10 h-10 animate-spin text-[#e15f41] mb-3" />
                                <h3 className="text-sm font-bold text-gray-700">Đang đồng bộ dữ liệu khóa học...</h3>
                            </div>
                        ) : filteredCourses.length > 0 ? (
                            /* 3. LƯỚI CARDS KHÓA HỌC DÙNG COMPONENT ĐƠN NHIỆM */
                            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                                {filteredCourses.map((course) => (
                                    <CourseCard 
                                        key={course.id} 
                                        course={course} 
                                        formatPrice={formatPrice} 
                                    />
                                ))}
                            </div>
                        ) : (
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