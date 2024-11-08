import { ViewBox } from '@types';
import { getRelativeCoordinatesForViewBox } from '@utils/index';
import { useLayoutEffect, useRef, useState } from 'react';

export default () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [viewBox, setViewBox] = useState<ViewBox>({
        position: { x: 0, y: 0 },
        width: 0,
        height: 0,
    });
    const [isDragging, setIsDragging] = useState(false);

    const dragStart = useRef({ x: 0, y: 0 });
    const initialPosition = useRef({ x: 0, y: 0 });

    const onZoom = (e: React.WheelEvent<HTMLDivElement>) => {
        const { deltaY, clientX, clientY } = e;
        const zoomFactor = deltaY > 0 ? 1.1 : 0.9;

        const { x: mouseX, y: mouseY } = getRelativeCoordinatesForViewBox(
            clientX,
            clientY,
            containerRef,
            viewBox
        );

        setViewBox((prev) => {
            const newWidth = prev.width * zoomFactor;
            const newHeight = prev.height * zoomFactor;
            return {
                position: {
                    x: mouseX - (mouseX - prev.position.x) * zoomFactor,
                    y: mouseY - (mouseY - prev.position.y) * zoomFactor,
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
        initialPosition.current = { ...viewBox.position };
    };

    const onDrag = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!isDragging || !containerRef.current) return;

        const deltaX = e.clientX - dragStart.current.x;
        const deltaY = e.clientY - dragStart.current.y;

        const rect = containerRef.current.getBoundingClientRect();
        const scaleX = viewBox.width / rect.width;
        const scaleY = viewBox.height / rect.height;

        setViewBox((prev) => ({
            ...prev,
            position: {
                x: initialPosition.current.x - deltaX * scaleX,
                y: initialPosition.current.y - deltaY * scaleY,
            },
        }));
    };

    const onDragEnd = () => setIsDragging(false);

    useLayoutEffect(() => {
        if (containerRef.current) {
            const updateViewBoxSize = () => {
                setViewBox((prev) => ({
                    ...prev,
                    width: containerRef.current!.clientWidth,
                    height: containerRef.current!.clientHeight,
                }));
            };
            updateViewBoxSize();
            window.addEventListener('resize', updateViewBoxSize);

            return () => {
                window.removeEventListener('resize', updateViewBoxSize);
            };
        }
    }, []);

    return {
        containerRef,
        viewBox,
        isDragging,
        onZoom,
        onDragStart,
        onDrag,
        onDragEnd,
    };
};
