import { Dimension } from '@types';
import { createContext, ReactNode, useContext, useState } from 'react';

type GraphDimensionContextType = {
    dimension: Dimension;
    toggleDimension: () => void;
};

const GraphDimensionContext = createContext<GraphDimensionContextType | null>(
    null,
);

export const GraphDimensionProvider = ({
    children,
}: {
    children: ReactNode;
}) => {
    const [dimension, setDimension] = useState<Dimension>('2d');

    const toggleDimension = () => {
        setDimension((prev) => (prev === '2d' ? '3d' : '2d'));
    };

    return (
        <GraphDimensionContext.Provider value={{ dimension, toggleDimension }}>
            {children}
        </GraphDimensionContext.Provider>
    );
};

export const useGraphDimensionContext = () => {
    const context = useContext(GraphDimensionContext);
    if (!context) throw new Error('DimensionContext: context is undefined');

    return context;
};
