'use client';
import { useState } from 'react';
import { ArchitectureHeader } from './header';
import { ArchitectureItem } from './item';

export const Architectures = () => {
    // 제목, 작성자, 작성일, star 개수, 예상 비용, import한 횟수, 태그
    const data = [
        {
            id: 1,
            title: 'TITLEasdf',
            author: 'AUTHORasdf',
            cost: 1000000,
            createdAt: '2021-10-01',
            stars: 100,
            imports: 5,
            tags: ['React', 'JavaScript', 'Frontend'],
        },
        {
            id: 2,
            title: 'Architecture 1',
            author: 'Author 1',
            cost: 2000000,
            createdAt: '2021-11-01',
            stars: 150,
            imports: 10,
            tags: ['Node.js', 'Backend', 'API'],
        },
        {
            id: 3,
            title: 'Architecture 2',
            author: 'Author 2',
            cost: 3000000,
            createdAt: '2021-12-01',
            stars: 200,
            imports: 20,
            tags: ['TypeScript', 'GraphQL', 'Fullstack'],
        },
        {
            id: 4,
            title: 'Architecture 3',
            author: 'Author 3',
            cost: 4000000,
            createdAt: '2022-01-01',
            stars: 250,
            imports: 30,
            tags: ['Python', 'Django', 'Backend'],
        },
        {
            id: 5,
            title: 'Architecture 4',
            author: 'Author 4',
            cost: 5000000,
            createdAt: '2022-02-01',
            stars: 300,
            imports: 40,
            tags: ['Java', 'Spring', 'Microservices'],
        },
        {
            id: 6,
            title: 'Architecture 5',
            author: 'Author 5',
            cost: 6000000,
            createdAt: '2022-03-01',
            stars: 350,
            imports: 50,
            tags: ['Kotlin', 'Android', 'Mobile'],
        },
        {
            id: 7,
            title: 'Architecture 6',
            author: 'Author 6',
            cost: 7000000,
            createdAt: '2022-04-01',
            stars: 400,
            imports: 60,
            tags: ['Swift', 'iOS', 'Mobile'],
        },
        {
            id: 8,
            title: 'Architecture 7',
            author: 'Author 7',
            cost: 8000000,
            createdAt: '2022-05-01',
            stars: 450,
            imports: 70,
            tags: ['Go', 'Microservices', 'Backend'],
        },
        {
            id: 9,
            title: 'Architecture 8',
            author: 'Author 8',
            cost: 9000000,
            createdAt: '2022-06-01',
            stars: 500,
            imports: 80,
            tags: ['Ruby', 'Rails', 'Backend'],
        },
        {
            id: 10,
            title: 'Architecture 9',
            author: 'Author 9',
            cost: 10000000,
            createdAt: '2022-07-01',
            stars: 550,
            imports: 90,
            tags: ['PHP', 'Laravel', 'Backend'],
        },
        {
            id: 11,
            title: 'Architecture 10',
            author: 'Author 10',
            cost: 11000000,
            createdAt: '2022-08-01',
            stars: 600,
            imports: 100,
            tags: ['C#', '.NET', 'Backend'],
        },
    ];

    // const [sortConfig, setSortConfig] = useState({
    //     key: null,
    //     direction: 'ascending',
    // });

    // const handleSort = (key) => {
    //     let direction = 'ascending';
    //     if (sortConfig.key === key && sortConfig.direction === 'ascending') {
    //         direction = 'descending';
    //     }
    //     setSortConfig({ key, direction });
    // };

    // const getSortedData = () => {
    //     if (!sortConfig.key) return data;

    //     return [...data].sort((a, b) => {
    //         if (a[sortConfig.key] < b[sortConfig.key]) {
    //             return sortConfig.direction === 'ascending' ? -1 : 1;
    //         }
    //         if (a[sortConfig.key] > b[sortConfig.key]) {
    //             return sortConfig.direction === 'ascending' ? 1 : -1;
    //         }
    //         return 0;
    //     });
    // };

    // const getSortIcon = (columnName) => {
    //     if (sortConfig.key !== columnName) {
    //         return <span className="inline w-4 h-4 ml-2" />;
    //     }
    //     return sortConfig.direction === 'ascending' ? (
    //         <span className="inline w-4 h-4 ml-2" />
    //     ) : (
    //         <span className="inline w-4 h-4 ml-2" />
    //     );
    // };

    // const formatDate = (dateString) => {
    //     return new Date(dateString).toLocaleDateString();
    // };

    // const formatNumber = (number) => {
    //     return number.toLocaleString();
    // };

    return (
        <>
            <div className="max-w-5xl mx-auto overflow-x-auto my-4">
                <ArchitectureHeader />
                {data.map((item) => (
                    <ArchitectureItem key={item.id} {...item} />
                ))}
            </div>
        </>
    );
};
