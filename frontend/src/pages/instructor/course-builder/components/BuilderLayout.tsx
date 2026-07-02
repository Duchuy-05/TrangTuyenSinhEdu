import React, { ReactNode } from 'react';

interface BuilderLayoutProps {
  sidebar?: ReactNode;   
  settings?: ReactNode;  
  children: ReactNode;   
}

export default function BuilderLayout({ sidebar, settings, children }: BuilderLayoutProps) {
  return (
    <div className="flex w-full h-full bg-slate-100 overflow-hidden font-sans">
      
      {/* SIDEBAR */}
      {sidebar && (
        <aside className="w-1/5 h-full z-20 flex-shrink-0 shadow-[4px_0_24px_rgba(0,0,0,0.02)] relative">
          {sidebar}
        </aside>
      )}

      {/* NỘI DUNG EDITOR */}
      <main className="w-3/5 h-full relative overflow-hidden flex flex-col z-10">
        {children}
      </main>

      {/* SETTINGS */}
      {settings && (
        <aside className="w-1/5 h-full z-20 flex-shrink-0 shadow-[-4px_0_24px_rgba(0,0,0,0.02)] relative">
          {settings}
        </aside>
      )}

    </div>
  );
}