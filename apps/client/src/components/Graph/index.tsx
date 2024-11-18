import { useGraphCanvasContext } from '@contexts/GraphCanvas';
import { ReactNode } from 'react';

type Props = {
    children: ReactNode;
};
export default ({ children }: Props) => {
    const { svgRef, viewBox } = useGraphCanvasContext();
    return (
        <svg
            ref={svgRef}
            width="100%"
            height="100%"
            viewBox={`${viewBox?.x} ${viewBox?.y} ${viewBox?.width} ${viewBox?.height}`}
        >
            {children}
        </svg>
    );
};
