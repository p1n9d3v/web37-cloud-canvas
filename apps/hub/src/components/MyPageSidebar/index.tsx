'use client';
import { useSelectedLayoutSegment } from 'next/navigation';
import { SidebarItem } from './item';

export const MyPageSidebar = () => {
    const segment = useSelectedLayoutSegment();

    const data = [
        {
            name: '내 아키텍쳐',
            href: './architectures',
        },
        {
            name: 'star 누른',
            href: './starred',
        },
        {
            name: '내가 공유한',
            href: './shared',
        },
        {
            name: '회원 탈퇴',
            href: './withdrawal',
        },
    ];
    return (
        <>
            <h2 className="px-4 mb-3 font-bold text-lg">마이 페이지</h2>
            <ul>
                {data.map((item) => (
                    <SidebarItem key={item.href} segment={segment} {...item} />
                ))}
            </ul>
        </>
    );
};
