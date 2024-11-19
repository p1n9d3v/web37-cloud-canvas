'use client';
import { useState } from 'react';
import { SearchIcon } from './SearchIcon';

export const SearchBar = () => {
    const [keyword, setKeyword] = useState('');

    return (
        <div className="flex mx-auto max-w-xl m-10">
            <input
                type="text"
                placeholder="검색어를 입력하세요"
                className="flex-grow px-3 py-2 rounded-l-xl border-l border-y border-gray-300 bg-gray-50"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
            />
            <button className="bg-blue-700 text-white px-4 rounded-r-xl">
                <SearchIcon />
            </button>
        </div>
    );
};
