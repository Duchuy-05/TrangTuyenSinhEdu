import React from 'react';

// Giữ lại các khối giả như đã bàn
const TextBlock = () => <div className="p-4 text-slate-500 bg-slate-100 rounded-lg border border-dashed border-slate-300">📝 Khối Văn bản (Đang xây dựng...)</div>;
const VideoBlock = () => <div className="p-4 text-slate-500 bg-slate-100 rounded-lg border border-dashed border-slate-300">▶️ Khối Video (Đang xây dựng...)</div>;
const ImageBlock = () => <div className="p-4 text-slate-500 bg-slate-100 rounded-lg border border-dashed border-slate-300">🖼️ Khối Hình ảnh (Đang xây dựng...)</div>;
const QuizBlock = () => <div className="p-4 text-slate-500 bg-slate-100 rounded-lg border border-dashed border-slate-300">❓ Khối Quiz (Đang xây dựng...)</div>;

const BLOCK_COMPONENTS: Record<string, React.FC<any>> = {
  text: TextBlock,
  video: VideoBlock,
  image: ImageBlock,
  quiz: QuizBlock,
};

interface BlockProps {
  block: {
    id: string;
    type: string;
    data?: any;
  };
}

export default function BlockRenderer({ block }: BlockProps) {
  const Component = BLOCK_COMPONENTS[block?.type];

  if (!Component) {
    return <div className="p-4 text-red-500 bg-red-50 rounded-lg">Loại nội dung không hỗ trợ!</div>;
  }

  return (
    <div className="relative p-4 mb-4 transition-all bg-white border border-blue-100 shadow-sm rounded-xl hover:shadow-md hover:border-orange-300 group">
      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button className="text-slate-400 hover:text-orange-500" title="Xóa khối này">🗑️</button>
      </div>
      
      <Component data={block?.data} />
    </div>
  );
}