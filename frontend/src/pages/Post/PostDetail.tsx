import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { postApi, Post } from '../../services/api';
import './PostDetails.css';

const PostDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!slug) return;
    postApi.getPostBySlug(slug)
      .then(setPost)
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) return <div className="post-detail-loading">Đang tải bài viết...</div>;

  if (notFound || !post) {
    console.log(post);
    return (
      <div className="post-detail-not-found">
        <h2>Không tìm thấy bài viết</h2>
        <Link to="/posts">← Quay lại Post</Link>
      </div>
    );
  }

  return (
    <div className="post-detail-page">
      <div className="post-detail-container">

        {/* Breadcrumb */}
        <nav className="post-detail-breadcrumb">
          <Link to="/">Trang chủ</Link>
          <span>/</span>
          <Link to="/posts">Post</Link>
          <span>/</span>
          <span>{post.title}</span>
        </nav>

        {/* Header */}
        <header className="post-detail-header">
          <h1 className="post-detail-title">{post.title}</h1>
          <div className="post-detail-meta">
            <span className="post-detail-author">✍ {post.authorName}</span>
            <span className="post-detail-dot">·</span>
            <span className="post-detail-date">
              {new Date(post.createdAt).toLocaleDateString('vi-VN', {
                day: '2-digit', month: 'long', year: 'numeric',
              })}
            </span>
          </div>
        </header>

        {/* Thumbnail */}
        {post.thumbnailUrl && (
          <div className="post-detail-thumbnail">
            <img src={post.thumbnailUrl} alt={post.title} />
          </div>
        )}

        {/* Content */}
        <article
          className="post-detail-content"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Back */}
        <div className="post-detail-back">
          <Link to="/posts">← Quay lại danh sách bài viết</Link>
        </div>

      </div>
    </div>
  );
};

export default PostDetail;
