import { Architectures } from '@/components/Architectures';
import { Pagination } from '@/components/Pagination';
import { SearchBar } from '@/components/SearchBar';

export default function Home() {
    return (
        <>
            <SearchBar />
            <Architectures />
            <Pagination />
        </>
    );
}
