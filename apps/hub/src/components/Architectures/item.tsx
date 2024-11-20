import Link from 'next/link';
import { Tag } from '../Tag';

export const ArchitectureItem = ({
    id,
    title,
    author,
    cost,
    createdAt,
    stars,
    imports,
    tags,
}: {
    id: number;
    title: string;
    author: string;
    cost: number;
    createdAt: string;
    stars: number;
    imports: number;
    tags: string[];
}) => {
    return (
        <li className="hover:bg-gray-50 border-b flex px-3 py-2">
            <div className="flex flex-col basis-7/12">
                <div>
                    <Link href={`/architectures/${id}`}>{title}</Link>
                </div>
                <div className="text-xs text-gray-400 flex">
                    <div>{createdAt}</div>
                    <div className="ml-2">{author}</div>
                </div>
                <div className="flex text-[10px] gap-2 mt-1">
                    {tags.map((tag) => (
                        <Tag key={tag} tag={tag} />
                    ))}
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
