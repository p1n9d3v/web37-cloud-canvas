import React from 'react';

export const Button = ({
    children,
    onClick,
}: {
    children: React.ReactNode;
    onClick: () => void;
}) => {
    return (
        <button
            className="bg-blue-700 text-white py-2 px-4 rounded-lg"
            onClick={onClick}
        >
            {children}
        </button>
    );
};
