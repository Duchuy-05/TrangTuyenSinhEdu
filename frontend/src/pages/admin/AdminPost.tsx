import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { postApi } from '../../services/api';
import './AdminPost.css';

const TOOLBAR_OPTIONS = [
  [{ header: [1, 2, 3, false] }],
  ['bold', 'italic', 'underline', 'strike'],
  [{ color: [] }, { background: [] }],
  [{ list: 'ordered' }, { list: 'bullet' }],
  [{ indent: '-1' }, { indent: '+1' }],
  ['blockquote', 'code-block'],
  ['link', 'image'],
  ['clean'],
];

const CreatePost = () => {
  const navigate = useNavigate();
  const thumbnailInputRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState({
    title: '',
    shortDesc: '',
    authorName: '',
    status: 'draft',
  });
  const [content, setContent] = useState('');
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string>('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleThumbnail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setThumbnailFile(file);
    setThumbnailPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (status: 'draft' | 'published') => {
    if (!form.title.trim()) {
      setError('Vui lòng nhập tiêu đề bài viết');
      return;
    }
    if (!content.trim() || content === '<p><br></p>') {
      setError('Vui lòng nhập nội dung bài viết');
      return;
    }

    setError('');
    setSubmitting(true);

    try {
      const formData = new FormData();
      formData.append('title', form.title);
      formData.append('shortDesc', form.shortDesc);
      formData.append('authorName', form.authorName);
      formData.append('content', content);
      formData.append('status', status);
      if (thumbnailFile) {
        formData.append('thumbnail', thumbnailFile);
      }

      await postApi.createPost(formData);
      navigate('/blog');
    } catch (err) {
      setError('Có lỗi xảy ra khi tạo bài viết. Vui lòng thử lại.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="create-post-page">
      <div className="create-post-container">

        {/* Page Header */}
        <div className="create-post-header">
          <h1>Tạo bài viết mới</h1>
          <div className="create-post-actions">
            <button
              className="btn-draft"
              onClick={() => handleSubmit('draft')}
              disabled={submitting}
            >
              Lưu nháp
            </button>
            <button
              className="btn-publish"
              onClick={() => handleSubmit('published')}
              disabled={submitting}
            >
              {submitting ? 'Đang đăng...' : 'Đăng bài'}
            </button>
          </div>
        </div>

        {error && <div className="create-post-error">{error}</div>}

        <div className="create-post-body">

          {/* Left — Main content */}
          <div className="create-post-main">
            <div className="form-group">
              <input
                type="text"
                name="title"
                placeholder="Tiêu đề bài viết..."
                value={form.title}
                onChange={handleChange}
                className="input-title"
              />
            </div>

            <div className="form-group">
              <textarea
                name="shortDesc"
                placeholder="Mô tả ngắn (hiển thị ở trang danh sách)..."
                value={form.shortDesc}
                onChange={handleChange}
                className="input-short-desc"
                rows={3}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Nội dung</label>
              <ReactQuill
                theme="snow"
                value={content}
                onChange={setContent}
                modules={{ toolbar: TOOLBAR_OPTIONS }}
                placeholder="Viết nội dung bài viết tại đây..."
                className="quill-editor"
              />
            </div>
          </div>

          {/* Right — Sidebar */}
          <div className="create-post-sidebar">

            {/* Thumbnail */}
            <div className="sidebar-card">
              <h3>Ảnh thumbnail</h3>
              <div
                className="thumbnail-upload"
                onClick={() => thumbnailInputRef.current?.click()}
              >
                {thumbnailPreview ? (
                  <img src={thumbnailPreview} alt="preview" className="thumbnail-preview" />
                ) : (
                  <div className="thumbnail-placeholder">
                    <span>🖼</span>
                    <p>Nhấn để chọn ảnh</p>
                  </div>
                )}
              </div>
              <input
                ref={thumbnailInputRef}
                type="file"
                accept="image/*"
                onChange={handleThumbnail}
                style={{ display: 'none' }}
              />
              {thumbnailPreview && (
                <button
                  className="btn-remove-thumbnail"
                  onClick={() => {
                    setThumbnailFile(null);
                    setThumbnailPreview('');
                  }}
                >
                  Xóa ảnh
                </button>
              )}
            </div>

            {/* Author */}
            <div className="sidebar-card">
              <h3>Tác giả</h3>
              <input
                type="text"
                name="authorName"
                placeholder="Tên tác giả..."
                value={form.authorName}
                onChange={handleChange}
                className="input-default"
              />
            </div>

            {/* Status */}
            <div className="sidebar-card">
              <h3>Trạng thái</h3>
              <select
                name="status"
                value={form.status}
                onChange={handleChange}
                className="input-default"
              >
                <option value="draft">Nháp</option>
                <option value="published">Đã đăng</option>
              </select>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;