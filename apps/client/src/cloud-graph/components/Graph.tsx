import Background from '@cloud-graph/components/Background';
import { useDimensionContext } from '@cloud-graph/contexts/DimensionContext';
import { useViewportContext } from '@cloud-graph/contexts/ViewportContext';
import { usePan } from '@cloud-graph/hooks/usePan';
import { useZoom } from '@cloud-graph/hooks/useZoom';
import React from 'react';

const Graph = ({ children }: { children: React.ReactNode }) => {
    const { viewportRef, viewBox } = useViewportContext();
    const { dimension } = useDimensionContext();
    const { adjustZoom } = useZoom();
    const { startPan, movePan, stopPan } = usePan();

    const handleZoom = (event: React.WheelEvent) => {
        adjustZoom(event.deltaY, { x: event.clientX, y: event.clientY });
    };

    const handleStartPan = (event: React.MouseEvent) => {
        startPan({ x: event.clientX, y: event.clientY });

        const handleMovePan = (moveEvent: MouseEvent) => {
            movePan({ x: moveEvent.clientX, y: moveEvent.clientY });
        };

        const handleStopPan = () => {
            stopPan();
            window.removeEventListener('mousemove', handleMovePan);
            window.removeEventListener('mouseup', handleStopPan);
        };

        window.addEventListener('mousemove', handleMovePan);
        window.addEventListener('mouseup', handleStopPan);
    };

    return (
        <svg
            ref={viewportRef}
            width="100%"
            height="100%"
            viewBox={`${viewBox.x} ${viewBox.y} ${viewBox.width} ${viewBox.height}`}
            onWheel={handleZoom}
            onMouseDown={handleStartPan}
        >
            <Background dimension={dimension} viewBox={viewBox} />
            {children}
        </svg>
    );
};

export default Graph;
