import { useGraphCanvasContext } from '@contexts/GraphCanvas';
import useKey from '@hooks/useKey';
import { Point } from '@types';
import { getSvgPoint } from '@utils';
import { ReactNode, useRef } from 'react';

type Props = {
    children: ReactNode;
};
export default ({ children }: Props) => {
    const { svgRef, viewBox, setViewBox } = useGraphCanvasContext();
    const isPanning = useRef(false);
    const startPoint = useRef<Point>({ x: 0, y: 0 });
    const spaceActiveKey = useKey('space');

    const zoom = (wheelY: number, point: Point) => {
        if (!svgRef.current) return;

        const zoomFactor = wheelY > 0 ? 1.1 : 0.9;
        const cursorSvgPoint = getSvgPoint(svgRef.current, point);
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
        if (!isPanning.current || !svgRef.current) return;

        const dx =
            (startPoint.current.x - point.x) *
            (viewBox.width / svgRef.current.clientWidth);
        const dy =
            (startPoint.current.y - point.y) *
            (viewBox.height / svgRef.current.clientHeight);
        startPoint.current = point;

        setViewBox((prev) => ({
            ...prev,
            x: prev.x + dx,
            y: prev.y + dy,
        }));
    };

    const handleWheel = (e: React.WheelEvent<SVGSVGElement>) => {
        zoom(e.deltaY, { x: e.clientX, y: e.clientY });
    };

    const handleMouseDown = (e: React.MouseEvent<SVGSVGElement>) => {
        if (!spaceActiveKey) return;
        startPan({ x: e.clientX, y: e.clientY });
    };

    const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
        if (!isPanning.current) return;
        document.body.style.cursor = 'grabbing';
        movePan({ x: e.clientX, y: e.clientY });
    };

    const handleMouseUp = () => {
        isPanning.current = false;
        document.body.style.cursor = 'default';
    };

    return (
        <svg
            ref={svgRef}
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
