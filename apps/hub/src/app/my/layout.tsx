import { MyPageSidebar } from '@/components/MyPageSidebar';
import React from 'react';

export default function MyPageLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return (
        <>
            <aside
                id="sidebar"
                className="fixed bottom-0 top-16 mt-10 w-60 overflow-y-auto pr-8"
            >
                <nav>
                    <MyPageSidebar />
                </nav>
            </aside>
            <div id="content" className="pl-60">
                {children}
            </div>
        </>
    );
}
