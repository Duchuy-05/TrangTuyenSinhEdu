import { Teacher } from '../services/api';

export const mockTeachers: Teacher[] = [
    {
        id: 1,
        fullName: 'Nguyễn Văn A',
        email: 'nguyenvana@example.com',
        phone: '0901234567',
        specialization: 'Giảng viên Scratch & Python',
        bio: 'Thạc sĩ Khoa học Máy tính. Có nhiều kinh nghiệm giảng dạy lập trình cho trẻ em và người mới bắt đầu.',
        avatarUrl: 'https://i.pravatar.cc/150?img=11'
    },
    {
        id: 2,
        fullName: 'Trần Thị B',
        email: 'tranthib@example.com',
        phone: '0987654321',
        specialization: 'Senior Frontend Developer',
        bio: 'Chuyên gia về ReactJS, VueJS và UI/UX Design. Thường xuyên chia sẻ kiến thức tại các hội thảo công nghệ lớn.',
        avatarUrl: 'https://i.pravatar.cc/150?img=5'
    },
    {
        id: 3,
        fullName: 'Lê Hoàng C',
        email: 'lehoangc@example.com',
        phone: '0912345678',
        specialization: 'Chuyên gia Data Science',
        bio: 'Nghiên cứu sinh ngành AI. Giảng viên thỉnh giảng tại Đại học Bách Khoa Hà Nội.',
        avatarUrl: 'https://i.pravatar.cc/150?img=68'
    },
    {
        id: 4,
        fullName: 'Phạm Minh D',
        email: 'phamminhd@example.com',
        phone: '0934567890',
        specialization: 'Software Architect',
        bio: 'Tác giả của nhiều khóa học System Design nổi tiếng. Đam mê xây dựng các hệ thống chịu tải cao.',
        avatarUrl: 'https://i.pravatar.cc/150?img=33'
    }
];
