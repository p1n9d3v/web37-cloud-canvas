// useZoomPan.ts
import { Point, ViewBox } from '@cloudflow/types';
import { getSvgPoint } from '@cloudflow/utils';
import { RefObject, useLayoutEffect, useState } from 'react';

export default function useZoomPan(flowRef: RefObject<SVGSVGElement>) {
    const [viewBox, setViewBox] = useState<ViewBox>({
        x: 0,
        y: 0,
        width: document.documentElement.clientWidth,
        height: document.documentElement.clientHeight,
    });
    const [isPanning, setIsPanning] = useState(false);
    const [startPoint, setStartPoint] = useState<Point>({ x: 0, y: 0 });

    useLayoutEffect(() => {
        if (flowRef.current) {
            const updateViewBoxSize = () => {
                setViewBox((prev) => ({
                    ...prev,
                    width: flowRef.current!.clientWidth,
                    height: flowRef.current!.clientHeight,
                }));
            };
            updateViewBoxSize();
            window.addEventListener('resize', updateViewBoxSize);

            return () => {
                window.removeEventListener('resize', updateViewBoxSize);
            };
        }
    }, []);

    const handleZoom = (wheelY: number, cursorPoint: Point) => {
        if (!flowRef.current) return;
        const zoomFactor = wheelY > 0 ? 1.1 : 0.9;

        const cursorSvgPoint = getSvgPoint(flowRef.current, cursorPoint);
        if (!cursorSvgPoint) return;

        setViewBox((prev) => {
            const newWidth = prev.width * zoomFactor;
            const newHeight = prev.height * zoomFactor;

            const deltaX = (cursorSvgPoint.x - prev.x) * (1 - zoomFactor);
            const deltaY = (cursorSvgPoint.y - prev.y) * (1 - zoomFactor);

            return {
                x: prev.x + deltaX,
                y: prev.y + deltaY,
                width: newWidth,
                height: newHeight,
            };
        });
    };

    const handleStartPan = (point: Point) => {
        setIsPanning(true);
        setStartPoint(point);
    };

    const handleMovePan = (point: Point) => {
        if (!isPanning || !flowRef.current) return;

        const dx =
            (startPoint.x - point.x) *
            (viewBox.width / flowRef.current.clientWidth);
        const dy =
            (startPoint.y - point.y) *
            (viewBox.height / flowRef.current.clientHeight);

        setViewBox((prev) => ({
            ...prev,
            x: prev.x + dx,
            y: prev.y + dy,
        }));

        setStartPoint(point);
    };

    const handleEndPan = () => setIsPanning(false);

    return {
        viewBox,
        isPanning,
        handleZoom,
        handleStartPan,
        handleMovePan,
        handleEndPan,
    };
}
