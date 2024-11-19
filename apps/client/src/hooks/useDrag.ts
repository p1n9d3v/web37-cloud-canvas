import { useGraphCanvasContext } from '@contexts/GraphCanvasContext';
import { Point } from '@types';
import { getSvgPoint } from '@utils';
import { useRef, useState } from 'react';

type Props = {
    updateFn: (dragOffset: Point) => void;
};
export default ({ updateFn }: Props) => {
    const { canvas } = useGraphCanvasContext();
    const [isDragging, setIsDragging] = useState(false);
    const [startDragPoint, setStartDragPoint] = useState<Point | null>(null);
    const [dragOffset, setDragOffset] = useState<Point>({ x: 0, y: 0 });
    const dragOffsetRef = useRef<Point>({ x: 0, y: 0 });

    const startDrag = (point: Point) => {
        setIsDragging(true);
        const svgPoint = getSvgPoint(canvas, point);
        setStartDragPoint(svgPoint);
    };

    const moveDrag = (point: Point) => {
        if (!(isDragging && canvas && startDragPoint)) return;

        const svgPoint = getSvgPoint(canvas, point);
        const offset = {
            x: svgPoint.x - startDragPoint.x,
            y: svgPoint.y - startDragPoint.y,
        };
        setDragOffset(offset);
        dragOffsetRef.current = offset;
    };

    const stopDrag = () => {
        updateFn(dragOffsetRef.current);

        setIsDragging(false);
        setStartDragPoint(null);
        setDragOffset({ x: 0, y: 0 });
        dragOffsetRef.current = { x: 0, y: 0 };
    };

    return {
        isDragging,
        dragOffset,
        startDrag,
        moveDrag,
        stopDrag,
    };
};
