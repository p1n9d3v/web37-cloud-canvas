import Background from '@cloud-graph/components/Background';
import { useViewportContext } from '@cloud-graph/contexts/ViewportContext';
import { usePan } from '@cloud-graph/hooks/usePan';
import { useZoom } from '@cloud-graph/hooks/useZoom';
import React from 'react';

const Graph = ({ children }: { children: React.ReactNode }) => {
    const { viewportRef, viewBox } = useViewportContext();
    const { adjustZoom } = useZoom();
    const { startPan, movePan, stopPan } = usePan();

    const handleWheel = (event: React.WheelEvent) => {
        adjustZoom(event.deltaY, { x: event.clientX, y: event.clientY });
    };

    const handleMouseDown = (event: React.MouseEvent) => {
        startPan({ x: event.clientX, y: event.clientY });

        const handleMouseMove = (moveEvent: MouseEvent) => {
            movePan({ x: moveEvent.clientX, y: moveEvent.clientY });
        };

        const handleMouseUp = () => {
            stopPan();
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);
    };

    return (
        <svg
            ref={viewportRef}
            width="100%"
            height="100%"
            viewBox={`${viewBox.x} ${viewBox.y} ${viewBox.width} ${viewBox.height}`}
            onWheel={handleWheel}
            onMouseDown={handleMouseDown}
        >
            <Background dimension="2d" viewBox={viewBox} />
            {children}
        </svg>
    );
};

export default Graph;
