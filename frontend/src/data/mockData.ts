// src/data/mockData.ts

export interface Course {
    id: string;
    title: string;
    target: string;
    image: string;
    shortDesc: string;
    duration: string;
    format: string;
    price: string;
    teacher: {
        name: string;
        title: string;
        experience: string;
        company: string;
    };
    syllabus: string[];
}

export const coursesData: Course[] = [
    {
        id: "scratch-tu-duy",
        title: "Tư Duy Lập Trình Với Scratch",
        target: "Học sinh Lớp 6 - Lớp 7",
        image: "https://images.unsplash.com/photo-1555099962-4199c345e5dd?auto=format&fit=crop&w=800&q=80",
        shortDesc: "Làm quen với tư duy logic, thuật toán cơ bản thông qua việc kéo thả các khối lệnh trực quan. Học sinh tự tạo ra game và hoạt hình của riêng mình.",
        duration: "8 Tuần",
        format: "Online qua Zoom (Tối T7, CN)",
        price: "2.500.000 VNĐ",
        teacher: {
            name: "Cô Nguyễn Mai",
            title: "Chuyên gia Giáo dục STEM",
            experience: "5 năm kinh nghiệm dạy trẻ em",
            company: "EduPro"
        },
        syllabus: ["Chương 1: Làm quen với giao diện Scratch", "Chương 2: Biến số và Vòng lặp", "Chương 3: Lập trình game hứng táo", "Chương 4: Lập trình game Flappy Bird", "Chương 5: Trình bày dự án cuối khóa"]
    },
    {
        id: "python-ung-dung",
        title: "Lập Trình Python Ứng Dụng",
        target: "Học sinh Lớp 8 - Lớp 9",
        image: "https://images.unsplash.com/photo-1526379095098-d400fd0bfce8?auto=format&fit=crop&w=800&q=80",
        shortDesc: "Học ngôn ngữ lập trình phổ biến nhất thế giới. Rèn luyện tư duy giải quyết vấn đề, viết các công cụ tự động hóa và làm quen với AI.",
        duration: "12 Tuần",
        format: "Hybrid (Online + 1 buổi Offline/tháng)",
        price: "3.500.000 VNĐ",
        teacher: {
            name: "Thầy Trần Hùng",
            title: "Kỹ sư Phần mềm",
            experience: "7 năm kinh nghiệm",
            company: "FPT Software"
        },
        syllabus: ["Chương 1: Cấu trúc dữ liệu trong Python", "Chương 2: Câu lệnh điều kiện & Vòng lặp", "Chương 3: Hàm và Module", "Chương 4: Lập trình tương tác với File", "Chương 5: Xây dựng Chatbot cơ bản"]
    },
    {
        id: "thiet-ke-web",
        title: "Sáng Tạo Web HTML/CSS/JS",
        target: "Học sinh Lớp 10 - Lớp 12",
        image: "https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&w=800&q=80",
        shortDesc: "Trang bị kỹ năng lập trình thực tế, tự tay thiết kế và lập trình một trang web hoàn chỉnh. Xây dựng nền tảng vững chắc cho kỳ thi Đại học ngành IT.",
        duration: "14 Tuần",
        format: "Online qua Zoom + Video xem lại",
        price: "4.000.000 VNĐ",
        teacher: {
            name: "Thầy Lê Hoàng",
            title: "Senior Frontend Engineer",
            experience: "8 năm kinh nghiệm",
            company: "Shopee VN"
        },
        syllabus: ["Chương 1: Cấu trúc HTML & Thẻ cơ bản", "Chương 2: Làm đẹp Web với CSS", "Chương 3: Bố cục Flexbox & Grid", "Chương 4: Thêm tương tác với JavaScript", "Chương 5: Triển khai Website lên Internet"]
    }
];

export const teachersData = [
    { id: 1, name: "Nguyễn Văn A", role: "Senior Frontend", exp: "8 năm", company: "Shopee VN", avatar: "https://i.pravatar.cc/150?img=11", bio: "Chuyên gia về React và tối ưu hóa hiệu suất web." },
    { id: 2, name: "Trần Thị B", role: "Software Architect", exp: "10 năm", company: "VNG", avatar: "https://i.pravatar.cc/150?img=5", bio: "Đam mê xây dựng hệ thống phân tán và bảo mật." },
    { id: 3, name: "Lê Hoàng C", role: "Product Designer", exp: "6 năm", company: "MoMo", avatar: "https://i.pravatar.cc/150?img=8", bio: "Tin rằng thiết kế tốt là thiết kế giải quyết được vấn đề." }
];

export const reviewsData = [
    { id: 1, name: "Phạm D", job: "Junior Developer", avatar: "https://i.pravatar.cc/150?img=12", content: "Khóa học React thực sự chất lượng, mentor hỗ trợ 1-1 rất nhiệt tình. Tôi đã tìm được việc ngay sau khóa học." },
    { id: 2, name: "Hoàng E", job: "Sinh viên IT", avatar: "https://i.pravatar.cc/150?img=33", content: "Giáo trình sát với thực tế doanh nghiệp. Phần Docker và Microservices được giải thích cực kỳ dễ hiểu." },
    { id: 3, name: "Đặng F", job: "Graphic Designer", avatar: "https://i.pravatar.cc/150?img=20", content: "Chuyển ngành sang UI/UX không còn là ác mộng nhờ có khóa học này. Rất đáng tiền!" }
];