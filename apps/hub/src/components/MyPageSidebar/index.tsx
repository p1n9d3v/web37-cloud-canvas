'use client';
import { useSelectedLayoutSegment } from 'next/navigation';
import { SidebarItem } from './item';
import Link from 'next/link';

export const MyPageSidebar = () => {
    const segment = useSelectedLayoutSegment();

    const data = [
        {
            name: 'My Architectures',
            href: './architectures',
        },
        {
            name: 'Starred Architectures',
            href: './starred',
        },
        {
            name: 'Shared Architectures',
            href: './shared',
        },
    ];
    return (
        <>
            <h2 className="px-4 mb-3 font-bold text-lg">My Page</h2>
            <ul>
                {data.map((item) => (
                    <SidebarItem key={item.href} segment={segment} {...item} />
                ))}
            </ul>
            <Link href="./withdrawal" className="px-2 fixed bottom-0 mb-10">
                Withdrawal
            </Link>
        </>
    );
};
