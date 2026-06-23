import React, { useState, useEffect } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { postApi, Post } from '../../services/api';

const AdminPost: React.FC = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [total, setTotal] = useState(0);
    const LIMIT = 10;
    const navigate = useNavigate();

    const fetchPosts = async (page: number) => {
        setIsLoading(true);
        try {
            const data = await postApi.getAllPostsPaginated(page, LIMIT);
            setPosts(data.data);
            setTotalPages(data.totalPages);
            setTotal(data.total);
        } catch (error) {
            console.error("Lỗi:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => { fetchPosts(currentPage); }, [currentPage]);

    const handleAdd = () => {
        navigate('/admin/posts/create');
    };

    const handleDelete = async (id: number) => {
        if (window.confirm("Bạn có chắc chắn muốn xóa bài viết này không?")) {
            try {
                await postApi.deletePost(id);
                alert("Đã xóa thành công!");
                fetchPosts(currentPage);
            } catch (error) {
                alert("Không thể xóa bài viết này!");
            }
        }
    };

    return (
        <div>
            <div className="page-header-actions">
                <h2 className="admin-page-title">Quản lý Bài viết</h2>
                <button className="btn btn-icon btn-add" onClick={handleAdd}>
                    <Plus size={18} /> Thêm Bài viết
                </button>
            </div>

            <div className="table-card">
                <table className="admin-table">
                    <thead>
                        <tr><th>ID</th><th>Tiêu đề</th><th>Tác giả</th><th>Trạng thái</th><th>Ngày tạo</th><th>Thao tác</th></tr>
                    </thead>
                    <tbody>
                        {isLoading ? <tr><td colSpan={6} style={{ textAlign: 'center' }}>Đang tải...</td></tr> :
                            posts.map(post => (
                                <tr key={post.id}>
                                    <td>#{post.id}</td>
                                    <td><strong>{post.title}</strong></td>
                                    <td>{post.authorName}</td>
                                    <td>
                                        <span style={{
                                            padding: '4px 12px',
                                            borderRadius: '4px',
                                            fontSize: '0.85rem',
                                            fontWeight: '500',
                                            backgroundColor: post.status === 'published' ? '#dcfce7' : '#fef3c7',
                                            color: post.status === 'published' ? '#15803d' : '#92400e'
                                        }}>
                                            {post.status === 'published' ? 'Đã đăng' : 'Nháp'}
                                        </span>
                                    </td>
                                    <td>{new Date(post.createdAt).toLocaleDateString('vi-VN')}</td>
                                    <td>
                                        <div className="action-buttons">
                                            <button className="btn-delete" onClick={() => handleDelete(post.id)}><Trash2 size={16} /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px', borderTop: '1px solid var(--admin-border)' }}>
                    <span style={{ fontSize: '0.85rem', color: '#64748b' }}>
                        Tổng {total} bài viết
                    </span>
                    <div style={{ display: 'flex', gap: '6px' }}>
                        <button
                            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                            disabled={currentPage === 1}
                            style={{ padding: '6px 12px', border: '1px solid var(--admin-border)', borderRadius: '6px', background: currentPage === 1 ? '#f1f5f9' : '#fff', cursor: currentPage === 1 ? 'not-allowed' : 'pointer' }}
                        >
                            ← Trước
                        </button>

                        {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                            <button
                                key={page}
                                onClick={() => setCurrentPage(page)}
                                style={{ padding: '6px 12px', border: '1px solid var(--admin-border)', borderRadius: '6px', background: currentPage === page ? 'var(--admin-primary)' : '#fff', color: currentPage === page ? '#fff' : 'inherit', cursor: 'pointer' }}
                            >
                                {page}
                            </button>
                        ))}

                        <button
                            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                            disabled={currentPage === totalPages}
                            style={{ padding: '6px 12px', border: '1px solid var(--admin-border)', borderRadius: '6px', background: currentPage === totalPages ? '#f1f5f9' : '#fff', cursor: currentPage === totalPages ? 'not-allowed' : 'pointer' }}
                        >
                            Tiếp →
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminPost;
