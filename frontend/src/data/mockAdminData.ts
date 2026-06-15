export const mockAdminData = {
    stats: {
        totalStudents: 1250,
        newRegistrations: 48,
        activeCourses: 12,
        estimatedRevenue: "350.000.000 VNĐ"
    },
    registrations: [
        {
            id: "REG-001",
            parentName: "Nguyễn Văn A",
            studentName: "Nguyễn Văn B",
            phone: "0901234567",
            email: "nguyenvana@example.com",
            course: "Tư Duy Lập Trình Với Scratch",
            date: "2024-05-20",
            status: "pending" // pending, contacted, success, rejected
        },
        {
            id: "REG-002",
            parentName: "Trần Thị C",
            studentName: "Lê C",
            phone: "0987654321",
            email: "tranthic@example.com",
            course: "Lập trình Web với ReactJS",
            date: "2024-05-19",
            status: "contacted"
        },
        {
            id: "REG-003",
            parentName: "Phạm Văn D",
            studentName: "Phạm D",
            phone: "0912345678",
            email: "phamvand@example.com",
            course: "Lập trình Python cho trẻ em",
            date: "2024-05-18",
            status: "success"
        },
        {
            id: "REG-004",
            parentName: "Hoàng Thị E",
            studentName: "Vũ E",
            phone: "0934567890",
            email: "hoangthie@example.com",
            course: "Tư Duy Lập Trình Với Scratch",
            date: "2024-05-18",
            status: "pending"
        },
        {
            id: "REG-005",
            parentName: "Đỗ Văn F",
            studentName: "Đỗ F",
            phone: "0945678901",
            email: "dovanf@example.com",
            course: "Lập trình C++ Cơ bản",
            date: "2024-05-17",
            status: "rejected"
        }
    ],
    courses: [
        {
            id: "C-001",
            title: "Tư Duy Lập Trình Với Scratch",
            category: "Trẻ em",
            students: 120,
            status: "active"
        },
        {
            id: "C-002",
            title: "Lập trình Web với ReactJS",
            category: "Người lớn",
            students: 350,
            status: "active"
        },
        {
            id: "C-003",
            title: "Lập trình Python cho trẻ em",
            category: "Trẻ em",
            students: 85,
            status: "draft"
        }
    ]
};
