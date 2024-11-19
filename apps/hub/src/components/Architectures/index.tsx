'use client';
import { useState } from 'react';
import { ArchitectureHeader } from './header';
import { ArchitectureItem } from './item';

export const Architectures = () => {
    // 제목, 작성자, 작성일, star 개수, 예상 비용, import한 횟수, 태그
    const data = [
        {
            title: 'TITLEasdf',
            author: 'AUTHORasdf',
            cost: 1000000,
            date: '2021-10-01',
            stars: 100,
            imports: 5,
        },
        {
            title: 'Architecture 1',
            author: 'Author 1',
            cost: 2000000,
            date: '2021-11-01',
            stars: 150,
            imports: 10,
        },
        {
            title: 'Architecture 2',
            author: 'Author 2',
            cost: 3000000,
            date: '2021-12-01',
            stars: 200,
            imports: 20,
        },
        {
            title: 'Architecture 3',
            author: 'Author 3',
            cost: 4000000,
            date: '2022-01-01',
            stars: 250,
            imports: 30,
        },
        {
            title: 'Architecture 4',
            author: 'Author 4',
            cost: 5000000,
            date: '2022-02-01',
            stars: 300,
            imports: 40,
        },
        {
            title: 'Architecture 5',
            author: 'Author 5',
            cost: 6000000,
            date: '2022-03-01',
            stars: 350,
            imports: 50,
        },
        {
            title: 'Architecture 6',
            author: 'Author 6',
            cost: 7000000,
            date: '2022-04-01',
            stars: 400,
            imports: 60,
        },
        {
            title: 'Architecture 7',
            author: 'Author 7',
            cost: 8000000,
            date: '2022-05-01',
            stars: 450,
            imports: 70,
        },
        {
            title: 'Architecture 8',
            author: 'Author 8',
            cost: 9000000,
            date: '2022-06-01',
            stars: 500,
            imports: 80,
        },
        {
            title: 'Architecture 9',
            author: 'Author 9',
            cost: 10000000,
            date: '2022-07-01',
            stars: 550,
            imports: 90,
        },
        {
            title: 'Architecture 10',
            author: 'Author 10',
            cost: 11000000,
            date: '2022-08-01',
            stars: 600,
            imports: 100,
        },
    ];

    const [sortConfig, setSortConfig] = useState({
        key: null,
        direction: 'ascending',
    });

    const handleSort = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    const getSortedData = () => {
        if (!sortConfig.key) return data;

        return [...data].sort((a, b) => {
            if (a[sortConfig.key] < b[sortConfig.key]) {
                return sortConfig.direction === 'ascending' ? -1 : 1;
            }
            if (a[sortConfig.key] > b[sortConfig.key]) {
                return sortConfig.direction === 'ascending' ? 1 : -1;
            }
            return 0;
        });
    };

    const getSortIcon = (columnName) => {
        if (sortConfig.key !== columnName) {
            return <span className="inline w-4 h-4 ml-2" />;
        }
        return sortConfig.direction === 'ascending' ? (
            <span className="inline w-4 h-4 ml-2" />
        ) : (
            <span className="inline w-4 h-4 ml-2" />
        );
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString();
    };

    const formatNumber = (number) => {
        return number.toLocaleString();
    };

    return (
        <>
            <div className="w-[1040px] mx-auto overflow-x-auto my-4">
                {/* <table className="min-w-full bg-white border-y border-gray-200"> */}
                <ArchitectureHeader />
                {/* <tbody> */}
                {data.map((item, index) => (
                    <ArchitectureItem key={index} {...item} />
                ))}
                {/* </tbody> */}
                {/* </table> */}
            </div>
        </>
    );
};
