import React from 'react';
import { Link } from 'react-router-dom';
import { Search, Layers, ChevronRight, User, LogOut, Menu } from 'lucide-react';
import { MainCategory } from '../../services/course.api';

interface CatalogNavbarProps {
    user: any;
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    handleLogout: () => void;
    categoryData: MainCategory[];
    setSelectedCategory: (catName: string) => void;
    isCategoryHovered: boolean;
    setIsCategoryHovered: (hover: boolean) => void;
    activeHoverCategory: MainCategory | null;
    setActiveHoverCategory: (cat: MainCategory | null) => void;
    onToggleMobileSidebar: () => void; // Event kích hoạt nút 3 gạch mobile
}

export const CatalogNavbar: React.FC<CatalogNavbarProps> = ({
    // user,
    searchQuery,
    setSearchQuery,
    // handleLogout,
    categoryData,
    setSelectedCategory,
    isCategoryHovered,
    setIsCategoryHovered,
    activeHoverCategory,
    setActiveHoverCategory,
    onToggleMobileSidebar
}) => {
    return (
        <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20 gap-4">
                    
                    {/* KHU VỰC TRÁI: NÚT 3 GẠCH (MOBILE) & LOGO */}
                    <div className="flex items-center gap-3 flex-shrink-0">
                        {/* Nút 3 gạch chỉ xuất hiện trên thiết bị di động < lg */}
                        <button 
                            onClick={onToggleMobileSidebar}
                            className="lg:hidden p-2 rounded-xl text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer"
                            aria-label="Mở bộ lọc danh mục"
                        >
                            <Menu className="w-6 h-6 text-[#e15f41]" />
                        </button>

                        <Link to="/" className="flex items-center gap-2">
                            <span className="text-[1.25rem] font-black tracking-wider text-[#e15f41]">
                                Trí Anh <span className="text-[#596275] font-bold text-[1.5rem]">Education</span>
                            </span>
                        </Link>
                    </div>

                    {/* KHU VỰC GIỮA: HOVER MENU 2 CẤP (CHỈ HIỂN THỊ TRÊN DESKTOP) */}
                    <div className="hidden lg:flex flex-1 justify-center">
                        <div 
                            className="relative py-4"
                            onMouseEnter={() => setIsCategoryHovered(true)}
                            onMouseLeave={() => {
                                setIsCategoryHovered(false);
                                setActiveHoverCategory(null);
                            }}
                        >
                            <button className="flex items-center gap-1.5 font-bold text-gray-700 hover:text-[#e15f41] transition-colors cursor-pointer text-sm">
                                <Layers className="w-4 h-4 text-[#e15f41]" /> Danh mục khóa học
                            </button>

                            {isCategoryHovered && (
                                <div className="absolute left-1/2 -translate-x-1/2 top-full mt-0.5 w-72 bg-white border border-gray-200 shadow-2xl rounded-xl flex overflow-hidden z-50">
                                    {/* Cấp 1 */}
                                    <div className="w-full bg-white py-2 border-r border-gray-100">
                                        {categoryData.map((cat) => (
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

                                    {/* Cấp 2 */}
                                    {activeHoverCategory && (
                                        <div className="absolute left-72 top-0 w-64 h-full bg-gray-50 py-2 shadow-inner border-l border-gray-200">
                                            <div className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-gray-400">Chi tiết</div>
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

                    {/* KHU VỰC PHẢI: TÌM KIẾM*/}
                    <div className="flex items-center gap-4 flex-shrink-0">
                        <div className="relative w-40 sm:w-48 md:w-64 lg:w-80">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <Search className="w-4 h-4 text-gray-400" />
                            </span>
                            <input  
                                type="text"
                                placeholder="Tìm kiếm khóa học..."
                                className="w-full pl-9 pr-4 py-1.5 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#e15f41] focus:border-transparent text-xs sm:text-sm transition-all"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};