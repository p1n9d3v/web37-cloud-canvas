import Background from '@cloud-graph/components/Background';
import useKey from '@cloud-graph/hooks/useKey';
import { Dimension, Point, ViewBox } from '@cloud-graph/types';
import React, { forwardRef, ReactNode, RefObject } from 'react';

type Props = {
    viewBox: ViewBox;
    dimension: Dimension;
    onZoom: (wheelY: number, point: Point) => void;
    onStartPan: (point: Point) => void;
    onMovePan: (point: Point) => void;
    onStopPan: () => void;
    children: ReactNode;
};

const Graph = forwardRef<SVGSVGElement, Props>(
    (
        {
            children,
            viewBox,
            dimension,
            onZoom,
            onStartPan,
            onMovePan,
            onStopPan,
        },
        ref,
    ) => {
        const isActiveKey = useKey('space');

        const handleZoom = (event: React.WheelEvent) => {
            onZoom(event.deltaY, { x: event.clientX, y: event.clientY });
        };

        const handleStartPan = (event: React.MouseEvent) => {
            onStartPan({ x: event.clientX, y: event.clientY });

            const handleMovePan = (moveEvent: MouseEvent) => {
                if (!isActiveKey) return;
                onMovePan({ x: moveEvent.clientX, y: moveEvent.clientY });
            };

            const handleStopPan = () => {
                onStopPan();
                document.removeEventListener('mousemove', handleMovePan);
                document.removeEventListener('mouseup', handleStopPan);
            };

            document.addEventListener('mousemove', handleMovePan);
            document.addEventListener('mouseup', handleStopPan);
        };

        return (
            <svg
                ref={ref}
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
    },
);

export default Graph;
