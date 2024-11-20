import { Dimension } from '@types';
import { createContext, ReactNode, useContext, useRef, useState } from 'react';

type CanvasDimensionContextProps = {
    dimension: Dimension;
    prevDimension: Dimension;
    toggleDimension: () => void;
};

const CanvasDimensionContext =
    createContext<CanvasDimensionContextProps | null>(null);

export const CanvasDimensionProvider = ({
    children,
}: {
    children: ReactNode;
}) => {
    const [dimension, setDimension] = useState<Dimension>('2d');
    const prevDimensionRef = useRef<Dimension | null>('2d');

    const toggleDimension = () => {
        prevDimensionRef.current = dimension;
        setDimension((prev) => (prev === '2d' ? '3d' : '2d'));
    };

    return (
        <CanvasDimensionContext.Provider
            value={{
                dimension,
                prevDimension: prevDimensionRef.current!,
                toggleDimension,
            }}
        >
            {children}
        </CanvasDimensionContext.Provider>
    );
};

export const useCanvasDimensionContext = () => {
    const context = useContext(CanvasDimensionContext);
    if (!context) throw new Error('DimensionContext: context is undefined');

    return context;
};
