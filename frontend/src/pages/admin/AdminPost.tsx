import React, { useState, useEffect } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { postApi, Post } from '../../services/api';

const AdminPost: React.FC = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    const fetchPosts = async () => {
        setIsLoading(true);
        try {
            const data = await postApi.getAllPosts();
            setPosts(data);
        } catch (error) {
            console.error("Lỗi:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => { fetchPosts(); }, []);

    const handleAdd = () => {
        navigate('/admin/posts/create');
    };

    const handleDelete = async (id: number) => {
        if (window.confirm("Bạn có chắc chắn muốn xóa bài viết này không?")) {
            try {
                await postApi.deletePost(id);
                alert("Đã xóa thành công!");
                fetchPosts();
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
            </div>
        </div>
    );
};

export default AdminPost;
