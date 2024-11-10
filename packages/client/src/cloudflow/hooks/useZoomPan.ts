import { Point, ViewBox } from '@cloudflow/types';
import { getRelativeCoordinatesForViewBox } from '@cloudflow/utils';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';

//TODO: SVG를 이용하면 getRelativeCoordinatesForViewBox 함수를 안쓰고도 구현할 수 있을 것 같다. 추후 변경 예정
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

    const zoom = (deltaY: number, cursorPoint: Point) => {
        const zoomFactor = deltaY > 0 ? 1.1 : 0.9;

        const { x: mouseX, y: mouseY } = getRelativeCoordinatesForViewBox(
            cursorPoint.x,
            cursorPoint.y,
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

    const startDragPan = (cursorPoint: Point) => {
        setIsDragging(true);
        dragStart.current = { x: cursorPoint.x, y: cursorPoint.y };
        startPoint.current = { ...viewBox.point };
    };

    const dragPan = (cursorPoint: Point) => {
        if (!isDragging || !zoomPanRef.current) return;

        const deltaX = cursorPoint.x - dragStart.current.x;
        const deltaY = cursorPoint.y - dragStart.current.y;

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

    const endDragPan = () => setIsDragging(false);

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
        zoom,
        startDragPan,
        dragPan,
        endDragPan,
    };
};
