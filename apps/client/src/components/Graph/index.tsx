import { useGraphCanvasContext } from '@contexts/GraphCanvasContext';
import useKey from '@hooks/useKey';
import { Point } from '@types';
import { getSvgPoint } from '@utils';
import { ReactNode, useRef } from 'react';

type Props = {
    children: ReactNode;
};
export default ({ children }: Props) => {
    const { canvasRef, canvas, viewBox, setViewBox } = useGraphCanvasContext();
    const isPanning = useRef(false);
    const startPoint = useRef<Point>({ x: 0, y: 0 });
    const spaceActiveKey = useKey('space');

    const zoom = (wheelY: number, point: Point) => {
        const zoomFactor = wheelY > 0 ? 1.1 : 0.9;
        const cursorSvgPoint = getSvgPoint(canvas, point);
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

    const startPan = (point: Point) => {
        isPanning.current = true;
        startPoint.current = point;
    };

    const movePan = (point: Point) => {
        if (!isPanning.current) return;

        const dx =
            (startPoint.current.x - point.x) *
            (viewBox.width / canvas.clientWidth);
        const dy =
            (startPoint.current.y - point.y) *
            (viewBox.height / canvas.clientHeight);
        startPoint.current = point;

        setViewBox((prev) => ({
            ...prev,
            x: prev.x + dx,
            y: prev.y + dy,
        }));
    };

    const stopPan = () => (isPanning.current = false);

    const handleWheel = (e: React.WheelEvent<SVGSVGElement>) => {
        const { deltaY, clientX, clientY } = e;
        zoom(deltaY, { x: clientX, y: clientY });
        if (deltaY > 0) document.body.style.cursor = 'zoom-out';
        else document.body.style.cursor = 'zoom-in';
    };

    const handleMouseDown = (e: React.MouseEvent<SVGSVGElement>) => {
        if (!spaceActiveKey) return;
        const { clientX, clientY } = e;
        startPan({ x: clientX, y: clientY });
    };

    const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
        if (!isPanning.current) return;
        const { clientX, clientY } = e;
        movePan({ x: clientX, y: clientY });
        document.body.style.cursor = 'grabbing';
    };

    const handleMouseUp = () => {
        stopPan();
        document.body.style.cursor = 'default';
    };

    return (
        <svg
            ref={canvasRef}
            width="100%"
            height="100%"
            viewBox={`${viewBox?.x} ${viewBox?.y} ${viewBox?.width} ${viewBox?.height}`}
            onWheel={handleWheel}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
        >
            {children}
        </svg>
    );
};
