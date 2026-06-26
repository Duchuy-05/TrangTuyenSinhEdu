import React, { ReactNode } from 'react';

interface BuilderLayoutProps {
  sidebar?: ReactNode;   
  settings?: ReactNode;  
  children: ReactNode;   
}

export default function BuilderLayout({ sidebar, settings, children }: BuilderLayoutProps) {
  return (
    // Container bao bọc toàn bộ màn hình, không cho phép cuộn trang tổng (overflow-hidden)
    <div className="flex w-screen h-screen bg-slate-100 overflow-hidden font-sans">
      
      {/* SIDEBAR */}
      {sidebar && (
        <aside className="h-full z-20 flex-shrink-0 shadow-[4px_0_24px_rgba(0,0,0,0.02)] relative">
          {sidebar}
        </aside>
      )}

      {/* NỘI DUNG EDITOR */}
      {/* flex-1 giúp cột giữa tự động giãn ra chiếm hết không gian còn lại */}
      <main className="flex-1 h-full relative overflow-hidden flex flex-col z-10">
        {children}
      </main>

      {/* SETTINGS */}
      {settings && (
        <aside className="h-full z-20 flex-shrink-0 shadow-[-4px_0_24px_rgba(0,0,0,0.02)] relative">
          {settings}
        </aside>
      )}

    </div>
  );
}