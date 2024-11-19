import Link from 'next/link';

export const ArchitectureItem = ({
    title,
    author,
    cost,
    date,
    stars,
    imports,
}: {
    title: string;
    author: string;
    cost: number;
    date: string;
    stars: number;
    imports: number;
}) => {
    return (
        <li className="hover:bg-gray-50 border-b flex px-3 py-2">
            <div className="flex flex-col basis-7/12">
                <div>
                    <Link href="#">{title}</Link>
                </div>
                <div className="text-xs text-gray-400 flex">
                    <div>{date}</div>
                    <div className="ml-2">{author}</div>
                </div>
            </div>
            <div className="flex flex-grow justify-end text-right items-center text-sm">
                <div>{cost}</div>
                <div className="w-32">{stars}</div>
                <div className="w-32">{imports}</div>
            </div>
        </li>
    );
};
