import Link from 'next/link';

export const SidebarItem = ({
    name,
    href,
    segment,
}: {
    name: string;
    href: string;
    segment?: string | null;
}) => {
    const isActive = segment === href.split('/').at(-1);
    return (
        <li>
            <Link
                href={href}
                className={`block rounded-lg px-4 py-1.5  ${isActive ? 'bg-gray-100' : 'hover:bg-gray-50'}`}
            >
                {name}
            </Link>
        </li>
    );
};
