import Background from '@cloud-graph/components/Background';
import useKey from '@cloud-graph/hooks/useKey';
import { Dimension, Point, ViewBox } from '@cloud-graph/types';
import React, { forwardRef, ReactNode } from 'react';

type Props = {
    viewBox: ViewBox;
    dimension: Dimension;
    onZoom: (wheelY: number, point: Point) => void;
    onStartPan: (point: Point) => void;
    onMovePan: (point: Point) => void;
    onStopPan: () => void;
    onDeselectAll: () => void;
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
            onDeselectAll,
        },
        ref,
    ) => {
        const isActiveKey = useKey('space');

        const handleWheel = (event: React.WheelEvent) => {
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

        const handleMouseDown = (event: React.MouseEvent) => {
            handleStartPan(event);
            onDeselectAll();
        };

        return (
            <svg
                ref={ref}
                width="100%"
                height="100%"
                viewBox={`${viewBox.x} ${viewBox.y} ${viewBox.width} ${viewBox.height}`}
                onWheel={handleWheel}
                onMouseDown={handleMouseDown}
            >
                <Background dimension={dimension} viewBox={viewBox} />
                {children}
            </svg>
        );
    },
);

export default Graph;
