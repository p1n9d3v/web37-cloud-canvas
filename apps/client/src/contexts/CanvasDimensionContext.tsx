import { Dimension } from '@types';
import { createContext, ReactNode, useContext, useState } from 'react';

type CanvasDimensionContextProps = {
    dimension: Dimension;
    toggleDimension: () => void;
};

const CanvasDimensionContext =
    createContext<CanvasDimensionContextProps | null>(null);

export const CanvasDimensionProvider = ({
    children,
}: {
    children: ReactNode;
}) => {
    const [dimension, setDimension] = useState<Dimension>('3d');

    const toggleDimension = () => {
        setDimension((prev) => (prev === '2d' ? '3d' : '2d'));
    };

    return (
        <CanvasDimensionContext.Provider value={{ dimension, toggleDimension }}>
            {children}
        </CanvasDimensionContext.Provider>
    );
};

export const useCanvasDimensionContext = () => {
    const context = useContext(CanvasDimensionContext);
    if (!context) throw new Error('DimensionContext: context is undefined');

    return context;
};
