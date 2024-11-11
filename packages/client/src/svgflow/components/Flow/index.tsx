import Background from '@svgflow/components/Background';
import { Dimension, Point, ViewBox } from '@svgflow/types';
import { forwardRef, MouseEvent, ReactNode, WheelEvent } from 'react';

type Props = {
    children: ReactNode;
    dimension: Dimension;
    viewBox: ViewBox;
    onZoom: (deltaY: number, point: Point) => void;
    onStartPan: (point: Point) => void;
    onMovePan: (point: Point) => void;
    onEndPan: () => void;
    onDragNode: (point: Point) => void;
    onEndDragNode: () => void;
};

export default forwardRef<SVGSVGElement, Props>(
    (
        {
            viewBox,
            dimension,
            children,
            onZoom,
            onStartPan,
            onMovePan,
            onEndPan,
            onDragNode,
            onEndDragNode,
        },
        ref
    ) => {
        const handleWheel = (event: WheelEvent) => {
            const { deltaY, clientX, clientY } = event;
            onZoom(deltaY, { x: clientX, y: clientY });
        };

        const handleMouseDown = (event: MouseEvent) => {
            const { clientX, clientY } = event;
            onStartPan({
                x: clientX,
                y: clientY,
            });
        };

        const handleMouseMove = (event: MouseEvent) => {
            const { clientX, clientY } = event;
            onMovePan({
                x: clientX,
                y: clientY,
            });

            onDragNode({
                x: clientX,
                y: clientY,
            });
        };

        const handleMouseUp = () => {
            onEndPan();
            onEndDragNode();
        };
        return (
            <svg
                ref={ref}
                width="100%"
                height="100%"
                viewBox={Object.values(viewBox).join(' ')}
                onMouseUp={handleMouseUp}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onWheel={handleWheel}
            >
                <Background
                    viewBox={viewBox}
                    dimension={dimension}
                    showSubLines
                />
                {children}
            </svg>
        );
    }
);
