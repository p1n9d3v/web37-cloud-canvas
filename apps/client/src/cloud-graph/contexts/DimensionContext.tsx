import { Dimension } from '@cloud-graph/types';
import { createContext, ReactNode, useContext, useState } from 'react';

type DimensionType = Dimension;

interface DimensionContextType {
    dimension: DimensionType;
    toggleDimension: () => void;
}

const DimensionContext = createContext<DimensionContextType | null>(null);

export const DimensionProvider = ({ children }: { children: ReactNode }) => {
    const [dimension, setDimension] = useState<DimensionType>('2d');

    const toggleDimension = () => {
        setDimension((prev) => (prev === '2d' ? '3d' : '2d'));
    };

    return (
        <DimensionContext.Provider value={{ dimension, toggleDimension }}>
            {children}
        </DimensionContext.Provider>
    );
};

export const useDimensionContext = () => {
    const context = useContext(DimensionContext);
    if (!context) throw new Error('DimensionContext: context is undefined');

    return context;
};
