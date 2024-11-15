import { useViewportContext } from '@cloud-graph/contexts/ViewportContext';
import { Point } from '@cloud-graph/types';
import { useCallback, useRef } from 'react';

export const usePan = () => {
    const { viewportRef, viewBox, setViewBox } = useViewportContext();

    const isPanningRef = useRef(false);
    const startPointRef = useRef<Point>({ x: 0, y: 0 });

    const startPan = useCallback((point: Point) => {
        isPanningRef.current = true;
        startPointRef.current = point;
    }, []);

    const movePan = useCallback(
        (point: Point) => {
            if (!isPanningRef.current || !viewportRef.current) return;

            const dx =
                (startPointRef.current.x - point.x) *
                (viewBox.width / viewportRef.current.clientWidth);
            const dy =
                (startPointRef.current.y - point.y) *
                (viewBox.height / viewportRef.current.clientHeight);

            startPointRef.current = point;

            setViewBox((prev) => ({
                ...prev,
                x: prev.x + dx,
                y: prev.y + dy,
            }));
        },
        [viewportRef, viewBox, setViewBox],
    );

    const stopPan = useCallback(() => {
        isPanningRef.current = false;
    }, []);

    return { startPan, movePan, stopPan };
};