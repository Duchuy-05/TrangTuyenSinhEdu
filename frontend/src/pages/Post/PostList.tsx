import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { postApi, Post } from '../../services/api';
import Navbar from '../../components/NavBar';
import Footer from '../../components/Footer';
import './PostList.css';

const PostList = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    postApi.getAllPublishedPosts()
      .then(setPosts)
      .finally(() => setLoading(false));
    
  }, []);

  if (loading) return <div className="post-loading">Đang tải bài viết...</div>;

  return (
    
    <div className="post-list-page">
        <Navbar />

        <div className="post-list-page">
        <div className="post-list-header">
            <h1>Post</h1>
            <p>Kiến thức & chia sẻ từ đội ngũ giảng viên</p>
        </div>

        <div className="post-list-container">
            {posts.length === 0 ? (
            <p className="post-empty">Chưa có bài viết nào.</p>
            ) : (
            <div className="post-grid">
                {posts.map((post) => (
                <Link to={`/posts/${post.slug}`} key={post.id} className="post-card">
                    <div className="post-card-thumbnail">
                    <img
                        src={post.thumbnailUrl || 'https://placehold.co/600x340?text=No+Image'}
                        alt={post.title}
                    />
                    </div>
                    <div className="post-card-body">
                    <p className="post-card-date">
                        {new Date(post.createdAt).toLocaleDateString('vi-VN', {
                        day: '2-digit', month: '2-digit', year: 'numeric',
                        })}
                    </p>
                    <h2 className="post-card-title">{post.title}</h2>
                    <p className="post-card-desc">{post.shortDesc}</p>
                    <div className="post-card-footer">
                        <span className="post-card-author">{post.authorName}</span>
                        <span className="post-card-read-more">Đọc tiếp →</span>
                    </div>
                    </div>
                </Link>
                ))}
            </div>
            )}
        </div>
        </div>

        <Footer />
    </div>
  );
};

export default PostList;
