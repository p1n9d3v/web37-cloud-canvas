import { ViewBox } from '@cloudflow/types';
import { getRelativeCoordinatesForViewBox } from '@cloudflow/utils';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';

export default () => {
    const zoomPanRef = useRef<HTMLDivElement>(null);
    const [viewBox, setViewBox] = useState<ViewBox>({
        point: { x: 0, y: 0 },
        width: zoomPanRef.current?.clientWidth || 0,
        height: zoomPanRef.current?.clientHeight || 0,
    });
    const [isDragging, setIsDragging] = useState(false);

    const dragStart = useRef({ x: 0, y: 0 });
    const startPoint = useRef({ x: 0, y: 0 });

    const onZoom = (e: React.WheelEvent<HTMLDivElement>) => {
        const { deltaY, clientX, clientY } = e;
        const zoomFactor = deltaY > 0 ? 1.1 : 0.9;

        const { x: mouseX, y: mouseY } = getRelativeCoordinatesForViewBox(
            clientX,
            clientY,
            zoomPanRef,
            viewBox
        );

        setViewBox(({ width, height, point }) => {
            const newWidth = width * zoomFactor;
            const newHeight = height * zoomFactor;
            return {
                point: {
                    x: mouseX - (mouseX - point.x) * zoomFactor,
                    y: mouseY - (mouseY - point.y) * zoomFactor,
                },
                width: newWidth,
                height: newHeight,
            };
        });
    };

    const onDragStart = (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(true);
        dragStart.current = { x: e.clientX, y: e.clientY };
        startPoint.current = { ...viewBox.point };
    };

    const onDrag = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!isDragging || !zoomPanRef.current) return;

        const deltaX = e.clientX - dragStart.current.x;
        const deltaY = e.clientY - dragStart.current.y;

        const rect = zoomPanRef.current.getBoundingClientRect();
        const scaleX = viewBox.width / rect.width;
        const scaleY = viewBox.height / rect.height;

        setViewBox((prev) => ({
            ...prev,
            point: {
                x: startPoint.current.x - deltaX * scaleX,
                y: startPoint.current.y - deltaY * scaleY,
            },
        }));
    };

    const onDragEnd = () => setIsDragging(false);

    useLayoutEffect(() => {
        if (zoomPanRef.current) {
            const updateViewBoxSize = () => {
                setViewBox((prev) => ({
                    ...prev,
                    width: zoomPanRef.current!.clientWidth,
                    height: zoomPanRef.current!.clientHeight,
                }));
            };
            updateViewBoxSize();
            window.addEventListener('resize', updateViewBoxSize);

            return () => {
                window.removeEventListener('resize', updateViewBoxSize);
            };
        }
    }, []);

    useEffect(() => {
        document.body.style.cursor = isDragging ? 'grabbing' : 'auto';
    }, [isDragging]);

    return {
        zoomPanRef,
        viewBox,
        isDragging,
        onZoom,
        onDragStart,
        onDrag,
        onDragEnd,
    };
};
